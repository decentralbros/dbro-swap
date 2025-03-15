import { useTranslation } from '@pancakeswap/localization'
import { Currency } from '@pancakeswap/sdk'
import { AutoRow, BottomDrawer, Box, Flex, StyledLink, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useCurrency } from 'hooks/Tokens'
import { useSwapHotTokenDisplay } from 'hooks/useSwapHotTokenDisplay'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useSingleTokenSwapInfo, useSwapState } from 'state/swap/hooks'
import { styled } from 'styled-components'
// import { SwapSelection } from '../components/SwapSelection'
import { SwapSelection } from '../../SwapSimplify/V4Swap/SwapSelectionTab'
import { SwapFeaturesContext } from '../SwapFeaturesContext'
import PriceChartContainer from '../components/Chart/PriceChartContainer'
import { SwapType } from '../types'
import { OrderHistory, TWAPPanel } from './Twap'

export default function TwapAndLimitSwap({ limit }: { limit?: boolean }) {
  const { query } = useRouter()
  const { t } = useTranslation()
  const { isDesktop, isMobile } = useMatchBreakpoints()
  const { setIsChartDisplayed, setIsChartExpanded, isChartExpanded, isChartSupported, isChartDisplayed } =
    useContext(SwapFeaturesContext)
  const [isSwapHotTokenDisplay, setIsSwapHotTokenDisplay] = useSwapHotTokenDisplay()
  const [firstTime, setFirstTime] = useState(true)

  useEffect(() => {
    if (firstTime && query.showTradingReward) {
      setFirstTime(false)
      setIsSwapHotTokenDisplay(true)

      if (!isSwapHotTokenDisplay && isChartDisplayed) {
        setIsChartDisplayed?.((currentIsChartDisplayed) => !currentIsChartDisplayed)
      }
    }
  }, [firstTime, isChartDisplayed, isSwapHotTokenDisplay, query, setIsSwapHotTokenDisplay, setIsChartDisplayed])

  // swap state & price data
  const {
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: outputCurrency ?? undefined,
  }

  const singleTokenPrice = useSingleTokenSwapInfo(
    inputCurrencyId,
    inputCurrency,
    outputCurrencyId,
    outputCurrency,
    isChartSupported,
  )
  useDefaultsFromURLSearch()

  return (
    <>
      <Flex
        width="100%"
        height={isMobile ? 'auto' : '100%'}
        justifyContent="center"
        position="relative"
        alignItems="flex-start"
        mb={isMobile ? '40px' : '0'}
        style={{ zIndex: 1 }}
      >
        {isDesktop && (
          <Flex width={isChartExpanded ? '100%' : '50%'} maxWidth="928px" flexDirection="column" style={{ gap: 20 }}>
            <PriceChartContainer
              inputCurrencyId={inputCurrencyId}
              inputCurrency={currencies[Field.INPUT]}
              outputCurrencyId={outputCurrencyId}
              outputCurrency={currencies[Field.OUTPUT]}
              isChartExpanded={isChartExpanded}
              setIsChartExpanded={setIsChartExpanded}
              isChartDisplayed={isChartDisplayed}
              currentSwapPrice={singleTokenPrice}
              isFullWidthContainer
            />
            <OrderHistory />
          </Flex>
        )}
        {!isDesktop && isChartSupported && (
          <BottomDrawer
            content={
              <PriceChartContainer
                inputCurrencyId={inputCurrencyId}
                inputCurrency={currencies[Field.INPUT]}
                outputCurrencyId={outputCurrencyId}
                outputCurrency={currencies[Field.OUTPUT]}
                isChartExpanded={isChartExpanded}
                setIsChartExpanded={setIsChartExpanded}
                isChartDisplayed={isChartDisplayed}
                currentSwapPrice={singleTokenPrice}
                isFullWidthContainer
                isMobile
              />
            }
            isOpen={isChartDisplayed}
            setIsOpen={(isOpen) => setIsChartDisplayed?.(isOpen)}
          />
        )}
        <Flex flexDirection="column" width={isDesktop ? undefined : '100%'}>
          <StyledSwapContainer $isChartExpanded={isChartExpanded}>
            <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
              <SwapSelection swapType={limit ? SwapType.LIMIT : SwapType.TWAP} style={{ marginBottom: 16 }} />
              <TWAPPanel limit={limit} />
              <Flex flexDirection={!isDesktop ? 'column-reverse' : 'column'}>
                {limit && (
                  <AutoRow gap="4px" justifyContent="center">
                    <Text fontSize="14px" color="textSubtle">
                      {t('Orders missing? Check out:')}
                    </Text>
                    <Link href="/limit-orders" passHref prefetch={false}>
                      <StyledLink fontSize="14px" color="primary">
                        {t('Limit V2 (deprecated)')}
                      </StyledLink>
                    </Link>
                  </AutoRow>
                )}
                {!isDesktop && <OrderHistory />}
              </Flex>
            </StyledInputCurrencyWrapper>
          </StyledSwapContainer>
        </Flex>
      </Flex>
    </>
  )
}

export const StyledSwapContainer = styled(Flex)<{ $isChartExpanded: boolean }>`
  flex-shrink: 0;
  height: fit-content;
  padding: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 16px;
  }

  ${({ theme }) => theme.mediaQueries.xxl} {
    ${({ $isChartExpanded }) => ($isChartExpanded ? 'padding:  0 0px 0px 16px' : 'padding: 0 0px 0px 16px')};
  }
`

export const StyledInputCurrencyWrapper = styled(Box)`
  width: 100%;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 400px;
  }
`
