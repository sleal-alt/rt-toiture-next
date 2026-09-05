import Link from 'next/link'
import { COMMUNES, COMPANY } from '@/lib/siteData'
import { MapPin, ArrowRight, Phone, Shield, Award, Clock, Check } from 'lucide-react'

export const metadata = {
  title: 'Couvreur Haute-Savoie (74) — Artisan RGE Certifié | RT Toiture 74',
  description: 'Couvreur professionnel en Haute-Savoie (74) : démoussage, hydrofuge, réfection toiture, zinguerie. RT Toiture 74 intervient dans 28 communes. Artisan RGE certifié. Devis gratuit sous 24h.',
  alternates: { canonical: 'https://www.rt-toiture74.fr/couvreur' },
}

const SERVICES_COUVREUR = [
  'Démoussage et nettoyage de toiture',
  'Traitement hydrofuge garanti 10 ans',
  'Traitement fongicide anti-mousses',
  'Réfection et remplacement de couverture',
  'Réparation tuiles, ardoises, faîtage',
  'Zinguerie — gouttières et solins zinc',
  'Étanchéité toit terrasse EPDM',
  'Peinture et revêtement hydrofuge teinté',
]

const ZONES_PRINCIPALES = [
  { name: 'Annecy', desc: 'Chef-lieu de département, forte densité de pavillons' },
  { name: 'Annemasse', desc: 'Agglomération frontalière, nombreux chantiers collectifs' },
  { name: 'Bonneville', desc: 'Vallée de l\'Arve, toitures exposées aux remontées d\'humidité' },
  { name: 'Cluses', desc: 'Bassin de Cluses, chantiers industriels et résidentiels' },
  { name: 'Sallanches', desc: 'Piedmont du Mont-Blanc, toitures en altitude' },
  { name: 'Saint-Julien-en-Genevois', desc: 'Proximité Genève, forte activité de rénovation' },
]

export default function CouvreurIndexPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-accent py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center gap-2 justify-center mb-4">
            <MapPin className="w-5 h-5 text-secondary" />
            <span className="text-secondary font-semibold">Haute-Savoie (74)</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Couvreur Haute-Savoie — Artisan RGE Certifié
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            RT Toiture 74 intervient dans {COMMUNES.length} communes du département 74. Démoussage, hydrofuge, réfection toiture et zinguerie. Devis gratuit sous 24h, garantie décennale.
          </p>
          <div className="mt-8">
            <a href={COMPANY.phoneTel}>
              <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl text-lg transition">
                <Phone className="w-5 h-5" /> {COMPANY.phone}
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-4">
                Couvreur professionnel en Haute-Savoie depuis plus de 10 ans
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                En Haute-Savoie, les toitures subissent des conditions climatiques parmi les plus exigeantes de France : enneigement prolongé en altitude, cycles gel-dégel répétés, précipitations importantes et UV intenses en été. Ces contraintes accélèrent le développement des mousses, lichens et algues, fragilisent les joints et solins, et dégradent les matériaux de couverture plus rapidement qu'en plaine.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                RT Toiture 74 est un artisan couvreur local, certifié RGE Qualibat, qui connaît parfaitement les pathologies spécifiques aux toitures de Haute-Savoie. Nous intervenons sur tous types de couvertures : tuiles mécaniques et canal en terre cuite ou béton, ardoises naturelles et artificielles, bacs acier, toits plats EPDM. Notre équipe salariée réalise l'intégralité des travaux — pas de sous-traitance.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Notre certification RGE vous permet d'accéder aux aides de l'État (MaPrimeRénov', CEE, Éco-PTZ) pour vos travaux de rénovation thermique de toiture. Devis gratuit remis sous 24h, garantie décennale systématique.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold mb-4">Nos prestations de couverture</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES_COUVREUR.map(s => (
                  <div key={s} className="flex items-center gap-2 p-3 bg-muted/40 rounded-xl">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { icon: Shield, label: 'Certifié RGE' },
                  { icon: Award, label: 'Garantie 10 ans' },
                  { icon: Clock, label: 'Urgence 7j/7' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-2 p-3 bg-primary/5 rounded-xl text-center">
                    <Icon className="w-6 h-6 text-primary" />
                    <span className="text-xs font-semibold">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zones principales */}
      <section className="py-10 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-xl font-bold mb-6">Zones d'intervention principales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {ZONES_PRINCIPALES.map(z => {
              const commune = COMMUNES.find(c => c.name === z.name)
              return commune ? (
                <Link key={z.name} href={`/couvreur/${commune.slug}`}
                  className="p-4 bg-card border border-border/50 rounded-xl hover:border-primary/40 hover:shadow-sm transition group">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-semibold group-hover:text-primary transition">Couvreur {z.name}</span>
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
            Nos {COMMUNES.length} communes d'intervention en Haute-Savoie
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Sélectionnez votre commune pour accéder à la page dédiée avec les spécificités locales, les matériaux recommandés et nos réalisations dans votre secteur.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {COMMUNES.sort((a, b) => a.name.localeCompare(b.name)).map(commune => (
              <Link
                key={commune.slug}
                href={`/couvreur/${commune.slug}`}
                className="flex items-center gap-2 p-3 bg-muted/50 hover:bg-primary/5 hover:text-primary border border-border/40 hover:border-primary/30 rounded-xl text-sm font-medium transition group"
              >
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{commune.name}</span>
                <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
