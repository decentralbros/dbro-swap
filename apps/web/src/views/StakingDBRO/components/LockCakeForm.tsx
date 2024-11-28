import { useTranslation } from '@pancakeswap/localization'
import { AutoRow, FlexGap, Text } from '@pancakeswap/uikit'
import { useAtom } from 'jotai'
import { cakeLockAmountAtom } from 'state/vecake/atoms'
import { ChainId } from '@pancakeswap/chains'
import { useAccount, useChainId } from 'wagmi'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { CakeInput } from './LockCake/CakeInput'

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
      {chainId === ChainId.BASE && (
        <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
          <Text color="textSubtle" fontSize={16} bold>
            {t('Add')}
          </Text>
          <Text color="textSubtle" fontSize={16} bold>
            {t('DBRO')}
          </Text>
        </FlexGap>
      )}

      {chainId !== ChainId.BASE && (
        <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
          <Text color="warning" fontSize={16} bold>
            Please switch to Base network to stake
          </Text>
        </FlexGap>
      )}

      <CakeInput value={value} onUserInput={onChange} disabled={disabled} />

      <FlexGap gap="4px" alignItems="center" mb="4px" width="100%">
        {!account && <ConnectWalletButton width={['100%']} />}
      </FlexGap>
    </AutoRow>
  )
}
