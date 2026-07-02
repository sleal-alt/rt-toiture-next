'use client'
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Clock, Calendar, Tag, Phone, ArrowRight, ChevronRight, CheckCircle2, BookOpen, Star, AlertCircle, TrendingUp } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FAQSection from "@/components/shared/FAQSection";
import CTABand from "@/components/shared/CTABand";
import { COMPANY, SERVICES } from "@/lib/siteData";
import { getBlogArticle, getRelatedArticles, BLOG_ARTICLES } from "@/lib/blogContent";
import { Button } from "@/components/ui/button";
import JsonLd from "@/components/seo/JsonLd";
import GoogleReviews from "@/components/home/GoogleReviews";

const CATEGORY_COLORS = {
  "Entretien & Nettoyage": { bg: "bg-blue-100 text-blue-700", hero: "from-blue-700 to-blue-900", border: "border-blue-200" },
  "Rénovation & Réparation": { bg: "bg-orange-100 text-orange-700", hero: "from-orange-600 to-red-800", border: "border-orange-200" },
};

/* ── Composants riches ─────────────────────────────────────────── */

function PriceTable({ table }) {
  if (!table) return null;
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-border shadow-sm">
      <div className="bg-accent px-4 py-2.5">
        <p className="text-white font-bold text-sm">{table.title}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/60">
            <tr>{table.headers.map((h, i) => <th key={i} className="text-left px-4 py-2.5 font-semibold text-foreground/80 whitespace-nowrap">{h}</th>)}</tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                {row.map((cell, j) => <td key={j} className="px-4 py-2.5 text-muted-foreground">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && <p className="text-xs text-muted-foreground px-4 py-2 bg-muted/20 border-t border-border">{table.note}</p>}
    </div>
  );
}

function CaseStudy({ study }) {
  if (!study) return null;
  return (
    <div className="my-6 bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 rounded-r-xl p-5">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">Cas terrain — Haute-Savoie</span>
      </div>
      <p className="font-bold text-sm text-emerald-900 dark:text-emerald-200 mb-1">{study.title}</p>
      <p className="text-sm text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">{study.content}</p>
    </div>
  );
}

function InlineCta() {
  return (
    <div className="my-8 bg-primary/5 border border-primary/25 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex-1">
        <p className="font-bold text-base mb-0.5">Votre toiture en Haute-Savoie nécessite une intervention ?</p>
        <p className="text-sm text-muted-foreground">RT Toiture 74 — Artisan certifié RGE, devis gratuit sous 24h dans tout le 74.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 shrink-0">
        <a href={COMPANY.phoneTel}>
          <Button className="bg-primary text-white font-bold gap-2 h-10 text-sm">
            <Phone className="w-4 h-4" /> {COMPANY.phone}
          </Button>
        </a>
        <Link href="/devis">
          <Button variant="outline" className="gap-2 h-10 text-sm font-semibold">Devis en ligne <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  );
}


function Communes({ slugs }) {
  if (!slugs?.length) return null;
  return (
    <div className="my-4 flex flex-wrap gap-2">
      {slugs.map(s => (
        <Link key={s.slug} href={`/couvreur/${s.slug}`}
          className="text-xs bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground px-3 py-1.5 rounded-full transition font-medium border border-border/50">
          Couvreur {s.name}
        </Link>
      ))}
    </div>
  );
}

/* ── Sidebar ───────────────────────────────────────────────────── */

