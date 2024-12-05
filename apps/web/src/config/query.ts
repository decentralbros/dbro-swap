export const refetchOptions = {
  staleTime: 5000,
  refetchInterval: 10000,
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
}
