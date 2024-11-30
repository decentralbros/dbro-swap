import { ChainId } from '@pancakeswap/chains'
import { useQuery } from '@tanstack/react-query'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback, useMemo } from 'react'
import { bsc } from 'viem/chains'

async function fetchMEVStatus(): Promise<boolean> {
  if (!window.ethereum || (!window.ethereum as any)?.request) {
    throw new Error('Ethereum provider not found')
  }

  try {
    const result = await (window.ethereum as any)?.request({
      method: 'eth_call',
      params: [
        {
          to: '0x0000000000000000000000000000000000000048',
          value: '0x30',
        },
      ],
    })
    return result === '0x30'
  } catch (error) {
    console.error('Error checking MEV status:', error)
    return false
  }
}

export function useIsMEVEnabled() {
  const isMetaMask = useIsConnectedMetaMask()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['isMEVEnabled'],
    queryFn: fetchMEVStatus,
    enabled: isMetaMask,
    staleTime: 60000,
    retry: false,
  })

  return { isMEVEnabled: data ?? false, isLoading, refetch }
}

export const useIsConnectedMetaMask = () => {
  const { account, chainId } = useActiveWeb3React()
  return useMemo(() => {
    return Boolean(account) && Boolean(window.ethereum?.isMetaMask) && chainId === ChainId.BSC
  }, [account, chainId])
}

export const useShouldShowMEVToggle = () => {
  const isMetaMask = useIsConnectedMetaMask()
  const { isMEVEnabled, isLoading } = useIsMEVEnabled()
  return !isMEVEnabled && !isLoading && isMetaMask
}

export const useAddMevRpc = (onSuccess?: () => void, onBeforeStart?: () => void, onFinish?: () => void) => {
  const addMevRpc = useCallback(async () => {
    onBeforeStart?.()
    try {
      const networkParams = {
        chainId: '0x38', // Chain ID in hexadecimal (56 for Binance Smart Chain)
        chainName: 'PancakeSwap MEV Guard',
        rpcUrls: ['https://bscrpc.pancakeswap.finance'], // PancakeSwap MEV RPC
        nativeCurrency: bsc.nativeCurrency,
        blockExplorerUrls: [bsc.blockExplorers.default.url],
      }

      // Check if the Ethereum provider is available
      if (window.ethereum) {
        try {
          // Prompt the wallet to add the custom network
          await (window.ethereum as any)?.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams],
          })
          console.info('RPC network added successfully!')
          onSuccess?.()
        } catch (error) {
          console.error('Error adding RPC network:', error)
        }
      } else {
        console.warn('Ethereum provider not found. Please check your wallet')
      }
    } catch (error) {
      console.error(error)
    } finally {
      onFinish?.()
    }
  }, [onBeforeStart, onSuccess, onFinish])
  return { addMevRpc }
}
