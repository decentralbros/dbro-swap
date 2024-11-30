import { useCallback } from 'react'
import { useAccount } from 'wagmi'
import { MaxUint256 } from '@pancakeswap/swap-sdk-core'
import { useAppDispatch } from 'state'
import { updateUserAllowance } from 'state/actions'
import { VaultKey } from 'state/types'
import { useTranslation } from '@pancakeswap/localization'
import { useERC20, useSousChef, useVaultPoolContract } from 'hooks/useContract'
import { useToast } from '@pancakeswap/uikit'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCakeApprovalStatus from 'hooks/useCakeApprovalStatus'
import useCakeApprove from 'hooks/useCakeApprove'
import { useActiveChainId } from 'hooks/useActiveChainId'

export const useApprovePool = (lpContract: ReturnType<typeof useERC20>, sousId: any, earningTokenSymbol: any) => {
  const { toastSuccess } = useToast()
  const { chainId } = useActiveChainId()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { address: account } = useAccount()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {}, [])

  return { handleApprove, pendingTx }
}

// Approve CAKE auto pool
export const useVaultApprove = (vaultKey: VaultKey | undefined, setLastUpdated: () => void) => {
  const vaultPoolContract = useVaultPoolContract(vaultKey)
  const { t } = useTranslation()

  return useCakeApprove(
    setLastUpdated,
    vaultPoolContract?.address,
    t('You can now stake in the %symbol% vault!', { symbol: 'CAKE' }),
  )
}

export const useCheckVaultApprovalStatus = (vaultKey?: VaultKey) => {
  const vaultPoolContract = useVaultPoolContract(vaultKey)

  return useCakeApprovalStatus(vaultPoolContract?.address)
}
