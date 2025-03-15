import { cacheByLRU } from '@pancakeswap/utils/cacheByLRU'
import keyBy from 'lodash/keyBy'
import { PublicClient } from 'viem'
import { getGauges } from './constants/config/getGauges'
import { CONFIG_TESTNET } from './constants/config/testnet'
import { fetchAllGauges } from './fetchAllGauges'
import { fetchAllKilledGauges } from './fetchAllKilledGauges'
import { fetchAllGaugesVoting } from './fetchGaugeVoting'
import { Gauge, GaugeInfoConfig } from './types'

export type getAllGaugesOptions = {
  testnet?: boolean
  inCap?: boolean
  bothCap?: boolean
  // include killed gauges if true
  killed?: boolean
  blockNumber?: bigint
}

export const getAllGauges = async (
  client: PublicClient,
  options: getAllGaugesOptions = {
    testnet: false,
    inCap: true,
    bothCap: false,
    killed: false,
  },
): Promise<Gauge[]> => {
  const { testnet, inCap, bothCap, killed, blockNumber } = options
  const gaugesCMS = testnet ? CONFIG_TESTNET : await getGauges()
  gaugesCMS.sort((a, b) => (a.gid < b.gid ? -1 : 1))
  const gaugesSC = await fetchGaugesSC(client, killed, blockNumber)
  const gaugesCMSMap = keyBy(gaugesCMS, 'gid')

  const allGaugeInfoConfigs = (killed ? gaugesSC : gaugesSC.filter((g) => !g.killed)).map((config) => {
    const correspondingCMS: any = gaugesCMSMap[config.gid]
    const mergedConfig: GaugeInfoConfig = { ...correspondingCMS, ...config }
    return mergedConfig
  })

  if (!bothCap) {
    const allGaugesVoting = await fetchAllGaugesVoting(client, allGaugeInfoConfigs, inCap, options)
    return allGaugesVoting
  }

  const inCapVoting = await fetchAllGaugesVoting(client, allGaugeInfoConfigs, true, options)
  const notInCapVoting = await fetchAllGaugesVoting(client, allGaugeInfoConfigs, false, options)

  return inCapVoting.reduce((prev, inCapGauge) => {
    const notInCapGauge = notInCapVoting.find((p) => p.hash === inCapGauge.hash)

    return [
      ...prev,
      {
        ...inCapGauge,
        weight: 0n,
        inCapWeight: inCapGauge.weight,
        notInCapWeight: notInCapGauge?.weight,
      },
    ]
  }, [] as Gauge[])
}

async function _fetchGaugesSC(client: PublicClient, killed?: boolean, blockNumber?: bigint) {
  let gaugesSC = await fetchAllGauges(client, {
    blockNumber,
  })
  gaugesSC = await fetchAllKilledGauges(client, gaugesSC, { blockNumber })
  if (!killed) gaugesSC = gaugesSC.filter((gauge) => !gauge.killed)
  return gaugesSC
}

const fetchGaugesSC = cacheByLRU(_fetchGaugesSC, {
  name: 'gaugesSC',
  ttl: 15000,
  key: (params) => {
    const [, killed, blockNumber] = params
    return [killed, blockNumber]
  },
})
