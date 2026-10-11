import HydrofugePage from '@/views/HydrofugePage'
import { COMMUNES } from '@/lib/siteData'

export async function generateStaticParams() {
  return COMMUNES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const commune = COMMUNES.find(c => c.slug === params.slug)
  if (!commune) return {}
  const { name, code } = commune
  return {
    title: `Traitement Hydrofuge Toiture à ${name} (${code}) — Protection 10 ans | RT Toiture 74`,
    description: `Traitement hydrofuge toiture à ${name} (${code}). Hydrofuge siloxane garanti 10 ans. Protection contre infiltrations, mousses et gel. Artisan RGE certifié. Devis gratuit ☎ 06 69 43 41 42.`,
    alternates: { canonical: `https://www.rt-toiture74.fr/hydrofuge-toiture/${params.slug}` },
    openGraph: {
      url: `https://www.rt-toiture74.fr/hydrofuge-toiture/${params.slug}`,
      title: `Hydrofuge Toiture ${name} — RT Toiture 74`,
      description: `Hydrofuge siloxane professionnel à ${name} (${code}). Protection imperméabilisante 10 ans garanti. Artisan RGE. Devis gratuit sous 24h.`,
    },
  }
}

export default function HydrofugeSlugPage() { return <HydrofugePage /> }
