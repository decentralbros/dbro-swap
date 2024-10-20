import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | Decentral Bros',
  defaultTitle: 'Decentral Bros',
  description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@DecentralBros_',
    site: '@DecentralBros_',
  },
  openGraph: {
    title: "🏝️ Decentral Bros Aptos - Everyone's Favorite DEX",
    description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
    images: [{ url: 'https://decentralbros.finance/logo.png' }],
  },
}
