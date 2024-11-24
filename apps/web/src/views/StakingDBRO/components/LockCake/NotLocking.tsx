import { useTranslation } from '@pancakeswap/localization'
import { Box, Button, ColumnCenter, Flex, Grid, Heading, useMatchBreakpoints } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useLockCakeData } from 'state/vecake/hooks'
import { useWriteApproveAndLockCallback } from 'views/StakingDBRO/hooks/useContractWrite'
import { useAccount, useWriteContract } from 'wagmi'
import { ChainId } from '@pancakeswap/chains'
import { formatUnits } from '@pancakeswap/utils/viem/formatUnits'
import deployedContracts from 'config/abi/deployedContracts'
import { waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { useCallback, useState } from 'react'
import { config } from 'utils/wagmi'
import { StyledCard } from './styled'
import { LockCakeForm } from '../LockCakeForm'
import { NewStakingDataSet } from '../DataSet'
import { useBSCCakeBalance } from '../../hooks/useBSCCakeBalance'

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
  const { address: account } = useAccount()
  const { t } = useTranslation()

  const _cakeBalance = useBSCCakeBalance()
  const balance = parseInt(formatUnits(_cakeBalance, 8)) ?? 0
  const canStake = BigInt(balance) >= BigInt(500000)
  const { cakeLockAmount, cakeLockWeeks } = useLockCakeData()

  const { isDesktop } = useMatchBreakpoints()
  const [isLoading, setIsLoading] = useState(false)
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>(undefined)
  const { writeContractAsync: stakeDBRO } = useWriteContract()

  const contractConfig = deployedContracts[84532].DBROWrappedStaking
  const contractDBRO = deployedContracts[84532].DecentralBros
  const contractRYFT = deployedContracts[84532].RYFT

  const handleModalOpen = useWriteApproveAndLockCallback(onDismiss)

  const handleStake = useCallback(async () => {
    if (!ChainId.BASE_SEPOLIA) return

    setIsLoading(true)

    try {
      const tx = await writeContract(config, {
        address: contractDBRO.address as `0x${string}`,
        abi: contractDBRO.abi,
        functionName: 'approve',
        args: [contractConfig.address, BigInt(balance)],
      })

      await waitForTransactionReceipt(config, {
        confirmations: 4,
        hash: tx,
        chainId: 84532,
      })

      const hash = await stakeDBRO({
        address: contractConfig.address as `0x${string}`,
        abi: contractConfig.abi,
        functionName: 'stake',
        args: [BigInt(balance)],
      })

      setTransactionHash(hash)
      // showSuccessToast('Staking transaction submitted!')
    } catch (error) {
      console.error('Staking failed:', error)
      // if (error instanceof Error) {
      //   showErrorToast(error.message)
      // } else {
      //   showErrorToast('Staking failed. Please try again.')
      // }
    } finally {
      setIsLoading(false)
    }
  }, [contractDBRO.address, contractDBRO.abi, contractConfig.address, contractConfig.abi, balance, stakeDBRO])

  return (
    <StyledCard innerCardProps={{ padding: hideCardPadding ? 0 : ['24px 16px', '24px 16px', '24px'] }}>
      <NewStakingDataSet
        cakeAmount={Number(cakeLockAmount)}
        customVeCakeCard={customVeCakeCard}
        customDataRow={customDataRow}
      />

      {!hideTitle && <Heading scale="md">{t('Stake DBRO To Earn DBRO')}</Heading>}

      <ColumnCenter>
        <Grid alignItems="center" gridColumnGap="24px" gridRowGap={isDesktop ? '12px' : '24px'} mt={24} width="100%">
          <LockCakeForm fieldOnly />

          {!account && <ConnectWalletButton width={['100%', '100%', '50%']} />}
        </Grid>
      </ColumnCenter>
    </StyledCard>
  )
}
