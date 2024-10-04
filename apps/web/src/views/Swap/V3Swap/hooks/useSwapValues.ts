import { ChainId } from '@pancakeswap/chains'
import { Estimate } from '@pancakeswap/swap-sdk-core'
import { useUserSlippage } from '@pancakeswap/utils/user'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { useSwapState } from 'state/swap/hooks'
import { useAccount } from 'wagmi'
import { useSwapCurrency } from './useSwapCurrency'

const FEE_ADDRESS: string = '0x5688C2882c54498D34dbe1Ab835F087a5b0B87c4'
const ETHEREUM: string = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

export const useSwapValues = (): Estimate | undefined => {
  const [inputCurrency, outputCurrency] = useSwapCurrency()
  const { typedValue } = useSwapState()
  const { address: account, chainId } = useAccount()
  const [allowedSlippage] = useUserSlippage()

  if (!inputCurrency || !outputCurrency || chainId === ChainId.BSC) return undefined

  const sellToken: string = inputCurrency.isNative ? ETHEREUM : inputCurrency.address

  const buyToken: string = outputCurrency.isNative ? ETHEREUM : outputCurrency.address

  const sellAmount = parseUnits(typedValue, inputCurrency.decimals)

  const estimate: Estimate = {
    chainId: chainId as number,
    buyToken,
    sellToken,
    sellAmount,
    taker: account as string,
    swapFeeRecipient: FEE_ADDRESS,
    swapFeeBps: 100, // 1%
    swapFeeToken: ETHEREUM,
    slippageBps: allowedSlippage * 100, // 100 is 1%
  }

  return estimate
}
