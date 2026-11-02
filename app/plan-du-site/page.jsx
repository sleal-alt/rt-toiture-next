import PlanDuSite from '@/views/PlanDuSite'

export const metadata = {
  title: 'Plan du Site — Couvreur Haute-Savoie',
  description: 'Plan du site rt-toiture74.fr — Retrouvez toutes les pages : services, communes, blog, contact.',
  alternates: { canonical: 'https://www.rt-toiture74.fr/plan-du-site' },
  robots: { index: false, follow: true },
}

export default function PlanDuSitePage() { return <PlanDuSite /> }
