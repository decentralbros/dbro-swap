export interface Estimate {
  chainId: number
  buyToken: string
  sellToken: string
  sellAmount: bigint
  taker: string
  swapFeeRecipient: string
  swapFeeBps: number
  swapFeeToken: string
  slippageBps: number
}
