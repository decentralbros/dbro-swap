/* eslint-disable no-param-reassign */
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  // most recent 200 trades
  const request = await fetch(`http://api.0x.org/trade-analytics/swap`, {
    headers: {
      '0x-api-key': process.env.ZERO_X_KEY as string,
      '0x-version': 'v2',
    },
  })

  const { trades } = await request.json()

  const sortedData = processTradeData(trades)

  return res.json(sortedData)
}

const processTradeData = (data: any) => {
  const tokenSymbols = new Map()

  const volumeByToken = data.reduce((acc, trade) => {
    const buyTokenAddress = trade.buyToken?.toLowerCase()
    const chainName = trade.chainName || 'Unknown'
    if (!buyTokenAddress) return acc

    trade.tokens?.forEach((token) => {
      if (token?.address) {
        tokenSymbols.set(token.address.toLowerCase(), token.symbol)
      }
    })

    const key = `${buyTokenAddress}-${chainName}`

    if (!acc[key]) {
      acc[key] = {
        address: buyTokenAddress,
        symbol: tokenSymbols.get(buyTokenAddress),
        chainName,
        totalVolumeUSD: 0,
        count: 0,
      }
    }

    acc[key].totalVolumeUSD += parseFloat(trade.volumeUsd || 0)
    acc[key].count += 1

    return acc
  }, {})

  const result = Object.values(volumeByToken)

  return result.sort((a: any, b: any) => b.totalVolumeUSD - a.totalVolumeUSD)
}
