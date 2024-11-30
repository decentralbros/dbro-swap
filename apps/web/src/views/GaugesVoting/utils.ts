import { Gauge, GaugeType } from '@pancakeswap/gauges'
import { PCSDuoTokenVaultConfig, fetchPositionManager } from '@pancakeswap/position-managers'
import { Address, encodePacked, keccak256, zeroAddress } from 'viem'

export const getGaugeHash = (gaugeAddress: Address = zeroAddress, chainId: number = 0) => {
  return keccak256(encodePacked(['address', 'uint256'], [gaugeAddress, BigInt(chainId || 0)]))
}

export const getPositionManagerName = async (
  gauge: Gauge,
  vaults?: PCSDuoTokenVaultConfig[],
  signal?: AbortSignal,
): Promise<string> => {
  if (gauge.type !== GaugeType.ALM) return ''

  let _vaults = vaults
  if (!vaults) {
    _vaults = await fetchPositionManager(gauge.chainId, signal)
  }
  const matchedVault = _vaults?.find((v) => v.vaultAddress === gauge.address)

  if (!matchedVault) return gauge.managerName ?? ''

  return `${matchedVault?.name}#${matchedVault?.idByManager}`
}
