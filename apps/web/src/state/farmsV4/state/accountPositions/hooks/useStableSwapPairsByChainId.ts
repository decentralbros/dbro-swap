import { ChainId } from '@pancakeswap/chains'
import { LegacyRouter } from '@pancakeswap/smart-router/legacy-router'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useStableSwapPairsByChainId = (chainId: ChainId) => {
  const { data } = useQuery({
    queryKey: ['fetch-stable-swap-pairs', chainId],
    queryFn: async () => {
      if (chainId) {
        const stableSwapPair = await LegacyRouter.getStableSwapPairs(chainId)
        return stableSwapPair
      }
      return []
    },
    enabled: Boolean(chainId),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

  const pairs = useMemo(() => data ?? [], [data])

  return pairs
}
