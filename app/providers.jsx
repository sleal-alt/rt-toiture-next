'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { AuthProvider } from '@/lib/AuthContext'
import { Toaster } from '@/components/ui/toaster'
import CookieBanner from '@/components/shared/CookieBanner'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import StickyMobileCTA from '@/components/layout/StickyMobileCTA'

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pb-16 lg:pb-0">
            {children}
          </main>
          <Footer />
          <StickyMobileCTA />
        </div>
        <Toaster />
        <CookieBanner />
      </QueryClientProvider>
    </AuthProvider>
  )
}
