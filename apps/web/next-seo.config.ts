import { DefaultSeoProps } from 'next-seo'

export const SEO: DefaultSeoProps = {
  titleTemplate: '%s | DBRO Swap',
  defaultTitle: "DBRO Swap - Everyone's Favorite DEX",
  description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
  canonical: 'https://decentralbros.finance',

  twitter: {
    cardType: 'summary_large_image',
    handle: '@DecentralBros_',
    site: '@DecentralBros_',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://decentralbros.finance',
    siteName: 'DBRO Swap',
    title: "DBRO Swap - Everyone's Favorite DEX",
    description: 'Trade, earn, and own crypto on the all-in-one multichain DEX',
    images: [
      {
        url: 'https://decentralbros.finance/dbro-swap.jpg',
        alt: 'DBRO Swap',
        type: 'image/jpeg',
      },
    ],
  },

  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'Decentral Bros, DBRO, swap, cryptocurrency, trading, multichain, staking, base network',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'DBRO Swap',
    },
    {
      name: 'theme-color',
      content: '#1bf696',
    },
  ],

  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-icon.png',
      sizes: '180x180',
    },
  ],
}
