'use client'
import React from "react";
import { COMMUNES, COMPANY } from "@/lib/siteData";
import { COMMUNE_DATA } from "@/lib/communeData";
import Link from "next/link";
import { useParams } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABand from "@/components/shared/CTABand";
import GoogleReviews from "@/components/home/GoogleReviews";
import FAQSection from "@/components/shared/FAQSection";
import ContactForm from "@/components/shared/ContactForm";
import { Phone, ArrowRight, MapPin, Shield, Clock, Award, Check, Droplets, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const HYDROFUGE_PRESTATIONS = [
  "Traitement hydrofuge siloxane garanti 10 ans",
  "Hydrofuge incolore — aspect naturel conservé",
  "Hydrofuge teinté — ravalement et protection",
  "Hydrofuge anti-mousse et anti-algues",
  "Hydrofuge sur tuiles, ardoises, béton",
  "Diagnostic humidité avant traitement",
  "Rapport d'intervention et attestation garantie",
  "Prise en charge MaPrimeRénov' (RGE)",
]

const SIGNES_ALERTE = [
  "Tuiles poreuses qui absorbent l'eau de pluie",
  "Mousses et lichens qui repoussent rapidement",
  "Humidité persistante dans les combles",
  "Infiltrations après fortes pluies",
  "Tuiles qui s'effritent ou noircissent",
  "Traces blanches (efflorescences) sur les tuiles",
]

const PHOTOS_HYDROFUGE = [
  { url: "/images/avant-hydrofugation-tuiles.jpg", alt: "Tuiles avant traitement hydrofuge — porosité et mousses — RT Toiture 74", label: "AVANT" },
  { url: "/images/apres-hydrofugation-tuiles.jpg", alt: "Tuiles après traitement hydrofuge garanti 10 ans — RT Toiture 74 Haute-Savoie", label: "APRÈS" },
  { url: "/images/fongicide-hydrofuge-application-en-cours.jpg", alt: "Application hydrofuge siloxane sur toiture — artisan RT Toiture 74", label: "CHANTIER" },
  { url: "/images/fongicide-traitement-artisan-combinaison-haute-savoie.webp", alt: "Artisan traitement hydrofuge toiture Haute-Savoie — RT Toiture 74", label: "CHANTIER" },
  { url: "/images/fongicide-toiture-avant-apres-haute-savoie.jpg", alt: "Résultat traitement hydrofuge avant après toiture Haute-Savoie — RT Toiture 74", label: "AVANT/APRÈS" },
  { url: "/images/fongicide-resultat-tuiles-canal-avant-apres.jpg", alt: "Tuiles canal avant et après hydrofugation — RT Toiture 74", label: "RÉSULTAT" },
]

const VIDEOS_HYDROFUGE = [
  { src: "/videos/hydrofugation.mp4", poster: "/images/avant-hydrofugation-tuiles.jpg", label: "HYDROFUGE", labelColor: "bg-blue-600" },
  { src: "/videos/hydrofugation-toit.mp4", poster: "/images/fongicide-hydrofuge-application-en-cours.jpg", label: "CHANTIER", labelColor: "bg-primary" },
  { src: "/videos/hydrofuge-colore.mp4", poster: "/images/apres-hydrofugation-tuiles.jpg", label: "TEINTÉ", labelColor: "bg-purple-600" },
]

const LABEL_COLORS = {
  "AVANT": "bg-red-500",
  "APRÈS": "bg-emerald-600",
  "AVANT/APRÈS": "bg-orange-500",
  "CHANTIER": "bg-primary",
  "RÉSULTAT": "bg-emerald-600",
  "HYDROFUGE": "bg-blue-600",
  "TEINTÉ": "bg-purple-600",
}

const BASE = "https://www.rt-toiture74.fr"

function getHydrofugeContent(commune) {
  const name = commune.name
  const code = commune.code
  const nearby = commune.nearby
  const data = COMMUNE_DATA[commune.slug] || {}

  const geo = data.geo || `${name} est une commune de Haute-Savoie (${code}) desservie par RT Toiture 74.`
  const climat = data.climat || `Le climat de ${name} est typique de la Haute-Savoie : précipitations importantes, cycles gel-dégel et hygrométrie élevée qui dégradent rapidement les tuiles non protégées.`
  const bati = data.bati || `Le parc immobilier de ${name} comprend principalement des maisons individuelles avec toitures en tuiles mécaniques ou canal, particulièrement sensibles à l'humidité et à la porosité.`

  const faqs = [
    {
      question: `Quel est le prix d'un traitement hydrofuge à ${name} ?`,
      answer: `Le tarif d'un traitement hydrofuge à ${name} dépend de la surface, de la pente et du type de produit. Comptez en moyenne entre 8 et 20 €/m² pour un hydrofuge siloxane incolore garanti 10 ans, et entre 15 et 35 €/m² pour un hydrofuge teinté. RT Toiture 74 établit un devis gratuit après visite — appelez le ${COMPANY.phone}.`,
    },
    {
      question: `Combien de temps dure un traitement hydrofuge à ${name} ?`,
      answer: `Un hydrofuge siloxane professionnel appliqué par RT Toiture 74 à ${name} est garanti 10 ans. La durée réelle peut atteindre 12 à 15 ans selon l'exposition et l'état de départ des tuiles. Les produits grande surface durent 2 à 3 ans maximum — c'est la différence avec un traitement professionnel certifié.`,
    },
    {
      question: `Faut-il démoussager avant d'appliquer un hydrofuge à ${name} ?`,
      answer: `Oui, c'est indispensable. Appliquer un hydrofuge sur une toiture encore souillée de mousses ou lichens piège l'humidité sous le film protecteur et accélère la dégradation. À ${name}, RT Toiture 74 réalise systématiquement un nettoyage basse pression + traitement fongicide avant toute hydrofugation. On peut tout faire en une seule intervention.`,
    },
    {
      question: `Le traitement hydrofuge change-t-il l'aspect de ma toiture à ${name} ?`,
      answer: `L'hydrofuge incolore ne modifie pas l'aspect de vos tuiles — il pénètre sans laisser de film visible. L'hydrofuge teinté permet en revanche de redonner de la couleur à des tuiles délavées ou décolorées. À ${name}, nous proposons les deux options avec un échantillon avant intervention.`,
    },
    {
      question: `Intervenez-vous pour l'hydrofugation dans toute la Haute-Savoie ?`,
      answer: `Oui, RT Toiture 74 intervient pour le traitement hydrofuge sur 28 communes de Haute-Savoie : Annecy, Annemasse, Bonneville, Cluses, Sallanches, Megève, et toutes les communes du bassin genevois et des rives du lac Léman. Appelez le ${COMPANY.phone} pour un devis gratuit.`,
    },
  ]

  return {
    h1: `Traitement Hydrofuge Toiture à ${name} (${code}) — Protection 10 ans Garanti`,
    intro: `Vous cherchez un spécialiste du traitement hydrofuge à ${name} ? ${geo} RT Toiture 74 intervient à ${name} pour imperméabiliser votre toiture avec un hydrofuge siloxane professionnel, garanti 10 ans. Protection durable contre les infiltrations, les mousses et les dégradations liées au gel.`,
    sections: [
      {
        h2: `Pourquoi traiter sa toiture avec un hydrofuge à ${name} ?`,
        text: `${climat}\n\n${bati}\n\nSans protection, les tuiles absorbent l'eau de pluie, ce qui entraîne des cycles humidification-gel destructeurs. En hiver, l'eau infiltrée dans les pores gèle, dilate les matériaux et crée des microfissures. En quelques saisons, des tuiles saines deviennent friables. À ${name}, les conditions climatiques — altitude, précipitations abondantes, enneigement — rendent le traitement hydrofuge indispensable pour tout bâtiment exposé.`,
      },
      {
        h2: `Notre méthode de traitement hydrofuge à ${name}`,
        text: `RT Toiture 74 utilise exclusivement des hydrofuges siloxane professionnels, penetrants, micro-poreux et respirants — contrairement aux produits filmogènes qui piègent l'humidité résiduelle. Le traitement est appliqué en deux passes croisées pour une pénétration optimale dans tous les pores.\n\nAvant toute hydrofugation à ${name}, nous réalisons un diagnostic complet : test d'absorption d'eau, contrôle de l'état des tuiles, identification des zones fragiles. Si la toiture présente des mousses ou lichens, nous réalisons d'abord un démoussage complet. Tout peut être fait en une seule intervention.`,
      },
      {
        h2: `Nos réalisations à ${name} et communes voisines`,
        text: `Nous intervenons régulièrement à ${name} et dans les communes de ${nearby.slice(0, 3).join(", ")} pour des traitements hydrofuges sur maisons individuelles, chalets et immeubles. Chaque chantier est documenté par photos avant et après, avec remise d'une attestation de garantie 10 ans.`,
      },
    ],
    faqs,
  }
}

export default function HydrofugePage() {
  const { slug } = useParams()
  const commune = COMMUNES.find(c => c.slug === slug)

  if (!commune) {
    return <div className="min-h-screen flex items-center justify-center"><p>Commune introuvable.</p></div>
  }

  const content = getHydrofugeContent(commune)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Hydrofuge Toiture Haute-Savoie', item: `${BASE}/hydrofuge-toiture` },
      { '@type': 'ListItem', position: 3, name: `Hydrofuge Toiture ${commune.name}`, item: `${BASE}/hydrofuge-toiture/${slug}` },
    ],
  }

  const localServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: COMPANY.name,
    description: `Traitement hydrofuge toiture à ${commune.name} (${commune.code}) — hydrofuge siloxane garanti 10 ans. Artisan RGE certifié RT Toiture 74.`,
    url: `${BASE}/hydrofuge-toiture/${slug}`,
    telephone: COMPANY.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: commune.name,
      postalCode: commune.code,
      addressCountry: 'FR',
    },
    areaServed: { '@type': 'City', name: commune.name },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Traitement hydrofuge toiture',
      itemListElement: HYDROFUGE_PRESTATIONS.map(p => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p },
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={localServiceSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumbs items={[
        { label: 'Hydrofuge Toiture Haute-Savoie', href: '/hydrofuge-toiture' },
        { label: `Hydrofuge ${commune.name}` }
      ]} />

      {/* Hero */}
      <section className="bg-accent py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center gap-2 justify-center mb-4">
            <MapPin className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-semibold">{commune.name} — {commune.code}</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">{content.h1}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{content.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href={COMPANY.phoneTel}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 font-bold gap-2">
                <Phone className="w-5 h-5" /> {COMPANY.phone}
              </Button>
            </a>
            <Link href="/devis">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold gap-2">
                Devis Gratuit <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold mb-6">
                Spécialiste Traitement Hydrofuge à {commune.name}
              </h2>

              {content.sections.map((section, si) => (
                <div key={si} className="mb-8">
                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">{section.h2}</h3>
                  {section.text.split("\n\n").map((p, pi) => (
                    <p key={pi} className="text-muted-foreground leading-relaxed mb-3">{p}</p>
                  ))}
                </div>
              ))}

              {/* Signes d'alerte */}
              <div className="p-5 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl mb-8">
                <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-blue-500" />
                  Signes que votre toiture à {commune.name} a besoin d'un hydrofuge
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SIGNES_ALERTE.map(s => (
                    <div key={s} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prestations */}
              <h3 className="font-heading text-xl font-bold mt-8 mb-4">
                Nos Prestations Hydrofuge à {commune.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {HYDROFUGE_PRESTATIONS.map(s => (
                  <div key={s} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>

              {/* Process 4 étapes */}
              <h3 className="font-heading text-xl font-bold mb-4">Notre protocole en 4 étapes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { n: "01", t: "Diagnostic", d: "Test absorption eau + état tuiles" },
                  { n: "02", t: "Démoussage", d: "Nettoyage basse pression si besoin" },
                  { n: "03", t: "Fongicide", d: "Traitement biocide anti-mousses" },
                  { n: "04", t: "Hydrofuge", d: "2 passes siloxane, garanti 10 ans" },
                ].map(step => (
                  <div key={step.n} className="text-center p-3 bg-muted/50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">{step.n}</div>
                    <p className="font-semibold text-sm mb-1">{step.t}</p>
                    <p className="text-xs text-muted-foreground">{step.d}</p>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {[
                  { icon: Shield, label: "Certifié RGE Qualibat", desc: "Accès aides MaPrimeRénov'" },
                  { icon: Zap, label: "Hydrofuge garanti 10 ans", desc: "Attestation remise à réception" },
                  { icon: Award, label: "Produits professionnels", desc: "Siloxane pénétrant micro-poreux" },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                    <Icon className="w-8 h-8 text-primary shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Maillage interne */}
              <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-2xl space-y-2">
                <p className="text-sm font-semibold mb-3">Autres services à {commune.name}</p>
                <Link href={`/demoussage-toiture/${slug}`} className="flex items-center gap-2 text-primary hover:underline text-sm">
                  <ArrowRight className="w-4 h-4" /> Démoussage {commune.name} — nettoyage mousse et lichens
                </Link>
                <Link href={`/couvreur/${slug}`} className="flex items-center gap-2 text-primary hover:underline text-sm">
                  <ArrowRight className="w-4 h-4" /> Couvreur {commune.name} — réfection et réparation toiture
                </Link>
                <Link href={`/zingueur/${slug}`} className="flex items-center gap-2 text-primary hover:underline text-sm">
                  <ArrowRight className="w-4 h-4" /> Zingueur {commune.name} — gouttières zinc et zinguerie
                </Link>
                <Link href="/hydrofuge-toiture" className="flex items-center gap-2 text-primary hover:underline text-sm">
                  <ArrowRight className="w-4 h-4" /> Hydrofuge Toiture Haute-Savoie — toutes les communes
                </Link>
              </div>

              {/* Communes proches */}
              <h3 className="font-heading text-xl font-bold mt-10 mb-4">Communes Voisines</h3>
              <div className="flex flex-wrap gap-2">
                {commune.nearby.map(n => {
                  const nearbyCommune = COMMUNES.find(c => c.name === n)
                  return nearbyCommune ? (
                    <Link key={n} href={`/hydrofuge-toiture/${nearbyCommune.slug}`}
                      className="px-4 py-2 bg-muted/50 rounded-full text-sm hover:bg-primary/10 hover:text-primary transition">
                      Hydrofuge {n}
                    </Link>
                  ) : (
                    <span key={n} className="px-4 py-2 bg-muted/50 rounded-full text-sm">{n}</span>
                  )
                })}
              </div>
            </div>

            {/* Sidebar formulaire */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg sticky top-24">
                <h3 className="font-heading text-xl font-bold mb-2 text-center">Devis Hydrofuge à {commune.name}</h3>
                <p className="text-xs text-muted-foreground text-center mb-4">Gratuit — réponse sous 24h</p>
                <ContactForm source={`hydrofuge-${slug}`} compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie photos */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-xl md:text-2xl font-bold mb-2 text-center">
            Nos réalisations hydrofuge à {commune.name} et en Haute-Savoie
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Photos de chantiers réels — avant et après traitement hydrofuge
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {PHOTOS_HYDROFUGE.map((photo, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                <img
                  src={photo.url}
                  alt={photo.alt}
                  title={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded ${LABEL_COLORS[photo.label] || 'bg-primary'}`}>
                  {photo.label}
                </span>
              </div>
            ))}
          </div>

          {/* Vidéos */}
          <h3 className="font-heading text-lg font-bold mb-4 text-center">Vidéos chantier — Application hydrofuge en direct</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {VIDEOS_HYDROFUGE.map((v, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden bg-black">
                <span className={`absolute top-2 left-2 z-10 text-white text-xs font-bold px-2 py-0.5 rounded ${v.labelColor}`}>
                  {v.label}
                </span>
                <video
                  controls
                  muted
                  playsInline
                  preload="none"
                  poster={v.poster}
                  className="w-full aspect-video"
                >
                  <source src={v.src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={content.faqs} title={`FAQ — Traitement Hydrofuge Toiture ${commune.name}`} />
      <GoogleReviews />
      <CTABand title={`Traitement Hydrofuge à ${commune.name} — Devis Gratuit`} />
    </>
  )
}
