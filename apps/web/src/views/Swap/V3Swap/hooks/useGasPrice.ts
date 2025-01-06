import { useQuery } from '@tanstack/react-query'
import { ARBITRUM_RPC, BASE_RPC, BNB_RPC, LINEA_RPC, MAINNET_RPC } from 'config/constants/rpcs'
import { utils } from 'ethers'
import { createPublicClient, http } from 'viem'
import { arbitrum, base, bsc, linea, mainnet } from 'viem/chains'

type GasData = {
  gasPrice: bigint
  gwei: number
  isHigh: boolean
  isLow: boolean
  chainName: string
}

const THRESHOLDS = {
  [mainnet.id]: {
    high: 50,
    low: 30,
    name: 'Ethereum',
  },
  [base.id]: {
    high: 0.1,
    low: 0.01,
    name: 'Base',
  },
  [arbitrum.id]: {
    high: 0.15,
    low: 0.1,
    name: 'Arbitrum',
  },
  [linea.id]: {
    high: 0.15,
    low: 0.1,
    name: 'Linea',
  },
  [bsc.id]: {
    high: 3,
    low: 1.5,
    name: 'BNB Chain',
  },
} as const

const clients = {
  [mainnet.id]: createPublicClient({
    chain: mainnet,
    transport: http(MAINNET_RPC),
  }),
  [base.id]: createPublicClient({
    chain: base,
    transport: http(BASE_RPC),
  }),
  [arbitrum.id]: createPublicClient({
    chain: arbitrum,
    transport: http(ARBITRUM_RPC),
  }),
  [linea.id]: createPublicClient({
    chain: linea,
    transport: http(LINEA_RPC),
  }),
  [bsc.id]: createPublicClient({
    chain: bsc,
    transport: http(BNB_RPC),
  }),
}

type SupportedChainId = keyof typeof THRESHOLDS

function isSupportedChain(chainId: number): chainId is SupportedChainId {
  return chainId in THRESHOLDS
}

export const useGasPrice = ({ chainId, account }: { chainId: number; account?: `0x${string}` }) => {
  return useQuery({
    queryKey: ['gasPrice', chainId, account],
    queryFn: async (): Promise<GasData> => {
      if (!isSupportedChain(chainId)) {
        throw new Error(`Chain ID ${chainId} not supported. Supported chains: ${Object.keys(THRESHOLDS).join(', ')}`)
      }

      const client = clients[chainId]
      const gasPrice = await client.getGasPrice()

      const gweiPrice = utils.formatUnits(gasPrice, 'gwei')

      const chainThresholds = THRESHOLDS[chainId]

      return {
        gasPrice,
        gwei: Number(gweiPrice),
        isHigh: Number(gweiPrice) > chainThresholds.high,
        isLow: Number(gweiPrice) < chainThresholds.low,
        chainName: chainThresholds.name,
      }
    },
    enabled: Boolean(account),
    refetchInterval: 15_000,
    refetchIntervalInBackground: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
  })
}
