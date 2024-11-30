import { useTranslation } from '@pancakeswap/localization'
import { Box, Button, FlexGap, LinkExternal, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import useTheme from 'hooks/useTheme'
import { useMemo } from 'react'
import { styled } from 'styled-components'
import { getImageUrl } from './utils'

const InfoSectionWrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  min-height: 657px;
  padding: 80px 24px;

  ${({ theme }) => theme.mediaQueries.xxl} {
    padding: 160px;
  }
`
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const InnerWrapper = styled.div`
  width: 100%;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`
const walletConfig = [
  {
    title: 'Trust Wallet',
    image: 'trust.png',
    doc: 'https://community.trustwallet.com/t/how-to-add-a-custom-network-on-the-trust-wallet-mobile-app/626781',
  },
  {
    title: 'SafePal',
    image: 'safepal.png',
    doc: 'https://safepalsupport.zendesk.com/hc/en-us/articles/14688426876443-How-to-add-a-Custom-network-in-the-SafePal-software-wallet',
  },
  {
    title: 'Coinbase Wallet',
    image: 'coinbase.png',
    doc: ' https://www.coinbase.com/en-sg/learn/wallet/How-to-add-custom-networks-Coinbase-Wallet',
  },
  {
    title: 'TokenPocket',
    image: 'token-pocket.png',
    doc: 'https://help.tokenpocket.pro/en/wallet-operation/custom-network-token/how-to-add-custom-network',
  },
  {
    title: 'Others',
    image: 'others.png',
    doc: 'https://support.metamask.io/networks-and-sidechains/managing-networks/how-to-add-a-custom-network-rpc/',
  },
]

export const InfoSection: React.FC<{ walletCount: number }> = ({ walletCount }) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { isMobile } = useMatchBreakpoints()
  const walletCountDisplay = useMemo(() => {
    if (walletCount < 126780) return '126,780'
    return walletCount.toLocaleString()
  }, [walletCount])

  return (
    <InfoSectionWrapper>
      <Wrapper>
        <InnerWrapper>
          <Box>
            <Text textAlign="center" fontSize="64px" bold color="secondary" lineHeight="76px">
              {walletCountDisplay}
            </Text>
            <Text fontSize="40px" lineHeight="48px" textAlign="center" bold>
              {t('Total onboarded addresses')}
            </Text>
          </Box>
          <Text textAlign="center">
            {t('Having trouble? Choose your wallet to view the detailed guide on how to apply MEV Guard:')}
          </Text>
          <FlexGap
            maxWidth="588px"
            gap="40px"
            flexWrap={isMobile ? 'wrap' : 'nowrap'}
            alignItems="center"
            justifyContent="center"
          >
            {walletConfig.map((wallet) => (
              <FlexGap
                flexDirection="column"
                alignItems="center"
                gap="8px"
                onClick={() => {
                  window.open(wallet.doc, '_blank', 'noopener noreferrer')
                }}
                style={{ cursor: 'pointer' }}
              >
                <img src={getImageUrl(wallet.image)} alt={wallet.title} width="64px" />
                <Text fontSize="16px" lineHeight="24px" bold color="#02919D">
                  {t(wallet.title)}
                </Text>
              </FlexGap>
            ))}
          </FlexGap>
          <FlexGap flexDirection="column" gap="24px" justifyContent="center" alignItems="center">
            <Text>{t('or')}</Text>
            <Button
              onClick={() => {
                window.open(
                  'https://docs.pancakeswap.finance/products/pancakeswap-private-rpc/faq',
                  '_blank',
                  'noopener noreferrer',
                )
              }}
              endIcon={<LinkExternal color={theme.colors.background} />}
            >
              {t('View FAQ docs')}
            </Button>
          </FlexGap>
        </InnerWrapper>
      </Wrapper>
    </InfoSectionWrapper>
  )
}
