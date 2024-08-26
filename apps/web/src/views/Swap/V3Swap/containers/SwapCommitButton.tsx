import { TradeType } from '@pancakeswap/sdk'
import { SmartRouterTrade } from '@pancakeswap/smart-router'
import { Currency, CurrencyAmount, Token } from '@pancakeswap/swap-sdk-core'
import { Box, Button, Dots, useModal } from '@pancakeswap/uikit'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { useTranslation } from '@pancakeswap/localization'
import { getUniversalRouterAddress } from '@pancakeswap/universal-router-sdk'
import { useUserSlippage } from '@pancakeswap/utils/user'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { ConfirmModalState } from '@pancakeswap/widgets-internal'
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
import { useSlippageAdjustedAmounts, useSwapInputError } from '../hooks'
import { useConfirmModalState } from '../hooks/useConfirmModalState'
import { useSwapCurrency } from '../hooks/useSwapCurrency'
import { CommitButtonProps } from '../types'
import { ConfirmSwapModal } from './ConfirmSwapModal'

const ZEROX_ADDRESS = '0xDef1C0ded9bec7F1a1670819833240f027b25EfF'
const SettingsModalWithCustomDismiss = withCustomOnDismiss(SettingsModal)

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
  const [allowedSlippage] = useUserSlippage()
  const [loadSwap, setLoadSwap] = useState<boolean>(false)

  // form data
  const { independentField, typedValue } = useSwapState()
  const [inputCurrency, outputCurrency] = useSwapCurrency()

  const slippageAdjustedAmounts = useSlippageAdjustedAmounts(trade)
  const amountToApprove = useMemo(
    () => (inputCurrency?.isNative ? undefined : slippageAdjustedAmounts[Field.INPUT]),
    [inputCurrency?.isNative, slippageAdjustedAmounts],
  )
  // const tradePriceBreakdown = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  // warnings on slippage
  // const priceImpactSeverity = warningSeverity(
  //   tradePriceBreakdown ? tradePriceBreakdown.priceImpactWithoutFee : undefined,
  // )

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputCurrency ?? undefined,
  ])

  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  }
  // const parsedAmounts = useParsedAmounts(trade, currencyBalances, false)
  // const parsedIndependentFieldAmount = parsedAmounts[independentField]
  const swapInputError = useSwapInputError(trade, currencyBalances)
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
    if (confirmState === ConfirmModalState.COMPLETED) {
      onUserInput(Field.INPUT, '')
    }
    resetState()
  }, [afterCommit, confirmState, onUserInput, resetState])

  const handleAcceptChanges = useCallback(() => {
    setTradeToConfirm(trade)
  }, [trade])

  const isValid = useMemo(() => !swapInputError && !tradeLoading, [swapInputError, tradeLoading])
  const disabled = useMemo(() => !isValid, [isValid])

  // const userHasSpecifiedInputOutput = Boolean(
  //   inputCurrency && outputCurrency && parsedIndependentFieldAmount?.greaterThan(BIG_INT_ZERO),
  // )

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

  const handleSwap = async () => {
    if (!currencyBalances || !inputCurrency || !outputCurrency) {
      reset()
      return
    }

    try {
      setLoadSwap(true)

      if (!inputCurrency.isNative) {
        const hash = await writeContract(config, {
          abi,
          address: inputCurrency.address as `0x${string}`, // contract
          functionName: 'approve',
          args: [
            ZEROX_ADDRESS as `0x${string}`, // spender
            parseUnits(typedValue, inputCurrency.decimals),
          ],
          chainId,
        })

        await waitForTransactionReceipt(config, {
          confirmations: 2,
          hash: hash as `0x${string}`,
          chainId,
        })
      }

      let chain: string = ''

      switch (chainId) {
        case 42161:
          chain = 'arb'
          break
        case 8453:
          chain = 'base'
          break
        case 56:
          chain = 'bsc'
          break
        case 1:
          chain = 'eth'
          break
        case 11155111:
          chain = 'sep'
          break

        default:
          break
      }

      let sellToken: string = !inputCurrency.isNative ? inputCurrency.address : ''

      if (inputCurrency.isNative) {
        sellToken =
          inputCurrency.chainId !== 56
            ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
            : '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
      }

      let buyToken: string = !outputCurrency.isNative ? outputCurrency.address : ''

      if (outputCurrency.isNative) {
        buyToken =
          inputCurrency.chainId !== 56
            ? '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
            : '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
      }

      const sellAmount = parseUnits(typedValue, inputCurrency.decimals)
      const params = {
        chainId,
        sellToken,
        buyToken,
        sellAmount,
        taker: account as string,
        slippagePercentage: allowedSlippage / 100,
        buyTokenPercentageFee: 0.01, // 1%
        feeRecipient: '0x245844966b90e81EBB0CcF318cB395Bc9b585be9',
      }

      const response = await fetch(`/api/swap-${chain}?${qs.stringify(params)}`)
      const quote = await response.json()

      const tx = await sendTransaction(config, {
        account,
        chainId: quote.chainId,
        gasPrice: BigInt(quote.gasPrice * 2),
        to: quote.to,
        value: quote.value,
        data: quote.data,
      })

      addTransaction({ hash: tx as string })

      await waitForTransactionReceipt(config, {
        confirmations: 2,
        hash: tx as `0x${string}`,
        chainId,
      })

      reset()
      setLoadSwap(false)
    } catch (error) {
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
        variant={isValid ? 'danger' : 'primary'}
        disabled={loadSwap}
        onClick={handleSwap}
      >
        {(loadSwap && <Dots>{t('Swap')}</Dots>) || t('Swap')}
      </CommitButton>
    </Box>
  )
})
