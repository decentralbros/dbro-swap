/* eslint-disable address/addr-type */
import { ChainId } from '@pancakeswap/chains'
import { Estimate } from '@pancakeswap/swap-sdk-core'
import { useUserSlippage } from '@pancakeswap/utils/user'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { useSwapState } from 'state/swap/hooks'
import { useAccount } from 'wagmi'
import { useSwapCurrency } from './useSwapCurrency'

const FEE_ADDRESS: string = '0x5688C2882c54498D34dbe1Ab835F087a5b0B87c4'
const ETHEREUM: string = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

const APPROVED_TOKENS: { [key: string]: { symbol: string; chainId: number } } = {
  // Mainnet stables
  '0xdac17f958d2ee523a2206206994597c13d831ec7': { symbol: 'USDT', chainId: 1 },
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': { symbol: 'USDC', chainId: 1 },

  // Arbitrum stables
  '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': { symbol: 'USDT', chainId: 42161 },
  '0xaf88d065e77c8cc2239327c5edb3a432268e5831': { symbol: 'USDC', chainId: 42161 },

  // Base stables
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': { symbol: 'USDC', chainId: 8453 },

  // Decentral Bros
  '0x6a4e0f83d7882bcacff89aaf6f60d24e13191e9f': { symbol: 'DBRO', chainId: 8453 },
}

export const useSwapValues = (): Estimate | undefined => {
  const [inputCurrency, outputCurrency] = useSwapCurrency()
  const { typedValue } = useSwapState()
  const { address: account, chainId } = useAccount()
  const [allowedSlippage] = useUserSlippage()

  if (!inputCurrency || !outputCurrency || chainId === ChainId.BSC) return undefined

  const sellToken: string = inputCurrency.isNative ? ETHEREUM : inputCurrency.address

  const buyToken: string = outputCurrency.isNative ? ETHEREUM : outputCurrency.address

  const swapFeeToken: string = !inputCurrency.isNative && !outputCurrency.isNative ? inputCurrency.address : ETHEREUM
  const isApproved: string = !inputCurrency.isNative && !outputCurrency.isNative ? inputCurrency.address : ETHEREUM

  const sellAmount = parseUnits(typedValue, inputCurrency.decimals)

  if (swapFeeToken === ETHEREUM) {
    const estimate: Estimate = {
      chainId: chainId as number,
      buyToken,
      sellToken,
      sellAmount,
      taker: account as string,
      swapFeeRecipient: FEE_ADDRESS,
      swapFeeBps: 100, // 1%
      swapFeeToken,
      slippageBps: allowedSlippage * 100, // 100 is 1%
    }

    return estimate
  }

  if (APPROVED_TOKENS[isApproved.toLowerCase()]) {
    const estimate: Estimate = {
      chainId: chainId as number,
      buyToken,
      sellToken,
      sellAmount,
      taker: account as string,
      swapFeeRecipient: FEE_ADDRESS,
      swapFeeBps: 100, // 1%
      swapFeeToken,
      slippageBps: allowedSlippage * 100, // 100 is 1%
    }

    return estimate
  }

  const estimate: Estimate = {
    chainId: chainId as number,
    buyToken,
    sellToken,
    sellAmount,
    taker: account as string,
    slippageBps: allowedSlippage * 100, // 100 is 1%
  }

  return estimate
}
