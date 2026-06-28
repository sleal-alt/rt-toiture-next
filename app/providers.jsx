'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyMobileCTA from '@/components/layout/StickyMobileCTA'
import { Toaster } from '@/components/ui/toaster'
import CookieBanner from '@/components/shared/CookieBanner'

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <StickyMobileCTA />
      <Toaster />
      <CookieBanner />
    </QueryClientProvider>
  )
}
