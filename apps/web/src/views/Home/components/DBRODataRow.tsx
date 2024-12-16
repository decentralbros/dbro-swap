import { useTranslation } from '@pancakeswap/localization'
import { Balance, Flex, Skeleton, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { formatUnits } from '@pancakeswap/utils/viem/formatUnits'
import deployedContracts from 'config/abi/deployedContracts'
import { DBRO_CONTRACT, REWARD_WALLET, RYFT_ADDRESS } from 'config/constants/contracts'
import { styled } from 'styled-components'
import { useReadContract } from 'wagmi'

const StyledColumn = styled(Flex)<{ noMobileBorder?: boolean; noDesktopBorder?: boolean }>`
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.cardBorder};
    border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  }
  &:nth-child(2n) {
    border-right: none;
  }
  width: 50%;
  ${({ theme }) => theme.mediaQueries.sm} {
    &:not(:last-child) {
      border-right: 1px solid ${({ theme }) => theme.colors.cardBorder};
      border-bottom: none;
    }
    &:nth-child(3) {
      border-right: none;
    }
    width: 33%;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: auto;
    &:not(:last-child) {
      border-right: 1px solid ${({ theme }) => theme.colors.cardBorder};
    }
  }
`
const StyledWrapper = styled(Flex)`
  margin-top: 24px;
  flex-direction: row;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    flex-wrap: nowrap;
  }
`

const erc20ABI = [
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]

const DBRODataRow = () => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const stakingContract = deployedContracts[8453].DBROWrappedStaking

  const { data: dbroSupply } = useReadContract({
    address: DBRO_CONTRACT,
    abi: erc20ABI,
    functionName: 'totalSupply',
    chainId: 8453,
    query: {
      refetchInterval: 60_000,
    },
  })

  const { data: treasuryBalance } = useReadContract({
    address: DBRO_CONTRACT,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [REWARD_WALLET as `0x${string}`],
    chainId: 8453,
    query: {
      refetchInterval: 60_000,
    },
  })

  const { data: contractTokens } = useReadContract({
    address: stakingContract.address as `0x${string}`,
    abi: stakingContract.abi,
    functionName: 'totalRewardTokens',
    chainId: 8453,
    query: {
      refetchInterval: 60_000,
    },
  })

  const { data: dbroBalance } = useReadContract({
    abi: erc20ABI,
    address: DBRO_CONTRACT,
    functionName: 'balanceOf',
    args: [RYFT_ADDRESS],
    chainId: 8453,
    query: {
      refetchInterval: 60_000,
    },
  })

  return (
    <StyledWrapper mb={isMobile ? '30px' : '50px'}>
      <StyledColumn noMobileBorder>
        <Text bold fontSize={isMobile ? '14px' : undefined}>
          {t('Total Supply')}
        </Text>
        {dbroSupply ? (
          <Balance
            color="secondary"
            decimals={0}
            lineHeight="1.1"
            fontSize="24px"
            bold
            value={Number(formatUnits(dbroSupply as bigint, 8))}
          />
        ) : (
          <>
            <Skeleton height={24} width={126} my="4px" />
          </>
        )}
      </StyledColumn>

      <StyledColumn>
        <Text color="text" bold fontSize={isMobile ? '14px' : undefined}>
          {t('Treasury Balance')}
        </Text>
        {treasuryBalance ? (
          <Balance
            decimals={0}
            lineHeight="1.1"
            fontSize="24px"
            bold
            value={Number(formatUnits(treasuryBalance as bigint, 8))}
            color="secondary"
          />
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </StyledColumn>

      <StyledColumn>
        <Text color="text" bold fontSize={isMobile ? '14px' : undefined}>
          {t('Stake Pool')}
        </Text>
        {contractTokens ? (
          <Balance
            decimals={0}
            lineHeight="1.1"
            fontSize="24px"
            bold
            value={Number(formatUnits(contractTokens as bigint, 8))}
            color="secondary"
          />
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </StyledColumn>

      <StyledColumn>
        <Text color="text" bold fontSize={isMobile ? '14px' : undefined}>
          {t('NFT Wrapped Pool')}
        </Text>
        {dbroBalance ? (
          <Balance
            decimals={0}
            lineHeight="1.1"
            fontSize="24px"
            bold
            value={Number(formatUnits(dbroBalance as bigint, 8))}
            color="secondary"
          />
        ) : (
          <Skeleton height={24} width={126} my="4px" />
        )}
      </StyledColumn>
    </StyledWrapper>
  )
}

export default DBRODataRow
