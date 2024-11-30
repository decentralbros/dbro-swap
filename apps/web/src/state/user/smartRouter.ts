import { userSingleHopAtom } from '@pancakeswap/utils/user'
import { atom, useAtom, useAtomValue } from 'jotai'
import { useResetAtom } from 'jotai/utils'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'
import { usePCSX } from 'hooks/usePCSX'
import { useCallback } from 'react'

const userUseStableSwapAtom = atomWithStorageWithErrorCatch<boolean>('pcs:useStableSwap', true)
const userUseV2SwapAtom = atomWithStorageWithErrorCatch<boolean>('pcs:useV2Swap', true)
const userUseV3SwapAtom = atomWithStorageWithErrorCatch<boolean>('pcs:useV3Swap', true)
const userUserSplitRouteAtom = atomWithStorageWithErrorCatch<boolean>('pcs:useSplitRouting', true)
const userUseXAtom = atomWithStorageWithErrorCatch<boolean | undefined>('pcs:useX', undefined)

export function useUserXEnable() {
  const reset = useResetAtom(userUseXAtom)
  return [...useAtom(userUseXAtom), reset] as const
}

export function useUserStableSwapEnable() {
  return useAtom(userUseStableSwapAtom)
}

export function useUserV2SwapEnable() {
  return useAtom(userUseV2SwapAtom)
}

export function useUserV3SwapEnable() {
  return useAtom(userUseV3SwapAtom)
}

export function useUserSplitRouteEnable() {
  return useAtom(userUserSplitRouteAtom)
}

const derivedOnlyOneAMMSourceEnabledAtom = atom((get) => {
  return [get(userUseStableSwapAtom), get(userUseV2SwapAtom), get(userUseV3SwapAtom)].filter(Boolean).length === 1
})

export function useOnlyOneAMMSourceEnabled() {
  return useAtomValue(derivedOnlyOneAMMSourceEnabledAtom)
}

const derivedRoutingSettingChangedAtom = atom(
  (get) => {
    return [
      get(userUseStableSwapAtom),
      get(userUseV2SwapAtom),
      get(userUseV3SwapAtom),
      get(userUserSplitRouteAtom),
      !get(userSingleHopAtom),
    ].some((x) => x === false)
  },
  (_, set) => {
    set(userUseStableSwapAtom, true)
    set(userUseV2SwapAtom, true)
    set(userUseV3SwapAtom, true)
    set(userUserSplitRouteAtom, true)
    set(userSingleHopAtom, false)
  },
)

export function useRoutingSettingChanged() {
  const [enabled, _, featureEnabled, resetX] = usePCSX()
  const [derivedRoutingSettingChanged, reset] = useAtom(derivedRoutingSettingChangedAtom)
  const resetRoutingSettings = useCallback(() => {
    reset()
    resetX()
  }, [reset, resetX])
  return [derivedRoutingSettingChanged || enabled !== featureEnabled, resetRoutingSettings] as const
}
