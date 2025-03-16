export const refetchOptions = {
  staleTime: 5000,
  refetchInterval: 15_000,
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30_000),
}
