'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'
import { RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { WagmiProvider } from 'wagmi'
import { Header } from '~~/components/Header'
import { BlockieAvatar } from '~~/components/scaffold-eth'
import { ProgressBar } from '~~/components/scaffold-eth/ProgressBar'
import { useInitializeNativeCurrencyPrice } from '~~/hooks/scaffold-eth'
import { wagmiConfig } from '~~/services/web3/wagmiConfig'

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice()
  const { isTinder, setIsTinder } = useContext(TinderContext)

  const bg = isTinder ? 'bg-[#FFB6EF]' : 'bg-neutral-content'

  return (
    <>
      <div className={`flex flex-col min-h-screen ${bg}`}>
        {/* <Header /> */}
        <main className="relative flex flex-col flex-1">{children}</main>
        {/* <Footer /> */}
      </div>
      <Toaster />
    </>
  )
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const TinderContext = createContext<{ isTinder: boolean; setIsTinder: Dispatch<SetStateAction<boolean>> }>({
  isTinder: false,
  setIsTinder: () => false,
})

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const [isTinder, setIsTinder] = useState(false)

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ProgressBar />
        <RainbowKitProvider avatar={BlockieAvatar} theme={lightTheme()}>
          <TinderContext.Provider value={{ isTinder, setIsTinder }}>
            <ScaffoldEthApp>{children}</ScaffoldEthApp>
          </TinderContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
