import { EXPERIMENTAL_FEATURES } from 'config/experimentalFeatures'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useMemo } from 'react'

export type FeatureFlags = { [flag in EXPERIMENTAL_FEATURES]?: boolean }

const experimentalFeaturesAtom = atom<FeatureFlags>({})

export function useFeatureFlags() {
  return useAtomValue(experimentalFeaturesAtom)
}

export function useSetExperimentalFeatures() {
  return useSetAtom(experimentalFeaturesAtom)
}

export function useExperimentalFeature(featureFlag: EXPERIMENTAL_FEATURES) {
  const [features, setFeatures] = useAtom(experimentalFeaturesAtom)
  const setEnabled = useCallback(
    (enabled?: boolean) => {
      setFeatures((prev) => ({
        ...prev,
        [featureFlag]: enabled,
      }))
    },
    [featureFlag, setFeatures],
  )
  const enabled = useMemo(() => features[featureFlag], [features, featureFlag])

  return { enabled, setEnabled }
}

export function useExperimentalFeatureEnabled(feature: EXPERIMENTAL_FEATURES) {
  const { enabled } = useExperimentalFeature(feature)
  return enabled
}
