import { ChainId } from '@pancakeswap/chains'
import { Estimate } from '@pancakeswap/swap-sdk-core'
import { useUserSlippage } from '@pancakeswap/utils/user'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { useSwapState } from 'state/swap/hooks'
import { useAccount } from 'wagmi'
import { useSwapCurrency } from './useSwapCurrency'

const FEE_ADDRESS: string = '0x245844966b90e81EBB0CcF318cB395Bc9b585be9'
const ETH: string = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
const BNB: string = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

export const useSwapValues = (): Estimate | undefined => {
  const [inputCurrency, outputCurrency] = useSwapCurrency()
  const { typedValue } = useSwapState()
  const { address: account, chainId } = useAccount()
  const [allowedSlippage] = useUserSlippage()

  if (!inputCurrency || !outputCurrency) return undefined

  const nativeInput: string = inputCurrency.chainId === ChainId.BSC ? BNB : ETH

  const sellToken: string = inputCurrency.isNative ? nativeInput : inputCurrency.address

  const nativeOutput: string = outputCurrency.chainId === ChainId.BSC ? BNB : ETH

  const buyToken: string = outputCurrency.isNative ? nativeOutput : outputCurrency.address

  const sellAmount = parseUnits(typedValue, inputCurrency.decimals)

  const estimate: Estimate = {
    chainId: chainId as number,
    buyToken,
    sellToken,
    sellAmount,
    taker: account as string,
    swapFeeRecipient: FEE_ADDRESS,
    swapFeeBps: 100, // 1%
    swapFeeToken: buyToken,
    slippageBps: allowedSlippage * 100, // 100 is 1%
  }

  return estimate
}
