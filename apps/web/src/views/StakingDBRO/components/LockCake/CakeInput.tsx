import { useTranslation } from '@pancakeswap/localization'
import {
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
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ChainId } from '@pancakeswap/chains'
import deployedContracts from 'config/abi/deployedContracts'
import { waitForTransactionReceipt, writeContract } from '@wagmi/core'
import { config } from 'utils/wagmi'
import { useAccount, useChainId } from 'wagmi'
import { formatUnits } from '@pancakeswap/utils/viem/formatUnits'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { ToastDescriptionWithTx } from 'components/Toast'
import { DBRO_API } from 'config/constants/endpoints'
import qs from 'qs'
import { useBSCCakeBalance } from '../../hooks/useBSCCakeBalance'

const percentShortcuts = [25, 50, 75]

export const CakeInput: React.FC<{
  value: BalanceInputProps['value']
  onUserInput: BalanceInputProps['onUserInput']
  disabled?: boolean
}> = ({ value, onUserInput, disabled }) => {
  const { t } = useTranslation()
  const [percent, setPercent] = useState<number | null>(null)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)

  const { address: account } = useAccount()
  const { toastSuccess, toastError } = useToast()
  const [inputUSD, setInputUSD] = useState<string>('0.00')

  const _cakeBalance = useBSCCakeBalance()

  const dbroBalance = parseInt(formatUnits(_cakeBalance, 8)) ?? 0
  const canStake = BigInt(dbroBalance) >= BigInt(500000)

  const chainId = useChainId()

  const contractConfig = deployedContracts[84532].DBROWrappedStaking
  const contractDBRO = deployedContracts[84532].DecentralBros

  const handleStake = useCallback(async () => {
    if (!ChainId.BASE_SEPOLIA || !account) return

    try {
      setIsStaking(true)

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
      setIsStaking(false)
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

  const handleUnstake = useCallback(async () => {
    if (!ChainId.BASE_SEPOLIA || !account) return

    try {
      setIsUnstaking(true)

      const hash = await writeContract(config, {
        address: contractConfig.address as `0x${string}`,
        abi: contractConfig.abi,
        functionName: 'unstake',
        args: [],
        chainId,
      })

      await waitForTransactionReceipt(config, {
        confirmations: 2,
        hash,
        chainId,
      })

      toastSuccess('Success!', <ToastDescriptionWithTx txHash={hash}>Unstaking complete.</ToastDescriptionWithTx>)
    } catch (error) {
      console.error('Unstaking failed:', error)

      toastError('Error!', 'Failed to complete unstaking.')
    } finally {
      setIsUnstaking(false)
    }
  }, [account, contractConfig.address, contractConfig.abi, chainId, toastSuccess, toastError])

  const handleClaim = useCallback(async () => {
    if (!ChainId.BASE_SEPOLIA || !account) return

    try {
      setIsClaiming(true)

      const hash = await writeContract(config, {
        address: contractConfig.address as `0x${string}`,
        abi: contractConfig.abi,
        functionName: 'claimReward',
        args: [],
        chainId,
      })

      await waitForTransactionReceipt(config, {
        confirmations: 2,
        hash,
        chainId,
      })

      toastSuccess('Success!', <ToastDescriptionWithTx txHash={hash}>Claim complete.</ToastDescriptionWithTx>)
    } catch (error) {
      console.error('Unstaking failed:', error)

      toastError('Error!', 'Failed to complete claim.')
    } finally {
      setIsClaiming(false)
    }
  }, [account, contractConfig.address, contractConfig.abi, chainId, toastSuccess, toastError])

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

  const fetchInputUSD = useCallback(async () => {
    try {
      const params = {
        chainId: ChainId.BASE_SEPOLIA,
        address: account,
        native: false,
        contract: contractDBRO.address,
        decimals: 8,
      }

      const response = await fetch(`${DBRO_API}/balance/usd?${qs.stringify(params)}`)
      const usd = await response.json()

      if (usd && value) {
        setInputUSD((Number(usd) * Number(value)).toFixed(2))
      }
    } catch {
      setInputUSD('0.00')
    }
  }, [account, contractDBRO.address, value])

  useEffect(() => {
    if (value) {
      fetchInputUSD()
    }
    // eslint-disable-next-line
  }, [value])

  const balance = (
    <Flex>
      <Text textAlign="left" color="textSubtle" ml="4px" fontSize="12px">
        Balance: {dbroBalance.toLocaleString()}
      </Text>
    </Flex>
  )

  const usdValue = (
    <Flex>
      <Balance mt={1} fontSize="12px" color="textSubtle" decimals={2} value={Number(inputUSD)} unit=" USD" prefix="~" />
    </Flex>
  )

  const appendComponent = (
    <Flex alignSelf="center" width={40} mr={12}>
      <Image width={40} height={40} src="/logo.webp" alt="logo" />
    </Flex>
  )

  return (
    <>
      <FlexGap justifyContent="space-between" flexWrap="wrap" gap="4px" width={['100%']} mb="24px">
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
        <Flex flexDirection={['column']} alignItems="center" width="100%">
          <Button disabled={!canStake || isStaking} style={{ color: '#000' }} width={['100%']} onClick={handleStake}>
            {!isStaking ? 'Stake DBRO' : <Dots>Staking</Dots>}
          </Button>

          <Button
            disabled={!canStake || isUnstaking}
            style={{ color: '#000' }}
            width={['100%']}
            mx="10%"
            my="24px"
            onClick={handleUnstake}
          >
            {!isUnstaking ? 'Unstake DBRO' : <Dots>Unstaking</Dots>}
          </Button>

          <Button disabled={!canStake || isClaiming} style={{ color: '#000' }} width={['100%']} onClick={handleClaim}>
            {!isClaiming ? 'Claim & Wrap NFTs' : <Dots>Wrapping</Dots>}
          </Button>
        </Flex>
      )}
    </>
  )
}
