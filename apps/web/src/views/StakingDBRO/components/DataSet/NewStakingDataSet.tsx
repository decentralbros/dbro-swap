import { ChainId } from '@pancakeswap/chains'
import { useTranslation } from '@pancakeswap/localization'
import { AutoRow, Box, Text } from '@pancakeswap/uikit'
import { formatUnits } from '@pancakeswap/utils/viem/formatUnits'
import deployedContracts from 'config/abi/deployedContracts'

import { DBRO_CONTRACT, REWARD_WALLET, RYFT_ADDRESS } from 'config/constants/contracts'
import { refetchOptions } from 'config/query'
import { useStakingUSD } from 'hooks/useStakingUSD'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useAccount, useChainId, useReadContract } from 'wagmi'
import { MyVeCakeCard } from '../MyVeCakeCard'
import { DataRow } from './DataBox'

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

const erc20ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

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

  const contractConfig = deployedContracts[8453].DBROWrappedStaking

  const { address: account } = useAccount()
  const chainId = useChainId()

  const { data: treasuryBalance } = useReadContract({
    address: DBRO_CONTRACT,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [REWARD_WALLET as `0x${string}`],
    query: {
      ...refetchOptions,
      enabled: chainId === ChainId.BASE,
    },
    chainId: ChainId.BASE,
  })

  const { data: stakeInfo } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'getStakeInfoAndPendingRewards',
    args: [account as `0x${string}`],
    query: {
      ...refetchOptions,
      enabled: Boolean(account) && chainId === ChainId.BASE,
    },
    chainId: ChainId.BASE,
  })

  const { data: requiredDBRO } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'REQUIRED_DBRO',
    query: {
      enabled: chainId === ChainId.BASE,
    },
    chainId: ChainId.BASE,
  })

  const { data: rewardRate } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'getAnnualRewardRate',
    query: {
      enabled: chainId === ChainId.BASE,
    },
    chainId: ChainId.BASE,
  })

  const { data: contractTokens } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'totalRewardTokens',
    chainId: ChainId.BASE,
    query: {
      ...refetchOptions,
      enabled: chainId === ChainId.BASE,
    },
  })

  const { data: maxStake } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'MAX_STAKE',
    query: {
      enabled: chainId === ChainId.BASE,
    },
    chainId: ChainId.BASE,
  })

  const { data: dbroBalance } = useReadContract({
    abi: erc20ABI,
    address: DBRO_CONTRACT,
    functionName: 'balanceOf',
    args: [RYFT_ADDRESS],
    query: {
      ...refetchOptions,
      enabled: chainId === ChainId.BASE,
    },
    chainId: ChainId.BASE,
  })

  const useMaxStake = useMemo((): bigint => {
    try {
      if (!maxStake) {
        return BigInt(0)
      }

      return BigInt(Number(maxStake))
    } catch {
      return BigInt(0)
    }
  }, [maxStake])

  const useRequiredDBRO = useMemo((): bigint => {
    try {
      if (!requiredDBRO) {
        return BigInt(0)
      }

      return BigInt(Number(requiredDBRO))
    } catch {
      return BigInt(0)
    }
  }, [requiredDBRO])

  const { data: usdValues } = useStakingUSD({
    contractTokens,
    treasuryBalance,
    dbroBalance,
    useRequiredDBRO,
  })

  const { poolValue, walletValue, wrappedValue, claimValue } = usdValues ?? {
    poolValue: '0.00',
    walletValue: '0.00',
    wrappedValue: '0.00',
    claimValue: '0.00',
  }

  return (
    <>
      {chainId === ChainId.BASE && account && (
        <>
          <Text fontSize={12} bold color="secondary" textTransform="uppercase">
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
                    &bull; {stakeInfo ? formatNumberWithCommas(formatUnits(stakeInfo[0].amountStaked, 8)) : 0} DBRO
                  </ValueText>
                }
              />
              <DataRow
                label={
                  <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                    {t('Max Stake')}
                  </Text>
                }
                value={<ValueText>&bull; {Number(formatUnits(useMaxStake, 8)).toLocaleString()} DBRO</ValueText>}
              />
              <DataRow
                label={
                  <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                    {t('APY')}
                  </Text>
                }
                value={<ValueText>&bull; {`${rewardRate ?? 0}%`}</ValueText>}
              />
              <DataRow
                label={
                  <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                    {t('Claim Threshold')}
                  </Text>
                }
                value={<ValueText>&bull; {formatNumberWithCommas(formatUnits(useRequiredDBRO, 8))} DBRO</ValueText>}
              />
              <DataRow
                label={
                  <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                    {t('Claim Value')}
                  </Text>
                }
                value={
                  <ValueText>
                    &bull; <>${claimValue}</>
                  </ValueText>
                }
              />
              <DataRow
                label={
                  <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                    {t('Stake Pool')}
                  </Text>
                }
                value={
                  <ValueText>
                    &bull; <>{(contractTokens as bigint) ? formatBalance(BigInt(String(contractTokens)), 8) : 0}</> DBRO
                  </ValueText>
                }
              />
              <DataRow
                label={
                  <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                    {t('Pool Value')}
                  </Text>
                }
                value={
                  <ValueText>
                    &bull; <>${Math.floor(Number(poolValue)).toLocaleString()}</>
                  </ValueText>
                }
              />
              <DataRow
                label={
                  <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                    {t('DBRO Treasury')}
                  </Text>
                }
                value={
                  <ValueText>
                    &bull; <>{(treasuryBalance as bigint) ? formatBalance(BigInt(String(treasuryBalance)), 8) : 0}</>{' '}
                    DBRO
                  </ValueText>
                }
              />
              <DataRow
                label={
                  <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                    {t('Treasury Value')}
                  </Text>
                }
                value={
                  <ValueText>
                    &bull; <>${Math.floor(Number(walletValue)).toLocaleString()}</>
                  </ValueText>
                }
              />
              <DataRow
                label={
                  <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                    {t('NFT Wrapped Pool')}
                  </Text>
                }
                value={
                  <ValueText>
                    &bull; <>{(dbroBalance as bigint) ? formatBalance(BigInt(String(dbroBalance)), 8) : 0}</> DBRO
                  </ValueText>
                }
              />
              <DataRow
                label={
                  <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                    {t('NFT Pool Value')}
                  </Text>
                }
                value={
                  <ValueText>
                    &bull; <>${Math.floor(Number(wrappedValue)).toLocaleString()}</>
                  </ValueText>
                }
              />
            </AutoRow>
          </Box>
        </>
      )}
    </>
  )
}
