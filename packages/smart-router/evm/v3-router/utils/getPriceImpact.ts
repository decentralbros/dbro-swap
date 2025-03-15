import { CurrencyAmount, ONE_HUNDRED_PERCENT, Percent, TradeType } from '@pancakeswap/sdk'

import { Route, SmartRouterTrade } from '../types'
import { getMidPrice } from './route'

export function getPriceImpact(
  trade: Pick<SmartRouterTrade<TradeType>, 'outputAmount' | 'routes'> & {
    routes: Pick<Route, 'path' | 'pools'>[]
  },
): Percent {
  let spotOutputAmount = CurrencyAmount.fromRawAmount(trade.outputAmount.currency, 0)
  for (const route of trade.routes) {
    const { inputAmount } = route
    // FIXME typing
    const midPrice: any = getMidPrice(route)
    spotOutputAmount = spotOutputAmount.add(
      CurrencyAmount.fromRawAmount(trade.outputAmount.currency, midPrice.wrapped.quote(inputAmount.wrapped).quotient),
    )
  }
  if (spotOutputAmount.equalTo(0)) {
    return ONE_HUNDRED_PERCENT
  }
  const priceImpact = spotOutputAmount.subtract(trade.outputAmount).divide(spotOutputAmount)
  return new Percent(priceImpact.numerator, priceImpact.denominator)
}
