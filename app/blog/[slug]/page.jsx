import BlogArticle from '@/views/BlogArticle'
import { BLOG_ARTICLES, getBlogArticle } from '@/lib/blogContent'
import { BLOG_IMAGES } from '@/lib/blogImages'

export async function generateStaticParams() {
  return BLOG_ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const article = getBlogArticle(params.slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `https://www.rt-toiture74.fr/blog/${params.slug}` },
    openGraph: {
      url: `https://www.rt-toiture74.fr/blog/${params.slug}`,
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.date,
      authors: ['RT Toiture 74'],
      images: BLOG_IMAGES[params.slug]
        ? [{ url: `https://www.rt-toiture74.fr${BLOG_IMAGES[params.slug].src}`, width: 1200, height: 630, alt: BLOG_IMAGES[params.slug].alt }]
        : [{ url: 'https://www.rt-toiture74.fr/images/hero.png', width: 1200, height: 630, alt: 'RT Toiture 74 — Artisan couvreur Haute-Savoie' }],
    },
  }
}

export default function BlogArticlePage() {
  return <BlogArticle />
}
