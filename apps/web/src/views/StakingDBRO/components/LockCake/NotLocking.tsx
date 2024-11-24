import { useTranslation } from '@pancakeswap/localization'
import { Box, Button, ColumnCenter, Grid, Heading, useMatchBreakpoints } from '@pancakeswap/uikit'
import { getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import BN from 'bignumber.js'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useMemo } from 'react'
import { useLockCakeData } from 'state/vecake/hooks'
import { useWriteApproveAndLockCallback } from 'views/StakingDBRO/hooks/useContractWrite'
import { useAccount } from 'wagmi'
import { useBSCCakeBalance } from '../../hooks/useBSCCakeBalance'
import { NewStakingDataSet } from '../DataSet'
import { LockCakeForm } from '../LockCakeForm'
import { StyledCard } from './styled'

export const NotLocking = () => {
  return (
    <>
      <Box maxWidth={['100%', '100%', '72%']} mx="auto">
        <NotLockingCard />
      </Box>
    </>
  )
}

interface NotLockingCardProps {
  hideTitle?: boolean
  hideCardPadding?: boolean
  customVeCakeCard?: JSX.Element
  customDataRow?: JSX.Element
  onDismiss?: () => void
}

export const NotLockingCard: React.FC<React.PropsWithChildren<NotLockingCardProps>> = ({
  hideTitle,
  hideCardPadding,
  customVeCakeCard,
  customDataRow,
  onDismiss,
}) => {
  const { t } = useTranslation()
  const { cakeLockAmount, cakeLockWeeks } = useLockCakeData()

  return (
    <StyledCard innerCardProps={{ padding: hideCardPadding ? 0 : ['24px 16px', '24px 16px', '24px'] }}>
      {!hideTitle && <Heading scale="md">{t('Stake DBRO to earn DBRO')}</Heading>}

      <NewStakingDataSet
        cakeAmount={Number(cakeLockAmount)}
        customVeCakeCard={customVeCakeCard}
        customDataRow={customDataRow}
      />

      <Grid width="100%">
        <LockCakeForm fieldOnly />
      </Grid>
    </StyledCard>
  )
}
