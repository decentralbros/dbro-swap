import { ChainId } from '@pancakeswap/chains'
import { notEmpty } from 'utils/notEmpty'
import {
  arbitrum,
  arbitrumGoerli,
  arbitrumSepolia,
  base,
  baseGoerli,
  baseSepolia,
  linea,
  opBNB,
  opBNBTestnet,
  polygonZkEvm,
  polygonZkEvmTestnet,
  scrollSepolia,
  sepolia,
  zkSync,
} from 'wagmi/chains'

const ARBITRUM_NODES = [
  ...arbitrum.rpcUrls.default.http,
  'https://arbitrum-one.publicnode.com',
  'https://arbitrum.llamarpc.com',
].filter(notEmpty)

export const SERVER_NODES = {
  [ChainId.BSC]: [
    'https://bsc.publicnode.com',
    'https://binance.llamarpc.com',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed1.binance.org',
  ].filter(notEmpty),
  [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  [ChainId.ETHEREUM]: ['https://ethereum.publicnode.com', 'https://eth.llamarpc.com', 'https://cloudflare-eth.com'],
  [ChainId.GOERLI]: ['https://eth-goerli.public.blastapi.io'].filter(notEmpty),
  [ChainId.ARBITRUM_ONE]: ARBITRUM_NODES,
  [ChainId.ARBITRUM_GOERLI]: arbitrumGoerli.rpcUrls.default.http,
  [ChainId.POLYGON_ZKEVM]: [
    'https://f2562de09abc5efbd21eefa083ff5326.zkevm-rpc.com/',
    ...polygonZkEvm.rpcUrls.default.http,
  ].filter(notEmpty),
  [ChainId.POLYGON_ZKEVM_TESTNET]: [
    'https://polygon-zkevm-testnet.rpc.thirdweb.com',
    ...polygonZkEvmTestnet.rpcUrls.default.http,
  ],
  [ChainId.ZKSYNC]: [...zkSync.rpcUrls.default.http],
  [ChainId.LINEA]: linea.rpcUrls.default.http,
  [ChainId.LINEA_TESTNET]: [
    'https://rpc.goerli.linea.build',
    'https://linea-testnet.rpc.thirdweb.com',
    'https://consensys-zkevm-goerli-prealpha.infura.io/v3/93e8a17747e34ec0ac9a554c1b403965',
  ],
  [ChainId.OPBNB_TESTNET]: opBNBTestnet.rpcUrls.default.http,
  [ChainId.OPBNB]: [...opBNB.rpcUrls.default.http],
  [ChainId.BASE]: [
    'https://base.publicnode.com',
    // process.env.NEXT_PUBLIC_NODE_REAL_BASE_PRODUCTION,
    ...base.rpcUrls.default.http,
  ],
  [ChainId.BASE_TESTNET]: baseGoerli.rpcUrls.default.http,
  [ChainId.SCROLL_SEPOLIA]: scrollSepolia.rpcUrls.default.http,
  [ChainId.SEPOLIA]: sepolia.rpcUrls.default.http,
  [ChainId.ARBITRUM_SEPOLIA]: arbitrumSepolia.rpcUrls.default.http,
  [ChainId.BASE_SEPOLIA]: baseSepolia.rpcUrls.default.http,
}

export const PUBLIC_NODES = {
  [ChainId.BSC]: [
    'https://bsc.publicnode.com',
    'https://binance.llamarpc.com',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed1.binance.org',
  ].filter(notEmpty),
  [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
  [ChainId.ETHEREUM]: [
    process.env.NEXT_PUBLIC_NODIES_ETH || '',
    'https://ethereum.publicnode.com',
    'https://eth.llamarpc.com',
    'https://cloudflare-eth.com',
  ].filter(notEmpty),
  [ChainId.GOERLI]: ['https://eth-goerli.public.blastapi.io'].filter(notEmpty),
  [ChainId.ARBITRUM_ONE]: [process.env.NEXT_PUBLIC_NODIES_ARB || '', ...ARBITRUM_NODES].filter(notEmpty),
  [ChainId.ARBITRUM_GOERLI]: arbitrumGoerli.rpcUrls.default.http,
  [ChainId.POLYGON_ZKEVM]: [
    ...polygonZkEvm.rpcUrls.default.http,
    'https://f2562de09abc5efbd21eefa083ff5326.zkevm-rpc.com/',
  ].filter(notEmpty),
  [ChainId.POLYGON_ZKEVM_TESTNET]: [
    ...polygonZkEvmTestnet.rpcUrls.default.http,
    'https://polygon-zkevm-testnet.rpc.thirdweb.com',
  ],
  [ChainId.ZKSYNC]: [...zkSync.rpcUrls.default.http],
  [ChainId.LINEA]: linea.rpcUrls.default.http,
  [ChainId.LINEA_TESTNET]: [
    'https://rpc.goerli.linea.build',
    'https://linea-testnet.rpc.thirdweb.com',
    'https://consensys-zkevm-goerli-prealpha.infura.io/v3/93e8a17747e34ec0ac9a554c1b403965',
  ],
  [ChainId.OPBNB_TESTNET]: opBNBTestnet.rpcUrls.default.http,
  [ChainId.OPBNB]: [...opBNB.rpcUrls.default.http, 'https://opbnb.publicnode.com'],
  [ChainId.BASE]: [
    process.env.NEXT_PUBLIC_NODIES_BASE || '',
    'https://base.publicnode.com',
    ...base.rpcUrls.default.http,
  ].filter(notEmpty),
  [ChainId.BASE_TESTNET]: baseGoerli.rpcUrls.default.http,
  [ChainId.SCROLL_SEPOLIA]: scrollSepolia.rpcUrls.default.http,
  [ChainId.SEPOLIA]: sepolia.rpcUrls.default.http,
  [ChainId.ARBITRUM_SEPOLIA]: arbitrumSepolia.rpcUrls.default.http,
  [ChainId.BASE_SEPOLIA]: baseSepolia.rpcUrls.default.http,
}
