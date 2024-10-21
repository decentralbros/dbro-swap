import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | DBRO Swap',
  defaultTitle: 'DBRO Swap',
  description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
  twitter: {
    cardType: 'summary_large_image',
    handle: '@DecentralBros_',
    site: '@DecentralBros_',
  },
  openGraph: {
    title: "DBRO Swap - Everyone's Favorite DEX",
    description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
    images: [{ url: 'https://decentralbros.finance/logo.png' }],
  },
}
