import { cacheByLRU } from '@pancakeswap/utils/cacheByLRU'
import { GaugeConfig } from '../../types'
import { GAUGES_API } from './endpoint'

const fetchGaugeConfig = async () => {
  try {
    const response = await fetch(GAUGES_API, {
      signal: AbortSignal.timeout(3000),
    })
    if (response.ok) {
      const gauges: GaugeConfig[] = await response.json()
      if (!gauges) {
        throw new Error(`Unexpected empty gauges fetched from remote`)
      }
      return gauges
    }
    throw new Error(`Fetch failed with status: ${response.status}`)
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Fetch failed: ${e.message}`)
    } else {
      throw new Error(`Fetch failed: ${e}`)
    }
  }
}

export const getGauges = cacheByLRU(fetchGaugeConfig, {
  name: 'getGaugesConfig',
  ttl: 10000,
  key: () => [],
})
