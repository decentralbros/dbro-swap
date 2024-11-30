import { VaultConfig } from '@pancakeswap/position-managers'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { usePositionManager } from 'views/PositionManagers/hooks/usePositionManager'

export function useVaultConfigs(): VaultConfig[] {
  const { chainId } = useActiveChainId()
  const data = usePositionManager(chainId)
  return data
}
