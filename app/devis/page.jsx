import Devis from '@/views/Devis'

export const metadata = {
  title: 'Devis Gratuit Toiture Haute-Savoie — Réponse sous 24h | RT Toiture',
  description: "Demandez votre devis gratuit en ligne pour tous vos travaux de toiture en Haute-Savoie (74). Réponse garantie sous 24h. Artisan couvreur certifié RGE. ☎ 06 69 43 41 42.",
  alternates: { canonical: 'https://rt-toiture74.fr/devis' },
  openGraph: { url: 'https://rt-toiture74.fr/devis' },
}

export default function DevisPage() { return <Devis /> }
