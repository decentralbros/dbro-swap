import { atom, useAtom } from 'jotai'

const showAdPanelAtom = atom<boolean>(true)

/**
 * Hook to show/hide the AdPanel rendered by DesktopCard and MobileCard.
 * This DOES NOT affect the visibility of cards rendered directly in the page
 * via the AdPlayer component.
 */
export const useShowAdPanel = () => useAtom(showAdPanelAtom)
