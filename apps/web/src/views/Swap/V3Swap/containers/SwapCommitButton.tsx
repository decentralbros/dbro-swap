import { ChainId, TradeType } from '@pancakeswap/sdk'
import { SmartRouterTrade } from '@pancakeswap/smart-router'
import { Currency, CurrencyAmount, Token } from '@pancakeswap/swap-sdk-core'
import { Box, Button, Dots, useModal } from '@pancakeswap/uikit'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { useTranslation } from '@pancakeswap/localization'
import { getUniversalRouterAddress } from '@pancakeswap/universal-router-sdk'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { sendTransaction, waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { CommitButton } from 'components/CommitButton'
import ConnectWalletButton from 'components/ConnectWalletButton'
import SettingsModal, { withCustomOnDismiss } from 'components/Menu/GlobalSettings/SettingsModal'
import { SettingsMode } from 'components/Menu/GlobalSettings/types'
import { useCurrency } from 'hooks/Tokens'
import { useIsTransactionUnsupported } from 'hooks/Trades'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import qs from 'qs'
import { Field } from 'state/swap/actions'
import { useSwapState } from 'state/swap/hooks'
import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useCurrencyBalances } from 'state/wallet/hooks'
import { config } from 'utils/wagmi'
import { useAccount, useChainId } from 'wagmi'
import { abi } from '../abi'
import { useSlippageAdjustedAmounts } from '../hooks'
import { useConfirmModalState } from '../hooks/useConfirmModalState'
import { useSwapCurrency } from '../hooks/useSwapCurrency'
import { useSwapValues } from '../hooks/useSwapValues'
import { CommitButtonProps } from '../types'
import { ConfirmSwapModal } from './ConfirmSwapModal'

const SettingsModalWithCustomDismiss = withCustomOnDismiss(SettingsModal)
const ZEROX_ADDRESS = '0x0000000000001fF3684f28c67538d4D072C22734'

interface SwapCommitButtonPropsType {
  trade?: SmartRouterTrade<TradeType>
  tradeError?: Error
  tradeLoading?: boolean
  // setLock: (lock: boolean) => void
}

const useSettingModal = (onDismiss) => {
  const [openSettingsModal] = useModal(
    <SettingsModalWithCustomDismiss customOnDismiss={onDismiss} mode={SettingsMode.SWAP_LIQUIDITY} />,
  )
  return openSettingsModal
}

const useSwapCurrencies = () => {
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId) as Currency
  const outputCurrency = useCurrency(outputCurrencyId) as Currency

  return { inputCurrency, outputCurrency }
}

const WrapCommitButtonReplace: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()
  const { inputCurrency, outputCurrency } = useSwapCurrencies()
  const { typedValue } = useSwapState()
  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(inputCurrency, outputCurrency, typedValue)
  const showWrap = wrapType !== WrapType.NOT_APPLICABLE

  if (!showWrap) return children

  return (
    <CommitButton width="100%" disabled={Boolean(wrapInputError)} onClick={onWrap}>
      {wrapInputError ?? (wrapType === WrapType.WRAP ? t('Wrap') : wrapType === WrapType.UNWRAP ? t('Unwrap') : null)}
    </CommitButton>
  )
}

const ConnectButtonReplace = ({ children }) => {
  const { address: account } = useAccount()

  if (!account) {
    return <ConnectWalletButton width="100%" />
  }
  return children
}

const UnsupportedSwapButtonReplace = ({ children }) => {
  const { t } = useTranslation()
  const { inputCurrency, outputCurrency } = useSwapCurrencies()
  const swapIsUnsupported = useIsTransactionUnsupported(inputCurrency, outputCurrency)

  if (swapIsUnsupported) {
    return (
      <Button width="100%" disabled>
        {t('Unsupported Asset')}
      </Button>
    )
  }
  return children
}

const SwapCommitButtonComp: React.FC<SwapCommitButtonPropsType & CommitButtonProps> = (props) => {
  return (
    <UnsupportedSwapButtonReplace>
      <ConnectButtonReplace>
        <WrapCommitButtonReplace>
          <SwapCommitButtonInner {...props} />
        </WrapCommitButtonReplace>
      </ConnectButtonReplace>
    </UnsupportedSwapButtonReplace>
  )
}

export const SwapCommitButton = memo(SwapCommitButtonComp)

