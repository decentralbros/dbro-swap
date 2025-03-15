import { Orders, TWAP as PancakeTWAP, ToastProps } from '@orbs-network/twap-ui-pancake'
import { useTheme } from '@pancakeswap/hooks'
import { Currency, CurrencyAmount, TradeType } from '@pancakeswap/swap-sdk-core'
import { AutoColumn, Button, useMatchBreakpoints, useModal, useToast, useTooltip } from '@pancakeswap/uikit'
import replaceBrowserHistoryMultiple from '@pancakeswap/utils/replaceBrowserHistoryMultiple'
import { useUserSingleHopOnly } from '@pancakeswap/utils/user'
import { CurrencyLogo, NumericalInput, SwapUIV2 } from '@pancakeswap/widgets-internal'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { AutoRow } from 'components/Layout/Row'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { CommonBasesType } from 'components/SearchModal/types'
import { useAllTokens, useCurrency } from 'hooks/Tokens'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useBestAMMTrade } from 'hooks/useBestAMMTrade'
import { useCurrencyUsdPrice } from 'hooks/useCurrencyUsdPrice'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { LottieRefCurrentProps } from 'lottie-react'
import dynamic from 'next/dynamic'
import { memo, useCallback, useMemo, useRef } from 'react'
import { Field } from 'state/swap/actions'
import { useSwapState } from 'state/swap/hooks'
import { useSwapActionHandlers } from 'state/swap/useSwapActionHandlers'
import {
  useUserSplitRouteEnable,
  useUserStableSwapEnable,
  useUserV2SwapEnable,
  useUserV3SwapEnable,
} from 'state/user/smartRouter'
import { keyframes, styled } from 'styled-components'
import currencyId from 'utils/currencyId'
import { useAccount } from 'wagmi'
import ArrowDark from '../../../../public/images/swap/arrow_dark.json' assert { type: 'json' }
import ArrowLight from '../../../../public/images/swap/arrow_light.json' assert { type: 'json' }
import { Wrapper } from '../components/styleds'
import { SwapTransactionErrorContent } from '../components/SwapTransactionErrorContent'
import useWarningImport from '../hooks/useWarningImport'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

const useBestTrade = (fromToken?: string, toToken?: string, value?: string) => {
  const independentCurrency = useCurrency(fromToken)

  const amount = useMemo(() => {
    if (!independentCurrency || !value) return undefined
    if (value !== '0') {
      return CurrencyAmount.fromRawAmount(independentCurrency, BigInt(value))
    }
    return undefined
  }, [independentCurrency, value])

  const dependentCurrency = useCurrency(toToken)
  const [singleHopOnly] = useUserSingleHopOnly()
  const [split] = useUserSplitRouteEnable()
  const [v2Swap] = useUserV2SwapEnable()
  const [v3Swap] = useUserV3SwapEnable()
  const [stableSwap] = useUserStableSwapEnable()

  const { trade } = useBestAMMTrade({
    amount,
    currency: dependentCurrency,
    baseCurrency: independentCurrency,
    tradeType: TradeType.EXACT_INPUT,
    maxHops: singleHopOnly ? 1 : undefined,
    maxSplits: split ? undefined : 0,
    v2Swap,
    v3Swap,
    stableSwap,
    type: 'auto',
    trackPerf: true,
    autoRevalidate: false,
  })

  const inCurrency = useCurrency(fromToken)
  const outCurrency = useCurrency(toToken)

  const loading = useMemo(() => {
    if (!inCurrency || !outCurrency || !trade) return true
    return (
      !trade?.inputAmount.equalTo(amount?.numerator.toString() || '') ||
      !trade.inputAmount.currency.equals(inCurrency) ||
      !trade.outputAmount.currency.equals(outCurrency)
    )
  }, [inCurrency, outCurrency, trade, amount])

  return {
    isLoading: !value ? false : loading,
    outAmount: value ? trade?.outputAmount.numerator.toString() : '0',
  }
}

const useUsd = (address?: string) => {
  const currency = useCurrency(address)
  return useCurrencyUsdPrice(currency).data
}

const useTokenModal = (
  onCurrencySelect: (value: Currency) => void,
  selectedCurrency?: Currency,
  otherSelectedCurrency?: Currency,
) => {
  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={selectedCurrency}
      otherSelectedCurrency={otherSelectedCurrency}
      showCommonBases
      commonBasesType={CommonBasesType.SWAP_LIMITORDER}
      showSearchInput
      mode="swap-currency-input"
    />,
  )

  return onPresentCurrencyModal
}

const TransactionErrorContent = ({ onClick, message }: { onClick: () => void; message?: string }) => {
  return <SwapTransactionErrorContent onDismiss={onClick} message={message || ''} openSettingModal={undefined} />
}

const useTwapToast = () => {
  const { toastSuccess, toastWarning, toastError } = useToast()

  return useCallback(
    (props: ToastProps) => {
      const toast = props.variant === 'error' ? toastError : props.variant === 'warning' ? toastWarning : toastSuccess
      toast(props.title, props.message, { duration: props.autoCloseMillis })
    },
    [toastError, toastSuccess, toastWarning],
  )
}

