import { ChainId } from '@pancakeswap/chains'
import { supportedChainId } from '@pancakeswap/farms'

export const SUPPORT_ONLY_BSC = [ChainId.BASE]
export const SUPPORT_FARMS = supportedChainId
export const LIQUID_STAKING_SUPPORTED_CHAINS = [
  ChainId.BASE,
  ChainId.ETHEREUM,
  ChainId.BASE_TESTNET,
  ChainId.ARBITRUM_GOERLI,
]
export const FIXED_STAKING_SUPPORTED_CHAINS = [ChainId.BASE]

export const V3_MIGRATION_SUPPORTED_CHAINS = [ChainId.BASE, ChainId.ETHEREUM]
export const V2_BCAKE_MIGRATION_SUPPORTED_CHAINS = [ChainId.BASE]

export const SUPPORT_CAKE_STAKING = [ChainId.BASE]
