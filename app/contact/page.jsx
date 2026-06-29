import Contact from '@/views/Contact'

export const metadata = {
  title: 'Contact — Couvreur Haute-Savoie | RT Toiture 74',
  description: "Contactez votre couvreur en Haute-Savoie (74). ☎ 06 69 43 41 42 — Devis gratuit sous 24h, intervention 7j/7 pour urgences. Basé à Poisy, secteur Annecy et tout le 74.",
  alternates: { canonical: 'https://rt-toiture74.fr/contact' },
  openGraph: { url: 'https://rt-toiture74.fr/contact' },
}

export default function ContactPage() { return <Contact /> }
