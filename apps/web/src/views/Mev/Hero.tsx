import { useTranslation } from '@pancakeswap/localization'
import { Box, FlexGap, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { useMemo } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { AddMevRpcButton } from './AddMevRpcButton'
import { useIsMEVEnabled } from './hooks'

import { getImageUrl } from './utils'

const rpcData = {
  'Network Name': 'PancakeSwap MEV Guard',
  'New RPC URL': 'https://bscrpc.pancakeswap.finance',
  'Chain ID': '56',
  'Currency symbol': 'BNB',
  'Block Explorer URL': 'https://bscscan.com',
}

const blingAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const blingWithRotateAnimation = keyframes`
  0% {
    opacity: 1;
    transform: rotate(-21deg);
  }
  50% {
    opacity: 0;
    transform: rotate(-21deg);
  }
  100% {
    opacity: 1;
    transform: rotate(-21deg);
  }
`

const blingInCardWithRotateAnimation = keyframes`
  0% {
    opacity: 1;
    transform: rotate(20deg);
  }
  50% {
    opacity: 0;
    transform: rotate(20deg);
  }
  100% {
    opacity: 1;
    transform: rotate(20deg);
  }
`

const floatAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-18px);
  }
  100% {
    transform: translateY(0);
  }
`
const floatWithRotateAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-25px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`

