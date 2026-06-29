import { SERVICES, COMMUNES } from '@/lib/siteData'

const BASE = 'https://rt-toiture74.fr'
const NOW = new Date().toISOString().split('T')[0]

export default function sitemap() {
  const staticPages = [
    { url: BASE, lastModified: NOW, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/services`, lastModified: NOW, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/devis`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/realisations`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/avis`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/a-propos`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const servicePages = SERVICES.map(s => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const communePages = COMMUNES.map(c => ({
    url: `${BASE}/couvreur/${c.slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...servicePages, ...communePages]
}
