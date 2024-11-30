import { Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
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
  const { isMobile } = useMatchBreakpoints()

  useEffect(() => {
    if (firstTime && query.showTradingReward) {
      setFirstTime(false)
      setIsSwapHotTokenDisplay(true)

      if (!isSwapHotTokenDisplay && isChartDisplayed) {
        setIsChartDisplayed?.((currentIsChartDisplayed) => !currentIsChartDisplayed)
      }
    }
  }, [firstTime, isChartDisplayed, isSwapHotTokenDisplay, query, setIsSwapHotTokenDisplay, setIsChartDisplayed])

  return (
    <div
      style={{
        background: isMobile ? '#000' : 'radial-gradient(ellipse at center, #1bf696, #000 25%)',
      }}
    >
      <Page title={t('Swap')}>
        <Flex
          width={['328px', '100%']}
          height="100%"
          justifyContent="center"
          position="relative"
          alignItems="flex-start"
        >
          <Flex flexDirection="column">
            <StyledSwapContainer $isChartExpanded={isChartExpanded}>
              <StyledInputCurrencyWrapper mt={isChartExpanded ? '24px' : '0'}>
                <AppBody>
                  <V3SwapForm />
                </AppBody>
              </StyledInputCurrencyWrapper>
            </StyledSwapContainer>
          </Flex>
        </Flex>
      </Page>
    </div>
  )
}
