import { SERVICES, COMMUNES } from '@/lib/siteData'
import { BLOG_ARTICLES } from '@/lib/blogContent'

const BASE = 'https://www.rt-toiture74.fr'
const NOW = new Date().toISOString().split('T')[0]

// Articles à haute intention commerciale — priorité maximale dans le blog
const HIGH_INTENT_SLUGS = new Set([
  'prix-refaire-toiture-haute-savoie',
  'cout-demoussage-toiture-2025',
  'choisir-couvreur-haute-savoie',
  'aides-isolation-toiture-haute-savoie',
  'subventions-maprimenrenov-toiture',
  'certification-rge-importance',
  'traitement-anti-mousse-professionnel',
  'traitement-hydrofuge-indispensable',
])

// Communes à fort volume de recherche — priorité élevée
const HIGH_PRIORITY_COMMUNES = new Set([
  'annecy', 'annemasse', 'chamonix-mont-blanc', 'bonneville',
  'cluses', 'megeve', 'sallanches', 'saint-julien-en-genevois',
])

export default function sitemap() {
  const staticPages = [
    { url: BASE,                          lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,            lastModified: NOW, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${BASE}/couvreur`,            lastModified: NOW, changeFrequency: 'weekly',  priority: 0.90 },
    { url: `${BASE}/demoussage-toiture`, lastModified: NOW, changeFrequency: 'weekly',  priority: 0.92 },
    { url: `${BASE}/devis`,               lastModified: NOW, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${BASE}/contact`,             lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/realisations`,        lastModified: NOW, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/avis`,                lastModified: NOW, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/a-propos`,            lastModified: NOW, changeFrequency: 'monthly', priority: 0.65 },
  ]

  const servicePages = SERVICES.map(s => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: 0.92,
  }))

  const communePages = COMMUNES.map(c => ({
    url: `${BASE}/couvreur/${c.slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: HIGH_PRIORITY_COMMUNES.has(c.slug) ? 0.88 : 0.80,
  }))

  const zingueurPages = [
    { url: `${BASE}/zingueur`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.90 },
    ...COMMUNES.map(c => ({
      url: `${BASE}/zingueur/${c.slug}`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: HIGH_PRIORITY_COMMUNES.has(c.slug) ? 0.86 : 0.78,
    })),
  ]

  const blogPages = BLOG_ARTICLES.map(a => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: a.date,
    changeFrequency: 'monthly',
    priority: HIGH_INTENT_SLUGS.has(a.slug) ? 0.85 : 0.72,
  }))

  const demoussagePages = [
    ...COMMUNES.map(c => ({
      url: `${BASE}/demoussage-toiture/${c.slug}`,
      lastModified: NOW,
      changeFrequency: 'monthly',
      priority: HIGH_PRIORITY_COMMUNES.has(c.slug) ? 0.90 : 0.82,
    })),
  ]

  return [...staticPages, ...servicePages, ...communePages, ...zingueurPages, ...demoussagePages, ...blogPages]
}
