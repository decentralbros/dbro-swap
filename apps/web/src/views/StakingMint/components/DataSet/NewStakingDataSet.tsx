import { useTranslation } from '@pancakeswap/localization'
import { AutoRow, Box, Text } from '@pancakeswap/uikit'
import React from 'react'
import styled from 'styled-components'
import { useAccount, useChainId, useReadContract } from 'wagmi'
import deployedContracts from 'config/abi/deployedContracts'
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

  const contractConfig = deployedContracts[84532].DBROWrappedStaking
  const contractDBRO = deployedContracts[84532].DecentralBros
  const contractRYFT = deployedContracts[84532].RYFT

  const { data: nftBalance } = useReadContract({
    address: contractRYFT.address as `0x${string}`,
    abi: contractRYFT.abi,
    functionName: 'balanceOf',
    args: [account as `0x${string}`, BigInt(0)],
    chainId,
    query: {
      enabled: Boolean(account),
      refetchInterval: 5_000,
    },
  })

  const { data: tokenId } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'RYFT_TOKEN_ID',
  })

  return (
    <>
      <Text fontSize={12} bold color="secondary" textTransform="uppercase">
        {t('minting overview')}
      </Text>
      <Box padding={['16px 0', '16px 0', 12]}>
        {customVeCakeCard ?? <MyVeCakeCard type="row" value={String(nftBalance)} />}

        <AutoRow px={['0px', '0px', '16px']} py={['16px', '16px', '12px']} gap="8px">
          {customDataRow}
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Token Id')}
              </Text>
            }
            value={<ValueText>&bull; {String(tokenId) ?? 0}</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Total Minted')}
              </Text>
            }
            value={<ValueText>&bull; 5</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Wrapped DBRO')}
              </Text>
            }
            value={<ValueText>&bull; 500,000</ValueText>}
          />
          <DataRow
            label={
              <Text fontSize={14} color="textSubtle" textTransform="capitalize">
                {t('Wrapped Value')}
              </Text>
            }
            value={<ValueText>&bull; $50</ValueText>}
          />
        </AutoRow>
      </Box>
    </>
  )
}
