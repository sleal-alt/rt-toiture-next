import PlanDuSite from '@/views/PlanDuSite'

export const metadata = {
  title: 'Plan du Site | RT Toiture 74 — Couvreur Haute-Savoie',
  description: 'Plan du site rt-toiture74.fr — Retrouvez toutes les pages : services, communes, blog, contact.',
  alternates: { canonical: 'https://rt-toiture74.fr/plan-du-site' },
  robots: { index: false, follow: true },
}

export default function PlanDuSitePage() { return <PlanDuSite /> }
