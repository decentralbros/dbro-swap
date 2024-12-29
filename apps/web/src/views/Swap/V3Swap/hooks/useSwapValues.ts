/* eslint-disable address/addr-type */
import { ChainId } from '@pancakeswap/chains'
import { Estimate } from '@pancakeswap/swap-sdk-core'
import { useUserSlippage } from '@pancakeswap/utils/user'
import { parseUnits } from '@pancakeswap/utils/viem/parseUnits'
import { ETHEREUM } from 'config/constants/contracts'
import { useSwapState } from 'state/swap/hooks'
import { useAccount } from 'wagmi'
import { useSwapCurrency } from './useSwapCurrency'

const FEE_ADDRESS: string = process.env.NEXT_PUBLIC_FEE_ADDRESS as string

const APPROVED_TOKENS: { [key: string]: { symbol: string; chainId: number } } = {
  // Mainnet
  '0xdac17f958d2ee523a2206206994597c13d831ec7': { symbol: 'USDT', chainId: 1 },
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': { symbol: 'USDC', chainId: 1 },
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': { symbol: 'WETH', chainId: 1 },

  // Arbitrum One
  '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': { symbol: 'USDT', chainId: 42161 },
  '0xaf88d065e77c8cc2239327c5edb3a432268e5831': { symbol: 'USDC', chainId: 42161 },
  '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1': { symbol: 'WETH', chainId: 42161 },

  // Base
  '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': { symbol: 'USDC', chainId: 8453 },
  '0x4200000000000000000000000000000000000006': { symbol: 'WETH', chainId: 8453 },
  '0x6a4e0f83d7882bcacff89aaf6f60d24e13191e9f': { symbol: 'DBRO', chainId: 8453 },

  // Linea
  '0x176211869ca2b568f2a7d4ee941e073a821ee1ff': { symbol: 'USDC', chainId: 59144 },
  '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f': { symbol: 'WETH', chainId: 59144 },
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
