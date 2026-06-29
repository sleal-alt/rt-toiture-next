import MentionsLegales from '@/views/MentionsLegales'

export const metadata = {
  title: 'Mentions Légales | RT Toiture 74',
  description: 'Mentions légales du site rt-toiture74.fr — Reinhart Timothée Rénovation Toiture-Couverture, SIRET 938 199 213.',
  alternates: { canonical: 'https://rt-toiture74.fr/mentions-legales' },
  robots: { index: false, follow: false },
}

export default function MentionsLegalesPage() { return <MentionsLegales /> }
