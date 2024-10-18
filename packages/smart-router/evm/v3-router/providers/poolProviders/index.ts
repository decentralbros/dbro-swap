import { PoolProvider } from '../../types'
import { HybridPoolProviderConfig, createHybridPoolProvider } from './hybridPoolProvider'

// For evm
export function createPoolProvider(config: HybridPoolProviderConfig): PoolProvider {
  const hybridPoolProvider = createHybridPoolProvider(config)
  return hybridPoolProvider
}

export * from './getCandidatePools'
export * from './getStableCandidatePools'
export * from './getV2CandidatePools'
export * from './getV3CandidatePools'
export * from './hybridPoolProvider'
export * from './onChainPoolProviders'
export * from './poolTvlSelectors'
export * from './staticPoolProvider'
export * from './subgraphPoolProviders'
