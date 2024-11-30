import { atom, useAtom } from 'jotai'
import { useCallback, useMemo } from 'react'

// Mapping of ad ID to whether the ad is expanded
const slideExpandedAtom = atom<Record<string, boolean>>({})

export const useIsSlideExpanded = () => {
  const [slideExpanded, setSlideExpandedValue] = useAtom(slideExpandedAtom)

  const isAnySlideExpanded = useMemo(() => Object.values(slideExpanded).some(Boolean), [slideExpanded])

  const setSlideExpanded = useCallback(
    (id: string, value: boolean) => {
      setSlideExpandedValue((prev) => {
        return {
          ...prev,
          [id]: value,
        }
      })
    },
    [setSlideExpandedValue],
  )

  const resetAllExpanded = useCallback(() => {
    setSlideExpandedValue({})
  }, [setSlideExpandedValue])

  return { isAnySlideExpanded, slideExpanded, setSlideExpanded, resetAllExpanded }
}
