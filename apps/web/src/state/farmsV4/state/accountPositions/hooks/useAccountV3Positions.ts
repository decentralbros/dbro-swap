import { useQuery } from '@tanstack/react-query'
import { SLOW_INTERVAL } from 'config/constants'
import { useMemo } from 'react'
import { Address } from 'viem'
import { getAccountV3Positions } from '../fetcher/v3'
import { PositionDetail } from '../type'
import { useLatestTxReceipt } from './useLatestTxReceipt'

export const useAccountV3Positions = (chainIds: number[], account?: Address | null) => {
  const [latestTxReceipt] = useLatestTxReceipt()

  const { data, isPending } = useQuery<PositionDetail[], Error>({
    queryKey: ['accountV3Positions', account, chainIds.join('-'), latestTxReceipt?.blockHash],
    // @todo @ChefJerry add signal
    queryFn: async () => {
      if (!account) return []
      const results = await Promise.all(
        chainIds.map(async (chainId) => {
          try {
            const positions = await getAccountV3Positions(chainId, account)
            return positions ?? []
          } catch (error) {
            console.error(`Error fetching V3 positions for chainId ${chainId}:`, error)
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