function ArticleSidebar({ article }) {
  const relatedServices = SERVICES.filter(s => article.relatedServices?.includes(s.slug));
  return (
    <aside className="space-y-5">
      <div className="bg-accent rounded-2xl p-6 text-white">
        <p className="font-bold text-lg mb-1">Devis Gratuit 24h</p>
        <p className="text-white/70 text-sm mb-4">Diagnostic sur place offert — tout le département 74</p>
        <a href={COMPANY.phoneTel} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-4 py-3 rounded-xl transition text-sm mb-2">
          <Phone className="w-4 h-4 shrink-0" /> {COMPANY.phone}
        </a>
        <Link href="/devis" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-3 rounded-xl transition text-sm">
          Formulaire devis en ligne <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {relatedServices.length > 0 && (
        <div className="bg-card border border-border/50 rounded-2xl p-5">
          <p className="font-bold mb-3 text-xs uppercase tracking-widest text-muted-foreground">Services RT Toiture 74</p>
          <ul className="space-y-2">
            {relatedServices.map(s => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition font-medium group">
                  <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <p className="font-bold text-sm">Note Google : 4,9/5</p>
        </div>
        <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />)}</div>
        <a href={COMPANY.googleReview} target="_blank" rel="noopener noreferrer"
          className="block text-center text-xs bg-white dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 text-yellow-800 dark:text-yellow-300 font-semibold py-2 rounded-lg hover:bg-yellow-50 transition">
          Laisser un avis →
        </a>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-5">
        <p className="font-bold text-emerald-800 dark:text-emerald-300 text-sm mb-3">Garanties RT Toiture 74</p>
        {["Certifié RGE Qualibat", "Garantie décennale", "Hydrofuge 10 ans", "Devis gratuit 24h", "Urgence 7j/7"].map(item => (
          <div key={item} className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 mb-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> {item}
          </div>
        ))}
      </div>

      <div className="bg-muted/50 rounded-2xl p-5">
        <p className="font-bold text-sm mb-2">Zones d'intervention</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <Link href="/couvreur/annecy" className="hover:text-primary transition">Annecy</Link> · <Link href="/couvreur/annemasse" className="hover:text-primary transition">Annemasse</Link> · <Link href="/couvreur/bonneville" className="hover:text-primary transition">Bonneville</Link> · <Link href="/couvreur/cluses" className="hover:text-primary transition">Cluses</Link> · <Link href="/couvreur/sallanches" className="hover:text-primary transition">Sallanches</Link> · <Link href="/couvreur/chamonix-mont-blanc" className="hover:text-primary transition">Chamonix</Link> · <Link href="/couvreur/megeve" className="hover:text-primary transition">Megève</Link> · <Link href="/couvreur/la-roche-sur-foron" className="hover:text-primary transition">La Roche-sur-Foron</Link> et tout le <strong>département 74</strong>
        </p>
      </div>
    </aside>
  );
}

/* ── Articles liés ─────────────────────────────────────────────── */

function RelatedArticles({ slugs }) {
  const articles = getRelatedArticles(slugs);
  if (!articles.length) return null;
  return (
    <section className="py-10 border-t border-border/50 mt-10">
      <h2 className="font-heading text-xl font-bold mb-5 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" /> Pour aller plus loin
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(a => {
          const colors = CATEGORY_COLORS[a.category] || CATEGORY_COLORS["Entretien & Nettoyage"];
          return (
            <Link key={a.slug} href={`/blog/${a.slug}`}
              className="group bg-card border border-border/50 rounded-xl p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full mb-2 ${colors.bg}`}>{a.category}</span>
              <p className="font-bold text-sm leading-snug group-hover:text-primary transition-colors mb-2">{a.title}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {a.readTime} min</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ── Main ──────────────────────────────────────────────────────── */

export default function BlogArticle() {
  const { slug } = useParams();
  const article = getBlogArticle(slug);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold mb-3">Article introuvable</h1>
          <Link href="/blog" className="text-primary hover:underline">← Retour au blog</Link>
        </div>
      </div>
    );
  }

  const colors = CATEGORY_COLORS[article.category] || CATEGORY_COLORS["Entretien & Nettoyage"];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.date,
    dateModified: article.date,
    wordCount: article.wordCount || 1400,
    inLanguage: "fr-FR",
    author: { "@type": "Organization", name: "RT Toiture 74", url: "https://rt-toiture74.fr" },
    publisher: {
      "@type": "Organization",
      name: "RT Toiture 74",
      logo: { "@type": "ImageObject", url: "https://rt-toiture74.fr/images/logo.png" }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://rt-toiture74.fr/blog/${slug}` },
    about: { "@type": "Service", name: "Rénovation et entretien de toiture", areaServed: "Haute-Savoie" },
  };

  const faqSchema = article.faqs?.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map(f => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  } : null;

  let sectionIndex = 0;

  return (
    <>
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <Breadcrumbs items={[
        { label: "Blog", href: "/blog" },
        { label: article.title }
      ]} />

      {/* Hero */}
      <section className={`bg-gradient-to-br ${colors.hero} py-14 lg:py-20`}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5 backdrop-blur-sm">
              <Tag className="w-3 h-3" /> {article.category}
            </span>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(article.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime} min de lecture</span>
              <span className="text-white/40">RT Toiture 74 — Artisan RGE Haute-Savoie</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 xl:gap-16">
          <article className="min-w-0">
            {/* Intro */}
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="text-lg leading-relaxed text-muted-foreground mb-8 pb-8 border-b border-border/50">
              {article.intro}
            </motion.p>

            {/* Zones ciblées */}
            {article.relatedCommunes?.length > 0 && (
              <div className="mb-8">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">RT Toiture 74 intervient à :</p>
                <Communes slugs={article.relatedCommunes} />
              </div>
            )}

            {/* Sections */}
            <div className="space-y-10">
              {article.sections.map((section, i) => {
                sectionIndex++;
                return (
                  <motion.section key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                    <h2 className="font-heading text-2xl font-bold mb-3 text-foreground">{section.h2}</h2>
                    {section.content && <div className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">{section.content}</div>}
                    {section.priceTable && <PriceTable table={section.priceTable} />}
                    {section.caseStudy && <CaseStudy study={section.caseStudy} />}
                    {section.h3s?.map((sub, j) => (
                      <div key={j} className="mb-5">
                        <h3 className="font-heading text-lg font-bold mb-2 text-foreground border-l-4 border-primary pl-4">{sub.h3}</h3>
                        <p className="text-muted-foreground leading-relaxed pl-4 whitespace-pre-line">{sub.content}</p>
                        {sub.priceTable && <div className="pl-4"><PriceTable table={sub.priceTable} /></div>}
                        {sub.caseStudy && <div className="pl-4"><CaseStudy study={sub.caseStudy} /></div>}
                      </div>
                    ))}
                    {/* Inline CTA après section 3 */}
                    {sectionIndex === 3 && <InlineCta />}
                    {/* Avis Google après section 5 */}
                    {sectionIndex === 5 && <div className="my-8"><GoogleReviews /></div>}
                  </motion.section>
                );
              })}
            </div>

            {/* CTA final */}
            <div className="mt-12 bg-accent rounded-2xl p-6 text-white">
              <p className="font-heading text-xl font-bold mb-1">Prêt à protéger votre toiture ?</p>
              <p className="text-white/70 text-sm mb-4">Diagnostic gratuit sur place — Artisan RGE certifié Qualibat — Tout le département 74</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={COMPANY.phoneTel}>
                  <Button className="bg-primary text-white font-bold gap-2"><Phone className="w-4 h-4" /> {COMPANY.phone}</Button>
                </a>
                <Link href="/devis">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2 font-semibold">Devis en ligne <ArrowRight className="w-4 h-4" /></Button>
                </Link>
              </div>
            </div>

            <RelatedArticles slugs={article.relatedSlugs || []} />
          </article>

          <div className="lg:sticky lg:top-24 self-start">
            <ArticleSidebar article={article} />
          </div>
        </div>
      </div>

      {article.faqs?.length > 0 && (
        <FAQSection faqs={article.faqs} title={`FAQ — ${article.title}`} />
      )}

      <CTABand title="Un projet toiture en Haute-Savoie ?" subtitle="Devis gratuit et sans engagement sous 24h. Artisan RGE certifié Qualibat." />
    </>
  );
}
