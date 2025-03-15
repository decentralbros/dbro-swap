import { cacheByLRU } from '@pancakeswap/utils/cacheByLRU'
import { AbiStateMutability, ContractFunctionReturnType, PublicClient } from 'viem'
import { gaugesVotingABI } from './abis/gaugesVoting'
import { getContract } from './contract'
import { fetchGaugesCount } from './fetchGaugesCount'
import { getGaugeHash } from './getGaugeHash'
import { GaugeInfo } from './types'

const _fetchAllGauges = async (
  client: PublicClient,
  options?: {
    blockNumber?: bigint
  },
): Promise<GaugeInfo[]> => {
  const contract = getContract(client)
  const counts = await fetchGaugesCount(client, options)

  const multicalls = []

  for (let i = 0; i < counts; i++) {
    multicalls.push({
      ...contract,
      functionName: 'gauges',
      args: [BigInt(i)],
    } as const)
  }

  const response = (await client.multicall({
    contracts: multicalls,
    allowFailure: false,
    ...options,
  })) as ContractFunctionReturnType<typeof gaugesVotingABI, AbiStateMutability, 'gauges'>[]

  return response.map((x, i) => {
    const [pid, masterChef, chainId, pairAddress, boostMultiplier, maxVoteCap] = x
    return {
      gid: i,
      pid: Number(pid),
      hash: getGaugeHash(pairAddress, Number(chainId)),
      pairAddress,
      masterChef,
      chainId: Number(chainId),
      boostMultiplier: Number(boostMultiplier),
      maxVoteCap: Number(maxVoteCap),
    } as GaugeInfo
  })
}

export const fetchAllGauges = cacheByLRU(_fetchAllGauges, {
  name: 'fetchAllGauges',
  ttl: 10000,
  key: (params) => {
    const [, options] = params
    return [options?.blockNumber]
  },
})
