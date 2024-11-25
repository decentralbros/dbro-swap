import { useTranslation } from '@pancakeswap/localization'
import { Box, Button, ColumnCenter, Grid, Heading, Skeleton, useMatchBreakpoints } from '@pancakeswap/uikit'
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
  const _cakeBalance = useBSCCakeBalance()
  const { cakeLockAmount, cakeLockWeeks } = useLockCakeData()
  const { isDesktop } = useMatchBreakpoints()

  return (
    <StyledCard innerCardProps={{ padding: hideCardPadding ? 0 : ['24px 16px', '24px 16px', '24px'] }}>
      {!hideTitle && (
        <Heading scale="md" color="secondary" mb="8px">
          {t('Wrap DBRO For Utility NFTs')}
        </Heading>
      )}

      <Grid
        gridTemplateColumns={isDesktop ? '1fr 1fr' : '1fr'}
        gridColumnGap="24px"
        gridRowGap={isDesktop ? '0' : '24px'}
        padding={[0, 0]}
        mt={32}
        mb={32}
        display="flex"
        justifyContent="space-between"
      >
        <ColumnCenter>
          <LockCakeForm fieldOnly />
        </ColumnCenter>

        <ColumnCenter>
          <img src="/images/swap/nft.png" alt="dbro nft" height="auto" width="300px" />
        </ColumnCenter>
      </Grid>

      <NewStakingDataSet
        cakeAmount={Number(cakeLockAmount)}
        customVeCakeCard={customVeCakeCard}
        customDataRow={customDataRow}
      />
    </StyledCard>
  )
}
