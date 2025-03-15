import QuickLRU from 'quick-lru'
import { keccak256, stringify } from 'viem'

type AsyncFunction<T extends any[]> = (...args: T) => Promise<any>

// Type definitions for the cache.
type CacheOptions<T extends AsyncFunction<any>> = {
  name?: string
  maxCacheSize?: number
  ttl: number
  key?: (params: Parameters<T>) => any
}

function calcCacheKey(args: any[], epoch: number) {
  const json = stringify(args)
  const r = keccak256(`0x${json}@${epoch}`)
  return r
}

const identity = (args: any) => args

export const cacheByLRU = <T extends AsyncFunction<any>>(fn: T, { ttl, key, maxCacheSize }: CacheOptions<T>) => {
  const cache = new QuickLRU<string, Promise<any>>({
    maxAge: ttl,
    maxSize: maxCacheSize || 1000,
  })

  const keyFunction = key || identity

  let startTime = 0
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    // Start Time
    if (!startTime) {
      startTime = Date.now()
    }
    const epoch = (Date.now() - startTime) / ttl
    const halfTTS = epoch % 1 > 0.5
    const epochId = Math.floor(epoch)

    // Setup next epoch cache if halfTTS passed
    if (halfTTS) {
      const nextKey = calcCacheKey(keyFunction(args), epochId + 1)
      if (!cache.has(nextKey)) {
        // @ts-ignore
        const nextPromise = fn(...args)
        cache.set(nextKey, nextPromise)
      }
    }

    const cacheKey = calcCacheKey(keyFunction(args), epochId)
    // logger(cacheKey, `exists=${cache.has(cacheKey)}`)
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    // @ts-ignore
    const promise = fn(...args)

    cache.set(cacheKey, promise)

    if (epochId > 0) {
      const prevKey = calcCacheKey(keyFunction(args), epochId - 1)
      if (cache.has(prevKey)) {
        return cache.get(prevKey)
      }
    }

    try {
      return await promise
    } catch (error) {
      // logger('error', cacheKey, error)
      cache.delete(cacheKey)
      throw error
    }
  }
}
