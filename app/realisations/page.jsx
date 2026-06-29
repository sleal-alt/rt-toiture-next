import Realisations from '@/views/Realisations'

export const metadata = {
  title: 'Réalisations — Chantiers Toiture Haute-Savoie | RT Toiture',
  description: "Découvrez nos réalisations de toiture en Haute-Savoie : démoussage, hydrofuge, couverture, zinguerie. Photos avant/après de nos chantiers. Artisan RGE certifié.",
  alternates: { canonical: 'https://rt-toiture74.fr/realisations' },
  openGraph: { url: 'https://rt-toiture74.fr/realisations' },
}

export default function RealisationsPage() { return <Realisations /> }
