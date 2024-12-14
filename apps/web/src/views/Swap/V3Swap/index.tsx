import { useModal } from '@pancakeswap/uikit'
import { useUserSlippage } from '@pancakeswap/utils/user'
import { Swap as SwapUI } from '@pancakeswap/widgets-internal'
import SettingsModal from 'components/Menu/GlobalSettings/SettingsModal'
import { SettingsMode } from 'components/Menu/GlobalSettings/types'
import { useGasPrice } from 'hooks/useGasPrice'
import { useAccount, useChainId } from 'wagmi'
import { FormMain } from './containers'
import { SwapCommitButton } from './containers/SwapCommitButton'
import { useIsWrapping } from './hooks'

export function V3SwapForm() {
  const [allowedSlippage] = useUserSlippage()
  const isWrapping = useIsWrapping()
  const [onPresentSettingsModal] = useModal(<SettingsModal mode={SettingsMode.SWAP_LIQUIDITY} />)
  const chainId = useChainId()
  const { address: account } = useAccount()

  const { data: gasData } = useGasPrice({ chainId, account })

  if (isWrapping) {
    return null
  }

  return (
    <FormMain
      tradeLoading={false}
      pricingAndSlippage={
        <SwapUI.Info
          price={null}
          gasData={gasData}
          allowedSlippage={allowedSlippage}
          onSlippageClick={onPresentSettingsModal}
        />
      }
      swapCommitButton={<SwapCommitButton gasData={gasData} />}
    />
  )
}
