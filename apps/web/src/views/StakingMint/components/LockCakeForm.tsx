import { useTranslation } from '@pancakeswap/localization'
import { AutoRow, MintInputProps, Flex, FlexGap, Text, MintInput, Button } from '@pancakeswap/uikit'
import { useCallback, useState } from 'react'
import Image from 'next/image'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useAccount, useChainId } from 'wagmi'
import { useWriteApproveAndIncreaseLockAmountCallback } from 'views/StakingMint/hooks/useContractWrite'
import { ChainId } from '@pancakeswap/chains'

const CakeInput: React.FC<{
  value: MintInputProps['value']
  onUserInput: MintInputProps['onUserInput']
  disabled?: boolean
}> = ({ value, onUserInput, disabled }) => {
  const onInput = useCallback(
    (input: string) => {
      onUserInput(input)
    },
    [onUserInput],
  )

  return (
    <MintInput
      width={['100%']}
      mb="8px"
      value={value}
      onUserInput={onInput}
      inputProps={{ style: { textAlign: 'left', height: '20px' }, disabled }}
    />
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
  const [value, onChange] = useState('1')
  const { address: account } = useAccount()
  const chainId = useChainId()

  const handleModalOpen = useWriteApproveAndIncreaseLockAmountCallback(onDismiss)

  return (
    <FlexGap justifyContent="space-between" flexWrap="wrap" gap="4px" width={['100%']} mb="24px">
      {chainId === ChainId.BASE_SEPOLIA && (
        <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
          <Text color="textSubtle" fontSize={16} bold>
            {t('Mint')}
          </Text>
          <Text color="textSubtle" fontSize={16} bold>
            {t('NFTs')}
          </Text>
        </FlexGap>
      )}

      {chainId !== ChainId.BASE_SEPOLIA && (
        <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
          <Text color="warning" fontSize={16} bold>
            Please switch to Base network to mint
          </Text>
        </FlexGap>
      )}

      <CakeInput value={value} onUserInput={onChange} disabled={disabled} />

      {account ? (
        <Button disabled={disabled} style={{ color: '#000' }} width="100%" onClick={handleModalOpen}>
          {t('Mint NFTs')}
        </Button>
      ) : (
        <ConnectWalletButton width="100%" />
      )}
    </FlexGap>
  )
}
