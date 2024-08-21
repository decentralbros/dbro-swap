import { SmartRouter } from '@pancakeswap/smart-router/evm'
import { useMemo } from 'react'
import { FormMain, PricingAndSlippage } from './containers'
import { CommitButton } from './containers/CommitButton'
import { useAllTypeBestTrade } from './hooks/useAllTypeBestTrade'

export function V3SwapForm() {
  const {
    bestTrade,
    ammTrade,
    mmTrade,
    isMMBetter,
    tradeError,
    tradeLoaded,
    refreshTrade,
    refreshDisabled,
    pauseQuoting,
    resumeQuoting,
  } = useAllTypeBestTrade()

  const ammPrice = useMemo(() => (ammTrade ? SmartRouter.getExecutionPrice(ammTrade) : undefined), [ammTrade])
  // const insufficientFundCurrency = useCheckInsufficientError(ammTrade)
  const commitHooks = useMemo(() => {
    return {
      beforeCommit: pauseQuoting,
      afterCommit: resumeQuoting,
    }
  }, [pauseQuoting, resumeQuoting])

  return (
    <>
      <FormMain
        tradeLoading={isMMBetter ? false : !tradeLoaded}
        pricingAndSlippage={
          <PricingAndSlippage priceLoading={!tradeLoaded} price={ammPrice ?? undefined} showSlippage={!isMMBetter} />
        }
        inputAmount={bestTrade?.inputAmount}
        outputAmount={bestTrade?.outputAmount}
        swapCommitButton={
          <CommitButton
            trade={isMMBetter ? mmTrade : ammTrade}
            tradeError={tradeError}
            tradeLoaded={tradeLoaded}
            {...commitHooks}
          />
        }
      />

      {/* <BuyCryptoLink currency={insufficientFundCurrency} /> */}

      {/* {isMMBetter ? (
        <MMTradeDetail loaded={!mmTrade.mmOrderBookTrade.isLoading} mmTrade={mmTrade.mmTradeInfo} />
      ) : (
        <TradeDetails loaded={tradeLoaded} trade={ammTrade} />
      )} */}
      {/* {(shouldShowMMLiquidityError(mmTrade?.mmOrderBookTrade?.inputError) || mmTrade?.mmRFQTrade?.error) &&
        !ammTrade && (
          <Box mt="5px">
            <MMLiquidityWarning />
          </Box>
        )} */}
    </>
  )
}
