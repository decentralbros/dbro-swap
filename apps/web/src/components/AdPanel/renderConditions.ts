/**
 * @param start Start timestamp in seconds
 * @param end End timestamp in seconds
 */
export const shouldRenderByTime = (start: number, end: number) => {
  const now = Date.now()
  return now >= start * 1000 && now <= end * 1000
}

/**
 * @param pages Array of page path strings or regex patterns (Example: ['/cake-staking', /\/swap\/\w+/])
 * @returns boolean[]
 */
export const shouldRenderOnPages = (pages: Array<string | RegExp>) => {
  return typeof window !== 'undefined' && pages.some((page) => new RegExp(`^${page}$`).test(window.location.pathname))
}
