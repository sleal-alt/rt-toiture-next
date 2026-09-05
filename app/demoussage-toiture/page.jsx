import Link from 'next/link'
import { COMMUNES, COMPANY } from '@/lib/siteData'
import { MapPin, ArrowRight, Phone, Shield, Award, Clock, Check, Droplets, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CTABand from '@/components/shared/CTABand'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export const metadata = {
  title: 'Démoussage Toiture Haute-Savoie (74) — Nettoyage Mousse & Traitement | RT Toiture 74',
  description: 'Démoussage toiture en Haute-Savoie (74). Nettoyage mousse, lichens, algues. Traitement fongicide + hydrofuge garanti 10 ans. Artisan RGE sur 28 communes. Devis gratuit ☎ 06 69 43 41 42.',
  alternates: { canonical: 'https://www.rt-toiture74.fr/demoussage-toiture' },
}

const PRESTATIONS = [
  'Démoussage basse pression (max 50 bars)',
  'Traitement fongicide biocide homologué',
  'Hydrofuge siloxane garanti 10 ans',
  'Revêtement hydrofuge teinté',
  'Peinture toiture anti-mousse',
  'Diagnostic état complet de toiture',
  'Traitement préventif anti-lichens',
  'Rapport d\'intervention photos',
]

const ZONES_PRINCIPALES = [
  { name: 'Annecy', desc: 'Lac & montagne — hygrométrie élevée, mousses rapides' },
  { name: 'Annemasse', desc: 'Bassin genevois — brouillards et pluies fréquentes' },
  { name: 'Chamonix-Mont-Blanc', desc: 'Altitude — mousses et lichens tenaces sur granit' },
  { name: 'Bonneville', desc: 'Vallée de l\'Arve — humidité de fond de vallée' },
  { name: 'Megève', desc: 'Station — neige et gel accélèrent la dégradation' },
  { name: 'Sallanches', desc: 'Piedmont — exposition mixte soleil/pluie' },
]

export default function DemoussageIndexPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Démoussage Toiture Haute-Savoie' }]} />

      <section className="bg-accent py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center gap-2 justify-center mb-4">
            <MapPin className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-semibold">Haute-Savoie (74) — 28 communes</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Démoussage Toiture Haute-Savoie — Nettoyage & Traitement Mousse
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            RT Toiture 74 intervient sur 28 communes de Haute-Savoie pour éliminer mousses, lichens et algues. Traitement fongicide + hydrofuge garanti 10 ans. Artisan RGE certifié. Devis gratuit sous 24h.
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
                Pourquoi le démoussage est indispensable en Haute-Savoie ?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                La Haute-Savoie cumule les conditions les plus agressives pour les toitures : enneigement prolongé de novembre à avril, cycles gel-dégel répétés, précipitations abondantes (1 200 à 2 500 mm/an selon l'altitude) et humidité chronique. Dans ce contexte, les mousses et lichens prolifèrent 2 à 3 fois plus vite qu'en plaine.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Les mousses retiennent l'eau sous les tuiles et accélèrent le gel des matériaux. Les lichens s'incrustent dans les pores de surface et fragilisent les tuiles en profondeur. Sans intervention, une toiture envahie commence à présenter des infiltrations en 3 à 5 ans. Le coût d'un démoussage préventif — de 15 à 35 €/m² — est sans commune mesure avec celui d'une réfection complète (80 à 150 €/m²).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                RT Toiture 74 applique un protocole en 3 phases validé pour le climat savoyard : nettoyage basse pression (max 50 bars pour préserver les granulats), traitement fongicide biocide homologué, et hydrofuge siloxane filmogène garanti 10 ans. Ce triptyque est la seule solution qui offre une protection durable dans nos conditions climatiques locales.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold mb-4">Nos prestations de démoussage toiture</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {PRESTATIONS.map(s => (
                  <div key={s} className="flex items-center gap-2 p-3 bg-muted/40 rounded-xl">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-primary" /> Hydrofuge garanti 10 ans — inclus sur chaque démoussage
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Chaque démoussage est suivi d'un traitement hydrofuge siloxane filmogène. Ce produit crée une barrière imperméable sur les tuiles, empêchant la repousse des mousses et protégeant contre gel, pluie et UV pendant 8 à 10 ans. Attestation de garantie remise à réception.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zones principales */}
      <section className="py-10 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-xl font-bold mb-6">Zones d'intervention prioritaires — Démoussage 74</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {ZONES_PRINCIPALES.map(z => {
              const commune = COMMUNES.find(c => c.name === z.name)
              return commune ? (
                <Link key={z.name} href={`/demoussage-toiture/${commune.slug}`}
                  className="p-4 bg-card border border-border/50 rounded-xl hover:border-primary/40 hover:shadow-sm transition group">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold group-hover:text-primary transition">Démoussage {z.name}</span>
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
            Démoussage toiture disponible sur {COMMUNES.length} communes de Haute-Savoie
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Sélectionnez votre commune pour accéder à la page dédiée : spécificités climatiques locales, tarifs indicatifs et exemples de réalisations de démoussage à proximité.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {COMMUNES.map(c => (
              <Link
                key={c.slug}
                href={`/demoussage-toiture/${c.slug}`}
                className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl hover:bg-primary/10 hover:text-primary transition text-sm font-medium group"
              >
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Démoussage {c.name}</span>
                <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Démoussage Toiture Haute-Savoie — Devis Gratuit" />
    </>
  )
}
