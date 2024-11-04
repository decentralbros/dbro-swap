import { useQuery } from '@tanstack/react-query'
import { publicClient } from 'utils/viem'
import { Address } from 'viem'
import { useChainId } from 'wagmi'

export const useIsSmartContract = (address?: Address): boolean => {
  const chainId = useChainId()

  const { data = false } = useQuery({
    queryKey: ['useIsSmartContract', chainId, address],
    queryFn: async () => {
      if (!address) return false

      const client = publicClient({ chainId })

      if (!client) return false

      try {
        const code = await client.getBytecode({ address })
        return Boolean(code && code !== '0x')
      } catch {
        return false
      }
    },
    enabled: !!address,
  })

  return data
}
