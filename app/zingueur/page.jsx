import Link from 'next/link'
import { COMMUNES, COMPANY } from '@/lib/siteData'
import { MapPin, ArrowRight, Phone, Shield, Award, Clock, Check, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CTABand from '@/components/shared/CTABand'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export const metadata = {
  title: 'Zingueur Haute-Savoie (74) — Gouttières Zinc & Zinguerie | RT Toiture 74',
  description: 'Zingueur professionnel en Haute-Savoie (74). Gouttières zinc, chéneaux, solins, noues, zinguerie façade sur 28 communes. Zinc titane norme EN 988, garantie décennale. Devis gratuit ☎ 06 69 43 41 42.',
  alternates: { canonical: 'https://www.rt-toiture74.fr/zingueur' },
}

const PRESTATIONS_ZINC = [
  'Gouttières zinc demi-ronde et carrée',
  'Chéneaux zinc et aluminium',
  'Solins et bavettes d\'étanchéité',
  'Noues et arêtiers zinc',
  'Faîtages et rives zinc',
  'Zinguerie de façade',
  'Descentes d\'eaux pluviales',
  'Habillage de cheminée zinc',
]

const ZONES_PRINCIPALES = [
  { name: 'Annecy', desc: 'Chalet et maisons du lac — zinguerie haute gamme' },
  { name: 'Chamonix-Mont-Blanc', desc: 'Altitude — zinc titane résistant au gel et neige' },
  { name: 'Annemasse', desc: 'Agglomération frontalière — remplacement PVC par zinc' },
  { name: 'Megève', desc: 'Chalets d\'exception — zinguerie sur-mesure' },
  { name: 'Sallanches', desc: 'Piedmont — chéneaux et descentes zinc' },
  { name: 'Bonneville', desc: 'Vallée de l\'Arve — solins et zinguerie façade' },
]

export default function ZingueurIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Zingueur Haute-Savoie' }]} />

      <section className="bg-accent py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center gap-2 justify-center mb-4">
            <MapPin className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-semibold">Haute-Savoie (74)</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Zingueur Haute-Savoie — Gouttières Zinc & Zinguerie
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            RT Toiture 74 intervient sur 28 communes de Haute-Savoie pour tous vos travaux de zinguerie. Zinc titane norme EN 988, garantie décennale, artisan certifié RGE. Devis gratuit sous 24h.
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

      {/* Expertise */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-4">
                Zingueur expert en Haute-Savoie — le zinc, le bon choix pour le climat montagnard
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                En Haute-Savoie, la zinguerie est soumise à des contraintes climatiques sévères : alternance gel-dégel, neige lourde, pluies abondantes et rayonnement UV important en altitude. Le PVC se fragilise, se déforme et casse sous ces conditions ; le zinc naturel, lui, s'y adapte parfaitement.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                RT Toiture 74 utilise exclusivement du zinc titane de qualité supérieure (norme EN 988), en épaisseur adaptée à chaque usage : 0,65 mm pour les gouttières standard, 0,80 mm pour les chéneaux encaissés, 1 mm pour les solins et bavettes exposés. Ce zinc naturel développe avec le temps une patine grise qui le protège de la corrosion sans entretien — durée de vie garantie 40 à 60 ans.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Chaque chantier de zinguerie commence par un diagnostic complet : contrôle des pentes d'évacuation, vérification des sections hydrauliques adaptées à la surface de toiture, examen des solins existants. Nos zingueurs qualifiés réalisent l'ensemble des soudures à l'étain sur site, sans sous-traitance. Garantie décennale remise à la réception.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold mb-4">Nos prestations de zinguerie</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {PRESTATIONS_ZINC.map(s => (
                  <div key={s} className="flex items-center gap-2 p-3 bg-muted/40 rounded-xl">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-primary" /> Pourquoi choisir le zinc plutôt que le PVC ?
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Le zinc naturel dure 40-60 ans contre 15-20 ans pour le PVC. Il résiste au gel, aux UV, ne se déforme pas et est 100 % recyclable. En Haute-Savoie, c'est le seul matériau réellement adapté au climat de montagne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zones principales */}
      <section className="py-10 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-xl font-bold mb-6">Zones d'intervention — Zinguerie Haute-Savoie</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {ZONES_PRINCIPALES.map(z => {
              const commune = COMMUNES.find(c => c.name === z.name)
              return commune ? (
                <Link key={z.name} href={`/zingueur/${commune.slug}`}
                  className="p-4 bg-card border border-border/50 rounded-xl hover:border-primary/40 hover:shadow-sm transition group">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold group-hover:text-primary transition">Zingueur {z.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{z.desc}</p>
                </Link>
              ) : null
            })}
          </div>
        </div>
      </section>

      {/* Grille 28 communes */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold mb-3 text-center">
            Zingueur disponible sur {COMMUNES.length} communes de Haute-Savoie
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Sélectionnez votre commune pour accéder à la page dédiée : spécificités locales, matériaux adaptés à votre secteur et exemples de réalisations de zinguerie à proximité.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {COMMUNES.map(c => (
              <Link
                key={c.slug}
                href={`/zingueur/${c.slug}`}
                className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl hover:bg-primary/10 hover:text-primary transition text-sm font-medium group"
              >
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Zingueur {c.name}</span>
                <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Zingueur Haute-Savoie — Devis Gratuit" />
    </>
  )
}
