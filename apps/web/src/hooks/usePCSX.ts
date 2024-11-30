import { ChainId } from '@pancakeswap/chains'
import { EXPERIMENTAL_FEATURES } from 'config/experimentalFeatures'
import { SUPPORTED_CHAINS } from 'config/pcsx'
import { useExperimentalFeatureEnabled } from 'hooks/useExperimentalFeatureEnabled'
import { useCallback, useMemo } from 'react'
import { useUserXEnable } from 'state/user/smartRouter'

export function usePCSXFeatureEnabled() {
  return useExperimentalFeatureEnabled(EXPERIMENTAL_FEATURES.PCSX)
}

export const usePCSX = () => {
  const featureEnabled = usePCSXFeatureEnabled()
  const [xEnabled, setX, reset] = useUserXEnable()
  const enabled = Boolean(xEnabled ?? featureEnabled)
  const setUserX = useCallback(
    (updater: boolean | ((current: boolean) => boolean)) => {
      setX(typeof updater === 'function' ? updater(enabled) : updater)
    },
    [enabled, setX],
  )
  return [enabled, setUserX, featureEnabled, reset] as const
}

export function usePCSXEnabledOnChain(chainId?: ChainId) {
  return useMemo(() => chainId && SUPPORTED_CHAINS.includes(chainId), [chainId])
}
