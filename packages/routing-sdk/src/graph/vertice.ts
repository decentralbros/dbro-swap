import { Currency, getCurrencyAddress } from '@pancakeswap/swap-sdk-core'

import { Vertice } from '../types'

export function getWrappedCurrencyKey(c: Currency) {
  return `${c.chainId}-${getCurrencyAddress(c.wrapped)}`
}

export function getVerticeKey(vertice: Vertice) {
  return getWrappedCurrencyKey(vertice.currency)
}
