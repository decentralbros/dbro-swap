import { Protocol, UniversalFarmConfig, fetchAllUniversalFarms, masterChefV3Addresses } from '@pancakeswap/farms'
import { masterChefAddresses } from '@pancakeswap/farms/src/const'
import { masterChefV3ABI } from '@pancakeswap/v3-sdk'
import { useQuery } from '@tanstack/react-query'
import { masterChefV2ABI } from 'config/abi/masterchefV2'
import { QUERY_SETTINGS_IMMUTABLE, SLOW_INTERVAL } from 'config/constants'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import groupBy from 'lodash/groupBy'
import keyBy from 'lodash/keyBy'
import { useEffect, useMemo, useState } from 'react'
import { publicClient } from 'utils/viem'
import { zeroAddress } from 'viem'
import { Address } from 'viem/accounts'

import { PoolInfo, StablePoolInfo, V2PoolInfo } from '../type'
import { farmPoolsAtom } from './atom'
import { fetchFarmPools, fetchPoolsTimeFrame, fetchV3PoolsStatusByChainId } from './fetcher'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type ArrayItemType<T> = T extends Array<infer U> ? U : T

export const useFarmPools = () => {
  const [pools, setPools] = useAtom(farmPoolsAtom)
  const [farmConfig, setFarmConfig] = useState<UniversalFarmConfig[]>([])

  const { isLoading } = useQuery({
    queryKey: ['fetchFarmPools'],
    queryFn: async ({ signal }) => {
      const data = await fetchFarmPools(undefined, signal)
      setPools(data)
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const fetchFarmConfig = async () => {
      const response: UniversalFarmConfig[] = await fetchAllUniversalFarms()
      setFarmConfig(response)
    }

    fetchFarmConfig()
  }, [])

  const { data: poolsStatus, pending: isPoolStatusPending } = useMultiChainV3PoolsStatus(farmConfig)
  const { data: poolsTimeFrame, pending: isPoolsTimeFramePending } = useMultiChainPoolsTimeFrame(farmConfig)

  const poolsWithStatus: ((PoolInfo | UniversalFarmConfig) & { isActiveFarm?: boolean })[] = useMemo(() => {
    const farms = pools.length ? pools : farmConfig
    return farms.map((f: PoolInfo | UniversalFarmConfig) => {
      if (f.protocol === Protocol.V3) {
        return {
          ...f,
          isActiveFarm: isPoolStatusPending ? true : poolsStatus[f.chainId]?.[f.lpAddress]?.[0] > 0,
        }
      }
      if (f.protocol === Protocol.V2 || f.protocol === Protocol.STABLE) {
        return {
          ...f,
          isActiveFarm: isPoolsTimeFramePending
            ? true
            : poolsTimeFrame[f.chainId]?.[f.lpAddress]?.startTimestamp <= dayjs().unix() &&
              poolsTimeFrame[f.chainId]?.[f.lpAddress]?.endTimestamp > dayjs().unix(),
        }
      }
      return f
    })
  }, [pools, farmConfig, isPoolStatusPending, poolsStatus, isPoolsTimeFramePending, poolsTimeFrame])

  return { loaded: !isLoading, data: poolsWithStatus }
}

export const useV3PoolsLength = (chainIds: number[]) => {
  const { data, isPending } = useQuery<{ [key: number]: number }, Error>({
    queryKey: ['useV3PoolsLength', chainIds?.join('-')],
    queryFn: async () => {
      const results = await Promise.all(
        chainIds.map(async (chainId) => {
          const masterChefAddress = masterChefV3Addresses[chainId]
          if (!masterChefAddress) {
            return { chainId, length: 0 }
          }
          const client = publicClient({ chainId })
          try {
            const poolLength = await client.readContract({
              address: masterChefAddress,
              abi: masterChefV3ABI,
              functionName: 'poolLength',
            })
            return { chainId, length: Number(poolLength) }
          } catch (error) {
            console.error(`Error fetching pool length for chainId ${chainId}:`, error)
            return { chainId, length: 0 }
          }
        }),
      )
      return results.reduce((acc, { chainId, length }) => {
        // eslint-disable-next-line no-param-reassign
        acc[chainId] = length
        return acc
      }, {} as { [key: number]: number })
    },
    enabled: chainIds?.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: SLOW_INTERVAL,
    staleTime: SLOW_INTERVAL,
  })

  return useMemo(
    () => ({
      data: data ?? {},
      pending: isPending,
    }),
    [data, isPending],
  )
}

export const useV2PoolsLength = (chainIds: number[]) => {
  const { data, isPending } = useQuery<{ [key: number]: number }, Error>({
    queryKey: ['useV2PoolsLength', chainIds?.join('-')],
    queryFn: async () => {
      const results = await Promise.all(
        chainIds.map(async (chainId) => {
          const masterChefAddress = masterChefAddresses[chainId]
          if (!masterChefAddress) {
            return { chainId, length: 0 }
          }
          const client = publicClient({ chainId })
          try {
            const poolLength = await client.readContract({
              address: masterChefAddress,
              abi: masterChefV2ABI,
              functionName: 'poolLength',
            })
            return { chainId, length: Number(poolLength) }
          } catch (error) {
            console.error(`Error fetching pool length for chainId ${chainId}:`, error)
            return { chainId, length: 0 }
          }
        }),
      )
      return results.reduce((acc, { chainId, length }) => {
        // eslint-disable-next-line no-param-reassign
        acc[chainId] = length
        return acc
      }, {} as { [key: number]: number })
    },
    enabled: chainIds?.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: SLOW_INTERVAL,
    staleTime: SLOW_INTERVAL,
  })

  return useMemo(
    () => ({
      data: data ?? {},
      pending: isPending,
    }),
    [data, isPending],
  )
}

type IPoolsStatusType = {
  [chainId: number]: {
    [lpAddress: Address]: ArrayItemType<UnwrapPromise<ReturnType<typeof fetchV3PoolsStatusByChainId>>>
  }
}

export const useMultiChainV3PoolsStatus = (pools: UniversalFarmConfig[]) => {
  const v3Pools = useMemo(() => pools.filter((p) => p.protocol === Protocol.V3), [pools])
  const poolsGroupByChains = useMemo(() => groupBy(v3Pools, 'chainId'), [v3Pools])
  const poolsEntries = useMemo(() => Object.entries(poolsGroupByChains), [poolsGroupByChains])

  const chainIds = useMemo(() => poolsEntries.map(([chainId]) => chainId).join(','), [poolsEntries])
  const lpAddresses = useMemo(
    () => poolsEntries.flatMap(([, poolList]) => poolList.map((p) => p.lpAddress)).join(','),
    [poolsEntries],
  )

  const { data, isPending } = useQuery<IPoolsStatusType, Error>({
    queryKey: ['useMultiChainV3PoolsStatus', chainIds, lpAddresses],
    queryFn: async () => {
      const results = await Promise.all(
        poolsEntries.map(async ([chainId, poolList]) => {
          if (!poolList.length) return { [chainId]: {} }
          try {
            const poolStatus = await fetchV3PoolsStatusByChainId(Number(chainId), poolList)
            return { [chainId]: keyBy(poolStatus ?? [], ([, lpAddress]) => lpAddress) }
          } catch (error) {
            console.error(`Error fetching pool status for chainId ${chainId}:`, error)
            return { [chainId]: {} }
          }
        }),
      )
      return results.reduce((acc, result) => ({ ...acc, ...result }), {} as IPoolsStatusType)
    },
    enabled: poolsEntries.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: SLOW_INTERVAL,
    staleTime: SLOW_INTERVAL,
  })

  return useMemo(
    () => ({
      data: data ?? {},
      pending: isPending,
    }),
    [data, isPending],
  )
}

export const useV3PoolStatus = (pool?: PoolInfo | null) => {
  const { data } = useQuery({
    queryKey: ['usePoolStatus', pool?.chainId, pool?.pid, pool?.protocol],
    queryFn: () => {
      return fetchV3PoolsStatusByChainId(pool!.chainId, [pool!])
    },
    enabled: !!pool?.chainId && !!pool?.pid,
    ...QUERY_SETTINGS_IMMUTABLE,
    refetchInterval: SLOW_INTERVAL,
    staleTime: SLOW_INTERVAL,
  })
  return useMemo(() => (data ? data[0] : []), [data])
}

export const usePoolTimeFrame = (bCakeWrapperAddress?: Address, chainId?: number) => {
  const { data } = useQuery({
    queryKey: ['usePoolTimeFrame', bCakeWrapperAddress, chainId],
    queryFn: () => {
      return fetchPoolsTimeFrame([bCakeWrapperAddress!], chainId!)
    },
    enabled: !!chainId && !!bCakeWrapperAddress && bCakeWrapperAddress !== zeroAddress,
    ...QUERY_SETTINGS_IMMUTABLE,
    refetchInterval: SLOW_INTERVAL,
    staleTime: SLOW_INTERVAL,
  })
  return useMemo(
    () =>
      data
        ? data[0]
        : {
            startTimestamp: 0,
            endTimestamp: 0,
          },
    [data],
  )
}

type IPoolsTimeFrameType = {
  [chainId: number]: { [lpAddress: Address]: ArrayItemType<UnwrapPromise<ReturnType<typeof fetchPoolsTimeFrame>>> }
}

export const useMultiChainPoolsTimeFrame = (pools: UniversalFarmConfig[]) => {
  const v2Pools = useMemo(
    () =>
      pools.filter((p) => p.protocol === Protocol.V2 || p.protocol === Protocol.STABLE) as Array<
        V2PoolInfo | StablePoolInfo
      >,
    [pools],
  )
  const poolsGroupByChains = useMemo(() => groupBy(v2Pools, 'chainId'), [v2Pools])
  const poolsEntries = useMemo(() => Object.entries(poolsGroupByChains), [poolsGroupByChains])

  const chainIds = useMemo(() => poolsEntries.map(([chainId]) => chainId).join(','), [poolsEntries])
  const lpAddresses = useMemo(
    () => poolsEntries.flatMap(([, poolList]) => poolList.map((p) => p.lpAddress)).join(','),
    [poolsEntries],
  )

  const { data, isPending } = useQuery<IPoolsTimeFrameType, Error>({
    queryKey: ['useMultiChainPoolTimeFrame', chainIds, lpAddresses],
    queryFn: async () => {
      const results = await Promise.all(
        poolsEntries.map(async ([chainId_, poolList]) => {
          const chainId = Number(chainId_)
          const bCakeAddresses = poolList.map(({ bCakeWrapperAddress }) => bCakeWrapperAddress ?? zeroAddress)
          if (bCakeAddresses.length === 0) return { [chainId]: {} }
          try {
            const timeFrameData = await fetchPoolsTimeFrame(bCakeAddresses, chainId)
            return timeFrameData ?? []
          } catch (error) {
            console.error(`Error fetching time frame data for chainId ${chainId}:`, error)
            return []
          }
        }),
      )
      return results.reduce((acc, result, idx) => {
        let dataIdx = 0
        return Object.assign(acc, {
          [poolsEntries[idx][0]]: keyBy(result, () => poolsEntries[idx][1][dataIdx++].lpAddress),
        })
      }, {} as IPoolsTimeFrameType)
    },
    enabled: poolsEntries.length > 0,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: SLOW_INTERVAL,
    staleTime: SLOW_INTERVAL,
  })

  return useMemo(
    () => ({
      data: data ?? {},
      pending: isPending,
    }),
    [data, isPending],
  )
}
