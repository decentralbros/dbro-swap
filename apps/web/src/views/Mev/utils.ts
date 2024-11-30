import { RPCResponse } from './types'

const AD_ASSETS_URL = 'https://assets.pancakeswap.finance/web/mev'
export const getImageUrl = (asset: string) => `${AD_ASSETS_URL}/${asset}`

export const fetchRPCData = async (method: 'stat_txCount' | 'stat_walletCount'): Promise<number> => {
  const url = 'https://bscrpc.pancakeswap.finance'
  const payload = {
    jsonrpc: '2.0',
    method,
    params: [],
    id: 83,
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: RPCResponse = await response.json() // Explicitly typing the response
    return data.result || 0 // Return the result or fallback to 0
  } catch (error) {
    console.error(`Error fetching RPC data for ${method}:`, error)
    return 0 // Fallback value in case of error
  }
}
