import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | IslandSwap',
  defaultTitle: 'IslandSwap',
  description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@IslandSwap',
    site: '@IslandSwap',
  },
  openGraph: {
    title: "🏝️ IslandSwap - Everyone's Favorite DEX",
    description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
    images: [{ url: 'https://islandswap.finance/islandswap.jpg' }],
  },
}
