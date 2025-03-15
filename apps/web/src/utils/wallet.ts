import { Connector } from 'wagmi'

export const checkWalletCanRegisterToken = async (connector: Connector) => {
  try {
    if (typeof connector.getProvider !== 'function') return false

    const provider = (await connector.getProvider()) as any

    return Boolean(
      provider &&
        !provider.isSafePal &&
        (provider.isMetaMask || provider.isTrust || provider.isCoinbaseWallet || provider.isTokenPocket),
    )
  } catch (error) {
    console.error(error, 'Error determining wallet token registration support')
    return false
  }
}
