import { Currency, getCurrencyAddress, sortCurrencies } from '@pancakeswap/swap-sdk-core'
import { BinPoolManager, PoolKey, getPoolId } from '@pancakeswap/v4-sdk'
import { Native } from '@pancakeswap/sdk'
import { Address } from 'viem'

import { getPairCombinations } from '../../v3-router/functions'
import { PoolType, V4BinPool } from '../../v3-router/types'
import { PoolMeta } from '../../v3-router/providers/poolProviders/internalTypes'
import { createOnChainPoolFactory } from '../../v3-router/providers'
import { BIN_HOOKS, BIN_PRESETS } from '../constants'
import { GetV4CandidatePoolsParams } from '../types'

export async function getV4BinCandidatePools({
  currencyA,
  currencyB,
  clientProvider,
  gasLimit,
}: GetV4CandidatePoolsParams) {
  if (!currencyA || !currencyB) {
    throw new Error(`Invalid currencyA ${currencyA} or currencyB ${currencyB}`)
  }
  const native = Native.onChain(currencyA?.chainId)
  const wnative = native.wrapped
  const pairs = await getPairCombinations(currencyA, currencyB)
  const pairsWithNative = [...pairs]
  for (const pair of pairs) {
    const index = pair.findIndex((c) => c.wrapped.equals(wnative))
    if (index >= 0) {
      const pairWithNative = [...pair]
      pairWithNative[index] = native
      pairsWithNative.push(pairWithNative as [Currency, Currency])
    }
  }
  return getV4BinPoolsWithoutBins(pairsWithNative, clientProvider)
}

type V4BinPoolMeta = PoolMeta & {
  fee: number
  poolManager: Address
  binStep: number
  hooks: Address
}

export const getV4BinPoolsWithoutBins = createOnChainPoolFactory<V4BinPool, V4BinPoolMeta>({
  abi: BinPoolManager,
  getPossiblePoolMetas: async ([currencyA, currencyB]) => {
    const [currency0, currency1] = sortCurrencies([currencyA, currencyB])
    const metas: V4BinPoolMeta[] = []
    for (const { fee, binStep } of BIN_PRESETS) {
      for (const hooks of BIN_HOOKS) {
        const poolKey: PoolKey<'Bin'> = {
          currency0: getCurrencyAddress(currency0),
          currency1: getCurrencyAddress(currency1),
          fee,
          parameters: {
            binStep,
          },
          // TODO: use constant from v4 sdk
          poolManager: '0x1DF0be383e9d17DA4448E57712849aBE5b3Fa33b' as const,
          hooks,
        }
        const id = getPoolId(poolKey)
        metas.push({
          currencyA,
          currencyB,
          fee,
          binStep,
          hooks,
          poolManager: poolKey.poolManager,
          id,
        })
      }
    }
    return metas
  },
  buildPoolInfoCalls: ({ id, poolManager: address }) => [
    {
      address,
      functionName: 'getSlot0',
      args: [id],
    },
  ],
  buildPool: ({ currencyA, currencyB, fee, id, binStep, poolManager, hooks }, [slot0]) => {
    if (!slot0 || !slot0[0]) {
      return null
    }
    const [activeId] = slot0
    const [currency0, currency1] = sortCurrencies([currencyA, currencyB])
    return {
      id,
      type: PoolType.V4BIN,
      currency0,
      currency1,
      fee,
      activeId,
      binStep,
      poolManager,
      hooks,
    }
  },
})
