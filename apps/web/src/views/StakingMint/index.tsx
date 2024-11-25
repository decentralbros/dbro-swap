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

const StakingMint = () => {
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
      <ModalV2 isOpen={cakeRewardModalVisible} closeOnOverlayClick onDismiss={handleDismiss}>
        <CakeRewardsCard onDismiss={handleDismiss} />
      </ModalV2>
      <StyledPageHeader background="#000">
        <PageHead />
        <LockCake />
      </StyledPageHeader>

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

export default StakingMint
