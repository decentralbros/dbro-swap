import { useTranslation } from '@pancakeswap/localization'
import { FlexGap, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { styled } from 'styled-components'

import { getImageUrl } from './utils'

const MevIntroSectionWrapper = styled.div`
  position: relative;
  padding: 80px 24px;
  background: ${({ theme }) =>
    theme.isDark
      ? `linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 100%),
      linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)`
      : `linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(139.73deg, #e5fdff 0%, #f3efff 100%)`};

  min-height: 700px;
  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 160px;
  }
`
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const InnerWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`

const WaveBg = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
`

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`
const Card = styled.div`
  position: relative;
  min-height: 184px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 24px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-bottom-width: 2px;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-basis: calc(50% - 40px / 2);
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    flex-basis: calc(33.3333% - 80px / 3);
  }
`
export const ImageBox = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40%;
`

export const MevIntroSection: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { isMobile } = useMatchBreakpoints()
  return (
    <MevIntroSectionWrapper>
      <Wrapper>
        <InnerWrapper>
          <FlexGap width="100%" gap="8px" alignItems="center" justifyContent="center" flexWrap="wrap">
            <Text fontSize={isMobile ? '40px' : '64px'} lineHeight={isMobile ? '48px' : '64px'} bold textAlign="center">
              {t('Free and Automated')}
            </Text>
            <Text
              fontSize={isMobile ? '40px' : '64px'}
              lineHeight={isMobile ? '48px' : '64px'}
              bold
              color="secondary"
              textAlign="center"
            >
              {t('MEV Protection')}
            </Text>
          </FlexGap>
          <Text fontSize="20px" lineHeight="30px" textAlign="center" bold maxWidth="800px">
            {t(
              'Frontrunning and sandwich attacks occur when someone identifies your transaction in the public mempool and trades ahead of you. This can result in you receiving a worse price and potentially losing the entire amount of slippage tolerance.',
            )}
          </Text>
          <CardsWrapper>
            <Card>
              <Text maxWidth="60%">
                {t('Enjoy safe, secure and private Swaps without frontrunning and sandwich attacks.')}
              </Text>
              <ImageBox src={getImageUrl('card-1.png')} />
            </Card>
            <Card>
              <Text maxWidth="60%">
                {t('Fast and reliable RPC endpoint for your daily usage, beyond Swapping and trading.')}
              </Text>
              <ImageBox src={getImageUrl('card2.png')} />
            </Card>
            <Card>
              <Text maxWidth="60%">{t('Easy to set up and completely free solution for all kinds of Swappers.')}</Text>
              <ImageBox src={getImageUrl('card3.png')} />
            </Card>
          </CardsWrapper>
        </InnerWrapper>
      </Wrapper>
      <WaveBg src={getImageUrl(theme.isDark ? 'intro-wave-dark.png' : 'intro-wave.png')} />
    </MevIntroSectionWrapper>
  )
}
