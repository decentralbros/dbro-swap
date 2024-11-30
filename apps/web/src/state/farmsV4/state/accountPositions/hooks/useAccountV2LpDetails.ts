import { ERC20Token } from '@pancakeswap/sdk'
import { useQuery } from '@tanstack/react-query'
import { SLOW_INTERVAL } from 'config/constants'
import { useOfficialsAndUserAddedTokensByChainIds } from 'hooks/Tokens'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { Address } from 'viem'
import { getAccountV2LpDetails, getTrackedV2LpTokens } from '../fetcher'
import { V2LPDetail } from '../type'
import { useLatestTxReceipt } from './useLatestTxReceipt'

export const useAccountV2LpDetails = (chainIds: number[], account?: Address | null) => {
  const tokens = useOfficialsAndUserAddedTokensByChainIds(chainIds)
  const userSavedPairs = useSelector<AppState, AppState['user']['pairs']>(({ user: { pairs } }) => pairs)
  const [lpTokensByChain, setLpTokensByChain] = useState<Record<number, [ERC20Token, ERC20Token][]> | null>(null)

  useEffect(() => {
    const fetchLpTokens = async () => {
      const result: Record<number, [ERC20Token, ERC20Token][]> = {}

      await Promise.all(
        chainIds.map(async (chainId) => {
          const lpTokens = await getTrackedV2LpTokens(chainId, tokens[chainId], userSavedPairs)
          if (lpTokens && lpTokens.length > 0) {
            result[chainId] = lpTokens
          }
        }),
      )

      setLpTokensByChain(result)
    }

    fetchLpTokens()
  }, [chainIds, tokens, userSavedPairs])

  const totalTokenPairCount = useMemo(() => {
    if (!lpTokensByChain) return 0

    return Object.values(lpTokensByChain).reduce((total, tokenPairs) => {
      return total + tokenPairs.length
    }, 0)
  }, [lpTokensByChain])

  const [latestTxReceipt] = useLatestTxReceipt()

  const { data, isFetching, isLoading } = useQuery<V2LPDetail[], Error>({
    queryKey: ['accountV2LpDetails', account, chainIds.join('-'), totalTokenPairCount, latestTxReceipt?.blockHash],
    queryFn: async () => {
      if (!account || !lpTokensByChain) return []
      const results = await Promise.all(
        Object.entries(lpTokensByChain).map(async ([chainId, lpTokens]) => {
          if (lpTokens.length === 0) return []
          try {
            const details = await getAccountV2LpDetails(Number(chainId), account, lpTokens)
            return details.filter((d) => d.nativeBalance.greaterThan('0') || d.farmingBalance.greaterThan('0'))
          } catch (error) {
            console.error(`Error fetching LP details for chainId ${chainId}:`, error)
            return []
          }
        }),
      )
      return results.flat()
    },
    enabled: Boolean(account && lpTokensByChain),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    // Prevents re-fetching while the data is still fresh
    staleTime: SLOW_INTERVAL,
  })

  return useMemo(
    () => ({
      data: data ?? [],
      pending: isLoading || isFetching,
    }),
    [data, isLoading, isFetching],
  )
}
