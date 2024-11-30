import { FormMain, PricingAndSlippage } from './containers'
import { CommitButton } from './containers/CommitButton'

export function V3SwapForm() {
  return (
    <FormMain
      tradeLoading={false}
      pricingAndSlippage={<PricingAndSlippage priceLoading={false} price={undefined} showSlippage />}
      swapCommitButton={<CommitButton />}
    />
  )
}
