import { useTranslation } from '@pancakeswap/localization'
import { Currency, CurrencyAmount, Pair, Percent, Token } from '@pancakeswap/sdk'
import { WrappedTokenInfo } from '@pancakeswap/token-lists'
import { ArrowDropDownIcon, Button, CopyButton, Flex, Skeleton, Text, useModal } from '@pancakeswap/uikit'
import { CurrencyLogo, DoubleCurrencyLogo, Swap as SwapUI } from '@pancakeswap/widgets-internal'
import { DBRO_API } from 'config/constants/endpoints'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { safeGetAddress } from 'utils'

import { StablePair } from 'views/AddLiquidity/AddStableLiquidity/hooks/useStableLPDerivedMintInfo'

import { FiatLogo } from 'components/Logo/CurrencyLogo'
import qs from 'qs'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useAccount } from 'wagmi'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'

import AddToWalletButton from '../AddToWallet/AddToWalletButton'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-end;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0px;
`

interface CurrencyInputPanelProps {
  value: string | undefined
  usdValue: string | undefined
  onUserInput: (value: string) => void
  onInputBlur?: () => void
  onPercentInput?: (percent: number) => void
  onMax?: () => void
  showQuickInputButton?: boolean
  showMaxButton: boolean
  maxAmount?: CurrencyAmount<Currency>
  lpPercent?: string
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | StablePair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  commonBasesType?: string
  showSearchInput?: boolean
  beforeButton?: React.ReactNode
  disabled?: boolean
  error?: boolean | string
  showUSDPrice?: boolean
  tokensToShow?: Token[]
  currencyLoading?: boolean
  inputLoading?: boolean
  title?: React.ReactNode
  hideBalanceComp?: boolean
}

interface Balance {
  address: string
  chainId: number
  native: boolean
  contract?: string
  decimals?: number
}

const CurrencyInputPanel = memo(function CurrencyInputPanel({
  value,
  usdValue = '0.00',
  onUserInput,
  onInputBlur,
  onPercentInput,
  onMax,
  showQuickInputButton = false,
  showMaxButton,
  maxAmount,
  lpPercent,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  beforeButton,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
  commonBasesType,
  showSearchInput,
  disabled = false,
  error,
  showUSDPrice,
  tokensToShow,
  currencyLoading,
  inputLoading,
  title,
  hideBalanceComp,
}: CurrencyInputPanelProps) {
  const { address: account } = useAccount()

  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const mode = id
  const token = pair ? pair.liquidityToken : currency?.isToken ? currency : null
  const tokenAddress = token ? safeGetAddress(token.address) : null

  // const amountInDollar = useStablecoinPriceAmount(
  //   showUSDPrice ? currency ?? undefined : undefined,
  //   value !== undefined && Number.isFinite(+value) ? +value : undefined,
  //   {
  //     hideIfPriceImpactTooHigh: true,
  //     enabled: Boolean(value !== undefined && Number.isFinite(+value)),
  //   },
  // )

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
      commonBasesType={commonBasesType}
      showSearchInput={showSearchInput}
      tokensToShow={tokensToShow}
      mode={mode}
    />,
  )

  const percentAmount = useMemo(
    () => ({
      25: maxAmount ? maxAmount.multiply(new Percent(25, 100)).toExact() : undefined,
      50: maxAmount ? maxAmount.multiply(new Percent(50, 100)).toExact() : undefined,
      75: maxAmount ? maxAmount.multiply(new Percent(75, 100)).toExact() : undefined,
    }),
    [maxAmount],
  )

  const handleUserInput = useCallback(
    (val: string) => {
      onUserInput(val)
    },
    [onUserInput],
  )

  const onCurrencySelectClick = useCallback(() => {
    if (!disableCurrencySelect) {
      onPresentCurrencyModal()
    }
  }, [onPresentCurrencyModal, disableCurrencySelect])

  const isAtPercentMax = (maxAmount && value === maxAmount.toExact()) || (lpPercent && lpPercent === '100')

  const [balance, setBalance] = useState<string | undefined>(undefined)

  const fetchBalance = useCallback(async () => {
    if (!currency || !account) {
      return
    }

    try {
      let params: Balance

      if (!currency.isNative) {
        params = {
          address: account,
          chainId: currency.chainId,
          native: false,
          contract: currency.address,
          decimals: currency.decimals,
        }
      } else {
        params = { address: account, chainId: currency.chainId, native: true }
      }

      const response = await fetch(`${DBRO_API}/balance/token?${qs.stringify(params)}`)
      const data = await response.json()

      setBalance(data.toFixed(3))
    } catch {
      setBalance('0.00')
    }
  }, [account, currency])

  useEffect(() => {
    if (!hideBalance && !!currency) {
      fetchBalance()
    }
    // eslint-disable-next-line
  }, [account, currency, hideBalance, currency])

  return (
    <SwapUI.CurrencyInputPanel
      id={id}
      disabled={disabled}
      error={error as boolean}
      value={value}
      onInputBlur={onInputBlur}
      onUserInput={handleUserInput}
      loading={inputLoading}
      top={
        <>
          {title}
          <Flex alignItems="center">
            {beforeButton}
            <CurrencySelectButton
              className="open-currency-select-button"
              data-dd-action-name="Select currency"
              selected={!!currency}
              onClick={onCurrencySelectClick}
              marginBottom="8px"
            >
              <Flex alignItems="center" justifyContent="space-between">
                {pair ? (
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
                ) : currency ? (
                  id === 'onramp-input' ? (
                    <FiatLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                  ) : (
                    <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                  )
                ) : currencyLoading ? (
                  <Skeleton width="24px" height="24px" variant="circle" />
                ) : null}
                {currencyLoading ? null : pair ? (
                  <Text id="pair" bold>
                    {pair?.token0.symbol}:{pair?.token1.symbol}
                  </Text>
                ) : (
                  <Text id="pair" bold>
                    {(currency && currency.symbol && currency.symbol.length > 10
                      ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                          currency.symbol.length - 5,
                          currency.symbol.length,
                        )}`
                      : currency?.symbol) || t('Select a currency')}
                  </Text>
                )}
                {!currencyLoading && !disableCurrencySelect && <ArrowDropDownIcon />}
              </Flex>
            </CurrencySelectButton>
            {token && tokenAddress ? (
              <Flex style={{ gap: '4px' }} ml="4px" alignItems="center">
                <CopyButton
                  data-dd-action-name="Copy token address"
                  width="16px"
                  buttonColor="textSubtle"
                  text={tokenAddress}
                  tooltipMessage={t('Token address copied')}
                />
                <AddToWalletButton
                  data-dd-action-name="Add to wallet"
                  variant="text"
                  p="0"
                  height="auto"
                  width="fit-content"
                  tokenAddress={tokenAddress}
                  tokenSymbol={token.symbol}
                  tokenDecimals={token.decimals}
                  tokenLogo={token instanceof WrappedTokenInfo ? token.logoURI : undefined}
                />
              </Flex>
            ) : null}
          </Flex>

          {account && !hideBalanceComp && (
            <Text
              data-dd-action-name="Token balance"
              onClick={!disabled ? onMax : undefined}
              color="textSubtle"
              fontSize="12px"
              ellipsis
              title={!hideBalance && !!currency ? t('Balance: %balance%', { balance: balance ?? t('Loading') }) : ' -'}
              style={{ display: 'inline', cursor: 'pointer' }}
            >
              {t('Balance: %balance%', { balance: balance ?? t('Loading') })}
            </Text>
          )}
        </>
      }
      bottom={
        <>
          {showUSDPrice && (
            <Flex justifyContent="flex-end" mr="1rem">
              <Flex maxWidth="200px">
                {usdValue && (
                  <Text fontSize="12px" color="textSubtle" style={{ zIndex: 1 }} ellipsis>
                    {`~${usdValue} USD`}
                  </Text>
                )}
              </Flex>
            </Flex>
          )}
          <InputRow selected={disableCurrencySelect}>
            {account && currency && selectedCurrencyBalance?.greaterThan(0) && !disabled && label !== 'To' && (
              <Flex alignItems="right" justifyContent="right">
                {maxAmount?.greaterThan(0) &&
                  showQuickInputButton &&
                  onPercentInput &&
                  [25, 50, 75].map((percent) => {
                    const isAtCurrentPercent =
                      (maxAmount && value !== '0' && value === percentAmount[percent]) ||
                      (lpPercent && lpPercent === percent.toString())

                    return (
                      <Button
                        key={`btn_quickCurrency${percent}`}
                        data-dd-action-name={`Balance percent ${percent}`}
                        onClick={() => {
                          onPercentInput(percent)
                        }}
                        scale="xs"
                        mr="5px"
                        variant={isAtCurrentPercent ? 'primary' : 'secondary'}
                        style={{ textTransform: 'uppercase' }}
                      >
                        {percent}%
                      </Button>
                    )
                  })}
                {maxAmount?.greaterThan(0) && showMaxButton && (
                  <Button
                    data-dd-action-name="Balance percent max"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      onMax?.()
                    }}
                    scale="xs"
                    variant={isAtPercentMax ? 'primary' : 'secondary'}
                    style={{ textTransform: 'uppercase' }}
                  >
                    {t('Max')}
                  </Button>
                )}
              </Flex>
            )}
          </InputRow>
        </>
      }
    />
  )
})

export default CurrencyInputPanel
