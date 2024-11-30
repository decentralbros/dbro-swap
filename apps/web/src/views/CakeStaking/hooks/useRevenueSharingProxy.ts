import { ONE_WEEK_DEFAULT } from '@pancakeswap/pools'
import { useQuery } from '@tanstack/react-query'
import BigNumber from 'bignumber.js'
import useAccountActiveChain from 'hooks/useAccountActiveChain'
import { useInitialBlockTimestamp } from 'state/block/hooks'
import { publicClient } from 'utils/wagmi'
import { useRevenueSharingCakePoolContract, useRevenueSharingVeCakeContract } from '../../../hooks/useContract'
import { useCurrentBlockTimestamp } from './useCurrentBlockTimestamp'

interface RevenueSharingPool {
  balanceOfAt: string
  totalSupplyAt: string
  nextDistributionTimestamp: number
  lastDistributionTimestamp: number
  availableClaim: string
}

const initialData: RevenueSharingPool = {
  balanceOfAt: '0',
  totalSupplyAt: '0',
  nextDistributionTimestamp: 0,
  lastDistributionTimestamp: 0,
  availableClaim: '0',
}

export const useRevenueSharingProxy = (
  contract: ReturnType<typeof useRevenueSharingCakePoolContract | typeof useRevenueSharingVeCakeContract>,
) => {
  const { account, chainId } = useAccountActiveChain()
  const blockTimestamp = useInitialBlockTimestamp()
  const currentBlockTimestamp = useCurrentBlockTimestamp()

  const { data } = useQuery({
    queryKey: ['/revenue-sharing-pool-for-cake', contract.address, contract.chain?.id, account],
    queryFn: async () => {
      if (!account) return undefined
      try {
        const now = Math.floor(blockTimestamp / ONE_WEEK_DEFAULT) * ONE_WEEK_DEFAULT
        const lastDistributionTimestamp = Math.floor(currentBlockTimestamp / ONE_WEEK_DEFAULT) * ONE_WEEK_DEFAULT
        const nextDistributionTimestamp = new BigNumber(lastDistributionTimestamp).plus(ONE_WEEK_DEFAULT).toNumber()

        const revenueCalls = [
          {
            ...contract,
            functionName: 'balanceOfAt',
            args: [account, now],
          },
          {
            ...contract,
            functionName: 'totalSupplyAt',
            args: [now],
          },
        ]

        const client = publicClient({ chainId })
        const [revenueResult, claimResult] = await Promise.all([
          client.multicall({
            contracts: revenueCalls,
            allowFailure: false,
          }),
          contract.simulate.claim([account]),
        ])

        return {
          balanceOfAt: (revenueResult[0] as any).toString(),
          totalSupplyAt: (revenueResult[1] as any).toString(),
          nextDistributionTimestamp,
          lastDistributionTimestamp,
          availableClaim: claimResult.result.toString(),
        }
      } catch (error) {
        console.error('[ERROR] Fetching Revenue Sharing Pool', error)
        throw error
      }
    },
    enabled: Boolean(blockTimestamp && account),
  })

  return data ?? initialData
}

export const useRevenueSharingCakePool = () => {
  const contract = useRevenueSharingCakePoolContract()
  return useRevenueSharingProxy(contract)
}

export const useRevenueSharingVeCake = () => {
  const contract = useRevenueSharingVeCakeContract()
  return useRevenueSharingProxy(contract)
}
