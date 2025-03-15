import fs from 'fs'
import os from 'os'

type MerklConfigPool = {
  chainId: number
  // lp address
  address: `0x${string}`
  // link to merkl.angle.money
  link: string
}

export const chainIdToChainName = {
  1: 'ethereum',
  56: 'bnb smart chain',
  324: 'zksync',
  1101: 'polygon zkevm',
  8453: 'base',
  42161: 'arbitrum',
  59144: 'linea',
} as const

const fetchAllMerklConfig = async (): Promise<any[]> => {
  const response = await fetch(
    `https://api.merkl.xyz/v4/opportunities/?chainId=${Object.keys(chainIdToChainName).join(
      ',',
    )}&test=false&status=LIVE&items=1000&action=POOL,HOLD`,
  )

  if (!response.ok) {
    throw new Error('Unable to fetch merkl config')
  }

  return response.json() as Promise<any[]>
}

const parseMerklConfig = (merklConfigResponse: any[]): MerklConfigPool[] => {
  return merklConfigResponse
    .sort((a, b) => {
      if (a.chainId === b.chainId) {
        return a.id - b.id
      }
      return a.chainId - b.chainId
    })
    .filter(
      (opportunity) =>
        (opportunity?.tokens?.[0]?.symbol?.toLowerCase().startsWith('cake-lp') ||
          opportunity?.protocol?.id?.toLowerCase().startsWith('pancakeswap')) &&
        opportunity?.apr > 0,
    )
    .map((pool) => ({
      chainId: pool.chainId,
      address: pool.identifier,
      link: encodeURI(
        `https://merkl.angle.money/${chainIdToChainName[pool.chainId]}/pool/${pool.type === 'ERC20' ? 1 : 2}/${
          pool.identifier
        }`,
      ),
    }))
}

const run = async () => {
  console.info('Fetching merkl config...')
  const merklConfig = await fetchAllMerklConfig()
  console.info('Fetched merkl config!', merklConfig.length)
  console.info('Parsing merkl config...')
  const merklPools = parseMerklConfig(merklConfig)
  console.info('Writing merkl config...')

  fs.writeFile(`apps/web/src/config/constants/merklPools.json`, JSON.stringify(merklPools, null, 2) + os.EOL, (err) => {
    if (err) throw err
    console.info(` ✅ - merklPools.json has been updated!`)
  })
}

run()
