import { useTranslation } from '@pancakeswap/localization'
import { Currency, CurrencyAmount, Percent } from '@pancakeswap/sdk'
import { formatAmount } from '@pancakeswap/utils/formatFractions'
import replaceBrowserHistory from '@pancakeswap/utils/replaceBrowserHistory'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { CommonBasesType } from 'components/SearchModal/types'
import { useCurrency } from 'hooks/Tokens'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useSwapState } from 'state/swap/hooks'
import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'
import { useCurrencyBalances } from 'state/wallet/hooks'
import { currencyId } from 'utils/currencyId'
import { maxAmountSpend } from 'utils/maxAmountSpend'

import { Flex, Text } from '@pancakeswap/uikit'
import { ISLANDSWAP_API } from 'config/constants/endpoints'
import qs from 'qs'
import { useAccount, useChainId } from 'wagmi'
import useWarningImport from '../../hooks/useWarningImport'
import { FormContainer } from '../components'
import { useIsWrapping } from '../hooks'
import { useSwapValues } from '../hooks/useSwapValues'
import { FlipButton } from './FlipButton'
import { Recipient } from './Recipient'

interface Props {
  inputAmount?: CurrencyAmount<Currency>
  outputAmount?: CurrencyAmount<Currency>
  tradeLoading?: boolean
  pricingAndSlippage?: ReactNode
  swapCommitButton?: ReactNode
}

