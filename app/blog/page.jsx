import Blog from '@/views/Blog'

export const metadata = {
  title: 'Blog Toiture — Conseils et Guides Haute-Savoie | RT Toiture',
  description: "Conseils d'expert sur l'entretien et la rénovation de toiture en Haute-Savoie. Guides démoussage, hydrofuge, isolation, matériaux adaptés au climat alpin. RT Toiture 74.",
  alternates: { canonical: 'https://rt-toiture74.fr/blog' },
  openGraph: { url: 'https://rt-toiture74.fr/blog' },
}

export default function BlogPage() { return <Blog /> }
