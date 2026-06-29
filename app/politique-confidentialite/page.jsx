import PolitiqueConfidentialite from '@/views/PolitiqueConfidentialite'

export const metadata = {
  title: 'Politique de Confidentialité | RT Toiture 74',
  description: 'Politique de confidentialité et protection des données personnelles du site rt-toiture74.fr.',
  alternates: { canonical: 'https://rt-toiture74.fr/politique-confidentialite' },
  robots: { index: false, follow: false },
}

export default function PolitiqueConfidentialitePage() { return <PolitiqueConfidentialite /> }
