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
        width: 1200,
        height: 630,
        alt: 'DBRO Swap Interface',
        type: 'image/jpeg',
      },
    ],
  },

  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'DBRO, DEX, cryptocurrency, trading, defi, multichain, earn, stake, base network',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'DBRO Swap',
    },
    {
      name: 'theme-color',
      content: '#1bf696', // Replace with your brand color
    },
  ],

  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
  ],
}
