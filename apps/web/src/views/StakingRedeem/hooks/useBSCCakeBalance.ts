import { ChainId } from '@pancakeswap/chains'
import { useActiveChainId } from 'hooks/useActiveChainId'
import useTokenBalance from 'hooks/useTokenBalance'
import { useMemo } from 'react'

// @notice: return only bsc or bsc-testnet cake token balance
export const useBSCCakeBalance = () => {
  const { chainId } = useActiveChainId()
  const cakeAddress = useMemo(() => {
    if (ChainId.BASE === chainId) return '0x6a4e0F83D7882BcACFF89aaF6f60D24E13191E9F'
    if (ChainId.BASE_SEPOLIA === chainId) return '0x5B7a6C42ee3ddf82582BA759Bb59A990D0e97398'
    return '0x'
  }, [chainId])

  const { balance } = useTokenBalance(cakeAddress, false, ChainId.BASE_SEPOLIA)

  return balance
}