const HeroWrapper = styled(Box)`
  position: relative;
  padding: 80px 24px;
  background: ${({ theme }) =>
    theme.isDark
      ? `linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)`
      : `linear-gradient(139.73deg, #e5fdff 0%, #f3efff 100%)`};
  min-height: 100vh;
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
  justify-content: space-between;
  gap: 80px;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const RightTopBox = styled.div`
  position: relative;
  flex-basis: 100%;

  flex-grow: 0;
  z-index: 1;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-basis: calc(45% - 20px);
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    flex-basis: calc(55% - 20px);
  }
`
const LeftTopBox = styled.div`
  position: relative;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  gap: 24px;
  z-index: 1;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-basis: calc(45% - 20px);
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    flex-basis: calc(45% - 20px);
  }
`
const TopBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  gap: 40px;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`
const BottomBox = styled.div`
  position: relative;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  z-index: 1;
`

const CardsWrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
  }
`
const Card = styled.div`
  min-height: 246px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 24px;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-bottom-width: 2px;
  flex-grow: 1;
  flex-basis: 50%;
  flex-shrink: 0;
`

/* ImageLayers */

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 660px;
`

const heroImgBase = css`
  position: absolute;
`
const HeroImg1 = styled.img`
  ${heroImgBase}
  z-index: 4;
  width: 20%;
  bottom: 4%;
  left: 1%;
  animation: ${floatAnimation} 6s ease-in-out infinite 0s;
`
const HeroImg2 = styled.img`
  ${heroImgBase}
  z-index: 3;
  width: 63%;
  bottom: 0;
  animation: ${floatAnimation} 6s ease-in-out infinite 0.8s;
`
const HeroImg3 = styled.img`
  ${heroImgBase}
  z-index: 2;
  width: 76%;
  left: 19%;
  top: 0.5%;
  animation: ${floatWithRotateAnimation} 6s ease-in-out infinite 1.6s;
  overflow: hidden;
`
const HeroImg4 = styled.img`
  ${heroImgBase}
  z-index: 1;
  width: 38%;
  right: 0;
  bottom: 12%;
  animation: ${floatAnimation} 6s ease-in-out infinite 2.4s;
`
const LeftBling = styled.img`
  ${heroImgBase}
  z-index: 5;
  width: 9%;
  left: 18.5%;
  top: 9%;
  animation: ${blingAnimation} 3s infinite ease-in-out;
`

const RightBling = styled.img`
  ${heroImgBase}
  z-index: 6;
  width: 7%;
  right: 5.5%;
  top: 27%;
  animation: ${blingWithRotateAnimation} 2s infinite ease-in-out 1s;
`

const HeroImgBg = styled.img`
  z-index: 0;
  width: 100%;
  opacity: 0;
  position: relative;
`
const CoinsImg = styled.img`
  width: 57px;
`

const HeroWalletImg = styled.img`
  width: 80%;
`
const UnderLineBox = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
  &::before {
    content: '';
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0;
    width: 100%;
    border-bottom: 1px dotted ${({ theme }) => theme.colors.cardBorder};
  }
`

const LeftBlingInCard = styled.img`
  ${heroImgBase}
  z-index: 5;
  width: 20%;
  left: -5%;
  top: 0;
  animation: ${blingAnimation} 3s infinite ease-in-out 1.2s;
`

const RightBlingInCard = styled.img`
  ${heroImgBase}
  z-index: 6;
  width: 13%;
  right: 15.5%;
  bottom: 0;

  animation: ${blingInCardWithRotateAnimation} 2s infinite ease-in-out 2s;
`

const WaveBg = styled.img`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
`

export const Hero: React.FC<{ txCount: number }> = ({ txCount }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { isMobile } = useMatchBreakpoints()
  const { isMEVEnabled } = useIsMEVEnabled()
  const txCountDisplay = useMemo(() => {
    if (txCount < 1000000) return '1M+'
    return `${(txCount / 1000000).toFixed(1)}M+`
  }, [txCount])
  return (
    <HeroWrapper>
      <Wrapper>
        <InnerWrapper>
          <TopBox>
            <LeftTopBox>
              <Text
                fontSize={isMobile ? '40px' : '64px'}
                lineHeight={isMobile ? '48px' : '64px'}
                color="secondary"
                bold
              >
                {t('PancakeSwap MEV GUARD')}
              </Text>
              <Text fontSize={isMobile ? '24px' : '32px'} lineHeight={isMobile ? '36px' : '38px'} bold>
                {t('Safeguard your swap against frontrunning and sandwich attacks!')}
              </Text>
              <Box>
                <Text bold>{t('Total transactions protected:')}</Text>
                <FlexGap gap="8px" alignItems="center">
                  <CoinsImg src={getImageUrl('coins.png')} />
                  <Text fontSize="64px" lineHeight="77px" color="secondary" bold>
                    {txCountDisplay}
                  </Text>
                </FlexGap>
              </Box>
            </LeftTopBox>
            <RightTopBox>
              <ImageWrapper>
                <HeroImg1 src={getImageUrl('hero1.png')} />
                <HeroImg2 src={getImageUrl('hero2.png')} />
                <HeroImg3 src={getImageUrl('hero3.png')} />
                <HeroImg4 src={getImageUrl('hero4.png')} />
                <HeroImgBg src={getImageUrl('mev-hero.png')} />
                <LeftBling src={getImageUrl('bling.png')} />
                <RightBling src={getImageUrl('bling.png')} />
              </ImageWrapper>
            </RightTopBox>
          </TopBox>
          <BottomBox>
            <Box>
              <Text fontSize="40px" lineHeight="48px" color="secondary" bold>
                {t('Get protected now')}
              </Text>
              <Text>{t('By following these settings, your swap will be protected from MEV attacks')}</Text>
            </Box>
            <CardsWrapper>
              <Card>
                <Box height="100%">
                  <FlexGap gap={isMobile ? '16px' : '8px'} height="100%" flexDirection={isMobile ? 'column' : 'row'}>
                    {isMobile ? (
                      <FlexGap>
                        <FlexGap gap="8px" alignItems="center" flexBasis="40%" position="relative">
                          <RightBlingInCard src={getImageUrl('bling.png')} />
                          <LeftBlingInCard src={getImageUrl('bling.png')} />
                          <HeroWalletImg src={getImageUrl('hero-wallet.png')} alt="hero-wallet" />
                        </FlexGap>
                        <Box style={{ flexBasis: '60%' }}>
                          <Text fontSize="32px" lineHeight="38px" bold mb="8px">
                            {isMEVEnabled ? t('You are Protected!') : t('In one click')}
                          </Text>
                          <Text>
                            {isMEVEnabled
                              ? t('Added automatically on BNB Smart Chain: PancakeSwap MEV Guard')
                              : t('Add automatically on BNB Smart Chain: PancakeSwap MEV Guard ')}
                          </Text>
                        </Box>
                      </FlexGap>
                    ) : (
                      <FlexGap gap="8px" alignItems="center" flexBasis={isMobile ? '50%' : '30%'} position="relative">
                        <RightBlingInCard src={getImageUrl('bling.png')} />
                        <LeftBlingInCard src={getImageUrl('bling.png')} />
                        <HeroWalletImg src={getImageUrl('hero-wallet.png')} alt="hero-wallet" />
                      </FlexGap>
                    )}
                    <FlexGap
                      flexDirection="column"
                      justifyContent="space-between"
                      height={isMobile ? undefined : '198px'}
                    >
                      {!isMobile && (
                        <Box>
                          <Text fontSize="32px" lineHeight="38px" bold mb="8px">
                            {isMEVEnabled ? t('You are Protected!') : t('In one click')}
                          </Text>
                          <Text>
                            {isMEVEnabled
                              ? t('Added automatically on BNB Smart Chain: PancakeSwap MEV Guard')
                              : t('Add automatically on BNB Smart Chain: PancakeSwap MEV Guard ')}
                          </Text>
                        </Box>
                      )}
                      <AddMevRpcButton />
                    </FlexGap>
                  </FlexGap>
                </Box>
              </Card>
              <Card>
                <Text fontSize="20px" bold mb="16px">
                  {t('Or add manually this RPC endpoint to your wallet')}
                </Text>
                <FlexGap gap="8px" flexDirection="column">
                  {Object.entries(rpcData).map(([key, value]) => (
                    <FlexGap gap="8px" alignItems="center" key={key} flexWrap={isMobile ? 'wrap' : 'nowrap'}>
                      <Text>{key}:</Text>
                      <UnderLineBox />
                      <Text bold>{value}</Text>
                    </FlexGap>
                  ))}
                </FlexGap>
              </Card>
            </CardsWrapper>
          </BottomBox>
        </InnerWrapper>
      </Wrapper>
      <WaveBg src={getImageUrl(theme.isDark ? 'hero-wave-dark.png' : 'hero-wave.png')} />
    </HeroWrapper>
  )
}
