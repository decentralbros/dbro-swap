import { Gauge } from '@pancakeswap/gauges'
import { useQuery } from '@tanstack/react-query'
import { getPositionManagerName } from 'views/GaugesVoting/utils'
import { fetchPositionManager } from '@pancakeswap/position-managers'

export const usePositionManagerName = (data: Gauge) => {
  const { data: chainPositionManagers } = useQuery({
    queryKey: ['position-managers-chain', data?.chainId],
    queryFn: async ({ signal }) => fetchPositionManager(data?.chainId, signal),
    enabled: Boolean(data),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

  const { data: managerName } = useQuery({
    queryKey: ['position-manager-name', data?.hash],
    queryFn: async ({ signal }) => getPositionManagerName(data, chainPositionManagers, signal),
    enabled: Boolean(data && chainPositionManagers),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

  return {
    managerName: managerName ?? '',
  }
}