export function TWAPPanel({ limit }: { limit?: boolean }) {
  const { isDesktop } = useMatchBreakpoints()
  const { chainId } = useActiveChainId()
  const tokens = useAllTokens()
  const { connector, address } = useAccount()
  const { isDark } = useTheme()
  const native = useNativeCurrency()
  const { onCurrencySelection } = useSwapActionHandlers()
  const warningSwapHandler = useWarningImport()
  const toast = useTwapToast()
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()

  const handleCurrencySelect = useCallback(
    (isInput: boolean, newCurrency?: Currency) => {
      onCurrencySelection(isInput ? Field.INPUT : Field.OUTPUT, newCurrency)
      warningSwapHandler(newCurrency)

      const oldCurrencyId = isInput ? inputCurrencyId : outputCurrencyId
      const otherCurrencyId = isInput ? outputCurrencyId : inputCurrencyId
      const newCurrencyId = newCurrency ? currencyId(newCurrency) : undefined
      replaceBrowserHistoryMultiple({
        ...(newCurrencyId === otherCurrencyId && { [isInput ? 'outputCurrency' : 'inputCurrency']: oldCurrencyId }),
        [isInput ? 'inputCurrency' : 'outputCurrency']: newCurrencyId,
      })
    },
    [onCurrencySelection, warningSwapHandler, inputCurrencyId, outputCurrencyId],
  )

  const onSrcTokenSelected = useCallback(
    (token: Currency) => {
      handleCurrencySelect(true, token)
    },
    [handleCurrencySelect],
  )

  const onDstTokenSelected = useCallback(
    (token: Currency) => {
      handleCurrencySelect(false, token)
    },
    [handleCurrencySelect],
  )

  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  return (
    <PancakeTWAP
      ConnectButton={ConnectWalletButton}
      connectedChainId={chainId}
      account={address}
      limit={limit}
      usePriceUSD={useUsd}
      useTrade={useBestTrade}
      dappTokens={tokens}
      isDarkTheme={isDark}
      srcToken={inputCurrency as any}
      dstToken={outputCurrency as any}
      useTokenModal={useTokenModal}
      onSrcTokenSelected={onSrcTokenSelected}
      onDstTokenSelected={onDstTokenSelected}
      isMobile={!isDesktop}
      nativeToken={native}
      connector={connector}
      useTooltip={useTooltip}
      Button={Button}
      TransactionErrorContent={TransactionErrorContent}
      toast={toast}
      FlipButton={FlipButton}
      Input={Input}
      CurrencyLogo={TokenLogo}
    />
  )
}

const TokenLogo = ({ address, size }: { address?: string; size?: string }) => {
  const currency = useCurrency(address)

  if (!currency) {
    return null
  }
  return <CurrencyLogo currency={currency} size={size} />
}

const switchAnimation = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(180deg);}
`

const FlipButtonWrapper = styled.div`
  will-change: transform;
  &.switch-animation {
    animation: ${switchAnimation} 0.25s forwards ease-in-out;
  }
`

export const Line = styled.div`
  position: absolute;
  left: -16px;
  right: -16px;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.cardBorder};
  top: calc(50% + 6px);
`

const FlipButton = memo(function FlipButton({ onClick }: { onClick: () => void }) {
  const flipButtonRef = useRef<HTMLDivElement>(null)
  const lottieRef = useRef<LottieRefCurrentProps | null>(null)
  const { isDark } = useTheme()
  const { isDesktop } = useMatchBreakpoints()

  const animationData = useMemo(() => (isDark ? ArrowDark : ArrowLight), [isDark])

  const handleAnimatedButtonClick = useCallback(() => {
    onClick()

    if (flipButtonRef.current && !flipButtonRef.current.classList.contains('switch-animation')) {
      flipButtonRef.current.classList.add('switch-animation')
    }
  }, [onClick])

  const handleAnimationEnd = useCallback(() => {
    flipButtonRef.current?.classList.remove('switch-animation')
  }, [])

  return (
    <AutoColumn justify="space-between" position="relative">
      <AutoRow justify="center" style={{ padding: '0 1rem' }}>
        {isDesktop ? (
          <FlipButtonWrapper ref={flipButtonRef} onAnimationEnd={handleAnimationEnd}>
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              style={{ height: '40px', cursor: 'pointer' }}
              onClick={handleAnimatedButtonClick}
              autoplay={false}
              loop={false}
              onMouseEnter={() => lottieRef.current?.playSegments([7, 19], true)}
              onMouseLeave={() => {
                handleAnimationEnd()
                lottieRef.current?.playSegments([39, 54], true)
              }}
            />
          </FlipButtonWrapper>
        ) : (
          <SwapUIV2.SwitchButtonV2 onClick={onClick} />
        )}
      </AutoRow>
    </AutoColumn>
  )
})

const Input = ({
  loading,
  disabled,
  value,
  onChange,
}: {
  loading?: boolean
  disabled?: boolean
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <NumericalInput
      disabled={disabled}
      loading={loading}
      className="token-amount-input"
      value={value}
      onUserInput={(val) => {
        onChange(val)
      }}
    />
  )
}

export const OrderHistory = () => {
  const { isDesktop } = useMatchBreakpoints()

  return (
    <div style={{ maxWidth: 'unset', marginTop: isDesktop ? 0 : 20 }}>
      <Wrapper id="swap-page" style={{ padding: 0 }}>
        <Orders />
      </Wrapper>
    </div>
  )
}
