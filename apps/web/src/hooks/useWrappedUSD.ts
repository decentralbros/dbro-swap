import { useQuery } from '@tanstack/react-query'
import { formatUnits } from 'viem'
import qs from 'qs'
import { DBRO_API } from 'config/constants/endpoints'
import { ChainId } from '@pancakeswap/chains'
import { DBRO_CONTRACT } from 'config/constants/contracts'

interface WrappedValueParams {
  account: string | undefined
  requiredDBRO: bigint | unknown
  nftBalance: bigint | unknown
}

const fetchWrappedValue = async ({ account, requiredDBRO, nftBalance }: WrappedValueParams): Promise<string> => {
  if (!account || typeof requiredDBRO !== 'bigint' || typeof nftBalance !== 'bigint') {
    return '0.00'
  }

  const params = {
    chainId: ChainId.BASE,
    native: false,
    address: account,
    contract: DBRO_CONTRACT,
    decimals: 8,
  }

  try {
    const response = await fetch(`${DBRO_API}/balance/usd?${qs.stringify(params)}`)
    const usd = await response.json()

    if (usd) {
      const dbro = formatUnits(requiredDBRO, 8)
      return (Number(usd) * Number(dbro) * Number(nftBalance)).toFixed(2)
    }

    return '0.00'
  } catch {
    return '0.00'
  }
}

export function useWrappedUSD({ account, requiredDBRO, nftBalance }: WrappedValueParams) {
  const requiredDBROValue = requiredDBRO && typeof requiredDBRO === 'bigint' ? String(requiredDBRO) : undefined

  const nftBalanceValue = nftBalance && typeof nftBalance === 'bigint' ? Number(nftBalance) : undefined

  return useQuery({
    queryKey: ['wrapped-value', account, requiredDBROValue, nftBalanceValue],
    queryFn: () => fetchWrappedValue({ account, requiredDBRO, nftBalance }),
    enabled: Boolean(account && requiredDBRO && nftBalance),
    refetchInterval: 10000,
    staleTime: 5000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
