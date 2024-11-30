import { useActiveChainId } from 'hooks/useActiveChainId'
import { useMemo } from 'react'
import { useStableSwapPairsByChainId } from 'state/farmsV4/state/accountPositions/hooks'

export function useStableSwapPairs() {
  const { chainId } = useActiveChainId()
  const pairs = useStableSwapPairsByChainId(chainId)

  return useMemo(() => pairs || [], [pairs])
}
