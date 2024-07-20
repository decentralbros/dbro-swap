import { CHAIN_IDS } from 'utils/wagmi'
import Swap from 'views/Swap'
import SwapLayout from 'views/Swap/SwapLayout'

const SwapPage = () => (
  <SwapLayout>
    <Swap />
  </SwapLayout>
)

SwapPage.chains = CHAIN_IDS
SwapPage.screen = true

export default SwapPage
