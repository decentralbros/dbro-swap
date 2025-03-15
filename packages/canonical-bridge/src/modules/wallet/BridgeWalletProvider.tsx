import {
  ConnectionProvider as SolanaConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from '@solana/wallet-adapter-react'
import { WalletProvider as TronWalletProvider } from '@tronweb3/tronwallet-adapter-react-hooks'
import { env } from '../../configs'

const EMPTY_ARRAY: never[] = []

export function BridgeWalletProvider(props: React.PropsWithChildren) {
  const { children } = props

  return (
    <SolanaConnectionProvider endpoint={env.SOLANA_RPC_ENDPOINT}>
      <SolanaWalletProvider wallets={EMPTY_ARRAY} autoConnect={false}>
        <TronWalletProvider adapters={EMPTY_ARRAY} autoConnect={false}>
          {children}
        </TronWalletProvider>
      </SolanaWalletProvider>
    </SolanaConnectionProvider>
  )
}
