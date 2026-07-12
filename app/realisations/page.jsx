import Realisations from '@/views/Realisations'

export const metadata = {
  title: 'Réalisations Toiture Haute-Savoie — Photos Avant/Après Chantiers | RT Toiture 74',
  description: "Photos avant/après de nos chantiers toiture en Haute-Savoie : démoussage Annecy, peinture toiture Bonneville, hydrofuge Chamonix, zinguerie Cluses. Artisan RGE certifié RT Toiture 74.",
  alternates: { canonical: 'https://rt-toiture74.fr/realisations' },
  openGraph: {
    url: 'https://rt-toiture74.fr/realisations',
    title: 'Nos Réalisations Toiture en Haute-Savoie — RT Toiture 74',
    description: 'Photos et vidéos avant/après de nos chantiers toiture : démoussage, peinture, hydrofuge, rénovation complète en Haute-Savoie (74).',
    images: [{ url: 'https://rt-toiture74.fr/images/maison-apres-face.jpg', width: 1200, height: 630, alt: 'Réalisation toiture complète Haute-Savoie — RT Toiture 74' }],
  },
}

export default function RealisationsPage() { return <Realisations /> }
