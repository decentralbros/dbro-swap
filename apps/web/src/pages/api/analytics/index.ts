/* eslint-disable no-param-reassign */
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

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

export default handler

const processTradeData = (data: any) => {
  // Create a map to store token symbols by address
  const tokenSymbols = new Map()

  // Group trades by buyToken and calculate total volume
  const volumeByToken = data.reduce((acc, trade) => {
    const buyTokenAddress = trade.buyToken.toLowerCase()

    // Store token symbol mapping
    trade.tokens.forEach((token) => {
      tokenSymbols.set(token.address.toLowerCase(), token.symbol)
    })

    if (!acc[buyTokenAddress]) {
      acc[buyTokenAddress] = {
        symbol: tokenSymbols.get(buyTokenAddress),
        totalVolumeUSD: 0,
        count: 0,
      }
    }

    acc[buyTokenAddress].totalVolumeUSD += parseFloat(trade.volumeUsd)
    acc[buyTokenAddress].count += 1
    return acc
  }, {})

  // Convert to array and sort by volume
  return Object.entries(volumeByToken)
    .map(([address, token]: any[]) => ({
      address,
      symbol: token.symbol,
      totalVolumeUSD: token.totalVolumeUSD,
      count: token.count,
    }))
    .sort((a, b) => b.count - a.count)
}
