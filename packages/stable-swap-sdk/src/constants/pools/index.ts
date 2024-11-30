import { ChainId } from '@pancakeswap/chains'
import { ERC20Token } from '@pancakeswap/sdk'
import { STABLE_SWAP_API } from '../../config/endpoint'
import { StableSwapPool } from '../../types'
import { isStableSwapSupported, STABLE_SUPPORTED_CHAIN_IDS } from './pools'

const stableSwapCache: Record<string, StableSwapPool[]> = {}
const inProgressFetches: Record<string, Promise<StableSwapPool[]> | undefined> = {}

export const fetchStableSwapData = async (chainId: ChainId): Promise<StableSwapPool[]> => {
  const cacheKey = `${chainId}-all`

  // Return cached data if it exists
  if (stableSwapCache[cacheKey]) {
    return stableSwapCache[cacheKey]
  }

  // Return in-progress fetch if available
  if (inProgressFetches[cacheKey]) {
    return inProgressFetches[cacheKey]!
  }

  // Start a new fetch, assign it to the in-progress tracker
  inProgressFetches[cacheKey] = fetch(`${STABLE_SWAP_API}?chainId=${chainId}`, {
    signal: AbortSignal.timeout(3000),
  })
    .then((response) => response.json())
    .then((result) => {
      const newData: StableSwapPool[] = result.map((p: any) => ({
        ...p,
        token: new ERC20Token(
          p.token.chainId,
          p.token.address,
          p.token.decimals,
          p.token.symbol,
          p.token.name,
          p.token.projectLink,
        ),
        quoteToken: new ERC20Token(
          p.quoteToken.chainId,
          p.quoteToken.address,
          p.quoteToken.decimals,
          p.quoteToken.symbol,
          p.quoteToken.name,
          p.quoteToken.projectLink,
        ),
      }))

      // Cache the result before returning it
      stableSwapCache[cacheKey] = newData
      return newData
    })
    .catch(() => {
      return []
    })
    .finally(() => {
      // Clean up in-progress fetch tracker
      delete inProgressFetches[cacheKey]
    })

  return inProgressFetches[cacheKey]!
}

export async function getStableSwapPools(chainId: ChainId): Promise<StableSwapPool[]> {
  // Stable swap is only supported on BSC chain & BSC testnet
  if (!isStableSwapSupported(chainId)) {
    return []
  }

  const stableSwapData = await fetchStableSwapData(chainId)
  return stableSwapData
}

export { isStableSwapSupported, STABLE_SUPPORTED_CHAIN_IDS }
