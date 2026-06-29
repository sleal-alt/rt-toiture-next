import Avis from '@/views/Avis'

export const metadata = {
  title: 'Avis Clients — Couvreur Haute-Savoie 74 | RT Toiture',
  description: "Découvrez les avis de nos clients en Haute-Savoie. Note 4.9/5 sur Google — 80+ avis vérifiés. RT Toiture 74, votre couvreur artisan de confiance. ☎ 06 69 43 41 42.",
  alternates: { canonical: 'https://rt-toiture74.fr/avis' },
  openGraph: { url: 'https://rt-toiture74.fr/avis' },
}

export default function AvisPage() { return <Avis /> }
