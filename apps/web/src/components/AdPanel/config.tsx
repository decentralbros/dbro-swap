import { useMatchBreakpoints } from '@pancakeswap/uikit'
import { AdCakeStaking } from './Ads/AdCakeStaking'
import { AdMevProtection } from './Ads/AdMevProtection'
import { AdOptionsTrading } from './Ads/AdOptionsTrading'
import { AdPCSX } from './Ads/AdPCSX'
import { AdRocker } from './Ads/AdRocker'
import { AdTelegramBot } from './Ads/AdTelegramBot'
import { ExpandableAd } from './Expandable/ExpandableAd'
import { shouldRenderOnPages } from './renderConditions'

enum Priority {
  FIRST_AD = 6,
  VERY_HIGH = 5,
  HIGH = 4,
  MEDIUM = 3,
  LOW = 2,
  VERY_LOW = 1,
}

export const useAdConfig = () => {
  const { isDesktop } = useMatchBreakpoints()
  const MAX_ADS = isDesktop ? 6 : 4

  const adList: Array<{
    id: string
    component: JSX.Element
    shouldRender?: Array<boolean>
    priority?: number
  }> = [
    {
      id: 'expandable-ad',
      component: <ExpandableAd />,
      priority: Priority.FIRST_AD,
      shouldRender: [shouldRenderOnPages(['/buy-crypto', '/', '/prediction'])],
    },
    {
      id: 'ad-mev',
      component: <AdMevProtection />,
    },
    {
      id: 'prediction-telegram-bot',
      component: <AdTelegramBot />,
    },
    {
      id: 'pcsx',
      component: <AdPCSX />,
    },
    {
      id: 'cake-staking',
      component: <AdCakeStaking />,
    },
    {
      id: 'clamm-options-trading',
      component: <AdOptionsTrading />,
    },

    {
      id: 'rocker-meme-career',
      component: <AdRocker />,
    },
  ]

  return adList
    .filter((ad) => ad.shouldRender === undefined || ad.shouldRender.every(Boolean))
    .sort((a, b) => (b.priority || Priority.VERY_LOW) - (a.priority || Priority.VERY_LOW))
    .slice(0, MAX_ADS)
}

// Array of strings or regex patterns
const commonLayoutAdIgnoredPages = [
  '/home',
  '/cake-staking',
  // Route matching: /liquidity/pool/<chainName>/<poolAddress>
  /\/liquidity\/pool\/\w+\/\w+/,
]

/**
 *  On the pages mentioned, the Mobile ads will be placed directly in page instead of in the app layout.
 *  So don't render in the app layout.
 *  Contains strings or regex patterns.
 */
export const layoutMobileAdIgnoredPages = [
  ...commonLayoutAdIgnoredPages,
  '/',
  '/prediction',
  '/liquidity/pools',
  '/migration/bcake',
]

/**
 *  On the pages mentioned, the Desktop ads will be placed directly in page instead of in the app layout.
 *  So don't render in the app layout.
 *  Contains strings or regex patterns.
 */
export const layoutDesktopAdIgnoredPages = [...commonLayoutAdIgnoredPages]

// NOTE: In current phase, we're adding pages to whitelist as well for AdPlayer.
export const commonLayoutWhitelistedPages = ['/', '/buy-crypto', '/prediction']
