import ServiceDetail from '@/views/ServiceDetail'
import { SERVICES } from '@/lib/siteData'

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

// Pages services qui ont un silo SEO dédié → canonical vers le hub
const CANONICAL_OVERRIDES = {
  'traitement-hydrofuge-toiture': 'https://www.rt-toiture74.fr/hydrofuge-toiture',
  'demoussage-nettoyage-toiture': 'https://www.rt-toiture74.fr/demoussage-toiture',
}

export async function generateMetadata({ params }) {
  const service = SERVICES.find(s => s.slug === params.slug)
  if (!service) return {}
  const canonical = CANONICAL_OVERRIDES[params.slug] || `https://www.rt-toiture74.fr/services/${params.slug}`
  return {
    title: service.metaTitle || `${service.title} — Haute-Savoie`,
    description: service.metaDescription || service.description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.description,
    },
  }
}

export default function ServiceDetailPage() { return <ServiceDetail /> }
