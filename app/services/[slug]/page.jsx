import ServiceDetail from '@/views/ServiceDetail'
import { SERVICES } from '@/lib/siteData'

export async function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const service = SERVICES.find(s => s.slug === params.slug)
  if (!service) return {}
  return {
    title: service.metaTitle || `${service.title} — Haute-Savoie | RT Toiture`,
    description: service.metaDescription || service.description,
    alternates: { canonical: `https://rt-toiture74.fr/services/${params.slug}` },
    openGraph: {
      url: `https://rt-toiture74.fr/services/${params.slug}`,
      title: service.metaTitle || service.title,
      description: service.metaDescription || service.description,
    },
  }
}

export default function ServiceDetailPage() { return <ServiceDetail /> }
