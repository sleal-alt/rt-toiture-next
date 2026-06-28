export const dynamic = 'force-dynamic'
import Providers from './providers'
import '@/index.css'

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