export function FormMain({ pricingAndSlippage, inputAmount, outputAmount, tradeLoading, swapCommitButton }: Props) {
  const { address: account } = useAccount()
  const { t } = useTranslation()
  const warningSwapHandler = useWarningImport()
  const {
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const isWrapping = useIsWrapping()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)
  const { onCurrencySelection, onUserInput } = useSwapActionHandlers()
  const [inputBalance] = useCurrencyBalances(account, [inputCurrency, outputCurrency])
  const maxAmountInput = useMemo(() => maxAmountSpend(inputBalance), [inputBalance])
  const loadedUrlParams = useDefaultsFromURLSearch()
  const handleTypeInput = useCallback((value: string) => onUserInput(Field.INPUT, value), [onUserInput])
  const handleTypeOutput = useCallback((value: string) => onUserInput(Field.OUTPUT, value), [onUserInput])

  const handlePercentInput = useCallback(
    (percent: number) => {
      if (maxAmountInput) {
        onUserInput(Field.INPUT, maxAmountInput.multiply(new Percent(percent, 100)).toExact())
      }
    },
    [maxAmountInput, onUserInput],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const handleCurrencySelect = useCallback(
    (
      newCurrency: Currency,
      field: Field,
      currentInputCurrencyId: string | undefined,
      currentOutputCurrencyId: string | undefined,
    ) => {
      onCurrencySelection(field, newCurrency)

      warningSwapHandler(newCurrency)

      const isInput = field === Field.INPUT
      const oldCurrencyId = isInput ? currentInputCurrencyId : currentOutputCurrencyId
      const otherCurrencyId = isInput ? currentOutputCurrencyId : currentInputCurrencyId
      const newCurrencyId = currencyId(newCurrency)
      if (newCurrencyId === otherCurrencyId) {
        replaceBrowserHistory(isInput ? 'outputCurrency' : 'inputCurrency', oldCurrencyId)
      }
      replaceBrowserHistory(isInput ? 'inputCurrency' : 'outputCurrency', newCurrencyId)
    },
    [onCurrencySelection, warningSwapHandler],
  )
  const handleInputSelect = useCallback(
    (newCurrency: Currency) =>
      handleCurrencySelect(newCurrency, Field.INPUT, inputCurrencyId || '', outputCurrencyId || ''),
    [handleCurrencySelect, inputCurrencyId, outputCurrencyId],
  )
  const handleOutputSelect = useCallback(
    (newCurrency: Currency) =>
      handleCurrencySelect(newCurrency, Field.OUTPUT, inputCurrencyId || '', outputCurrencyId || ''),
    [handleCurrencySelect, inputCurrencyId, outputCurrencyId],
  )

  const isTypingInput = independentField === Field.INPUT

  const inputValue = useMemo(
    () => typedValue && (isTypingInput ? typedValue : formatAmount(inputAmount) || ''),
    [typedValue, isTypingInput, inputAmount],
  )

  // const outputValue = useMemo(() => {
  //   return typedValue && (isTypingInput ? estimate : typedValue)
  // }, [typedValue, isTypingInput, estimate])

  const chainId = useChainId()
  const swapParams = useSwapValues()
  const [estimate, setEstimate] = useState<string>('')
  const [inputUSD, setInputUSD] = useState<string>('0.00')
  const [outputUSD, setOutputUSD] = useState<string>('0.00')

  const fetchOutputUSD = async (buyAmount: number) => {
    if (!inputCurrency || !outputCurrency || !swapParams) return

    try {
      const params = {
        chainId,
        address: account,
        native: outputCurrency.isNative,
        contract: swapParams.buyToken,
        decimals: outputCurrency.decimals,
      }

      const response = await fetch(`${ISLANDSWAP_API}/balance/usd?${qs.stringify(params)}`)
      const usd = await response.json()
      if (Number(usd) && estimate) {
        setOutputUSD((Number(usd) * buyAmount).toFixed(2))
      }
    } catch {
      setOutputUSD('0.00')
    }
  }

  const estimateOutput = async () => {
    try {
      const response = await fetch(`/api/quote?${qs.stringify(swapParams)}`)
      const quote = await response.json()

      if (quote.buyAmount && outputCurrency?.decimals) {
        const buyAmount = quote.buyAmount / 10 ** outputCurrency.decimals
        setEstimate(String(buyAmount))
        fetchOutputUSD(buyAmount)
      }
    } catch {
      setEstimate('')
      setInputUSD('0.00')
    }
  }

  const fetchInputUSD = async () => {
    if (!inputCurrency || !swapParams) return

    try {
      const params = {
        chainId,
        address: account,
        native: inputCurrency.isNative,
        contract: swapParams.sellToken,
        decimals: inputCurrency.decimals,
      }

      const response = await fetch(`${ISLANDSWAP_API}/balance/usd?${qs.stringify(params)}`)
      const usd = await response.json()
      const value = isWrapping ? Number(typedValue) : Number(inputValue)

      if (usd && value) {
        setInputUSD((Number(usd) * value).toFixed(2))
      }
    } catch {
      setInputUSD('0.00')
    }
  }

  useEffect(() => {
    if (parseFloat(typedValue) > 0) {
      fetchInputUSD()
      estimateOutput()
    } else {
      setEstimate('')
    }
    // eslint-disable-next-line
  }, [typedValue])

  const inputLoading = typedValue ? !isTypingInput && tradeLoading : false
  const outputLoading = typedValue ? isTypingInput && tradeLoading : false

  return (
    <FormContainer>
      <Flex width="100%" alignItems="center" justifyContent="space-between" flexDirection="column">
        <Flex flexDirection="column" alignItems="flex-start" width="100%" marginBottom={15}>
          <Text fontWeight="bold">{t('Swap')}</Text>
        </Flex>
      </Flex>
      <CurrencyInputPanel
        id="swap-currency-input"
        showUSDPrice
        usdValue={inputUSD}
        showMaxButton
        showCommonBases
        inputLoading={!isWrapping && inputLoading}
        currencyLoading={!loadedUrlParams}
        label={!isTypingInput && !isWrapping ? t('From (estimated)') : t('From')}
        value={isWrapping ? typedValue : inputValue}
        maxAmount={maxAmountInput}
        showQuickInputButton
        currency={inputCurrency}
        onUserInput={handleTypeInput}
        onPercentInput={handlePercentInput}
        onMax={handleMaxInput}
        onCurrencySelect={handleInputSelect}
        otherCurrency={outputCurrency}
        commonBasesType={CommonBasesType.SWAP_LIMITORDER}
      />
      {/* <RiskCheck currency={inputCurrency ?? undefined} /> */}
      <FlipButton />
      <CurrencyInputPanel
        id="swap-currency-output"
        disabled
        showUSDPrice
        usdValue={outputUSD}
        showCommonBases
        showMaxButton={false}
        inputLoading={!isWrapping && outputLoading}
        currencyLoading={!loadedUrlParams}
        label={isTypingInput && !isWrapping ? t('To (estimated)') : t('To')}
        value={isWrapping ? typedValue : Number(estimate).toFixed(6)}
        currency={outputCurrency}
        onUserInput={handleTypeOutput}
        onCurrencySelect={handleOutputSelect}
        otherCurrency={outputCurrency}
        commonBasesType={CommonBasesType.SWAP_LIMITORDER}
      />
      {/* <RiskCheck currency={outputCurrency ?? undefined} /> */}
      <Recipient />
      {pricingAndSlippage}
      {swapCommitButton}
    </FormContainer>
  )
}
