import Link from 'next/link'
import { COMMUNES } from '@/lib/siteData'
import { MapPin, ArrowRight, Phone } from 'lucide-react'

export const metadata = {
  title: 'Couvreur Haute-Savoie — Toutes nos Zones d\'Intervention | RT Toiture 74',
  description: 'RT Toiture 74 intervient dans tout le département 74 : Annecy, Annemasse, Bonneville, Cluses, Sallanches et toutes les communes de Haute-Savoie. Artisan RGE certifié. Devis gratuit.',
  alternates: { canonical: 'https://www.rt-toiture74.fr/couvreur' },
}

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
            Zones d'Intervention — Couvreur Haute-Savoie
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            RT Toiture 74 intervient dans {COMMUNES.length} communes du département 74. Artisan couvreur certifié RGE, devis gratuit sous 24h.
          </p>
          <div className="mt-8">
            <a href="tel:0669434142">
              <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 rounded-xl text-lg transition">
                <Phone className="w-5 h-5" /> 06 69 43 41 42
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Grille communes */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold mb-10 text-center">
            Nos {COMMUNES.length} Communes d'Intervention en Haute-Savoie
          </h2>
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
