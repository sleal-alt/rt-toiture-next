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
import { Phone, ArrowRight, MapPin, Shield, Clock, Award, Check, Droplets, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

const ZINGUERIE_SERVICES = [
  "Gouttières zinc demi-ronde et carrée",
  "Chéneaux zinc et aluminium",
  "Solins et bavettes d'étanchéité",
  "Noues et arêtiers zinc",
  "Faîtages et rives zinc",
  "Zinguerie de façade",
  "Descentes d'eaux pluviales",
  "Joints de dilatation zinc",
]

function getZingueurContent(commune) {
  const name = commune.name;
  const code = commune.code;
  const nearby = commune.nearby;
  const data = COMMUNE_DATA[commune.slug] || {};

  const geo = data.geo || `${name} est une commune de Haute-Savoie desservie par RT Toiture 74.`;
  const climat = data.climat || `Le climat de ${name} est typique de la Haute-Savoie avec des précipitations importantes.`;
  const bati = data.bati || `Le parc immobilier de ${name} comprend des maisons individuelles et constructions variées.`;
  const expertiseZingueur = data.expertiseZingueur || `À ${name}, notre expertise en zinguerie couvre l'ensemble des prestations : gouttières zinc naturel, chéneaux encaissés, solins de cheminée et de velux, noues et faîtages en zinc. Nous utilisons exclusivement du zinc titane (norme EN 988) d'épaisseur adaptée aux conditions climatiques locales, garantissant une durée de vie de 40 à 60 ans.`;
  const processus = data.processus || `Chaque intervention de zinguerie à ${name} débute par un diagnostic complet : contrôle d'épaisseur des éléments existants, test d'étanchéité des soudures, vérification des fixations. Devis détaillé sous 24h, réalisation par notre équipe salariée, garantie décennale.`;
  const realisation = data.realisation || `Nous intervenons régulièrement à ${name} pour des remplacements de gouttières PVC par du zinc naturel, des reprises de solins, des réfections de chéneaux et des poses d'arrête-neige.`;

  return {
    h1: `Zingueur à ${name} (${code}) — Gouttières Zinc & Zinguerie`,
    intro: `Vous cherchez un zingueur qualifié à ${name} ? ${geo} RT Toiture 74 intervient à ${name} (${code}) pour tous vos travaux de zinguerie : gouttières zinc, chéneaux, solins, noues et zinguerie de façade.`,
    sections: [
      {
        h2: `Expertise zinguerie locale à ${name}`,
        text: expertiseZingueur,
      },
      {
        h2: `Contexte et spécificités de ${name}`,
        text: `${climat}\n\n${bati}\n\nUne zinguerie bien dimensionnée et correctement exécutée protège les fondations, les façades et la structure de votre bâtiment. À ${name}, nous adaptons le choix des matériaux et des sections hydrauliques aux conditions climatiques locales.`,
      },
      {
        h2: `Notre processus d'intervention à ${name}`,
        text: `${processus}\n\n${realisation}\n\nNous intervenons également dans les communes voisines : ${nearby.join(", ")}.`,
      },
    ],
    faqs: [
      {
        question: `Pourquoi remplacer les gouttières en PVC par des gouttières zinc à ${name} ?`,
        answer: `Le zinc est nettement supérieur au PVC dans le climat de ${name} : il résiste aux UV, au gel, aux chocs, et dure 40 à 60 ans contre 15–20 ans pour le PVC. Le zinc naturel s'auto-protège par une patine grise élégante. C'est un investissement sur le long terme qui valorise votre bien.`
      },
      {
        question: `Comment savoir si mes solins sont à refaire à ${name} ?`,
        answer: `Les signes d'alerte sont : traces d'humidité sur les murs autour de la cheminée ou des velux, infiltrations dans les combles, décollement visible du solin de la toiture. À ${name}, les cycles gel-dégel accélèrent la détérioration des solins. Un diagnostic gratuit permet de confirmer.`
      },
      {
        question: `Intervenez-vous en urgence pour une gouttière arrachée à ${name} ?`,
        answer: `Oui, nous intervenons rapidement à ${name} pour tout dégât d'urgence sur la zinguerie. Appelez le ${COMPANY.phone} — nous sécurisons votre toiture sous 48h et établissons un constat utilisable pour votre assurance si les dégâts sont liés à une tempête.`
      },
      {
        question: `Quel est le prix pour refaire les gouttières zinc à ${name} ?`,
        answer: `Le tarif dépend de la longueur et du profil choisi (demi-ronde, carrée), du profil de la maison et des difficultés d'accès. À ${name}, nous établissons un devis gratuit et sans engagement après visite. En général, comptez entre 50 et 90 €/ml posé pour des gouttières zinc naturel.`
      },
    ],
  };
}

export default function ZingueurPage() {
  const { slug } = useParams();
  const commune = COMMUNES.find(c => c.slug === slug);

  if (!commune) {
    return <div className="p-20 text-center text-muted-foreground">Page non trouvée</div>;
  }

  const content = getZingueurContent(commune);
  const BASE = 'https://www.rt-toiture74.fr';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Zingueur Haute-Savoie', item: `${BASE}/zingueur` },
      { '@type': 'ListItem', position: 3, name: `Zingueur ${commune.name}`, item: `${BASE}/zingueur/${slug}` },
    ],
  };

  const localServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Zingueur à ${commune.name} (${commune.code})`,
    description: `Zingueur professionnel à ${commune.name} — gouttières zinc, chéneaux, solins, zinguerie façade. Artisan RGE certifié.`,
    url: `${BASE}/zingueur/${slug}`,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: {
      '@type': 'City',
      name: commune.name,
      postalCode: commune.code,
      addressCountry: 'FR',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={localServiceSchema} />
      <JsonLd data={faqSchema} />
      <Breadcrumbs items={[
        { label: 'Zingueur Haute-Savoie', href: '/zingueur' },
        { label: `Zingueur ${commune.name}` }
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

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold mb-6">
                Votre Zingueur de Confiance à {commune.name}
              </h2>
              {content.sections.map((section, si) => (
                <div key={si} className="mb-8">
                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">{section.h2}</h3>
                  {section.text.split("\n\n").map((p, pi) => (
                    <p key={pi} className="text-muted-foreground leading-relaxed mb-3">{p}</p>
                  ))}
                </div>
              ))}

              {/* Services zinguerie */}
              <h3 className="font-heading text-xl font-bold mt-8 mb-4">
                Nos Prestations de Zinguerie à {commune.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {ZINGUERIE_SERVICES.map(s => (
                  <div key={s} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{s}</span>
                  </div>
                ))}
              </div>

              {/* Trust */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: Shield, label: "Certifié RGE" },
                  { icon: Clock, label: "Urgence 7j/7" },
                  { icon: Award, label: "Garantie décennale" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                    <Icon className="w-8 h-8 text-primary shrink-0" />
                    <p className="font-semibold text-sm">{label}</p>
                  </div>
                ))}
              </div>

              {/* Link to couvreur page */}
              <div className="mt-10 p-5 bg-primary/5 border border-primary/20 rounded-2xl">
                <p className="text-sm font-medium mb-2">Besoin d'un couvreur à {commune.name} ?</p>
                <Link href={`/couvreur/${slug}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm">
                  <ArrowRight className="w-4 h-4" /> Voir notre page couvreur {commune.name}
                </Link>
              </div>

              {/* Communes proches */}
              <h3 className="font-heading text-xl font-bold mt-10 mb-4">Communes Proches</h3>
              <div className="flex flex-wrap gap-2">
                {commune.nearby.map(n => {
                  const nearbyCommune = COMMUNES.find(c => c.name === n);
                  return nearbyCommune ? (
                    <Link key={n} href={`/zingueur/${nearbyCommune.slug}`}
                      className="px-4 py-2 bg-muted/50 rounded-full text-sm hover:bg-primary/10 hover:text-primary transition">
                      Zingueur {n}
                    </Link>
                  ) : (
                    <span key={n} className="px-4 py-2 bg-muted/50 rounded-full text-sm">{n}</span>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg sticky top-24">
                <h3 className="font-heading text-xl font-bold mb-4 text-center">Devis Zinguerie à {commune.name}</h3>
                <ContactForm source={`zingueur-${slug}`} compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie réalisations */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-xl md:text-2xl font-bold mb-6 text-center">
            Nos réalisations à {commune.name} et en Haute-Savoie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { url: "/images/zinguerie-solin-cheminee-zinc.jpg", alt: `Solin zinc cheminée toiture ${commune.name} — zinguerie RT Toiture 74`, label: "Habillage cheminée zinc" },
              { url: "/images/zinguerie-bavette-solin-zinc-neuf.jpg", alt: `Bavette solin zinc neuf toiture ${commune.name} — RT Toiture 74`, label: "Bavette zinc neuve" },
              { url: "/images/zinguerie-abergement-cheminee-zinc.jpg", alt: `Abergement cheminée zinc ${commune.name} — zingueur RT Toiture 74`, label: "Abergement zinc" },
              { url: "/images/zinguerie-pose-closoir-faitage-artisan.jpg", alt: `Artisan zingueur pose faîtage ${commune.name} — RT Toiture 74`, label: "Pose faîtage" },
            ].map((photo, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                <img
                  src={photo.url}
                  alt={photo.alt}
                  title={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <p className="absolute bottom-2 left-3 right-3 text-white text-xs font-semibold drop-shadow leading-tight">
                  {photo.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Photos de vrais chantiers réalisés par RT Toiture 74 en Haute-Savoie
          </p>
        </div>
      </section>

      <FAQSection faqs={content.faqs} title={`FAQ — Zingueur ${commune.name}`} />
      <GoogleReviews />
      <CTABand title={`Zingueur à ${commune.name} — Devis Gratuit`} />
    </>
  );
}
