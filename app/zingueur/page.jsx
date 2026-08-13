import Link from 'next/link'
import { COMMUNES } from '@/lib/siteData'
import { MapPin, ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CTABand from '@/components/shared/CTABand'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

export const metadata = {
  title: 'Zingueur Haute-Savoie — Gouttières Zinc & Zinguerie | RT Toiture 74',
  description: 'Zingueur professionnel en Haute-Savoie (74). Gouttières zinc, chéneaux, solins, noues, zinguerie façade sur 28 communes. Artisan RGE. Devis gratuit ☎ 06 69 43 41 42.',
  alternates: { canonical: 'https://www.rt-toiture74.fr/zingueur' },
}

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
            RT Toiture 74 intervient sur 28 communes de Haute-Savoie pour tous vos travaux de zinguerie : gouttières zinc, chéneaux, solins, noues et zinguerie façade. Artisan certifié RGE, devis gratuit sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="tel:+33669434142">
              <Button size="lg" className="bg-primary hover:bg-primary/90 font-bold gap-2">
                <Phone className="w-5 h-5" /> 06 69 43 41 42
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

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold mb-8 text-center">
            Zingueur disponible sur 28 communes
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {COMMUNES.map(c => (
              <Link
                key={c.slug}
                href={`/zingueur/${c.slug}`}
                className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl hover:bg-primary/10 hover:text-primary transition text-sm font-medium"
              >
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                Zingueur {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand title="Zingueur Haute-Savoie — Devis Gratuit" />
    </>
  )
}
