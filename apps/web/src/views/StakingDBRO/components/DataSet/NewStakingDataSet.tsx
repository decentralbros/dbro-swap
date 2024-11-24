import { useTranslation } from '@pancakeswap/localization'
import { AutoRow, Box, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import BN from 'bignumber.js'
import { WEEK } from 'config/constants/veCake'
import React, { useMemo } from 'react'
import { useLockCakeData } from 'state/vecake/hooks'
import styled from 'styled-components'
import { useProxyVeCakeBalance } from 'views/StakingDBRO/hooks/useProxyVeCakeBalance'
import { useTargetUnlockTime } from 'views/StakingDBRO/hooks/useTargetUnlockTime'
import { useVeCakeAmount } from 'views/StakingDBRO/hooks/useVeCakeAmount'
import { useAccount, useReadContract } from 'wagmi'
import deployedContracts from 'config/abi/deployedContracts'
import { formatUnits } from '@pancakeswap/utils/viem/formatUnits'
import { useBSCCakeBalance } from '../../hooks/useBSCCakeBalance'
import { DataRow } from './DataBox'
import { MyVeCakeCard } from '../MyVeCakeCard'

const ValueText = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  color: #1bf696;
`

interface NewStakingDataSetProps {
  cakeAmount?: number
  customVeCakeCard?: JSX.Element
  customDataRow?: JSX.Element
}

// Reading balance of the reward wallet
const TREASURY_ADDRESS = '0x2a2cf9C06514494538E90Bb6b090DdB3792fA2FF'
const CONTRACT = '0x5B7a6C42ee3ddf82582BA759Bb59A990D0e97398'
const erc20ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

// Reading balance of the DBRO tokens wrapped in RYFT contract
const RYFT_ADDRESS = '0x0C9F57B01BE2690d469B01E44ff404F45b81Af2e'
const DBRO_CONTRACT = '0x5B7a6C42ee3ddf82582BA759Bb59A990D0e97398'

const formatNumberWithCommas = (value: string): string => {
  const parts = value.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts[0]
}

const formatBalance = (balance: bigint, decimals: number = 18) => {
  const formatted = Number(formatUnits(balance, decimals))
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0, // Adjust as needed
  }).format(formatted)
}

export const NewStakingDataSet: React.FC<React.PropsWithChildren<NewStakingDataSetProps>> = ({
  cakeAmount = 0,
  customVeCakeCard,
  customDataRow,
}) => {
  const { t } = useTranslation()
  const { cakeLockWeeks } = useLockCakeData()
  const { isDesktop } = useMatchBreakpoints()

  const unlockTimestamp = useTargetUnlockTime(Number(cakeLockWeeks) * WEEK)
  const cakeAmountBN = useMemo(() => getDecimalAmount(new BN(cakeAmount)).toString(), [cakeAmount])
  const veCakeAmountFromNative = useVeCakeAmount(cakeAmountBN, unlockTimestamp)
  const { balance: proxyVeCakeBalance } = useProxyVeCakeBalance()
  const veCakeAmount = useMemo(
    () => proxyVeCakeBalance.plus(veCakeAmountFromNative),
    [proxyVeCakeBalance, veCakeAmountFromNative],
  )

  const contractConfig = deployedContracts[84532].DBROWrappedStaking
  const contractDBRO = deployedContracts[84532].DecentralBros
  const contractRYFT = deployedContracts[84532].RYFT

  const { address: account } = useAccount()

  const _cakeBalance = useBSCCakeBalance()
  const currentBalance = parseInt(formatUnits(_cakeBalance, 8)) ?? 0

  const { data: treasuryBalance } = useReadContract({
    abi: erc20ABI,
    address: CONTRACT,
    functionName: 'balanceOf',
    args: [TREASURY_ADDRESS],
  })

  const { data: dbroBalance } = useReadContract({
    abi: erc20ABI,
    address: DBRO_CONTRACT,
    functionName: 'balanceOf',
    args: [RYFT_ADDRESS],
  })

  const { data: nftBalance } = useReadContract({
    address: contractRYFT.address as `0x${string}`,
    abi: contractRYFT.abi,
    functionName: 'balanceOf',
    args: [account as `0x${string}`, BigInt(0)],
  })

  const { data: totalNFTSupply } = useReadContract({
    address: contractRYFT.address as `0x${string}`,
    abi: contractRYFT.abi,
    functionName: 'totalSupply',
    args: [BigInt(0)],
  })

  const { data: stakeInfo, refetch: refetchStakeInfo } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'getStakeInfoAndPendingRewards',
    args: [account as `0x${string}`],
  })

  const { data: requiredDBRO } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'REQUIRED_DBRO',
  })

  const { data: unwrapFEE } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'UNWRAP_FEE_PERCENT',
  })

  const { data: rewardRate } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'getAnnualRewardRate',
  })

  const { data: contractTokens } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'totalRewardTokens',
  })

  const { data: tokenId } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'RYFT_TOKEN_ID',
  })

  return (
    <>
      <Text fontSize={12} bold color={isDesktop ? 'textSubtle' : undefined} textTransform="uppercase">
        {t('staking overview')}
      </Text>
      <Box padding={['16px 0', '16px 0', 12]}>
        {customVeCakeCard ?? (
          <MyVeCakeCard
            type="row"
            value={stakeInfo ? formatNumberWithCommas(String(formatUnits(BigInt(stakeInfo[1]), 8))) : '0'}
          />
        )}

        <AutoRow px={['0px', '0px', '16px']} py={['16px', '16px', '12px']} gap="8px">
          {customDataRow}

          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Your Stake')}
              </Text>
            }
            value={
              <ValueText>
                &bull; {stakeInfo ? formatNumberWithCommas(formatUnits(stakeInfo[0].amountStaked, 8)) : 0}
              </ValueText>
            }
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Reward Rate')}
              </Text>
            }
            value={<ValueText>&bull; {String(rewardRate) && `${rewardRate}%`}</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Min. Stake')}
              </Text>
            }
            value={<ValueText>&bull; 25k DBRO</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Max Stake')}
              </Text>
            }
            value={<ValueText>&bull; 5M DBRO</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Claim Threshold')}
              </Text>
            }
            value={<ValueText>&bull; 500k DBRO</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Wrapping Cost')}
              </Text>
            }
            value={
              <ValueText>
                &bull; {String(requiredDBRO) && formatNumberWithCommas(formatUnits(BigInt(String(requiredDBRO)), 8))}{' '}
                DBRO
              </ValueText>
            }
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Reward Wallet')}
              </Text>
            }
            value={
              <ValueText>
                &bull; {String(treasuryBalance) && formatBalance(BigInt(String(treasuryBalance)), 8)} DBRO
              </ValueText>
            }
          />
        </AutoRow>
      </Box>
    </>
  )
}
