import { LanguageProvider } from '@pancakeswap/localization'
import { DialogProvider, ModalProvider, UIKitProvider, dark } from '@pancakeswap/uikit'
import { Store } from '@reduxjs/toolkit'
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HistoryManagerProvider } from 'contexts/HistoryContext'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { createW3WWagmiConfig, createWagmiConfig } from 'utils/wagmi'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

const StyledUIKitProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  return (
    <UIKitProvider theme={dark} {...props}>
      {children}
    </UIKitProvider>
  )
}

const Providers: React.FC<
  React.PropsWithChildren<{
    store: Store
    children: React.ReactNode
    dehydratedState: any
    w3wWagmiConfig?: boolean
  }>
> = ({ children, store, dehydratedState, w3wWagmiConfig }) => {
  const wagmiConfig = useMemo(() => (w3wWagmiConfig ? createW3WWagmiConfig() : createWagmiConfig()), [w3wWagmiConfig])

  return (
    <WagmiProvider reconnectOnMount config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <Provider store={store}>
            <NextThemeProvider>
              <LanguageProvider>
                <StyledUIKitProvider>
                  <HistoryManagerProvider>
                    <ModalProvider portalProvider={DialogProvider}>{children}</ModalProvider>
                  </HistoryManagerProvider>
                </StyledUIKitProvider>
              </LanguageProvider>
            </NextThemeProvider>
          </Provider>
        </HydrationBoundary>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Providers
