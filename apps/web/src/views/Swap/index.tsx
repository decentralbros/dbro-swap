import { useTranslation } from '@pancakeswap/localization'
import { Flex, useMatchBreakpoints } from '@pancakeswap/uikit'
import { AppBody } from 'components/App'
import Page from 'components/Layout/Page'
import { V3SwapForm } from './V3Swap'
import { StyledInputCurrencyWrapper, StyledSwapContainer } from './styles'

export default function Swap() {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

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
            <StyledSwapContainer $isChartExpanded={false}>
              <StyledInputCurrencyWrapper mt="0">
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
