import PolitiqueCookies from '@/views/PolitiqueCookies'

export const metadata = {
  title: 'Politique des Cookies',
  description: "Politique d'utilisation des cookies du site rt-toiture74.fr — Couvreur Haute-Savoie.",
  alternates: { canonical: 'https://www.rt-toiture74.fr/cookies' },
  robots: { index: false, follow: false },
}

export default function CookiesPage() { return <PolitiqueCookies /> }