const SwapCommitButtonInner = memo(function SwapCommitButtonInner({
  trade,
  tradeError,
  tradeLoading,
  beforeCommit,
  afterCommit,
}: SwapCommitButtonPropsType & CommitButtonProps) {
  const { address: account } = useAccount()
  const { t } = useTranslation()
  const chainId = useChainId()
  const [loadSwap, setLoadSwap] = useState<boolean>(false)

  // form data
  const { typedValue } = useSwapState()
  const [inputCurrency, outputCurrency] = useSwapCurrency()

  const slippageAdjustedAmounts = useSlippageAdjustedAmounts(trade)
  const amountToApprove = useMemo(
    () => (inputCurrency?.isNative ? undefined : slippageAdjustedAmounts[Field.INPUT]),
    [inputCurrency?.isNative, slippageAdjustedAmounts],
  )

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ])

  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  }

  // const swapInputError = useSwapInputError(trade, currencyBalances)
  const [tradeToConfirm, setTradeToConfirm] = useState<SmartRouterTrade<TradeType> | undefined>(undefined)
  const [indirectlyOpenConfirmModalState, setIndirectlyOpenConfirmModalState] = useState(false)

  const { callToAction, confirmState, txHash, confirmActions, errorMessage, resetState } = useConfirmModalState(
    tradeToConfirm,
    amountToApprove?.currency.isToken ? (amountToApprove as CurrencyAmount<Token>) : undefined,
    getUniversalRouterAddress(chainId),
  )

  const { onUserInput } = useSwapActionHandlers()
  const reset = useCallback(() => {
    afterCommit?.()

    onUserInput(Field.INPUT, '')
    onUserInput(Field.OUTPUT, '')

    resetState()
  }, [afterCommit, onUserInput, resetState])

  const handleAcceptChanges = useCallback(() => {
    setTradeToConfirm(trade)
  }, [trade])

  // const isValid = useMemo(() => !swapInputError && !tradeLoading, [swapInputError, tradeLoading])
  // const disabled = useMemo(() => !isValid, [isValid])

  const addTransaction = useTransactionAdder()

  const onConfirm = useCallback(() => {
    beforeCommit?.()
    callToAction()
  }, [beforeCommit, callToAction])

  // modals
  const onSettingModalDismiss = useCallback(() => {
    setIndirectlyOpenConfirmModalState(true)
  }, [])

  const openSettingModal = useSettingModal(onSettingModalDismiss)
  const [openConfirmSwapModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      txHash={txHash}
      confirmModalState={confirmState}
      pendingModalSteps={confirmActions ?? []}
      swapErrorMessage={errorMessage}
      currencyBalances={currencyBalances}
      onAcceptChanges={handleAcceptChanges}
      onConfirm={onConfirm}
      openSettingModal={openSettingModal}
      customOnDismiss={reset}
    />,
    true,
    true,
    'confirmSwapModal',
  )

  useEffect(() => {
    if (indirectlyOpenConfirmModalState) {
      setIndirectlyOpenConfirmModalState(false)
      openConfirmSwapModal()
    }
  }, [indirectlyOpenConfirmModalState, openConfirmSwapModal])

  const swapParams = useSwapValues()

  const handleSwap = async () => {
    if (!swapParams || !inputCurrency || !outputCurrency) {
      reset()
      setLoadSwap(false)

      return
    }

    try {
      setLoadSwap(true)

      if (!inputCurrency.isNative) {
        const hash: `0x${string}` = await writeContract(config, {
          abi,
          address: inputCurrency.address as `0x${string}`,
          functionName: 'approve',
          args: [ZEROX_ADDRESS as `0x${string}`, parseUnits(typedValue, inputCurrency.decimals)],
          chainId,
        })

        if (chainId !== ChainId.ETHEREUM) {
          await waitForTransactionReceipt(config, {
            confirmations: 4,
            hash,
            chainId,
          })
        }
      }

      const response = await fetch(`/api/swap?${qs.stringify(swapParams)}`)
      const quote = await response.json()
      const { transaction } = quote

      const tx: `0x${string}` = await sendTransaction(config, {
        account,
        to: transaction.to,
        data: transaction.data,
        gasPrice: BigInt(transaction.gasPrice * 5),
        value: transaction.value,
      })

      addTransaction({ hash: tx })

      reset()
      setLoadSwap(false)
    } catch {
      reset()
      setLoadSwap(false)
    }
  }

  return (
    <Box mt="0.25rem">
      <CommitButton
        id="swap-button"
        width="100%"
        data-dd-action-name="Swap commit button"
        variant={loadSwap ? 'danger' : 'primary'}
        disabled={loadSwap}
        onClick={handleSwap}
      >
        {(loadSwap && <Dots>{t('Swap')}</Dots>) || t('Swap')}
      </CommitButton>
    </Box>
  )
})
