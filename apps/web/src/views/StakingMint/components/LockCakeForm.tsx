import { useTranslation } from '@pancakeswap/localization'
import { FlexGap, Text, MintInput, Button, useToast, Dots } from '@pancakeswap/uikit'
import { useCallback, useMemo, useState } from 'react'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useAccount, useChainId, useReadContract } from 'wagmi'
import { waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { ChainId } from '@pancakeswap/chains'
import deployedContracts from 'config/abi/deployedContracts'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { config } from 'utils/wagmi'
import { ToastDescriptionWithTx } from 'components/Toast'
import { formatUnits } from '@pancakeswap/utils/viem/formatUnits'
import { useBSCCakeBalance } from '../hooks/useBSCCakeBalance'

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
  const [mintValue, onMintChange] = useState('')
  const [unwrapValue, onUnwrapChange] = useState('')
  const [isMinting, setIsMinting] = useState(false)
  const [isUnwrapping, setIsUnwrapping] = useState(false)
  const { address: account } = useAccount()
  const chainId = useChainId()
  const { toastSuccess, toastError } = useToast()

  const contractConfig = deployedContracts[8453].DBROWrappedStaking
  const contractDBRO = deployedContracts[8453].DecentralBros
  const contractRYFT = deployedContracts[8453].RYFT

  const handleUnwrapDBRO = useCallback(async () => {
    try {
      setIsUnwrapping(true)

      const tx = await writeContract(config as any, {
        address: contractRYFT.address as `0x${string}`,
        abi: contractRYFT.abi,
        functionName: 'setApprovalForAll',
        args: [contractConfig.address, true],
        chainId,
      })

      await waitForTransactionReceipt(config as any, {
        confirmations: 4,
        hash: tx,
        chainId,
      })

      const hash = await writeContract(config as any, {
        address: contractConfig.address as `0x${string}`,
        abi: contractConfig.abi,
        functionName: 'unwrapNFT',
        args: [BigInt(unwrapValue)],
      })

      await waitForTransactionReceipt(config as any, {
        confirmations: 2,
        hash,
        chainId,
      })

      toastSuccess('Success!', <ToastDescriptionWithTx txHash={hash}>Unwrapping complete.</ToastDescriptionWithTx>)
    } catch (error) {
      console.error('Unwrapping DBRO failed:', error)

      toastError('Error!', 'Failed to unwrap.')
    } finally {
      onUnwrapChange('')
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

  const _cakeBalance = useBSCCakeBalance()

  const dbroBalance = parseInt(formatUnits(_cakeBalance, 8)) ?? 0

  const useCanMint = useMemo((): boolean => {
    try {
      if (!dbroBalance || !requiredDBRO) {
        return false
      }

      const balanceAmount = BigInt(String(dbroBalance))
      const requiredAmount = BigInt(String(requiredDBRO))
      const formattedAmount = BigInt(formatUnits(requiredAmount, 8))

      return balanceAmount >= formattedAmount
    } catch {
      return false
    }
  }, [dbroBalance, requiredDBRO])

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

  const useNFTBalance = useMemo((): boolean => {
    try {
      if (!nftBalance) {
        return false
      }
      return BigInt(String(nftBalance)) > 0
    } catch {
      return false
    }
  }, [nftBalance])

  const handleWrapDBRO = useCallback(async () => {
    if (!requiredDBRO) return

    try {
      setIsMinting(true)

      const tokens = Number(mintValue) * 100000

      const tx = await writeContract(config as any, {
        address: contractDBRO.address as `0x${string}`,
        abi: contractDBRO.abi,
        functionName: 'approve',
        args: [contractConfig.address, parseUnits(String(tokens), 8)],
        chainId,
      })

      await waitForTransactionReceipt(config as any, {
        confirmations: 4,
        hash: tx,
        chainId,
      })

      const hash = await writeContract(config as any, {
        address: contractConfig.address as `0x${string}`,
        abi: contractConfig.abi,
        functionName: 'wrapTokens',
        args: [parseUnits(String(tokens), 8)],
      })

      await waitForTransactionReceipt(config as any, {
        confirmations: 2,
        hash,
        chainId,
      })

      toastSuccess('Success!', <ToastDescriptionWithTx txHash={hash}>Minting complete.</ToastDescriptionWithTx>)
    } catch (error) {
      console.error('Wrapping DBRO failed:', error)

      toastError('Error!', 'Failed to complete minting.')
    } finally {
      onMintChange('')
      setIsMinting(false)
    }
  }, [
    requiredDBRO,
    mintValue,
    contractDBRO.address,
    contractDBRO.abi,
    contractConfig.address,
    contractConfig.abi,
    chainId,
    toastSuccess,
    toastError,
  ])

  return (
    <FlexGap justifyContent="space-between" flexWrap="wrap" gap="4px" width={['100%']} mb="24px">
      {chainId === ChainId.BASE && (
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

      {chainId !== ChainId.BASE && (
        <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
          <Text color="warning" fontSize={16} bold>
            Please switch to Base network to mint or unwrap
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
            disabled={chainId !== ChainId.BASE || isMinting || !useCanMint}
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

      {account && (
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
              Unwrapping your NFT will forfeit all utilities, and you must have at least{' '}
              <span style={{ color: '#1bf696' }}>1 wrapped NFT</span> to redeem utilities
            </Text>
          </FlexGap>
        </>
      )}

      {account && (
        <>
          <MintInput
            width={['100%']}
            mb="8px"
            value={unwrapValue}
            onUserInput={onUnwrapChange}
            inputProps={{ style: { textAlign: 'left', height: '20px' }, disabled }}
          />

          <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
            <Button
              disabled={chainId !== ChainId.BASE || isUnwrapping || !useNFTBalance}
              style={{ color: '#000' }}
              width="100%"
              onClick={handleUnwrapDBRO}
            >
              {!isUnwrapping ? 'Unwrap' : <Dots>Unwrapping</Dots>}
            </Button>
          </FlexGap>
        </>
      )}
    </FlexGap>
  )
}
