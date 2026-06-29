import Home from '@/views/Home'
import JsonLd from '@/components/seo/JsonLd'

export const metadata = {
  title: 'Couvreur Haute-Savoie 74 — RT Toiture | Artisan RGE, Devis Gratuit 24h',
  description: 'Artisan couvreur en Haute-Savoie (74). Démoussage, traitement hydrofuge garanti 10 ans, couverture, zinguerie, étanchéité EPDM. Certifié RGE. Intervention 7j/7. ☎ 06 69 43 41 42.',
  alternates: { canonical: 'https://rt-toiture74.fr' },
  openGraph: { url: 'https://rt-toiture74.fr' },
}

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://rt-toiture74.fr/#webpage',
  url: 'https://rt-toiture74.fr',
  name: 'Couvreur Haute-Savoie 74 — RT Toiture',
  isPartOf: { '@id': 'https://rt-toiture74.fr/#website' },
  about: { '@id': 'https://rt-toiture74.fr/#organization' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://rt-toiture74.fr' }],
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeSchema} />
      <Home />
    </>
  )
}
