import Providers from './providers'
import JsonLd from '@/components/seo/JsonLd'
import '@/index.css'

const BASE_URL = 'https://rt-toiture74.fr'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Couvreur Haute-Savoie 74 — RT Toiture | Devis Gratuit Sous 24h',
    template: '%s | RT Toiture 74',
  },
  description: 'Artisan couvreur en Haute-Savoie (74) basé à Poisy. Démoussage, traitement hydrofuge garanti 10 ans, couverture, zinguerie, étanchéité EPDM. Certifié RGE. Devis gratuit ☎ 06 69 43 41 42.',
  keywords: ['couvreur haute-savoie', 'couvreur 74', 'démoussage toiture', 'traitement hydrofuge', 'artisan toiture annecy', 'couvreur RGE', 'rénovation toiture haute-savoie'],
  authors: [{ name: 'Reinhart Timothée Rénovation Toiture-Couverture' }],
  creator: 'RT Toiture 74',
  publisher: 'RT Toiture 74',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: 'RT Toiture 74',
    title: 'Couvreur Haute-Savoie 74 — RT Toiture | Devis Gratuit Sous 24h',
    description: 'Artisan couvreur en Haute-Savoie (74) basé à Poisy. Démoussage, traitement hydrofuge garanti 10 ans, couverture, zinguerie. Certifié RGE. Devis gratuit ☎ 06 69 43 41 42.',
    images: [{ url: '/images/hero.png', width: 1200, height: 630, alt: 'Couvreur Haute-Savoie — RT Toiture 74' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Couvreur Haute-Savoie 74 — RT Toiture',
    description: 'Artisan couvreur certifié RGE en Haute-Savoie. Démoussage, hydrofuge garanti 10 ans, couverture, zinguerie. Devis gratuit sous 24h.',
    images: ['/images/hero.png'],
  },
  alternates: { canonical: BASE_URL },
  verification: {},
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  '@id': `${BASE_URL}/#organization`,
  name: 'Reinhart Timothée Rénovation Toiture-Couverture',
  alternateName: 'RT Toiture 74',
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  image: `${BASE_URL}/images/hero.png`,
  description: 'Artisan couvreur certifié RGE en Haute-Savoie (74). Démoussage, traitement hydrofuge garanti 10 ans, couverture, zinguerie, étanchéité EPDM. Basé à Poisy, intervention dans tout le 74.',
  telephone: '+33669434142',
  email: 'maldinireinhardt74@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '48 Route des Creusettes',
    addressLocality: 'Poisy',
    postalCode: '74330',
    addressRegion: 'Haute-Savoie',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 45.8715,
    longitude: 6.0594,
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Haute-Savoie',
    description: 'Département 74 — Annecy, Annemasse, Chamonix, Bonneville, Cluses, Sallanches, Megève et environs',
  },
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Chèque, Virement, Espèces',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '18:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '17:00' },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    reviewCount: '8',
  },
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Certification RGE', name: 'Reconnu Garant de l\'Environnement' },
  ],
  sameAs: ['https://share.google/9bjVg8JW1pUi7lBct'],
  taxID: '938 199 213',
  legalName: 'Reinhart Timothée Rénovation Toiture-Couverture',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'RT Toiture 74',
  description: 'Site officiel de RT Toiture 74 — Artisan couvreur en Haute-Savoie',
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: 'fr-FR',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/services?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <JsonLd data={localBusinessSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
