/* eslint-disable no-restricted-globals */
import { useTranslation } from '@pancakeswap/localization'
import { AutoRow, Box, Text } from '@pancakeswap/uikit'
import { formatUnits } from '@pancakeswap/utils/viem/formatUnits'
import deployedContracts from 'config/abi/deployedContracts'
import { refetchOptions } from 'config/query'
import { useWrappedUSD } from 'hooks/useWrappedUSD'
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

export const NewStakingDataSet: React.FC<React.PropsWithChildren<NewStakingDataSetProps>> = ({
  cakeAmount = 0,
  customVeCakeCard,
  customDataRow,
}) => {
  const { t } = useTranslation()

  const chainId = useChainId()
  const { address: account } = useAccount()

  const contractConfig = deployedContracts[8453].DBROWrappedStaking
  const contractRYFT = deployedContracts[8453].RYFT

  const { data: nftBalance } = useReadContract({
    address: contractRYFT.address as `0x${string}`,
    abi: contractRYFT.abi,
    functionName: 'balanceOf',
    args: [account as `0x${string}`, BigInt(0)],
    query: {
      enabled: Boolean(account),
      ...refetchOptions,
    },
    chainId: 8453,
  })

  const { data: tokenId } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'RYFT_TOKEN_ID',
    chainId: 8453,
  })

  const { data: totalNFTSupply } = useReadContract({
    address: contractRYFT.address as `0x${string}`,
    abi: contractRYFT.abi,
    functionName: 'totalSupply',
    args: [BigInt(0)],
    query: {
      enabled: Boolean(account),
      ...refetchOptions,
    },
    chainId: 8453,
  })

  const { data: unwrapFEE } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'UNWRAP_FEE_PERCENT',
    chainId: 8453,
  })

  const useUnwrapFee = useMemo((): bigint => {
    try {
      if (!unwrapFEE) {
        return BigInt(0)
      }

      return BigInt(String(unwrapFEE))
    } catch {
      return BigInt(0)
    }
  }, [unwrapFEE])

  const { data: requiredDBRO } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'REQUIRED_DBRO',
    chainId: 8453,
  })

  const { data: wrappedValue = '0.00' } = useWrappedUSD({
    account,
    requiredDBRO,
    nftBalance,
  })

  return (
    <>
      <Text fontSize={12} bold color="secondary" textTransform="uppercase">
        {t('minting overview')}
      </Text>
      <Box padding={['16px 0', '16px 0', 12]}>
        {customVeCakeCard ?? <MyVeCakeCard type="row" value={String(nftBalance ?? 0)} />}

        <AutoRow px={['0px', '0px', '16px']} py={['16px', '16px', '12px']} gap="8px">
          {customDataRow}
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Token Id')}
              </Text>
            }
            value={<ValueText>&bull; {String(tokenId ?? 0)}</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Unwrapping Fee')}
              </Text>
            }
            value={<ValueText>&bull; {`${useUnwrapFee}%`}</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Wrapped DBRO')}
              </Text>
            }
            value={
              <ValueText>
                &bull;{' '}
                {nftBalance && requiredDBRO
                  ? Number(
                      formatUnits(BigInt(Number(nftBalance) * Number(requiredDBRO) * 0.99) ?? 0, 8),
                    ).toLocaleString()
                  : 0}
              </ValueText>
            }
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Wrapped Value')}
              </Text>
            }
            value={
              <ValueText>
                &bull; <>${Math.floor(Number(wrappedValue)).toLocaleString()}</>
              </ValueText>
            }
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Claimed NFTs')}
              </Text>
            }
            value={<ValueText>&bull; {String(totalNFTSupply ?? 0)}</ValueText>}
          />
        </AutoRow>
      </Box>
    </>
  )
}
