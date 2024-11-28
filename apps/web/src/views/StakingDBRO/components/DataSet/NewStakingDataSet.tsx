import { useTranslation } from '@pancakeswap/localization'
import { AutoRow, Box, Text } from '@pancakeswap/uikit'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useAccount, useReadContract } from 'wagmi'
import deployedContracts from 'config/abi/deployedContracts'
import { formatUnits } from '@pancakeswap/utils/viem/formatUnits'
import { ChainId } from '@pancakeswap/chains'
import { DBRO_API } from 'config/constants/endpoints'
import qs from 'qs'
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

const RYFT_ADDRESS = '0x7aBe92aA0b6da4AeEf832F5Ce540dc49EAAd2dCA'
const DBRO_CONTRACT = '0x6a4e0F83D7882BcACFF89aaF6f60D24E13191E9F'
const REWARD_WALLET = '0xE31b8Ebc6b9Ae3622cF1e3bFf4c129A15b8d548c'
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

  const { data: treasuryBalance } = useReadContract({
    address: DBRO_CONTRACT,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [REWARD_WALLET as `0x${string}`],
  })

  const { data: stakeInfo } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'getStakeInfoAndPendingRewards',
    args: [account as `0x${string}`],
    query: {
      enabled: Boolean(account),
    },
  })

  const { data: requiredDBRO } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'REQUIRED_DBRO',
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

  const { data: maxStake } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'MAX_STAKE',
  })

  const { data: dbroBalance } = useReadContract({
    abi: erc20ABI,
    address: DBRO_CONTRACT,
    functionName: 'balanceOf',
    args: [RYFT_ADDRESS],
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

  const [poolValue, setPoolValue] = useState('0.00')
  const [walletValue, setWalletValue] = useState('0.00')
  const [wrappedValue, setWrappedValue] = useState('0.00')

  const fetchUSDValues = useCallback(async () => {
    try {
      const params = {
        chainId: ChainId.BASE,
        address: account,
        native: false,
        contract: DBRO_CONTRACT,
        decimals: 8,
      }

      const response = await fetch(`${DBRO_API}/balance/usd?${qs.stringify(params)}`)
      const usd = await response.json()

      if (usd && contractTokens) {
        const pool = formatUnits(BigInt(String(contractTokens)), 8)

        setPoolValue((Number(usd) * Number(pool)).toFixed(2))
      } else {
        setPoolValue('0.00')
      }

      if (usd && treasuryBalance) {
        const treasury = formatUnits(BigInt(treasuryBalance), 8)

        setWalletValue((Number(usd) * Number(treasury)).toFixed(2))
      } else {
        setWalletValue('0.00')
      }

      if (usd && dbroBalance) {
        const dbro = formatUnits(BigInt(dbroBalance), 8)

        setWrappedValue((Number(usd) * Number(dbro)).toFixed(2))
      } else {
        setWrappedValue('0.00')
      }
    } catch {
      setPoolValue('0.00')
      setWalletValue('0.00')
      setWrappedValue('0.00')
    }
  }, [account, contractTokens, dbroBalance, treasuryBalance])

  useEffect(() => {
    fetchUSDValues()
    // eslint-disable-next-line
  }, [contractTokens, dbroBalance, treasuryBalance])

  return (
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
                {t('Reward Rate')}
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
            value={
              <ValueText>&bull; {formatNumberWithCommas(formatUnits((requiredDBRO as bigint) ?? 0, 8))} DBRO</ValueText>
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
                &bull; <>{(contractTokens as bigint) && formatBalance(BigInt(String(contractTokens)), 8)}</> DBRO
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
                &bull; <>${poolValue}</>
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
                &bull; <>{((treasuryBalance as bigint) && formatBalance(BigInt(String(treasuryBalance)), 8)) ?? 0}</>{' '}
                DBRO
              </ValueText>
            }
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Wallet Value')}{' '}
              </Text>
            }
            value={
              <ValueText>
                &bull; <>${walletValue}</>
              </ValueText>
            }
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Total Wrapped')}
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
                {t('Total Value')}
              </Text>
            }
            value={
              <ValueText>
                &bull; <>${wrappedValue}</>
              </ValueText>
            }
          />
        </AutoRow>
      </Box>
    </>
  )
}
