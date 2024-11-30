import { Address, zeroAddress } from 'viem'
import { Currency, getCurrencyAddress } from '@pancakeswap/swap-sdk-core'
import { encodePoolParameters } from '@pancakeswap/v4-sdk'

import { BaseRoute, Pool } from '../types'
import { getOutputCurrency, isV4BinPool, isV4ClPool } from './pool'

export type PathKey = {
  intermediateCurrency: Address
  fee: number
  hooks: Address
  poolManager: Address
  hookData: `0x${string}`
  parameters: `0x${string}`
}

/**
 * Converts a route to an array of path key
 * @param route the mixed path to convert to an encoded path
 * @returns the encoded path keys
 */
export function encodeV4RouteToPath(route: BaseRoute, exactOutput: boolean): PathKey[] {
  if (route.pools.some((p) => !isV4ClPool(p) && !isV4BinPool(p))) {
    throw new Error('Failed to encode path keys. Invalid v4 pool found in route.')
  }

  const currencyStart = exactOutput ? route.output : route.input
  const pools = exactOutput ? [...route.pools].reverse() : route.pools

  const { path } = pools.reduce(
    (
      // eslint-disable-next-line @typescript-eslint/no-shadow
      { baseCurrency, path }: { baseCurrency: Currency; path: PathKey[] },
      pool: Pool,
    ): { baseCurrency: Currency; path: PathKey[] } => {
      const isV4Cl = isV4ClPool(pool)
      const isV4Bin = isV4BinPool(pool)
      if (!isV4Cl && !isV4Bin) throw new Error(`Invalid v4 pool ${pool}`)
      const quoteCurrency = getOutputCurrency(pool, baseCurrency)
      const parameters = encodePoolParameters(
        isV4Cl
          ? {
              tickSpacing: pool.tickSpacing,
            }
          : {
              binStep: pool.binStep,
            },
      )
      return {
        baseCurrency: quoteCurrency,
        path: [
          ...path,
          {
            intermediateCurrency: getCurrencyAddress(quoteCurrency),
            fee: pool.fee,
            hooks: pool.hooks ?? zeroAddress,
            poolManager: pool.poolManager,
            hookData: '0x',
            parameters,
          },
        ],
      }
    },
    { baseCurrency: currencyStart, path: [] },
  )

  return exactOutput ? path.reverse() : path
}
