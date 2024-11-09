import useTokenBalance from 'hooks/useTokenBalance'

// @notice: return only bsc or bsc-testnet cake token balance
export const useBSCCakeBalance = () => {
  // const { chainId } = useActiveChainId()
  // const cakeAddress = useMemo(() => {
  //   if (ChainId.BASE === chainId) return CAKE[chainId as ChainId].address
  //   if (ChainId.BSC_TESTNET === chainId) return bscTestnetTokens.cake2.address
  //   return undefined
  // }, [chainId])

  const { balance } = useTokenBalance('0x6a4e0F83D7882BcACFF89aaF6f60D24E13191E9F')

  return balance
}
