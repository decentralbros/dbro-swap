import { useTranslation } from '@pancakeswap/localization'
import { Box, ColumnCenter, Grid, Heading, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useLockCakeData } from 'state/vecake/hooks'
import { NewStakingDataSet } from '../DataSet'
import { LockCakeForm } from '../LockCakeForm'
import { StyledCard } from './styled'

export const NotLocking = () => {
  return (
    <>
      <Box maxWidth={['100%', '100%', '75%']} mx="auto">
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
  const { isDesktop } = useMatchBreakpoints()

  return (
    <StyledCard innerCardProps={{ padding: hideCardPadding ? 0 : ['24px 16px', '24px 16px', '24px'] }}>
      {!hideTitle && (
        <Heading scale="md" color="secondary" mb="8px">
          {t('DBRO Utility NFTs')}
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
