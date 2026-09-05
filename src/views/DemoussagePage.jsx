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
import { Phone, ArrowRight, MapPin, Shield, Clock, Award, Check, Droplets, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMOUSSAGE_PRESTATIONS = [
  "Nettoyage mousse, lichens et algues",
  "Démoussage haute-pression basse pression",
  "Traitement fongicide biocide homologué",
  "Hydrofuge siloxane garanti 10 ans",
  "Revêtement hydrofuge teinté",
  "Peinture toiture et ravalement",
  "Diagnostic état toiture complet",
  "Rapport d'intervention photos",
]

const SIGNES_ALERTE = [
  "Taches vertes, noires ou orangées sur les tuiles",
  "Mousses visibles en bord de toiture",
  "Lichens blancs ou gris incrustés",
  "Tuiles friables ou qui s'effritent",
  "Infiltrations ou humidité dans les combles",
  "Gouttières obstruées par des débris végétaux",
]

const PHOTOS_DEMOUSSAGE = [
  { url: "/images/chantier-apres-demoussage-velux.jpg", alt: "Toiture propre après démoussage professionnel Haute-Savoie — RT Toiture 74", label: "APRÈS" },
  { url: "/images/tuiles-mousses-lichens-avant.jpg", alt: "Tuiles avec mousses et lichens avant démoussage — RT Toiture 74", label: "AVANT" },
  { url: "/images/tuiles-propres-apres-nettoyage.jpg", alt: "Tuiles propres après nettoyage démoussage — RT Toiture 74 Haute-Savoie", label: "APRÈS" },
  { url: "/images/fongicide-traitement-artisan-combinaison-haute-savoie.webp", alt: "Artisan traitement fongicide toiture Haute-Savoie — RT Toiture 74", label: "CHANTIER" },
  { url: "/images/apres-hydrofugation-tuiles.jpg", alt: "Tuiles après traitement hydrofuge garanti 10 ans — RT Toiture 74", label: "HYDROFUGE" },
  { url: "/images/chantier-demoussage-chalet-savoie.jpg", alt: "Démoussage toiture chalet savoyard Haute-Savoie — RT Toiture 74", label: "CHANTIER" },
]

const VIDEOS_DEMOUSSAGE = [
  { src: "/videos/avant-demoussage.mp4", poster: "/images/chantier-avant-demoussage-velux.jpg", label: "AVANT", labelColor: "bg-red-500" },
  { src: "/videos/apres-demoussage.mp4", poster: "/images/chantier-apres-demoussage-velux.jpg", label: "APRÈS", labelColor: "bg-emerald-600" },
]

const LABEL_COLORS = {
  "AVANT": "bg-red-500",
  "APRÈS": "bg-emerald-600",
  "CHANTIER": "bg-primary",
  "HYDROFUGE": "bg-blue-600",
}

function getDemoussageContent(commune) {
  const name = commune.name
  const code = commune.code
  const nearby = commune.nearby
  const data = COMMUNE_DATA[commune.slug] || {}

  const geo = data.geo || `${name} est une commune de Haute-Savoie (${code}) desservie par RT Toiture 74.`
  const climat = data.climat || `Le climat de ${name} est typique de la Haute-Savoie : précipitations importantes, cycles gel-dégel et hygrométrie élevée favorisant la pousse des mousses.`
  const bati = data.bati || `Le parc immobilier de ${name} comprend principalement des maisons individuelles avec toitures en tuiles, sensibles aux mousses et lichens.`
  const expertise = data.expertise || `À ${name}, nous intervenons régulièrement pour des chantiers de démoussage sur des tuiles mécaniques et canal. Notre protocole inclut un nettoyage basse pression (max 50 bars), un traitement fongicide biocide homologué et un hydrofuge siloxane garanti 10 ans. Résultat durable adapté au microclimat local.`
  const processus = data.processus || `Notre intervention à ${name} commence par un diagnostic gratuit sur place : évaluation de l'état des tuiles, du degré de colonisation biologique, et identification des zones à risque. Devis sous 24h, intervention par équipe salariée, garantie décennale.`
  const realisation = data.realisation || `Nous intervenons régulièrement à ${name} pour des démoussages complets, traitements hydrofuges et peintures de toiture. Chaque chantier est documenté par photos avant et après.`
  const faqLocal = data.faqLocal || []

  const faqs = [
    {
      question: `Quel est le prix d'un démoussage de toiture à ${name} ?`,
      answer: `Le tarif d'un démoussage à ${name} dépend de la surface, de la pente et du degré de colonisation. Comptez en moyenne entre 15 et 35 €/m² pour un démoussage + traitement fongicide. Un hydrofuge garanti 10 ans s'ajoute pour 8 à 15 €/m² supplémentaires. RT Toiture 74 établit un devis gratuit et précis après visite — appelez le ${COMPANY.phone}.`
    },
    {
      question: `Quelle est la fréquence recommandée pour démoussage une toiture à ${name} ?`,
      answer: `Dans le climat de ${name}, un démoussage tous les 5 à 7 ans est recommandé si vous n'avez pas appliqué de traitement hydrofuge préventif. Avec un hydrofuge siloxane, la protection dure 8 à 10 ans. Les signes d'alerte : taches vertes visibles, gouttières obstruées, mousses au bord des tuiles.`
    },
    {
      question: `Le démoussage abîme-t-il les tuiles à ${name} ?`,
      answer: `Non, si réalisé correctement. RT Toiture 74 utilise uniquement la basse pression (max 50 bars) pour les tuiles poreuses, jamais la haute pression qui érode les granulats. Le traitement chimique fongicide biocide est homologué et adapté aux tuiles. À ${name}, nous adaptons notre protocole à la nature exacte des matériaux (béton, terre cuite, ardoise).`
    },
    {
      question: `Intervenez-vous en urgence à ${name} ?`,
      answer: `Oui, nous intervenons rapidement à ${name} en cas d'infiltration liée à une toiture encrassée ou dégradée. Appelez le ${COMPANY.phone} — nous pouvons sécuriser votre toiture sous 48h et établir un constat pour votre assurance si les dégâts sont liés à une tempête ou une forte pluie.`
    },
    ...faqLocal.map(f => ({ question: f.q, answer: f.a })),
  ]

  return {
    h1: `Démoussage Toiture à ${name} (${code}) — Nettoyage Mousse & Traitement`,
    intro: `Vous cherchez un spécialiste du démoussage de toiture à ${name} ? ${geo} RT Toiture 74 intervient à ${name} et dans tout le département 74 pour éliminer mousses, lichens et algues, puis protéger durablement votre toiture avec un traitement hydrofuge garanti 10 ans.`,
    sections: [
      {
        h2: `Pourquoi démoussage sa toiture à ${name} ?`,
        text: `${climat}\n\n${bati}\n\nLes mousses et lichens ne sont pas qu'un problème esthétique. Ils retiennent l'humidité sous les tuiles, accélèrent le gel des matériaux, fissurent les joints et provoquent des infiltrations en 3 à 5 ans si rien n'est fait. À ${name}, les conditions climatiques favorisent une repousse rapide : un entretien régulier est le seul moyen d'éviter une réfection complète de la couverture, bien plus coûteuse.`,
      },
      {
        h2: `Notre méthode de démoussage à ${name}`,
        text: `${expertise}\n\n${processus}`,
      },
      {
        h2: `Nos réalisations à ${name}`,
        text: `${realisation}\n\nNous intervenons également dans les communes voisines de ${name} : ${nearby.join(", ")}.`,
      },
    ],
    faqs,
  }
}

export default function DemoussagePage() {
  const { slug } = useParams()
  const commune = COMMUNES.find(c => c.slug === slug)

  if (!commune) {
    return <div className="p-20 text-center text-muted-foreground">Page non trouvée</div>
  }

  const content = getDemoussageContent(commune)
  const BASE = 'https://www.rt-toiture74.fr'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Démoussage Toiture Haute-Savoie', item: `${BASE}/demoussage-toiture` },
      { '@type': 'ListItem', position: 3, name: `Démoussage Toiture ${commune.name}`, item: `${BASE}/demoussage-toiture/${slug}` },
    ],
  }

  const localServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Démoussage Toiture à ${commune.name} (${commune.code})`,
    description: `Démoussage de toiture professionnel à ${commune.name} — mousse, lichens, algues. Traitement fongicide + hydrofuge garanti 10 ans. Artisan RGE certifié RT Toiture 74.`,
    url: `${BASE}/demoussage-toiture/${slug}`,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: {
      '@type': 'City',
      name: commune.name,
      postalCode: commune.code,
      addressCountry: 'FR',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '15',
        priceCurrency: 'EUR',
        unitText: 'm²',
        description: 'À partir de 15€/m² — devis gratuit sur site',
      },
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
        { label: 'Démoussage Toiture Haute-Savoie', href: '/demoussage-toiture' },
        { label: `Démoussage ${commune.name}` }
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
                Spécialiste Démoussage Toiture à {commune.name}
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
              <div className="p-5 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-2xl mb-8">
                <h3 className="font-heading text-lg font-bold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Signes qu'il faut intervenir sur votre toiture à {commune.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SIGNES_ALERTE.map(s => (
                    <div key={s} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prestations */}
              <h3 className="font-heading text-xl font-bold mt-8 mb-4">
                Nos Prestations de Démoussage à {commune.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {DEMOUSSAGE_PRESTATIONS.map(s => (
                  <div key={s} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>

              {/* Process rapide */}
              <h3 className="font-heading text-xl font-bold mb-4">Notre protocole en 4 étapes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { n: "01", t: "Diagnostic", d: "Inspection gratuite + mesure humidité" },
                  { n: "02", t: "Nettoyage", d: "Basse pression, max 50 bars" },
                  { n: "03", t: "Fongicide", d: "Traitement biocide homologué" },
                  { n: "04", t: "Hydrofuge", d: "Protection siloxane 10 ans" },
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
                  { icon: Clock, label: "Intervention rapide", desc: "Urgences sous 48h" },
                  { icon: Award, label: "Hydrofuge garanti 10 ans", desc: "Attestation remise à réception" },
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
                <Link href={`/couvreur/${slug}`} className="flex items-center gap-2 text-primary hover:underline text-sm">
                  <ArrowRight className="w-4 h-4" /> Couvreur {commune.name} — réfection et réparation toiture
                </Link>
                <Link href={`/zingueur/${slug}`} className="flex items-center gap-2 text-primary hover:underline text-sm">
                  <ArrowRight className="w-4 h-4" /> Zingueur {commune.name} — gouttières zinc et zinguerie
                </Link>
                <Link href="/demoussage-toiture" className="flex items-center gap-2 text-primary hover:underline text-sm">
                  <ArrowRight className="w-4 h-4" /> Démoussage Haute-Savoie — toutes les communes
                </Link>
              </div>

              {/* Communes proches */}
              <h3 className="font-heading text-xl font-bold mt-10 mb-4">Communes Voisines</h3>
              <div className="flex flex-wrap gap-2">
                {commune.nearby.map(n => {
                  const nearbyCommune = COMMUNES.find(c => c.name === n)
                  return nearbyCommune ? (
                    <Link key={n} href={`/demoussage-toiture/${nearbyCommune.slug}`}
                      className="px-4 py-2 bg-muted/50 rounded-full text-sm hover:bg-primary/10 hover:text-primary transition">
                      Démoussage {n}
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
                <h3 className="font-heading text-xl font-bold mb-2 text-center">Devis Démoussage à {commune.name}</h3>
                <p className="text-xs text-muted-foreground text-center mb-4">Gratuit — réponse sous 24h</p>
                <ContactForm source={`demoussage-${slug}`} compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie photos */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-xl md:text-2xl font-bold mb-2 text-center">
            Nos réalisations démoussage à {commune.name} et en Haute-Savoie
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-6">
            Photos de chantiers réels — avant et après intervention
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {PHOTOS_DEMOUSSAGE.map((photo, i) => (
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

          {/* Vidéos avant/après */}
          <h3 className="font-heading text-lg font-bold mb-4 text-center">Vidéos chantier — Avant / Après démoussage</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {VIDEOS_DEMOUSSAGE.map((v, i) => (
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

      <FAQSection faqs={content.faqs} title={`FAQ — Démoussage Toiture ${commune.name}`} />
      <GoogleReviews />
      <CTABand title={`Démoussage Toiture à ${commune.name} — Devis Gratuit`} />
    </>
  )
}
