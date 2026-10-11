import Link from 'next/link'
import { COMMUNES, COMPANY } from '@/lib/siteData'
import { MapPin, ArrowRight, Phone, Shield, Check, Droplets, Zap, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CTABand from '@/components/shared/CTABand'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import JsonLd from '@/components/seo/JsonLd'

export const metadata = {
  title: 'Traitement Hydrofuge Toiture Haute-Savoie (74) — Protection 10 ans Garanti | RT Toiture 74',
  description: 'Traitement hydrofuge toiture Haute-Savoie (74). Hydrofuge siloxane garanti 10 ans. Protection contre infiltrations, mousses et gel. Artisan RGE certifié. Devis gratuit ☎ 06 69 43 41 42.',
  alternates: { canonical: 'https://www.rt-toiture74.fr/hydrofuge-toiture' },
}

const BASE = 'https://www.rt-toiture74.fr'

const PRESTATIONS = [
  'Hydrofuge siloxane incolore garanti 10 ans',
  'Hydrofuge teinté — recoloration tuiles',
  'Hydrofuge anti-mousse et anti-algues',
  'Application sur tuiles, ardoises, béton',
  'Diagnostic humidité et test absorption',
  'Attestation de garantie 10 ans remise',
  'Accès aides MaPrimeRénov\' (RGE)',
  'Rapport d\'intervention avec photos',
]

const ZONES_PRINCIPALES = [
  { name: 'Annecy', desc: 'Lac & montagne — humidité permanente, traitement indispensable' },
  { name: 'Annemasse', desc: 'Bassin genevois — brouillards fréquents, tuiles très poreuses' },
  { name: 'Chamonix-Mont-Blanc', desc: 'Altitude — gel intense, cycles destructeurs sans protection' },
  { name: 'Bonneville', desc: 'Vallée de l\'Arve — fond de vallée très humide' },
  { name: 'Megève', desc: 'Station — neige et fonte répétée accélèrent la dégradation' },
  { name: 'Sallanches', desc: 'Piedmont — exposition variée, hydrofuge protection optimale' },
]

const FAQS_HUB = [
  {
    question: 'Qu\'est-ce qu\'un traitement hydrofuge de toiture ?',
    answer: 'Le traitement hydrofuge consiste à appliquer un produit imperméabilisant sur les tuiles pour empêcher l\'eau de pénétrer dans les pores des matériaux. Les produits siloxane professionnels sont micro-poreux et respirants — ils laissent sortir la vapeur d\'eau résiduelle tout en bloquant l\'eau de pluie. Résultat : plus d\'infiltrations, plus de cycles gel-dégel destructeurs, plus de repousse rapide des mousses.',
  },
  {
    question: 'Quelle est la durée d\'un traitement hydrofuge professionnel ?',
    answer: 'Un hydrofuge siloxane professionnel appliqué par RT Toiture 74 est garanti 10 ans. Les produits grande surface (bricolage) durent 2 à 3 ans maximum. La différence vient du produit lui-même (concentration, formulation) et de l\'application (2 passes croisées pour pénétration totale dans tous les pores).',
  },
  {
    question: 'Faut-il démoussager avant un traitement hydrofuge ?',
    answer: 'Oui, c\'est indispensable. Un hydrofuge appliqué sur tuiles sales ou encrassées de mousses ne pénètre pas correctement et piège l\'humidité résiduelle, ce qui accélère la dégradation. RT Toiture 74 réalise systématiquement un démoussage + fongicide avant toute hydrofugation. Les deux interventions peuvent être combinées en une seule venue.',
  },
  {
    question: 'Le traitement hydrofuge change-t-il l\'aspect de la toiture ?',
    answer: 'L\'hydrofuge incolore est totalement invisible après séchage — vos tuiles conservent leur aspect naturel. L\'hydrofuge teinté permet de redonner une couleur uniforme à des tuiles délavées ou décolorées. Dans les deux cas, RT Toiture 74 vous présente un échantillon sur une tuile avant de lancer le traitement.',
  },
  {
    question: 'Quel est le prix d\'un traitement hydrofuge en Haute-Savoie ?',
    answer: 'Le tarif d\'un traitement hydrofuge en Haute-Savoie varie entre 8 et 35 €/m² selon le type de produit (incolore ou teinté), la surface et la pente. Pour une maison de 80 m² de toiture, comptez entre 640 et 2 800 €. RT Toiture 74 établit un devis gratuit après visite sur place.',
  },
]

export default function HydrofugeIndexPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS_HUB.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Hydrofuge Toiture Haute-Savoie', item: `${BASE}/hydrofuge-toiture` },
    ],
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: 'Hydrofuge Toiture Haute-Savoie' }]} />

      {/* Hero */}
      <section className="bg-accent py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center gap-2 justify-center mb-4">
            <MapPin className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-semibold">Haute-Savoie (74) — 28 communes</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Traitement Hydrofuge Toiture Haute-Savoie — Protection 10 ans Garanti
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            RT Toiture 74 intervient sur 28 communes pour imperméabiliser votre toiture avec un hydrofuge siloxane professionnel garanti 10 ans. Artisan RGE certifié — accès MaPrimeRénov'. Devis gratuit sous 24h.
          </p>
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

      {/* Expertise + Prestations */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-4">
                Pourquoi le traitement hydrofuge est indispensable en Haute-Savoie ?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                La Haute-Savoie concentre les conditions les plus agressives pour les toitures en France : précipitations entre 1 200 et 2 500 mm par an selon l'altitude, cycles gel-dégel répétés de novembre à avril, et humidité chronique dans les fonds de vallée. Sans protection, une tuile absorbe jusqu'à 15 % de son poids en eau à chaque pluie.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                L'eau infiltrée dans les pores gèle, dilate les matériaux et crée des microfissures. En 3 à 5 ans, des tuiles saines deviennent friables, les mousses prolifèrent 2 à 3 fois plus vite, et les infiltrations apparaissent. Le coût d'un hydrofuge préventif — 8 à 35 €/m² — est sans commune mesure avec une réfection complète à 80-150 €/m².
              </p>
              <p className="text-muted-foreground leading-relaxed">
                RT Toiture 74 applique exclusivement des hydrofuges siloxane professionnels micro-poreux et respirants. Contrairement aux produits filmogènes du commerce qui piègent l'humidité résiduelle, nos produits laissent respirer les tuiles tout en bloquant l'eau de pluie. Application en 2 passes croisées, garantie 10 ans, attestation remise à réception.
              </p>

              {/* Vidéo principale */}
              <div className="mt-6 rounded-2xl overflow-hidden bg-black">
                <video controls muted playsInline preload="none"
                  poster="/images/avant-hydrofugation-tuiles.jpg"
                  className="w-full aspect-video">
                  <source src="/videos/hydrofugation.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold mb-4">Nos prestations hydrofuge toiture</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {PRESTATIONS.map(s => (
                  <div key={s} className="flex items-center gap-2 p-3 bg-muted/40 rounded-xl">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl mb-4">
                <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-600" /> Hydrofuge siloxane — la référence professionnelle
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Le siloxane pénètre dans les pores des tuiles sans former de film en surface. Résultat : la vapeur d'eau sort librement, l'eau liquide ne peut pas entrer. Aucun risque de cloquage ou délaminage. Durée de vie 10 à 15 ans selon l'exposition.
                </p>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" /> Combiné démoussage + hydrofuge — économie maximale
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Démoussage, fongicide et hydrofuge peuvent être réalisés en une seule intervention. Économie sur le déplacement, garantie 10 ans dès la première visite, rapport photos complet.
                </p>
              </div>

              {/* Photos avant/après */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                  <img src="/images/avant-hydrofugation-tuiles.jpg"
                    alt="Tuiles avant traitement hydrofuge — porosité visible — RT Toiture 74"
                    title="Tuiles poreuses avant hydrofugation — RT Toiture 74 Haute-Savoie"
                    loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">AVANT</span>
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                  <img src="/images/apres-hydrofugation-tuiles.jpg"
                    alt="Tuiles après traitement hydrofuge garanti 10 ans — RT Toiture 74"
                    title="Tuiles protégées après hydrofugation professionnelle — RT Toiture 74"
                    loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded">APRÈS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie vidéos */}
      <section className="py-10 bg-muted/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-xl font-bold mb-2 text-center">Vidéos — Hydrofugation en Haute-Savoie</h2>
          <p className="text-center text-sm text-muted-foreground mb-6">Nos chantiers filmés : application, résultats, hydrofuge coloré</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { src: '/videos/hydrofuge-colore.mp4', poster: '/images/apres-hydrofugation-tuiles.jpg', label: 'TEINTÉ', color: 'bg-purple-600' },
              { src: '/videos/hydrofugation-colore.mp4', poster: '/images/fongicide-resultat-tuiles-canal-avant-apres.jpg', label: 'COLORÉ', color: 'bg-orange-500' },
              { src: '/videos/hydrofugation-toit.mp4', poster: '/images/fongicide-hydrofuge-application-en-cours.jpg', label: 'CHANTIER', color: 'bg-primary' },
            ].map((v, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden bg-black">
                <span className={`absolute top-2 left-2 z-10 text-white text-xs font-bold px-2 py-0.5 rounded ${v.color}`}>{v.label}</span>
                <video controls muted playsInline preload="none" poster={v.poster} className="w-full aspect-video">
                  <source src={v.src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie photos chantiers */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-xl font-bold mb-6 text-center">Photos de chantiers — Hydrofuge Haute-Savoie</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { src: '/images/fongicide-hydrofuge-application-en-cours.jpg', alt: 'Application hydrofuge sur toiture par artisan RT Toiture 74', label: 'CHANTIER' },
              { src: '/images/fongicide-traitement-artisan-combinaison-haute-savoie.webp', alt: 'Artisan traitement hydrofuge toiture Haute-Savoie — combinaison protection', label: 'ARTISAN' },
              { src: '/images/fongicide-toiture-avant-apres-haute-savoie.jpg', alt: 'Toiture avant et après traitement hydrofuge Haute-Savoie — RT Toiture 74', label: 'AVANT/APRÈS' },
              { src: '/images/fongicide-resultat-tuiles-canal-avant-apres.jpg', alt: 'Tuiles canal avant et après hydrofugation — résultat professionnel', label: 'RÉSULTAT' },
              { src: '/images/fongicide-antimousse-application-toiture-74.webp', alt: 'Application antimousse et hydrofuge toiture 74 — RT Toiture 74', label: 'TRAITEMENT' },
              { src: '/images/avant-hydrofugation-tuiles.jpg', alt: 'Tuiles poreuses avant traitement hydrofuge — état initial', label: 'AVANT' },
            ].map((p, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                <img src={p.src} alt={p.alt} title={p.alt} loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-2 left-2 text-white text-xs font-bold px-2 py-0.5 rounded bg-primary">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zones principales */}
      <section className="py-10 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-xl font-bold mb-6">Zones d'intervention prioritaires — Hydrofuge 74</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {ZONES_PRINCIPALES.map(z => {
              const commune = COMMUNES.find(c => c.name === z.name)
              return commune ? (
                <Link key={z.name} href={`/hydrofuge-toiture/${commune.slug}`}
                  className="p-4 bg-card border border-border/50 rounded-xl hover:border-primary/40 hover:shadow-sm transition group">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold group-hover:text-primary transition">Hydrofuge {z.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{z.desc}</p>
                </Link>
              ) : null
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold mb-8 text-center">
            Questions fréquentes — Traitement Hydrofuge Toiture 74
          </h2>
          <div className="space-y-4">
            {FAQS_HUB.map((faq, i) => (
              <details key={i} className="p-5 bg-muted/40 rounded-2xl group cursor-pointer">
                <summary className="font-semibold text-sm leading-relaxed list-none flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0">Q.</span>
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage vers demoussage */}
      <section className="py-10 bg-muted/20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold mb-3">Services complémentaires</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/demoussage-toiture" className="px-4 py-2 bg-card border border-border/50 rounded-full text-sm hover:border-primary/40 hover:text-primary transition">
              Démoussage Toiture Haute-Savoie
            </Link>
            <Link href="/couvreur" className="px-4 py-2 bg-card border border-border/50 rounded-full text-sm hover:border-primary/40 hover:text-primary transition">
              Couvreur Haute-Savoie
            </Link>
            <Link href="/zingueur" className="px-4 py-2 bg-card border border-border/50 rounded-full text-sm hover:border-primary/40 hover:text-primary transition">
              Zingueur Haute-Savoie
            </Link>
          </div>
        </div>
      </section>

      {/* Grille 28 communes */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold mb-3 text-center">
            Hydrofuge toiture disponible sur {COMMUNES.length} communes de Haute-Savoie
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Sélectionnez votre commune pour accéder à la page dédiée : tarifs indicatifs, spécificités locales et exemples de réalisations hydrofuge à proximité.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {COMMUNES.map(c => (
              <Link
                key={c.slug}
                href={`/hydrofuge-toiture/${c.slug}`}
                className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl hover:bg-primary/10 hover:text-primary transition text-sm font-medium group"
              >
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Hydrofuge {c.name}</span>
                <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Traitement Hydrofuge Toiture Haute-Savoie — Devis Gratuit" />
    </>
  )
}
