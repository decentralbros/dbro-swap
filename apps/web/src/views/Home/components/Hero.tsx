import { useTranslation } from '@pancakeswap/localization'
import { Button, Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { NextLinkFromReactRouter } from '@pancakeswap/widgets-internal'

import ConnectWalletButton from 'components/ConnectWalletButton'
import useTheme from 'hooks/useTheme'
import Image from 'next/image'
import { styled } from 'styled-components'
import { useAccount } from 'wagmi'

// const BgWrapper = styled.div`
//   z-index: -1;
//   overflow: hidden;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   bottom: 0px;
//   left: 0px;
// `

// const InnerWrapper = styled.div`
//   position: absolute;
//   width: 100%;
//   bottom: -3px;
// `

const BunnyWrapper = styled.div`
  width: 100%;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`

const CakeBox = styled.div`
  width: 300px;
  height: 300px;
  margin: auto;
  > canvas {
    transform: scale(0.33) translate(-50%, -50%);
    transform-origin: top left;
    &.is-ios {
      transform: scale(0.75) translate(-50%, -50%);
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 500px;
    height: 500px;
    > canvas {
      transform: scale(0.45) translate(-50%, -50%);
      &.is-ios {
        transform: scale(1) translate(-50%, -50%);
      }
    }
    transform-origin: center center;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    > canvas {
      transform: scale(0.6) translate(-50%, -50%);
      transform-origin: top left;
      &.is-ios {
        transform: scale(1) translate(-50%, -50%);
      }
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      > canvas {
        &.is-ios {
          transform: scale(1.45) translate(-50%, -52%);
        }
      }
    }
    position: relative;
    width: 605px;
    height: 736px;
    overflow: hidden;
    margin-bottom: -100px;
    margin-right: -100px;
  }
`

const StyledText = styled(Text)`
  font-size: 32px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 40px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 64px;
  }
  ${({ theme }) => theme.mediaQueries.xxl} {
    font-size: 88px;
  }
`

const width = 1080
const height = 1080

const Hero = () => {
  const { t } = useTranslation()
  const { address: account } = useAccount()
  const { theme } = useTheme()
  const { isMobile, isXs, isMd } = useMatchBreakpoints()

  return (
    <>
      <style jsx global>
        {`
          .slide-svg-dark {
            display: none;
          }
          .slide-svg-light {
            display: block;
          }
          [data-theme='dark'] .slide-svg-dark {
            display: block;
          }
          [data-theme='dark'] .slide-svg-light {
            display: none;
          }
        `}
      </style>
      {/* <BgWrapper>
        <InnerWrapper>
          <SlideSvgDark className="slide-svg-dark" width="100%" />
          <SlideSvgLight className="slide-svg-light" width="100%" />
        </InnerWrapper>
      </BgWrapper> */}
      <Flex
        position="relative"
        flexDirection={['column-reverse', null, null, 'row']}
        alignItems={['center', null, null, 'center']}
        justifyContent="center"
        mt={['50px', null, 0]}
        pl={['0px', '0px', '0px', '30px']}
        id="homepage-hero"
      >
        <Flex flex="1" flexDirection="column">
          <Text textAlign={isMobile || isMd ? 'center' : 'left'} pr={isMobile ? 0 : '10px'} mb="16px">
            <StyledText display="inline-block" lineHeight="110%" fontWeight={600} color="text" mr="8px">
              {t("Everyone's")}
            </StyledText>
            <StyledText
              display="inline-block"
              fontWeight={600}
              lineHeight="110%"
              color="secondary"
              mr={isMobile ? 0 : '8px'}
            >
              {t('Favorite')}
            </StyledText>
            {isMobile && <br />}
            <StyledText display="inline-block" lineHeight="110%" fontWeight={600} color="text">
              {t('DEX')}
            </StyledText>
          </Text>
          <Text
            mb="24px"
            color={theme.isDark ? '#B8ADD2' : '#7A6EAA'}
            maxWidth={600}
            fontSize={['20px', '20px', null, '24px']}
            textAlign={isMobile ? 'center' : 'left'}
            lineHeight="110%"
            fontWeight={600}
          >
            {t('Trade, earn, and own crypto on the all-in-one multichain DEX')}
          </Text>

          <Flex justifyContent={isMobile || isMd ? 'center' : 'start'}>
            {!account && <ConnectWalletButton style={{ borderRadius: isXs ? 12 : undefined }} scale="md" mr="8px" />}
            <NextLinkFromReactRouter to="/swap">
              <Button
                scale="md"
                style={{ borderRadius: isXs ? 12 : undefined, color: '#FFFFFF' }}
                variant={!account ? 'secondary' : 'primary'}
              >
                {t('Trade Now')}
              </Button>
            </NextLinkFromReactRouter>
          </Flex>
        </Flex>
        <Flex
          height={['100%', null, null, '100%']}
          width={['100%', null, null, '100%']}
          flex={[null, null, null, '1']}
          mb={['24px', null, null, '0']}
          position="relative"
        >
          <BunnyWrapper>
            <CakeBox>
              <Image
                src="/logo.png"
                width={isMobile ? width * 1.5 : width / 2.5}
                height={isMobile ? height * 1.5 : height / 2.5}
                alt="IslandSwap Logo"
              />
            </CakeBox>
          </BunnyWrapper>
        </Flex>
      </Flex>
    </>
  )
}

export default Hero
