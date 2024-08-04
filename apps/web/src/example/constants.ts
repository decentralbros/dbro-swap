import { Address } from 'viem'

export const PERMIT2_ADDRESS = '0x000000000022D473030F116dDEE9F6B43aC78BA3'

export const MAGIC_CALLDATA_STRING = 'f'.repeat(130) // used when signing the eip712 message

export const AFFILIATE_FEE = 100 // 1% affiliate fee. Denoted in Bps.
export const FEE_RECIPIENT = '0x75A94931B81d81C7a62b76DC0FcFAC77FbE1e917' // The ETH address that should receive affiliate fees

export const MAINNET_EXCHANGE_PROXY = '0xDef1C0ded9bec7F1a1670819833240f027b25EfF'

export const MAX_ALLOWANCE = 115792089237316195423570985008687907853269984665640564039457584007913129639935n

interface Token {
  name: string
  address: Address
  symbol: string
  decimals: number
  chainId: number
  logoURI: string
}

export const MAINNET_TOKENS: Token[] = [
  {
    chainId: 1,
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/weth.svg',
  },
  {
    chainId: 1,
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg',
  },
  {
    chainId: 1,
    name: 'Dai - PoS',
    symbol: 'DAI',
    decimals: 18,
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg',
  },
]

export const MAINNET_TOKENS_BY_SYMBOL: Record<string, Token> = {
  weth: {
    chainId: 1,
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/weth.svg',
  },
  usdc: {
    chainId: 1,
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg',
  },
  dai: {
    chainId: 1,
    name: 'Dai - PoS',
    symbol: 'DAI',
    decimals: 18,
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg',
  },
}

export const MAINNET_TOKENS_BY_ADDRESS: Record<string, Token> = {
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': {
    chainId: 1,
    name: 'Wrapped Ether',
    symbol: 'WETH',
    decimals: 18,
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/weth.svg',
  },
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
    chainId: 1,
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/usdc.svg',
  },
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': {
    chainId: 1,
    name: 'Dai - PoS',
    symbol: 'DAI',
    decimals: 18,
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    logoURI: 'https://raw.githubusercontent.com/maticnetwork/polygon-token-assets/main/assets/tokenAssets/dai.svg',
  },
}
