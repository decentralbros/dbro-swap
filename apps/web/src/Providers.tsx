import { LanguageProvider } from '@pancakeswap/localization'
import { DialogProvider, ModalProvider, UIKitProvider, dark } from '@pancakeswap/uikit'
import { Store } from '@reduxjs/toolkit'
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HistoryManagerProvider } from 'contexts/HistoryContext'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { useMemo } from 'react'
import { Provider } from 'react-redux'
import { createWagmiConfig } from 'utils/wagmi'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchInterval: 10000,
    },
  },
})

const StyledUIKitProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  return (
    <UIKitProvider theme={dark} {...props}>
      {children}
    </UIKitProvider>
  )
}

const Providers: React.FC<
  React.PropsWithChildren<{ store: Store; children: React.ReactNode; dehydratedState: any }>
> = ({ children, store, dehydratedState }) => {
  const wagmiConfig = useMemo(() => createWagmiConfig(), [])
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider reconnectOnMount config={wagmiConfig}>
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
      </WagmiProvider>
    </QueryClientProvider>
  )
}

export default Providers
