import { Trans, useTranslation } from '@pancakeswap/localization'
import { Button, Card, Flex, FlexGap, Heading, Link, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'

type BenefitCardType = 'earnCake' | 'gaugesVoting' | 'farmBoost' | 'snapshotVoting' | 'ifo' | 'more' | 'crossChain'

type BenefitItem = {
  headImg: string
  title: React.ReactNode
  subTitle?: React.ReactNode
  desc: React.ReactNode[]
  btnText?: React.ReactNode
  link?: string
  key?: string
}

export const BENEFITS: Record<BenefitCardType, BenefitItem> = {
  crossChain: {
    headImg: '/images/cake-staking/cross-chain.png',
    title: <Trans>veCAKE Sync</Trans>,
    subTitle: <Trans>Number of Chains with veCAKE</Trans>,
    btnText: <Trans>View Details</Trans>,
    desc: [
      <Trans>Enjoy the same veCAKE benefits on other networks.</Trans>,
      <Trans>Explorer other PancakeSwap benefits.</Trans>,
    ],
    key: 'cross-chain-veCake',
  },
  earnCake: {
    headImg: '/images/cake-staking/benefit-earn-cake.png',
    title: <Trans>Earn DBRO</Trans>,
    subTitle: <Trans>Contract Pool</Trans>,
    btnText: <Trans>Check Rewards</Trans>,
    link: '/staking',
    desc: [
      <Trans>Daily reward rate of 20%</Trans>,
      <Trans>Low fees on Base network</Trans>,
      <Trans>Claim threshold of only 500k</Trans>,
    ],
    key: 'benefit-earn-cake',
  },
  gaugesVoting: {
    headImg: '/images/cake-staking/benefit-gauges-voting.png',
    title: <Trans>Wrapped NFTs</Trans>,
    subTitle: <Trans>NFTs minted</Trans>,
    btnText: <Trans>Redeem Rewards</Trans>,
    link: '/staking/redeem',
    desc: [
      <Trans>Unstake for DBRO wrapped utility NFTs</Trans>,
      <Trans>Unwrap NFTs for DBRO tokens</Trans>,
      <Trans>Fee of only 1% to Unwrap</Trans>,
    ],
    key: 'benefit-gauges-voting.',
  },
  farmBoost: {
    headImg: '/images/cake-staking/benefit-farm-boost.png',
    title: <Trans>Workshops</Trans>,
    btnText: <Trans>Check Workshops</Trans>,
    link: 'https://workshop.decentralbros.xyz',
    desc: [<Trans>Access our live coding workshops and benefit from team mentorship</Trans>],
    key: 'benefit-farm-boost',
  },
  snapshotVoting: {
    headImg: '/images/cake-staking/benefit-snapshot-voting.png',
    title: <Trans>Custom Dev Builds</Trans>,
    btnText: <Trans>Book Consultation</Trans>,
    link: 'https://www.decentralbros.xyz',
    desc: [<Trans>Use your utility NFTs for major discounts on custom development services</Trans>],
    key: 'benefit-snapshot-voting',
  },
  ifo: {
    headImg: '/images/cake-staking/benefit-ifo.png',
    title: <Trans>Merchandise</Trans>,
    btnText: <Trans>Browse Store</Trans>,
    link: 'https://www.decentralbros.xyz',
    desc: [<Trans>Discounted DBRO merchandise including shirts, hats, and more</Trans>],
    key: 'benefit-ifo',
  },
  more: {
    headImg: '/images/cake-staking/benefit-more.png',
    title: <Trans>Web3 Build Shells</Trans>,
    btnText: <Trans>Learn More</Trans>,
    desc: [<Trans>Gain exclusive to pre-built templates for your own unique dApps</Trans>],
    link: 'https://www.decentralbros.xyz',
    key: 'benefit-more',
  },
}

const StyledCard = styled(Card)`
  height: 100%;
`

const StyleUl = styled.ul`
  list-style-type: '\2022';
  list-style-position: outside;
  margin-left: 16px;

  li {
    padding-left: 10px;
  }
`

export const BenefitCard: React.FC<{
  type: BenefitCardType
  dataText?: string
  onClick?: () => void
  comingSoon?: boolean
  headSlot?: React.ReactNode
  buttonSlot?: React.ReactNode
}> = ({ type, onClick, dataText, headSlot, comingSoon, buttonSlot }) => {
  const { t } = useTranslation()
  const info = BENEFITS[type] as BenefitItem

  const comingSoonButton = (
    <Button width="100%" mt="auto" disabled>
      {t('Coming Soon')}
    </Button>
  )

  const button = comingSoon ? (
    comingSoonButton
  ) : info.btnText ? (
    <Button
      width="100%"
      mt="auto"
      variant={onClick ? 'primary' : 'secondary'}
      style={{ color: onClick ? '#000' : '#1bf696' }}
      onClick={onClick}
    >
      {info.btnText}
    </Button>
  ) : null

  return (
    <StyledCard innerCardProps={{ p: ['16px', '16px', '24px'] }}>
      <FlexGap flexDirection="column" gap="16px" height="100%" justifyContent="space-between">
        <FlexGap gap="16px" alignItems="center">
          {/* <HeadImage>
            <img srcSet={`${info.headImg} 2x`} alt="earn-cake" />
          </HeadImage> */}
          <FlexGap flexDirection="column" gap="8px">
            <Flex>
              <Heading as="h3" scale="lg" color="secondary">
                {info.title}
              </Heading>
              {headSlot}
            </Flex>
            {info.subTitle ? (
              <Flex flexDirection="column">
                <Text fontSize="12px" color="textSubtle" lineHeight="120%">
                  {info.subTitle}
                </Text>
                <Text fontSize="16px" bold lineHeight="120%">
                  {dataText ?? '-'}
                </Text>
              </Flex>
            ) : null}
          </FlexGap>
        </FlexGap>
        <div>
          <Text lineHeight="130%">
            <StyleUl>
              {info.desc.map((item) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={info.key}>{item}</li>
              ))}
            </StyleUl>
          </Text>
        </div>
        <Flex style={{ gap: 10 }}>
          {button && info.link ? (
            <Link href={info.link} style={{ width: '100%' }}>
              {button}
            </Link>
          ) : null}
          {button && !info.link && onClick ? button : null}
          {buttonSlot && buttonSlot}
        </Flex>
      </FlexGap>
    </StyledCard>
  )
}

const HeadImage = styled.div`
  width: 68px;
  height: 68px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 72px;
    height: 72px;
  }

  img {
    height: 100%;
  }
`
