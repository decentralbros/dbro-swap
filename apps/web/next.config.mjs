// next.config.mjs
import BundleAnalyzer from '@next/bundle-analyzer'
import { withWebSecurityHeaders } from '@pancakeswap/next-config/withWebSecurityHeaders'
import smartRouterPkgs from '@pancakeswap/smart-router/package.json' with { type: 'json' }
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import path from 'path'
import { fileURLToPath } from 'url'
import { RetryChunkLoadPlugin } from 'webpack-retry-chunk-load-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const withVanillaExtract = createVanillaExtractPlugin()

const workerDeps = Object.keys(smartRouterPkgs.dependencies)
  .map((d) => d.replace('@pancakeswap/', 'packages/'))
  .concat(['/packages/smart-router/', '/packages/swap-sdk/', '/packages/token-lists/'])

/** @type {import('next').NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: 'tsconfig.json',
  },
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production'
  },
  logging: {
    fetches: process.env.NODE_ENV !== 'production',
    webVitals: process.env.NODE_ENV !== 'production'
  },
  experimental: {
    scrollRestoration: true,
    fallbackNodePolyfills: false,
    outputFileTracingRoot: path.join(__dirname, '../../'),
    outputFileTracingExcludes: {
      '*': [],
    },
    optimizePackageImports: [
      '@pancakeswap/widgets-internal',
      '@pancakeswap/uikit',
    ],
  },

  generateBuildId: () => `build-${new Date().toISOString()}`,
  
  swcMinify: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: [
    '@pancakeswap/farms',
    '@pancakeswap/position-managers',
    '@pancakeswap/localization',
    '@pancakeswap/hooks',
    '@pancakeswap/utils',
    '@pancakeswap/widgets-internal',
    '@pancakeswap/ifos',
    '@pancakeswap/uikit',
    '@tanstack/query-core',
  ],
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin-allow-popups',
        },
      ],
    },
    {
      source: '/favicon.ico',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, immutable, max-age=604800',
        },
      ],
    },
    {
      source: '/logo.png',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, immutable, max-age=604800',
        },
      ],
    },
    {
      source: '/images/:all*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, immutable, max-age=604800',
        },
      ],
    },
    {
      source: '/images/tokens/:all*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, immutable, max-age=604800',
        },
      ],
    },
  ],
  webpack: (webpackConfig, { webpack, isServer, dev }) => {
    // Sentry optimization
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
        __SENTRY_TRACING__: false,
      })
    )
    webpackConfig.plugins.push(
      new RetryChunkLoadPlugin({
        cacheBust: `function() {
          return 'cache-bust=' + Date.now();
        }`,
        retryDelay: `function(retryAttempt) {
          return 2 ** (retryAttempt - 1) * 500;
        }`,
        maxRetries: 5,
      }),
    )

    // Worker chunks optimization
    if (!isServer && webpackConfig.optimization.splitChunks) {
      webpackConfig.optimization.splitChunks.cacheGroups.workerChunks = {
        chunks: 'all',
        test(module) {
          const resource = module.nameForCondition?.() ?? ''
          return resource ? workerDeps.some((d) => resource.includes(d)) : false
        },
        priority: 31,
        name: 'worker-chunks',
        reuseExistingChunk: true,
      }
    }

    // Production optimizations
    if (!dev) {
      webpackConfig.optimization.moduleIds = 'deterministic'
      webpackConfig.optimization.chunkIds = 'deterministic'
    }

    return webpackConfig
  },
}

export default withBundleAnalyzer(
  withVanillaExtract(withWebSecurityHeaders(config))
)