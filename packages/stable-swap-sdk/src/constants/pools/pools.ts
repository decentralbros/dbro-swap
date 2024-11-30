import { ChainId } from '@pancakeswap/chains'

import { StableSwapPool } from '../../types'

export type StableSwapPoolMap<TChainId extends number> = {
  [chainId in TChainId]: StableSwapPool[]
}

export const isStableSwapSupported = (chainId: number | undefined): chainId is StableSupportedChainId => {
  if (!chainId) {
    return false
  }
  return STABLE_SUPPORTED_CHAIN_IDS.includes(chainId)
}

export const STABLE_SUPPORTED_CHAIN_IDS = [
  ChainId.BSC,
  ChainId.BSC_TESTNET,
  ChainId.ARBITRUM_ONE,
  ChainId.ETHEREUM,
] as const

export type StableSupportedChainId = (typeof STABLE_SUPPORTED_CHAIN_IDS)[number]
