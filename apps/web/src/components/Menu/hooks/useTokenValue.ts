import { ChainId } from '@pancakeswap/chains'
import { useQuery } from '@tanstack/react-query'
import { DBRO_CONTRACT, REWARD_WALLET } from 'config/constants/contracts'
import { DBRO_API } from 'config/constants/endpoints'
import qs from 'qs'

const fetchAndCalculateUSDValue = async (): Promise<number> => {
  const params = {
    chainId: ChainId.BASE,
    native: false,
    address: REWARD_WALLET,
    contract: DBRO_CONTRACT,
    decimals: 8,
  }

  const response = await fetch(`${DBRO_API}/balance/usd?${qs.stringify(params)}`)
  const usd = await response.json()

  return Number(usd)
}

export function useTokenValue() {
  return useQuery({
    queryKey: ['token-value'],
    queryFn: () => fetchAndCalculateUSDValue(),
    refetchInterval: 60_000,
    staleTime: 30_000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
