import { useTranslation } from '@pancakeswap/localization'
import { Button, Grid, Heading, ModalV2, PageHeader, QuestionHelper, useMatchBreakpoints } from '@pancakeswap/uikit'
import { formatBigInt, formatNumber } from '@pancakeswap/utils/formatBalance'
import { formatAmount } from '@pancakeswap/utils/formatInfoNumbers'
import { CrossChainVeCakeModal } from 'components/CrossChainVeCakeModal'
import { CROSS_CHIAN_CONFIG } from 'components/CrossChainVeCakeModal/constants'
import Page from 'components/Layout/Page'
import { useCakeDistributed } from 'hooks/useCakeDistributed'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useGauges } from 'views/GaugesVoting/hooks/useGauges'
import { BenefitCard } from './components/BenefitCard'
import { CakeRewardsCard } from './components/CakeRewardsCard'
import { LockCake } from './components/LockCake'
import { PageHead } from './components/PageHead'
import { useSnapshotProposalsCount } from './hooks/useSnapshotProposalsCount'
import { useTotalIFOSold } from './hooks/useTotalIFOSold'

const StakingLearn = () => {
  const { t } = useTranslation()
  const { data: gauges } = useGauges()
  const gaugesVotingCount = gauges?.length
  const snapshotProposalsCount = useSnapshotProposalsCount()
  const totalCakeDistributed = useCakeDistributed()
  const [cakeRewardModalVisible, setCakeRewardModalVisible] = useState(false)
  const totalIFOSold = useTotalIFOSold()
  const { isDesktop } = useMatchBreakpoints()
  const handleDismiss = useCallback(() => setCakeRewardModalVisible(false), [])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* <ModalV2 isOpen={cakeRewardModalVisible} closeOnOverlayClick onDismiss={handleDismiss}>
        <CakeRewardsCard onDismiss={handleDismiss} />
      </ModalV2> */}
      <StyledPageHeader background="#000">
        {/* <PageHead />
        <LockCake /> */}
        <Heading scale="xl" color="secondary" mb={['24px', '24px', '48px']}>
          {t('Earn With Hybrid Staking')}
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
            onClick={() => {
              setCakeRewardModalVisible(true)
            }}
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
        <Heading scale="xl" mb={['24px', '24px', '48px']} mt={['16px', '16px', '32px']} color="secondary">
          {t('Utility NFT Benefits')}
        </Heading>
        <Grid
          maxWidth="820px"
          gridGap="24px"
          gridTemplateColumns={isDesktop ? 'repeat(2, 1fr)' : '1fr'}
          alignItems="center"
          mx="auto"
        >
          <BenefitCard type="farmBoost" headSlot={<></>} dataText="2.5x" />
          <BenefitCard type="snapshotVoting" headSlot={<></>} dataText={`${snapshotProposalsCount}`} />
          <BenefitCard
            type="ifo"
            headSlot={<></>}
            dataText={`$${formatAmount(totalIFOSold, { notation: 'standard' })}`}
          />
          <BenefitCard type="more" />
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
