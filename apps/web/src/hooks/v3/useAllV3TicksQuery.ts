import isUndefinedOrNull from '@pancakeswap/utils/isUndefinedOrNull'
import { useQuery } from '@tanstack/react-query'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useMemo } from 'react'
import { chainIdToExplorerInfoChainName, explorerApiClient } from 'state/info/api/client'

export type AllV3TicksQuery = {
  ticks: Array<{
    tick: string
    liquidityNet: string
    liquidityGross: string
  }>
}

export type Ticks = AllV3TicksQuery['ticks']

export type TickData = Ticks[number]

export default function useAllV3TicksQuery(
  poolAddress: string | undefined,
  activeTick: number | undefined,
  interval: number,
  enabled = true,
) {
  const { chainId } = useActiveChainId()
  const { data, isLoading, error } = useQuery({
    queryKey: [`useAllV3TicksQuery-${poolAddress}-${chainId}`],
    queryFn: async ({ signal }) => {
      if (!chainId || !poolAddress || !activeTick) return undefined
      return getPoolTicks(chainId, poolAddress, activeTick, signal)
    },
    enabled: Boolean(enabled && poolAddress && chainId && activeTick),
    refetchInterval: interval,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  return useMemo(
    () => ({
      error,
      isLoading,
      data,
    }),
    [data, error, isLoading],
  )
}

export async function getPoolTicks(
  chainId: number,
  poolAddress: string,
  activeTick?: number,
  signal?: AbortSignal,
): Promise<Ticks> {
  const chainName = chainIdToExplorerInfoChainName[chainId]
  if (!chainName) {
    return []
  }

  let max = 10
  let after: string | undefined
  const allTicks: Ticks = []

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!after && max < 10) {
      break
    }
    if (max <= 0) {
      if (!isUndefinedOrNull(activeTick)) {
        const lastTick = allTicks.length > 0 ? allTicks[allTicks.length - 1] : undefined
        if (lastTick && Number(lastTick.tick) < activeTick!) {
          max += 3
        } else {
          break
        }
      } else {
        break
      }
    }
    max--

    // eslint-disable-next-line no-await-in-loop
    const resp = await explorerApiClient.GET('/cached/pools/ticks/v3/{chainName}/{pool}', {
      signal,
      params: {
        path: {
          chainName,
          pool: poolAddress.toLowerCase(),
        },
        query: {
          after,
        },
      },
    })

    if (!resp.data) {
      break
    }
    if (resp.data.rows.length === 0) {
      break
    }
    if (resp.data.hasNextPage && resp.data.endCursor) {
      after = resp.data.endCursor
    } else {
      after = undefined
    }

    resp.data.rows.forEach((tick) => {
      allTicks.push({
        tick: tick.tickIdx.toString(),
        liquidityNet: tick.liquidityNet,
        liquidityGross: tick.liquidityGross,
      })
    })
  }

  return allTicks
}
