import { ChainId } from '@pancakeswap/chains'

export const PANCAKE_EXTENDED = 'https://tokens.pancakeswap.finance/pancakeswap-extended.json'
export const COINGECKO = 'https://tokens.pancakeswap.finance/coingecko.json'

const PANCAKE_ETH_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-eth-default.json'
const PANCAKE_ZKSYNC_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-zksync-default.json'
const PANCAKE_POLYGON_ZKEVM_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-polygon-zkevm-default.json'
// const PANCAKE_ARB_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-arbitrum-default.json'
const PANCAKE_LINEA_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-linea-default.json'
// const PANCAKE_BASE_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-base-default.json'
const PANCAKE_OPBNB_DEFAULT = 'https://tokens.pancakeswap.finance/pancakeswap-opbnb-default.json'

export const PANCAKE_ETH_MM = 'https://tokens.pancakeswap.finance/pancakeswap-eth-mm.json'
export const PANCAKE_BSC_MM = 'https://tokens.pancakeswap.finance/pancakeswap-bnb-mm.json'

// export const CMC = 'https://tokens.pancakeswap.finance/cmc.json' // not updated for a while

export const COINGECKO_ETH = 'https://tokens.coingecko.com/uniswap/all.json'
export const COINGECKO_ARBITRUM = 'https://tokens.coingecko.com/arbitrum-one/all.json'
export const COINGECKO_BASE = 'https://tokens.coingecko.com/base/all.json'

const ETH_URLS = [COINGECKO_ETH]
const BSC_URLS = [COINGECKO]
const POLYGON_ZKEVM_URLS = [PANCAKE_POLYGON_ZKEVM_DEFAULT, 'https://tokens.coingecko.com/polygon-zkevm/all.json']
const ARBITRUM_URLS = [COINGECKO_ARBITRUM]
const LINEA_URLS = [PANCAKE_LINEA_DEFAULT, 'https://tokens.coingecko.com/linea/all.json']
const ZKSYNC_URLS = [PANCAKE_ZKSYNC_DEFAULT, 'https://tokens.coingecko.com/zksync/all.json']
const OP_SUPER_CHAIN_URL =
  'https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json'
const BASE_URLS = [COINGECKO_BASE]
const OPBNB_URLS = [PANCAKE_OPBNB_DEFAULT]

// List of official tokens list
export const OFFICIAL_LISTS = []

export const UNSUPPORTED_LIST_URLS: string[] = [COINGECKO]
export const WARNING_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  ...BSC_URLS,
  ...ETH_URLS,
  ...ZKSYNC_URLS,
  ...LINEA_URLS,
  ...POLYGON_ZKEVM_URLS,
  ...BASE_URLS,
  ...ARBITRUM_URLS,
  OP_SUPER_CHAIN_URL,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
  ...WARNING_LIST_URLS,
  ...OPBNB_URLS,
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []

export const MULTI_CHAIN_LIST_URLS: { [chainId: number]: string[] } = {
  [ChainId.BSC]: BSC_URLS,
  [ChainId.ETHEREUM]: ETH_URLS,
  [ChainId.ZKSYNC]: ZKSYNC_URLS,
  [ChainId.POLYGON_ZKEVM]: POLYGON_ZKEVM_URLS,
  [ChainId.ARBITRUM_ONE]: ARBITRUM_URLS,
  [ChainId.LINEA]: LINEA_URLS,
  [ChainId.BASE]: BASE_URLS,
  [ChainId.OPBNB]: OPBNB_URLS,
}
