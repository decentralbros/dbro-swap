import { ChainId, chainNames } from '@pancakeswap/chains'
import { GAUGES_SUPPORTED_CHAIN_IDS, GAUGE_TYPE_NAMES, Gauge, GaugeType } from '@pancakeswap/gauges'
import { FeeAmount } from '@pancakeswap/v3-sdk'
import {
  parseAsArrayOf,
  parseAsNumberLiteral,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
  useQueryStates,
} from 'nuqs'
import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from '@pancakeswap/hooks'
import { fetchPositionManager, PCSDuoTokenVaultConfig } from '@pancakeswap/position-managers'
import fromPairs from 'lodash/fromPairs'
import { Filter, FilterValue, Gauges, OptionsType, SortOptions } from '../components/GaugesFilter'
import { getPositionManagerName } from '../utils'

const getSorter = (sort: SortOptions | undefined) => {
  if (sort === SortOptions.Vote) {
    return (a: Gauge, b: Gauge) => Number(b.weight) - Number(a.weight)
  }
  if (sort === SortOptions.Boost) {
    return (a: Gauge, b: Gauge) => Number(b.boostMultiplier) - Number(a.boostMultiplier)
  }
  return (a: Gauge, b: Gauge) => Number(a.gid) - Number(b.gid)
}

const useGaugesFilterPureState = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [filter, _setFilter] = useState<Filter>({
    byChain: [],
    byFeeTier: [],
    byType: [],
  })

  const setFilter = useCallback(
    (type: OptionsType, value: FilterValue) => {
      const opts = filter[type] as Array<unknown>
      if (Array.isArray(value)) {
        // select all
        _setFilter((prev) => ({
          ...prev,
          [type]: value.length === opts.length ? [] : value,
        }))
      } else if (opts.includes(value)) {
        // deselect one
        _setFilter((prev) => ({
          ...prev,
          [type]: opts.filter((v) => v !== value),
        }))
      } else {
        // select one
        _setFilter((prev) => ({
          ...prev,
          [type]: [...opts, value],
        }))
      }
    },
    [filter],
  )

  return {
    searchText,
    setSearchText,

    filter,
    setFilter,
  }
}

const useGaugesFilterQueryState = () => {
  const [searchText, setSearchText] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({
      history: 'replace',
      shallow: true,
    }),
  )
  const [filter, _setFilter] = useQueryStates(
    {
      byChain: parseAsArrayOf(
        parseAsNumberLiteral<(typeof GAUGES_SUPPORTED_CHAIN_IDS)[number]>(GAUGES_SUPPORTED_CHAIN_IDS),
      ).withDefault([]),
      byFeeTier: parseAsArrayOf(
        parseAsNumberLiteral<FeeAmount>([FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH, FeeAmount.LOWEST]),
      ).withDefault([]),
      byType: parseAsArrayOf(parseAsStringLiteral<Gauges>([Gauges.Regular, Gauges.Boosted, Gauges.Capped])).withDefault(
        [],
      ),
    },
    {
      history: 'replace',
      shallow: true,
      clearOnDefault: true,
    },
  )

  const setFilter = useCallback(
    (type: OptionsType, value: FilterValue) => {
      const opts = filter[type]
      // select all
      if (Array.isArray(value)) {
        _setFilter({
          [type]: value.length === opts.length ? [] : value,
        })
      } else if (opts.some((x) => x === value)) {
        // deselect one
        _setFilter({
          [type]: opts.filter((v) => v !== value),
        })
      } else {
        // select one
        _setFilter({
          [type]: [...opts, value],
        })
      }
    },
    [filter, _setFilter],
  )

  return {
    searchText,
    setSearchText,

    filter,
    setFilter,
  }
}

