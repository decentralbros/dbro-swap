import { useTranslation } from '@pancakeswap/localization'
import { Card, FlexGap, Grid, Heading, PageHeader, QuestionHelper, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { formatAmount } from '@pancakeswap/utils/formatInfoNumbers'
import Page from 'components/Layout/Page'
import styled from 'styled-components'
import { useGauges } from 'views/GaugesVoting/hooks/useGauges'
import { BenefitCard } from './components/BenefitCard'
import { useSnapshotProposalsCount } from './hooks/useSnapshotProposalsCount'
import { useTotalIFOSold } from './hooks/useTotalIFOSold'

const StyledCard = styled(Card)`
  height: 100%;
  width: 100%;
`

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  overflow: hidden;
`

const ResponsiveIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`

const VideoPlayer = () => {
  return (
    <VideoContainer>
      <ResponsiveIframe
        src="https://decentralbros.s3.us-east-1.amazonaws.com/dbro-wrapped-staking.mp4"
        title="DBRO Wrapped Staking"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </VideoContainer>
  )
}

const StakingLearn = () => {
  const { t } = useTranslation()
  const { data: gauges } = useGauges()
  const gaugesVotingCount = gauges?.length
  const snapshotProposalsCount = useSnapshotProposalsCount()
  // const [cakeRewardModalVisible, setCakeRewardModalVisible] = useState(false)
  const totalIFOSold = useTotalIFOSold()
  const { isDesktop } = useMatchBreakpoints()

  return (
    <>
      {/* <ModalV2 isOpen={cakeRewardModalVisible} closeOnOverlayClick onDismiss={handleDismiss}>
        <CakeRewardsCard onDismiss={handleDismiss} />
      </ModalV2> */}
      <StyledPageHeader background="#000">
        {/* <PageHead />
        <LockCake /> */}
        <Heading scale="xl" color="secondary" mb={['24px', '24px', '48px']}>
          {t('Welcome To Hybrid Staking!')}
        </Heading>
        <Grid alignItems="center" mx="auto" mb={['24px', '24px', '48px']} maxWidth="720px">
          <StyledCard innerCardProps={{ p: ['16px', '16px', '24px'] }}>
            <FlexGap flexDirection="column">
              <VideoPlayer />
            </FlexGap>
          </StyledCard>
        </Grid>

        <Heading scale="xl" color="secondary" mb={['24px', '24px', '48px']}>
          {t('Earn With Your DBRO')}
        </Heading>
        <Grid
          maxWidth="820px"
          gridGap="24px"
          gridTemplateColumns={isDesktop ? 'repeat(2, 1fr)' : '1fr'}
          alignItems="center"
          mx="auto"
        >
          <BenefitCard
            type="earnCake"
            headSlot={
              <QuestionHelper
                size="20px"
                text={t('Claim freshly earned DBRO rewards, or unstake at any time!')}
                placement="top"
                ml="4px"
              />
            }
            dataText={`${0} DBRO`}
          />
          <BenefitCard
            headSlot={
              <QuestionHelper
                size="20px"
                text={t('Use your DBRO rewards to unlock token wrapped utility NFTs!')}
                placement="top"
                ml="4px"
              />
            }
            type="gaugesVoting"
            dataText={`${gaugesVotingCount ?? 0}`}
            onClick={() => {}}
          />
        </Grid>
      </StyledPageHeader>
      <Page title={t('Learn More')}>
        {/* <Heading scale="xl" mb={['24px', '24px', '48px']} mt={['16px', '16px', 0]}>
          {t('Enjoy on Every Chains')}
        </Heading>
        <Grid maxWidth="820px" gridGap="24px" gridTemplateColumns="1fr" alignItems="center" mx="auto">
          <BenefitCard
            type="crossChain"
            dataText={`${Object.keys(CROSS_CHIAN_CONFIG).length + 1}`}
            onClick={() => {
              setIsOpen(true)
            }}
            buttonSlot={
              <Button
                variant="secondary"
                width="100%"
                onClick={() => {
                  window.open('https://x.com/DecentralBros_', '_blank', 'noopener noreferrer')
                }}
              >
                {t('Learn More')}
              </Button>
            }
          />
        </Grid> */}
        <Heading scale="xl" my={['16px', '16px', '32px']} color="secondary">
          {t('Enjoy Utility NFT Benefits')}
        </Heading>
        <Text fontSize="18px" color="subtleText" mb={['24px', '24px', '48px']}>
          Additional Benefits Coming Soon!
        </Text>

        <Grid
          maxWidth="820px"
          gridGap="24px"
          gridTemplateColumns={isDesktop ? 'repeat(2, 1fr)' : '1fr'}
          alignItems="center"
          mx="auto"
        >
          <BenefitCard
            type="ifo"
            headSlot={<></>}
            dataText={`$${formatAmount(totalIFOSold, { notation: 'standard' })}`}
          />
          <BenefitCard type="more" />
          <BenefitCard type="farmBoost" headSlot={<></>} dataText="2.5x" />
          <BenefitCard type="snapshotVoting" headSlot={<></>} dataText={`${snapshotProposalsCount}`} />
        </Grid>
      </Page>
      {/* <CrossChainVeCakeModal isOpen={isOpen} setIsOpen={setIsOpen} onDismiss={() => setIsOpen(false)} /> */}
    </>
  )
}

const StyledPageHeader = styled(PageHeader)`
  padding-top: 32px;
  padding-bottom: 32px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 56px;
    padding-bottom: 56px;
  }
`

export default StakingLearn
