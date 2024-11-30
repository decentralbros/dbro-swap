import { useAtom } from 'jotai'
import type { TransactionReceipt } from 'viem'
import { useCallback } from 'react'
import { txReceiptAtom } from '../atom'

export const useLatestTxReceipt = () => {
  const [latestTxReceipt, setTxReceipt] = useAtom(txReceiptAtom)

  const setLatestTxReceipt = useCallback(
    (receipt?: TransactionReceipt | null) => {
      if (receipt?.status === 'success') {
        setTxReceipt({ blockHash: receipt.blockHash, confirmedTime: Date.now() })
      }
    },
    [setTxReceipt],
  )

  return [latestTxReceipt, setLatestTxReceipt] as const
}
