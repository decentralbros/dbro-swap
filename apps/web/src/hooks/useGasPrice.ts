import { useQuery } from '@tanstack/react-query'
import { utils } from 'ethers'
import { createPublicClient, http } from 'viem'
import { arbitrum, base, mainnet } from 'viem/chains'

const MAINNET_RPC = process.env.NEXT_PUBLIC_NODIES_ETH as string
const ARBITRUM_RPC = process.env.NEXT_PUBLIC_NODIES_ARB as string
const BASE_RPC = process.env.NEXT_PUBLIC_NODIES_BASE as string

type GasData = {
  gasPrice: bigint
  gwei: number
  isHigh: boolean
  isLow: boolean
  chainName: string
}

const THRESHOLDS = {
  [mainnet.id]: {
    high: 150,
    low: 30,
    name: 'Ethereum',
  },
  [base.id]: {
    high: 0.1,
    low: 0.01,
    name: 'Base',
  },
  [arbitrum.id]: {
    high: 0.5,
    low: 0.1,
    name: 'Arbitrum',
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
}

type SupportedChainId = keyof typeof THRESHOLDS

function isSupportedChain(chainId: number): chainId is SupportedChainId {
  return chainId in THRESHOLDS
}

export const useGasPrice = ({ chainId, account }: { chainId: number; account?: `0x${string}` }) => {
  return useQuery({
    queryKey: ['gasPrice', chainId, account],
    queryFn: async (): Promise<GasData> => {
      // Type guard for supported chains
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
    refetchInterval: 10000,
  })
}
