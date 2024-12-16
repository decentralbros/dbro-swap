import { ChainId } from '@pancakeswap/chains'
import { useQuery } from '@tanstack/react-query'
import { DBRO_CONTRACT } from 'config/constants/contracts'
import { DBRO_API } from 'config/constants/endpoints'
import qs from 'qs'
import { formatUnits } from 'viem'

interface USDValues {
  poolValue: string
  walletValue: string
  wrappedValue: string
  claimValue: string
}

interface USDValuesParams {
  account: string | undefined
  contractTokens: bigint | unknown
  treasuryBalance: bigint | undefined
  dbroBalance: bigint | undefined
  useRequiredDBRO: bigint | undefined
}

const fetchAndCalculateUSDValues = async ({
  account,
  contractTokens,
  treasuryBalance,
  dbroBalance,
  useRequiredDBRO,
}: USDValuesParams): Promise<USDValues> => {
  if (!account) {
    return {
      poolValue: '0.00',
      walletValue: '0.00',
      wrappedValue: '0.00',
      claimValue: '0.00',
    }
  }

  const params = {
    chainId: ChainId.BASE,
    native: false,
    address: account,
    contract: DBRO_CONTRACT,
    decimals: 8,
  }

  const response = await fetch(`${DBRO_API}/balance/usd?${qs.stringify(params)}`)
  const usd = await response.json()

  const calculateValue = (balance: bigint | unknown | undefined) => {
    if (!usd || !balance || typeof balance !== 'bigint') return '0.00'
    const formatted = formatUnits(balance, 8)
    return (Number(usd) * Number(formatted)).toFixed(2)
  }

  return {
    poolValue: calculateValue(contractTokens),
    walletValue: calculateValue(treasuryBalance),
    wrappedValue: calculateValue(dbroBalance),
    claimValue: calculateValue(useRequiredDBRO),
  }
}

export function useStakingUSD({
  account,
  contractTokens,
  treasuryBalance,
  dbroBalance,
  useRequiredDBRO,
}: USDValuesParams) {
  return useQuery({
    queryKey: [
      'usd-values',
      account,
      String(contractTokens),
      String(treasuryBalance),
      String(dbroBalance),
      String(useRequiredDBRO),
    ],
    queryFn: () =>
      fetchAndCalculateUSDValues({
        account,
        contractTokens,
        treasuryBalance,
        dbroBalance,
        useRequiredDBRO,
      }),
    enabled: Boolean(account),
    refetchInterval: 10000,
    staleTime: 5000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
