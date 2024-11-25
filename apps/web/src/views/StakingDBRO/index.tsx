import { ModalV2, PageHeader } from '@pancakeswap/uikit'
import { CrossChainVeCakeModal } from 'components/CrossChainVeCakeModal'
import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { CakeRewardsCard } from './components/CakeRewardsCard'
import { LockCake } from './components/LockCake'
import { PageHead } from './components/PageHead'

const DBROStaking = () => {
  const [cakeRewardModalVisible, setCakeRewardModalVisible] = useState(false)

  const handleDismiss = useCallback(() => setCakeRewardModalVisible(false), [])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ModalV2 isOpen={cakeRewardModalVisible} closeOnOverlayClick onDismiss={handleDismiss}>
        <CakeRewardsCard onDismiss={handleDismiss} />
      </ModalV2>
      <StyledPageHeader background="#000">
        <PageHead />
        <LockCake />
        {/* <Heading scale="xl" color="secondary" mt={['40px', '40px', '45px']} mb={['24px', '24px', '48px']}>
          {t('Benefits of veCAKE')}
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
                text={t(
                  'Claim freshly cooked CAKE rewards weekly on Thursday from veCAKE gauge emission as well as trading revenue sharing.',
                )}
                placement="top"
                ml="4px"
              />
            }
            dataText={`${formatNumber(Number(formatBigInt(totalCakeDistributed)))} CAKE`}
            onClick={() => {
              setCakeRewardModalVisible(true)
            }}
          />
          <BenefitCard
            headSlot={
              <QuestionHelper
                size="20px"
                text={t(
                  'Use your veCAKE to vote on your favourite farms, position managers, reward pools, and any CAKE emission products, increase their allocations, and get more CAKE rewards.',
                )}
                placement="top"
                ml="4px"
              />
            }
            type="gaugesVoting"
            dataText={`${gaugesVotingCount ?? 0}`}
            onClick={() => {}}
          />
        </Grid> */}
      </StyledPageHeader>
      {/* <Page title={t('CAKE Staking')}>
        <Heading scale="xl" mb={['24px', '24px', '48px']} mt={['16px', '16px', 0]}>
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
        </Grid>
        <Heading scale="xl" mb={['24px', '24px', '48px']} mt={['16px', '16px', '32px']}>
          {t('Enjoy These Benefits')}
        </Heading>
        <Grid
          maxWidth="820px"
          gridGap="24px"
          gridTemplateColumns={isDesktop ? 'repeat(2, 1fr)' : '1fr'}
          alignItems="center"
          mx="auto"
        >
          <BenefitCard
            type="farmBoost"
            headSlot={
              <QuestionHelper
                size="20px"
                text={t(
                  'Boost your PancakeSwap farming APR by up to 2.5x. Aquire more veCAKE to receive a higher boost.',
                )}
                placement="top"
                ml="4px"
              />
            }
            dataText="2.5x"
          />
          <BenefitCard
            type="snapshotVoting"
            headSlot={
              <QuestionHelper
                size="20px"
                text={t(
                  'Use veCAKE as your Snapshot voting power to vote on governance proposals. Including important protocol decisions, and adding new farming gauges.',
                )}
                placement="top"
                ml="4px"
              />
            }
            dataText={`${snapshotProposalsCount}`}
          />
          <BenefitCard
            type="ifo"
            headSlot={
              <QuestionHelper
                size="20px"
                text={t(
                  'Use your veCAKE as your IFO Public Sales commit credits. Aquire more veCAKE to commit more in the next PancakeSwap IFOs.',
                )}
                placement="top"
                ml="4px"
              />
            }
            dataText={`$${formatAmount(totalIFOSold, { notation: 'standard' })}`}
          />
          <BenefitCard type="more" />
        </Grid>
      </Page> */}
      <CrossChainVeCakeModal isOpen={isOpen} setIsOpen={setIsOpen} onDismiss={() => setIsOpen(false)} />
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

export default DBROStaking
