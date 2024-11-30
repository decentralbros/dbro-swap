import { ChainId } from '@pancakeswap/chains'
import { PCSDuoTokenVaultConfig, VaultConfig } from '../../types'
import { MANAGER } from '../managers'
import { SupportedChainId } from '../supportedChains'

export type VaultsConfigByChain = {
  [chainId in SupportedChainId]: VaultConfig[]
}

export const PM_V2_SS_BOOSTER_SUPPORT_CHAINS = [ChainId.BSC, ChainId.ETHEREUM]

export function isPCSVaultConfig(config: VaultConfig): config is PCSDuoTokenVaultConfig {
  return config.manager === MANAGER.PCS
}

export function isThirdPartyVaultConfig(config: VaultConfig): config is PCSDuoTokenVaultConfig {
  return (
    config.manager === MANAGER.BRIL ||
    config.manager === MANAGER.RANGE ||
    config.manager === MANAGER.DEFIEDGE ||
    config.manager === MANAGER.ALPACA ||
    config.manager === MANAGER.TEAHOUSE
  )
}
