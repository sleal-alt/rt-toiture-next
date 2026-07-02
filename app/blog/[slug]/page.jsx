import BlogArticle from '@/views/BlogArticle'
import { BLOG_ARTICLES, getBlogArticle } from '@/lib/blogContent'

export async function generateStaticParams() {
  return BLOG_ARTICLES.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const article = getBlogArticle(params.slug)
  if (!article) return {}
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `https://rt-toiture74.fr/blog/${params.slug}` },
    openGraph: {
      url: `https://rt-toiture74.fr/blog/${params.slug}`,
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.date,
      authors: ['RT Toiture 74'],
    },
  }
}

export default function BlogArticlePage() {
  return <BlogArticle />
}
