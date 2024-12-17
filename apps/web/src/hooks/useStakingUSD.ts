import { ChainId } from '@pancakeswap/chains'
import { useQuery } from '@tanstack/react-query'
import { DBRO_CONTRACT, REWARD_WALLET } from 'config/constants/contracts'
import { DBRO_API } from 'config/constants/endpoints'
import qs from 'qs'
import { formatUnits } from 'viem'

interface USDValues {
  poolValue: string
  walletValue: string
  wrappedValue: string
  claimValue: string
  tokenValue: string
}

interface USDValuesParams {
  contractTokens: bigint | unknown
  treasuryBalance: bigint | unknown
  dbroBalance: bigint | unknown
  useRequiredDBRO: bigint | unknown
}

const fetchAndCalculateUSDValues = async ({
  contractTokens,
  treasuryBalance,
  dbroBalance,
  useRequiredDBRO,
}: USDValuesParams): Promise<USDValues> => {
  const params = {
    chainId: ChainId.BASE,
    native: false,
    address: REWARD_WALLET,
    contract: DBRO_CONTRACT,
    decimals: 8,
  }

  const response = await fetch(`${DBRO_API}/balance/usd?${qs.stringify(params)}`)
  const usd = await response.json()

  const calculateValue = (balance: bigint | unknown | undefined) => {
    if (!usd || !balance || typeof balance !== 'bigint') return '0.00'
    const formatted = formatUnits(balance, 8)
    return (Number(usd) * Number(formatted)).toFixed(0)
  }

  return {
    poolValue: calculateValue(contractTokens),
    walletValue: calculateValue(treasuryBalance),
    wrappedValue: calculateValue(dbroBalance),
    claimValue: calculateValue(useRequiredDBRO),
    tokenValue: usd.toFixed(4),
  }
}

export function useStakingUSD({ contractTokens, treasuryBalance, dbroBalance, useRequiredDBRO }: USDValuesParams) {
  return useQuery({
    queryKey: [
      'usd-values',
      String(contractTokens),
      String(treasuryBalance),
      String(dbroBalance),
      String(useRequiredDBRO),
    ],
    queryFn: () =>
      fetchAndCalculateUSDValues({
        contractTokens,
        treasuryBalance,
        dbroBalance,
        useRequiredDBRO,
      }),
    refetchInterval: 10000,
    staleTime: 5000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
