import { Dispatch } from '@reduxjs/toolkit'
import { PREDICTION_TOOLTIP_DISMISS_KEY } from 'config/constants'
import { resetUserState, toggleFarmTransactionModal } from 'state/global/actions'
import getLocalStorageItemKeys from './getLocalStorageItemKeys'
import { LS_ORDERS } from './localStorageOrders'

export const clearUserStates = (
  dispatch: Dispatch<any>,
  {
    chainId,
    newChainId,
  }: {
    chainId?: number
    newChainId?: number
  },
) => {
  if (chainId) {
    dispatch(resetUserState({ chainId, newChainId }))
  }
  dispatch(toggleFarmTransactionModal({ showModal: false }))
  const lsOrderKeys = getLocalStorageItemKeys(LS_ORDERS)
  lsOrderKeys.forEach((lsOrderKey) => window?.localStorage?.removeItem(lsOrderKey))
  window?.localStorage?.removeItem(PREDICTION_TOOLTIP_DISMISS_KEY)
}