const useFilteredGauges = ({ filter, fullGauges, searchText, sort, setSort }) => {
  const [filteredGauges, setFilteredGauges] = useState<Gauge[]>([])

  useEffect(() => {
    if (fullGauges && fullGauges.length && !sort) {
      setSort(SortOptions.Default)
    }
  }, [fullGauges, setSort, sort])

  useEffect(() => {
    const fetchFilteredGauges = async (signal) => {
      if (!fullGauges || !fullGauges.length) {
        setFilteredGauges([])
        return
      }

      const { byChain, byFeeTier, byType } = filter
      let results = fullGauges.filter((gauge) => {
        const feeTier = gauge.type === GaugeType.V3 ? gauge?.feeTier : undefined
        const chain = gauge.chainId
        const boosted = gauge.boostMultiplier > 100n
        const capped = gauge.maxVoteCap > 0n
        const types = [boosted ? Gauges.Boosted : Gauges.Regular]
        if (capped) {
          types.push(Gauges.Capped)
        }
        return (
          (byChain.length === 0 || (chain && byChain.includes(chain))) &&
          (byFeeTier.length === 0 || (feeTier && byFeeTier.includes(feeTier))) &&
          (byType.length === 0 || byType.some((bt) => types.includes(bt)))
        )
      })

      // Asynchronous search based on searchText
      if (searchText?.length > 0) {
        try {
          const positionManagerPairs: Partial<Record<ChainId, PCSDuoTokenVaultConfig[]>> = fromPairs(
            await Promise.all(
              results
                .reduce((acc, gauge) => {
                  if (!acc.includes(gauge.chainId)) {
                    acc.push(gauge.chainId)
                  }
                  return acc
                }, [])
                .map(async (chainId) => {
                  const positionManagerName = await fetchPositionManager(chainId, signal)
                  return [chainId, positionManagerName]
                }),
            ),
          )
          const updatedResults = await Promise.all(
            results.map(async (gauge) => {
              try {
                const positionManagerName = await getPositionManagerName(
                  gauge,
                  positionManagerPairs?.[gauge.chainId] ?? undefined,
                  signal,
                )
                const isMatch = [
                  // search by pairName or tokenName
                  gauge.pairName.toLowerCase(),
                  // search by gauges type, e.g. "v2", "v3", "position manager"
                  GAUGE_TYPE_NAMES[gauge.type].toLowerCase(),
                  // search by chain name
                  chainNames[gauge.chainId],
                  // search by chain id
                  String(gauge.chainId),
                  // search by boost multiplier, e.g. "1.5x"
                  `${Number(gauge.boostMultiplier) / 100}x`,
                  // search by alm strategy name
                  positionManagerName.toLowerCase(),
                ].some((text) => text?.includes(searchText.toLowerCase()))
                return isMatch ? gauge : null
              } catch (error) {
                if (error instanceof Error) {
                  if (error.name !== 'AbortError') {
                    console.error('Error fetching position manager name:', error)
                  } else {
                    throw error
                  }
                }
                return null
              }
            }),
          )
          results = updatedResults.filter(Boolean) // Remove nulls
        } catch (error) {
          return
        }
      }
      const sorter = getSorter(sort)
      setFilteredGauges(results.sort(sorter))
    }

    const controller = new AbortController()
    const { signal } = controller

    fetchFilteredGauges(signal)

    return () => {
      controller.abort()
    }
  }, [filter, fullGauges, searchText, sort])

  return filteredGauges
}

export const useGaugesQueryFilter = (fullGauges: Gauge[] | undefined) => {
  const { filter, setFilter, searchText, setSearchText } = useGaugesFilterQueryState()
  const [sort, setSort] = useState<SortOptions>()
  const debouncedQuery = useDebounce(searchText, 200)
  const filterGauges = useFilteredGauges({ filter, fullGauges, searchText, sort, setSort })

  return {
    filterGauges,

    searchText: debouncedQuery,
    setSearchText,

    filter,
    setFilter,

    sort,
    setSort,
  }
}

export const useGaugesFilter = (fullGauges: Gauge[] | undefined) => {
  const { filter, setFilter, searchText, setSearchText } = useGaugesFilterPureState()
  const [sort, setSort] = useState<SortOptions>()
  const filterGauges = useFilteredGauges({ filter, fullGauges, searchText, sort, setSort })

  return {
    filterGauges,

    searchText,
    setSearchText,

    filter,
    setFilter,

    sort,
    setSort,
  }
}
