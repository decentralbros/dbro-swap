import { useTranslation } from '@pancakeswap/localization'
import {
  AutoRow,
  Balance,
  BalanceInput,
  BalanceInputProps,
  Button,
  Dots,
  Flex,
  FlexGap,
  Text,
  useToast,
} from '@pancakeswap/uikit'
import { getDecimalAmount } from '@pancakeswap/utils/formatBalance'
import BN from 'bignumber.js'
import { useCakePrice } from 'hooks/useCakePrice'
import { useAtom, useAtomValue } from 'jotai'
import { useCallback, useMemo, useState } from 'react'
import { cakeLockAmountAtom } from 'state/vecake/atoms'
import Image from 'next/image'
import { ChainId } from '@pancakeswap/chains'
import deployedContracts from 'config/abi/deployedContracts'
import { waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { config } from 'utils/wagmi'
import { useAccount, useChainId } from 'wagmi'
import { formatUnits } from '@pancakeswap/utils/viem/formatUnits'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { ToastDescriptionWithTx } from 'components/Toast'
import { useWriteApproveAndIncreaseLockAmountCallback } from '../hooks/useContractWrite'
import { useBSCCakeBalance } from '../hooks/useBSCCakeBalance'

const percentShortcuts = [25, 50, 75]
// const MAX_GAS_LIMIT = 10000000n

const CakeInput: React.FC<{
  value: BalanceInputProps['value']
  onUserInput: BalanceInputProps['onUserInput']
  disabled?: boolean
}> = ({ value, onUserInput, disabled }) => {
  const { t } = useTranslation()
  const cakeUsdPrice = useCakePrice()
  const cakeUsdValue = useMemo(() => {
    return cakeUsdPrice && value ? cakeUsdPrice.times(value).toNumber() : 0
  }, [cakeUsdPrice, value])
  const [percent, setPercent] = useState<number | null>(null)

  const { address: account } = useAccount()
  const { toastSuccess, toastError } = useToast()

  const _cakeBalance = useBSCCakeBalance()
  const cakeBalance = BigInt(_cakeBalance.toString())

  const dbroBalance = parseInt(formatUnits(_cakeBalance, 8)) ?? 0
  const canStake = BigInt(dbroBalance) >= BigInt(500000)

  const [isLoading, setIsLoading] = useState(false)
  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>(undefined)
  const chainId = useChainId()

  const contractConfig = deployedContracts[84532].DBROWrappedStaking
  const contractDBRO = deployedContracts[84532].DecentralBros

  const handleStake = useCallback(async () => {
    if (!ChainId.BASE_SEPOLIA || !account) return

    try {
      setIsLoading(true)

      let amount: string | number = value

      if (percent) {
        amount = (Number(dbroBalance) * (percent / 100)).toFixed(0)
      }

      const tx = await writeContract(config, {
        address: contractDBRO.address as `0x${string}`,
        abi: contractDBRO.abi,
        functionName: 'approve',
        args: [contractConfig.address, parseUnits(String(amount), 8)],
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
        functionName: 'stake',
        args: [parseUnits(String(amount), 8)],
        chainId,
      })

      await waitForTransactionReceipt(config, {
        confirmations: 2,
        hash,
        chainId,
      })

      toastSuccess('Success!', <ToastDescriptionWithTx txHash={hash}>Staking complete.</ToastDescriptionWithTx>)
    } catch (error) {
      console.error('Staking failed:', error)

      toastError('Error!', 'Failed to complete staking.')
    } finally {
      setIsLoading(false)
    }
  }, [
    account,
    value,
    percent,
    contractDBRO.address,
    contractDBRO.abi,
    contractConfig.address,
    contractConfig.abi,
    chainId,
    toastSuccess,
    dbroBalance,
    toastError,
  ])

  const onInput = useCallback(
    (input: string) => {
      setPercent(null)
      onUserInput(input)
    },
    [onUserInput],
  )

  const handlePercentChange = useCallback(
    (p: number) => {
      if (p > 0) {
        onUserInput((Number(dbroBalance) * (p / 100)).toFixed(0))
      } else {
        onUserInput('')
      }
      setPercent(p)
    },
    [dbroBalance, onUserInput],
  )

  const balance = (
    <Flex>
      <Text textAlign="left" color="textSubtle" ml="4px" fontSize="12px">
        Balance: {dbroBalance.toLocaleString()}
      </Text>
    </Flex>
  )

  const usdValue = (
    <Flex>
      <Balance mt={1} fontSize="12px" color="textSubtle" decimals={2} value={cakeUsdValue} unit=" USD" prefix="~" />
    </Flex>
  )

  const appendComponent = (
    <Flex alignSelf="center" width={40} mr={12}>
      <Image width={40} height={40} src="/logo.webp" alt="logo" />
    </Flex>
  )

  return (
    <>
      <FlexGap justifyContent="space-between" flexWrap="wrap" gap="4px" width={['100%', '100%', '50%']} mb="24px">
        <BalanceInput
          width={['100%']}
          mb="8px"
          value={value}
          onUserInput={onInput}
          inputProps={{ style: { textAlign: 'left', height: '20px' }, disabled }}
          currencyValue={usdValue}
          unit={balance}
          appendComponent={appendComponent}
        />

        {!disabled && balance ? (
          <FlexGap justifyContent="space-between" flexWrap="wrap" gap="4px" width={['100%']}>
            {percentShortcuts.map((p) => {
              return (
                <Button
                  key={p}
                  style={{ flex: 1, color: p === percent ? '#000' : '#1bf696' }}
                  scale="sm"
                  variant={p === percent ? 'primary' : 'tertiary'}
                  onClick={() => handlePercentChange(p)}
                >
                  {`${p}%`}
                </Button>
              )
            })}
            <Button
              scale="sm"
              style={{ flex: 1, color: percent === 100 ? '#000' : '#1bf696' }}
              variant={percent === 100 ? 'primary' : 'tertiary'}
              onClick={() => handlePercentChange(100)}
            >
              {t('Max')}
            </Button>
          </FlexGap>
        ) : null}
      </FlexGap>

      {account && (
        <Flex flexDirection={['column', 'column', 'row']} alignItems="center" width="100%">
          <Button
            disabled={!canStake || isLoading}
            style={{ color: '#000' }}
            width={['100%', '100%', '30%']}
            onClick={handleStake}
          >
            {!isLoading ? 'Stake DBRO' : <Dots>Staking</Dots>}
          </Button>

          <Button disabled={!isLoading} style={{ color: '#000' }} width={['100%', '100%', '30%']} mx="10%" my="24px">
            {t('Unstake DBRO')}
          </Button>

          <Button disabled={!isLoading} style={{ color: '#000' }} width={['100%', '100%', '30%']}>
            {t('Claim & Wrap NFT')}
          </Button>
        </Flex>
      )}
    </>
  )
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
  const [value, onChange] = useAtom(cakeLockAmountAtom)
  const { address: account } = useAccount()
  const chainId = useChainId()

  return (
    <AutoRow alignSelf="start" width="100%">
      {chainId === ChainId.BASE_SEPOLIA && (
        <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
          <Text color="secondary" fontSize={16} bold>
            {t('Add')}
          </Text>
          <Text color="secondary" fontSize={16} bold>
            {t('DBRO')}
          </Text>
        </FlexGap>
      )}

      {chainId !== ChainId.BASE_SEPOLIA && (
        <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
          <Text color="red" fontSize={16} bold>
            Base network is required to stake
          </Text>
        </FlexGap>
      )}

      <CakeInput value={value} onUserInput={onChange} disabled={disabled} />

      <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
        {!account && <ConnectWalletButton width={['100%', '100%', '50%']} />}
      </FlexGap>

      {/* {customVeCakeCard} */}

      {/* {fieldOnly ? null : (
        <>
          {disabled ? null : <LockCakeDataSet hideLockCakeDataSetStyle={hideLockCakeDataSetStyle} />}

          <SubmitLockButton onDismiss={onDismiss} />
        </>
      )} */}
    </AutoRow>
  )
}

const SubmitLockButton = ({ onDismiss }: { onDismiss?: () => void }) => {
  const { t } = useTranslation()
  const _cakeBalance = useBSCCakeBalance()
  const cakeLockAmount = useAtomValue(cakeLockAmountAtom)
  const disabled = useMemo(
    () =>
      !cakeLockAmount || cakeLockAmount === '0' || getDecimalAmount(new BN(cakeLockAmount)).gt(_cakeBalance.toString()),
    [_cakeBalance, cakeLockAmount],
  )
  const increaseLockAmount = useWriteApproveAndIncreaseLockAmountCallback(onDismiss)

  return (
    <Button mt="16px" disabled={disabled} width="100%" onClick={increaseLockAmount}>
      {t('Add DBRO')}
    </Button>
  )
}
