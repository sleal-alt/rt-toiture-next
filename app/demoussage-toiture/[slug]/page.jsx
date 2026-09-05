import DemoussagePage from '@/views/DemoussagePage'
import { COMMUNES } from '@/lib/siteData'

export async function generateStaticParams() {
  return COMMUNES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const commune = COMMUNES.find(c => c.slug === params.slug)
  if (!commune) return {}
  const { name, code } = commune
  return {
    title: `Démoussage Toiture à ${name} (${code}) — Nettoyage & Traitement Mousse | RT Toiture 74`,
    description: `Démoussage toiture à ${name} (${code}). Nettoyage mousse, lichens, algues. Traitement fongicide + hydrofuge garanti 10 ans. Artisan RGE certifié. Devis gratuit ☎ 06 69 43 41 42.`,
    alternates: { canonical: `https://www.rt-toiture74.fr/demoussage-toiture/${params.slug}` },
    openGraph: {
      url: `https://www.rt-toiture74.fr/demoussage-toiture/${params.slug}`,
      title: `Démoussage Toiture ${name} — RT Toiture 74`,
      description: `Démoussage professionnel à ${name} (${code}). Mousse, lichens, algues éliminés. Traitement préventif garanti 10 ans. Devis gratuit sous 24h.`,
    },
  }
}

export default function DemoussageSlugPage() { return <DemoussagePage /> }
