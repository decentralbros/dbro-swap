import { useTranslation } from '@pancakeswap/localization'
import { FlexGap, Text, MintInput, Button, useToast, Dots } from '@pancakeswap/uikit'
import { useCallback, useState } from 'react'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useAccount, useChainId, useReadContract } from 'wagmi'
import { waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { ChainId } from '@pancakeswap/chains'
import deployedContracts from 'config/abi/deployedContracts'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { config } from 'utils/wagmi'
import { ToastDescriptionWithTx } from 'components/Toast'
import { formatUnits } from '@pancakeswap/utils/viem/formatUnits'

const formatNumberWithCommas = (value: string): string => {
  const parts = value.split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

export const LockCakeForm: React.FC<{
  // show input field only
  fieldOnly?: boolean
  disabled?: boolean
  hideLockCakeDataSetStyle?: boolean
  customVeCakeCard?: null | JSX.Element
  onDismiss?: () => void
}> = ({ fieldOnly, disabled, customVeCakeCard, hideLockCakeDataSetStyle, onDismiss }) => {
  const { t } = useTranslation()
  const [mintValue, onMintChange] = useState('1')
  const [unwrapValue, onUnwrapChange] = useState('0')
  const [isMinting, setIsMinting] = useState(false)
  const [isUnwrapping, setIsUnwrapping] = useState(false)
  const { address: account } = useAccount()
  const chainId = useChainId()
  const { toastSuccess, toastError } = useToast()

  const contractConfig = deployedContracts[84532].DBROWrappedStaking
  const contractDBRO = deployedContracts[84532].DecentralBros
  const contractRYFT = deployedContracts[84532].RYFT

  const handleWrapDBRO = useCallback(async () => {
    try {
      setIsMinting(true)

      const tokens = Number(mintValue) * 10

      const tx = await writeContract(config, {
        address: contractDBRO.address as `0x${string}`,
        abi: contractDBRO.abi,
        functionName: 'approve',
        args: [contractConfig.address, parseUnits(String(tokens), 8)],
        chainId,
      })

      await waitForTransactionReceipt(config, {
        confirmations: 4,
        hash: tx,
        chainId,
      })

      const hash = await writeContract(config, {
        address: contractConfig.address as `0x${string}`,
        abi: contractConfig.abi,
        functionName: 'wrapTokens',
        args: [parseUnits(String(tokens), 8)],
      })

      await waitForTransactionReceipt(config, {
        confirmations: 2,
        hash,
        chainId,
      })

      toastSuccess('Success!', <ToastDescriptionWithTx txHash={hash}>Minting complete.</ToastDescriptionWithTx>)
    } catch (error) {
      console.error('Wrapping DBRO failed:', error)

      toastError('Error!', 'Failed to complete minting.')
    } finally {
      onMintChange('1')
      setIsMinting(false)
    }
  }, [
    contractDBRO.address,
    contractDBRO.abi,
    contractConfig.address,
    contractConfig.abi,
    mintValue,
    chainId,
    toastSuccess,
    toastError,
  ])

  const handleUnwrapDBRO = useCallback(async () => {
    try {
      setIsUnwrapping(true)

      const tx = await writeContract(config, {
        address: contractRYFT.address as `0x${string}`,
        abi: contractRYFT.abi,
        functionName: 'setApprovalForAll',
        args: [contractConfig.address, true],
        chainId,
      })

      await waitForTransactionReceipt(config, {
        confirmations: 4,
        hash: tx,
        chainId,
      })

      const hash = await writeContract(config, {
        address: contractConfig.address as `0x${string}`,
        abi: contractConfig.abi,
        functionName: 'unwrapNFT',
        args: [BigInt(unwrapValue)],
      })

      await waitForTransactionReceipt(config, {
        confirmations: 2,
        hash,
        chainId,
      })

      toastSuccess('Success!', <ToastDescriptionWithTx txHash={hash}>Unwrapping complete.</ToastDescriptionWithTx>)
    } catch (error) {
      console.error('Unwrapping DBRO failed:', error)

      toastError('Error!', 'Failed to unwrap.')
    } finally {
      onUnwrapChange('0')
      setIsUnwrapping(false)
    }
  }, [
    contractRYFT.address,
    contractRYFT.abi,
    contractConfig.address,
    contractConfig.abi,
    chainId,
    unwrapValue,
    toastSuccess,
    toastError,
  ])

  const { data: requiredDBRO } = useReadContract({
    address: contractConfig.address as `0x${string}`,
    abi: contractConfig.abi,
    functionName: 'REQUIRED_DBRO',
  })

  return (
    <FlexGap justifyContent="space-between" flexWrap="wrap" gap="4px" width={['100%']} mb="24px">
      {chainId === ChainId.BASE_SEPOLIA && (
        <>
          <FlexGap gap="4px" alignItems="center" width="100%">
            <Text color="textSubtle" fontSize={16} bold>
              {t('Mint & Wrap')}
            </Text>
            <Text color="textSubtle" fontSize={16} bold>
              {t('NFTs')}
            </Text>
          </FlexGap>

          <FlexGap>
            <Text color="textSubtle" fontSize={16} bold mr={1}>
              {t('Required:')}
            </Text>
            <Text color="secondary" fontSize={16} bold mr={1}>
              {requiredDBRO ? `${formatNumberWithCommas(formatUnits(BigInt(requiredDBRO.toString()), 8))} ` : 0}
            </Text>
            <Text color="secondary" fontSize={16} bold>
              DBRO
            </Text>
          </FlexGap>
        </>
      )}

      {chainId !== ChainId.BASE_SEPOLIA && (
        <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
          <Text color="warning" fontSize={16} bold>
            Please switch to Base network to mint
          </Text>
        </FlexGap>
      )}

      <MintInput
        width={['100%']}
        mb="8px"
        value={mintValue}
        onUserInput={onMintChange}
        inputProps={{ style: { textAlign: 'left', height: '20px' }, disabled }}
      />

      <FlexGap gap="4px" alignItems="center" mb="24px" width="100%">
        {account ? (
          <Button
            disabled={chainId !== ChainId.BASE_SEPOLIA || isMinting}
            style={{ color: '#000' }}
            width="100%"
            onClick={handleWrapDBRO}
          >
            {!isMinting ? 'Mint & Wrap' : <Dots>Wrapping</Dots>}
          </Button>
        ) : (
          <ConnectWalletButton width="100%" />
        )}
      </FlexGap>

      {chainId === ChainId.BASE_SEPOLIA && (
        <>
          <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
            <Text color="textSubtle" fontSize={16} bold>
              {t('Unwrap')}
            </Text>
            <Text color="textSubtle" fontSize={16} bold>
              {t('NFTs')}
            </Text>
          </FlexGap>

          <FlexGap gap="4px" alignItems="center" width="100%">
            <Text color="warning" fontSize={16} bold>
              If you unwrap your NFT you will forfeit all utilities and must have at least{' '}
              <span style={{ color: '#1bf696' }}>1 wrapped NFT</span> to redeem utilities
            </Text>
          </FlexGap>
        </>
      )}

      {chainId !== ChainId.BASE_SEPOLIA && (
        <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
          <Text color="warning" fontSize={16} bold>
            Please switch to Base network to unwrap
          </Text>
        </FlexGap>
      )}

      <MintInput
        width={['100%']}
        mb="8px"
        value={unwrapValue}
        onUserInput={onUnwrapChange}
        inputProps={{ style: { textAlign: 'left', height: '20px' }, disabled }}
      />

      <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
        {account ? (
          <Button
            disabled={chainId !== ChainId.BASE_SEPOLIA || isMinting || isUnwrapping}
            style={{ color: '#000' }}
            width="100%"
            onClick={handleUnwrapDBRO}
          >
            {!isUnwrapping ? 'Unwrap' : <Dots>Unwrapping</Dots>}
          </Button>
        ) : (
          <ConnectWalletButton width="100%" />
        )}
      </FlexGap>
    </FlexGap>
  )
}
