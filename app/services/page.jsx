import Services from '@/views/Services'

export const metadata = {
  title: 'Services Toiture Haute-Savoie — Démoussage, Hydrofuge, Couverture | RT Toiture',
  description: "Tous nos services de toiture en Haute-Savoie (74) : démoussage, traitement hydrofuge, peinture, couverture, zinguerie, étanchéité EPDM. Artisan couvreur certifié RGE. Devis gratuit.",
  alternates: { canonical: 'https://rt-toiture74.fr/services' },
  openGraph: { url: 'https://rt-toiture74.fr/services' },
}

export default function ServicesPage() { return <Services /> }
