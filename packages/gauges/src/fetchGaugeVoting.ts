import { cacheByLRU } from '@pancakeswap/utils/cacheByLRU'
import { PublicClient } from 'viem'
import { getCalcContract } from './contract'
import { Gauge, GaugeInfoConfig } from './types'

const _fetchAllGaugesVoting = async (
  client: PublicClient,
  gaugeInfos: GaugeInfoConfig[],
  inCap: boolean = true,
  options?: {
    blockNumber?: bigint
  },
): Promise<Gauge[]> => {
  const contract = getCalcContract(client)
  const weights = await contract.read.massGetGaugeWeight([inCap], options)

  return gaugeInfos.map((gauge) => ({
    ...gauge,
    weight: weights[gauge.gid] ?? 0n,
  }))
}

export const fetchAllGaugesVoting = cacheByLRU(_fetchAllGaugesVoting, {
  name: 'fetchAllGaugesVoting',
  ttl: 5000,
  key: (params) => {
    const [, gaugeInfos, inCap, options] = params
    return [gaugeInfos, inCap, options?.blockNumber]
  },
})
