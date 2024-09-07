import { Flex } from '@pancakeswap/uikit'
import { AppBody } from 'components/App'
import Page from 'components/Layout/Page'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

import { useTranslation } from '@pancakeswap/localization'

import { useSwapHotTokenDisplay } from 'hooks/useSwapHotTokenDisplay'
import { SwapFeaturesContext } from './SwapFeaturesContext'
import { V3SwapForm } from './V3Swap'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'

export default function Swap() {
  const { t } = useTranslation()
  const { query } = useRouter()
  // const { isDesktop } = useMatchBreakpoints()
  const {
    isChartExpanded,
    isChartDisplayed,
    setIsChartDisplayed,
    setIsChartExpanded,
    isChartSupported,
    // isHotTokenSupported,
  } = useContext(SwapFeaturesContext)
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
  // const {
  //   [Field.INPUT]: { currencyId: inputCurrencyId },
  //   [Field.OUTPUT]: { currencyId: outputCurrencyId },
  // } = useSwapState()
  // const inputCurrency = useCurrency(inputCurrencyId)
  // const outputCurrency = useCurrency(outputCurrencyId)

  // const currencies: { [field in Field]?: Currency } = {
  //   [Field.INPUT]: inputCurrency ?? undefined,
  //   [Field.OUTPUT]: outputCurrency ?? undefined,
  // }

  // const singleTokenPrice = useSingleTokenSwapInfo(
  //   inputCurrencyId,
  //   inputCurrency,
  //   outputCurrencyId,
  //   outputCurrency,
  //   isChartSupported,
  // )

  return (
    <>
      <Page title={t('Swap')}>
        <Flex
          width={['328px', '100%']}
          height="100%"
          justifyContent="center"
          position="relative"
          alignItems="flex-start"
        >
          {/* {isDesktop && isChartSupported && (
            <PriceChartContainer
              inputCurrencyId={inputCurrencyId}
              inputCurrency={currencies[Field.INPUT]}
              outputCurrencyId={outputCurrencyId}
              outputCurrency={currencies[Field.OUTPUT]}
              isChartExpanded={isChartExpanded}
              setIsChartExpanded={setIsChartExpanded}
              isChartDisplayed={isChartDisplayed}
              currentSwapPrice={singleTokenPrice}
            />
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
          )} */}
          {/* {isDesktop && isSwapHotTokenDisplay && isHotTokenSupported && (
          <HotTokenList handleOutputSelect={handleOutputSelect} />
        )} */}
          {/* <ModalV2
          isOpen={!isDesktop && isSwapHotTokenDisplay && isHotTokenSupported}
          onDismiss={() => setIsSwapHotTokenDisplay(false)}
        >
          <Modal
            style={{ padding: 0 }}
            title={t('Top Token')}
            onDismiss={() => setIsSwapHotTokenDisplay(false)}
            bodyPadding="0px"
          >
            <HotTokenList
              handleOutputSelect={(newCurrencyOutput: Currency) => {
                handleOutputSelect(newCurrencyOutput)
                setIsSwapHotTokenDisplay(false)
              }}
            />
          </Modal>
        </ModalV2> */}
          <Flex flexDirection="column">
            <StyledSwapContainer $isChartExpanded={isChartExpanded}>
              <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
                {/* <SwapSelection swapType={SwapType.MARKET} /> */}
                <AppBody>
                  <V3SwapForm />
                </AppBody>
              </StyledInputCurrencyWrapper>
            </StyledSwapContainer>
          </Flex>
        </Flex>
      </Page>
    </>
  )
}
