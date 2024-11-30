import { ChainId } from '@pancakeswap/chains'
import {
  defineFarmV3ConfigsFromUniversalFarm,
  fetchUniversalFarms,
  Protocol,
  UniversalFarmConfigV3,
} from '@pancakeswap/farms'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useV3FarmAPI = (chainId: ChainId) => {
  const { data } = useQuery({
    queryKey: ['fetch-v3-farm-api'],
    queryFn: async () => {
      if (chainId) {
        const farmsV3 = await fetchUniversalFarms(chainId, Protocol.V3)
        return defineFarmV3ConfigsFromUniversalFarm(farmsV3 as UniversalFarmConfigV3[])
      }
      return []
    },
    enabled: Boolean(chainId),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

  const farms = useMemo(() => data ?? [], [data])

  return {
    farms,
  }
}
