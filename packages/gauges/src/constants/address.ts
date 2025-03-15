import { ChainId } from '@pancakeswap/chains'

export const GAUGES = '0xbCfBf7ED1756FE478B071687cb430C7B3eB682f1' as const
export const GAUGES_TESTNET = '0x357b01894b21787B41A8FA4DCaFE92293470FaD9' as const

export const GAUGES_ADDRESS = {
  [ChainId.BSC]: GAUGES,
  [ChainId.BSC_TESTNET]: GAUGES_TESTNET,
}

export const GAUGES_CALC_ADDRESS = {
  [ChainId.BSC]: '0x4fF7C80Df31e5864776314D89220Ae18626a6D67' as const,
  [ChainId.BSC_TESTNET]: '0x88B02E6238fa6279281eeA600CBfcAd5dd3597A5' as const,
}
