import { LegacyRouter } from '@pancakeswap/smart-router/legacy-router'
import { useQuery } from '@tanstack/react-query'
import { SLOW_INTERVAL } from 'config/constants'
import { useMemo } from 'react'
import { Address } from 'viem'
import { getStablePairDetails } from '../fetcher'
import { StableLPDetail } from '../type'
import { useLatestTxReceipt } from './useLatestTxReceipt'

export const useAccountStableLpDetails = (chainIds: number[], account?: Address | null) => {
  const [latestTxReceipt] = useLatestTxReceipt()

  const { data, isPending } = useQuery<StableLPDetail[], Error>({
    queryKey: ['accountStableLpBalance', account, chainIds.join(','), latestTxReceipt?.blockHash],
    // @todo @ChefJerry add signal
    queryFn: async () => {
      if (!account) return []
      const results = await Promise.all(
        chainIds.map(async (chainId) => {
          const stablePairs = await LegacyRouter.getStableSwapPairs(chainId)
          if (!stablePairs || stablePairs.length === 0) return []
          try {
            const details = await getStablePairDetails(chainId, account, stablePairs)
            return details.filter((d) => d.nativeBalance.greaterThan('0') || d.farmingBalance.greaterThan('0'))
          } catch (error) {
            console.error(`Error fetching details for chainId ${chainId}:`, error)
            return []
          }
        }),
      )
      return results.flat()
    },
    enabled: Boolean(account),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: SLOW_INTERVAL,
    // Prevents re-fetching while the data is still fresh
    staleTime: SLOW_INTERVAL,
  })

  return useMemo(
    () => ({
      data: data ?? [],
      pending: isPending,
    }),
    [data, isPending],
  )
}
