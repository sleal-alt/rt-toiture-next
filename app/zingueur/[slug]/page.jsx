import ZingueurPage from '@/views/ZingueurPage'
import { COMMUNES } from '@/lib/siteData'

export async function generateStaticParams() {
  return COMMUNES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const commune = COMMUNES.find(c => c.slug === params.slug)
  if (!commune) return {}
  const { name, code } = commune
  return {
    title: `Zingueur à ${name} (${code}) — Gouttières Zinc & Zinguerie | RT Toiture 74`,
    description: `Zingueur professionnel à ${name} (${code}). Gouttières zinc, chéneaux, solins, noues, zinguerie façade. Artisan RGE certifié. Devis gratuit ☎ 06 69 43 41 42.`,
    alternates: { canonical: `https://www.rt-toiture74.fr/zingueur/${params.slug}` },
    openGraph: {
      url: `https://www.rt-toiture74.fr/zingueur/${params.slug}`,
      title: `Zingueur à ${name} — RT Toiture 74`,
      description: `Artisan zingueur certifié à ${name} (${code}). Gouttières zinc, solins, zinguerie complète. Devis gratuit sous 24h.`,
    },
  }
}

export default function ZingueurSlugPage() { return <ZingueurPage /> }
