import { Grid, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useLockModal } from 'views/StakingDBRO/hooks/useLockModal'
import { useCakeLockStatus } from 'views/StakingDBRO/hooks/useVeCakeUserInfo'
import { ChainId } from '@pancakeswap/chains'
import { CakeLockStatus } from '../../types'
import { ApproveAndLockModal } from '../ApproveAndLockModal'
import { NotLocking } from './NotLocking'

const customCols = {
  [CakeLockStatus.NotLocked]: '1fr',
  [CakeLockStatus.Expired]: 'auto 1fr',
}

export const LockCake = () => {
  const { status } = useCakeLockStatus(ChainId.BASE)
  const { isMobile } = useMatchBreakpoints()

  const { modal, modalData } = useLockModal()

  return (
    <>
      <ApproveAndLockModal {...modal} {...modalData} />
      <Grid mt="22px" gridGap="24px" gridTemplateColumns={isMobile ? '1fr' : customCols[status] ?? '1fr 2fr'} mx="auto">
        <NotLocking />
      </Grid>
    </>
  )
}
