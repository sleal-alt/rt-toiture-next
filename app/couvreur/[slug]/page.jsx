import CommunePage from '@/views/CommunePage'
import { COMMUNES } from '@/lib/siteData'

export async function generateStaticParams() {
  return COMMUNES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const commune = COMMUNES.find(c => c.slug === params.slug)
  if (!commune) return {}
  const { name, code, nearby = [] } = commune
  return {
    title: `Couvreur à ${name} (${code}) — Artisan Toiture RGE | RT Toiture 74`,
    description: `Couvreur professionnel à ${name} (${code}). Démoussage, traitement hydrofuge garanti 10 ans, couverture, zinguerie. Artisan RGE certifié. Intervention rapide. ☎ Devis gratuit 06 69 43 41 42.`,
    alternates: { canonical: `https://rt-toiture74.fr/couvreur/${params.slug}` },
    openGraph: {
      url: `https://rt-toiture74.fr/couvreur/${params.slug}`,
      title: `Couvreur à ${name} — RT Toiture 74`,
      description: `Artisan couvreur certifié RGE à ${name} (${code}). Intervention rapide dans le ${code.slice(0, 2)}. Devis gratuit sous 24h.`,
    },
  }
}

export default function CouvreurPage() { return <CommunePage /> }
