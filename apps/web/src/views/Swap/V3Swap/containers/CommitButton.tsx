import { SmartRouterTrade, V4Router } from '@pancakeswap/smart-router'
import { TradeType } from '@pancakeswap/swap-sdk-core'
import { SwapCommitButton } from './SwapCommitButton'

type Trade = SmartRouterTrade<TradeType> | V4Router.V4TradeWithoutGraph<TradeType>

export type CommitButtonProps = {
  trade: Trade | undefined
  tradeError?: Error
  tradeLoaded: boolean
  beforeCommit?: () => void
  afterCommit?: () => void
}

export const CommitButton = () => {
  return <SwapCommitButton />
}
