import { ConfigType, FAQConfig } from '../types'
import { buyCryptoFAQConfig } from './buyCrypto'
import { predictionFAQConfig } from './prediction'
import { swapFAQConfig } from './swap'

export const faqConfig: Record<ConfigType, FAQConfig> = {
  swap: swapFAQConfig,
  prediction: predictionFAQConfig,
  buyCrypto: buyCryptoFAQConfig,
}

export const faqTypeByPage: Record<string, ConfigType> = {
  '/': 'swap',
  '/prediction': 'prediction',
  '/buy-crypto': 'buyCrypto',
}
