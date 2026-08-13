'use client'
import React from "react";
import { COMMUNES, SERVICES, COMPANY } from "@/lib/siteData";
import { COMMUNE_DATA } from "@/lib/communeData";
import Link from "next/link";
import { useParams } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABand from "@/components/shared/CTABand";
import GoogleReviews from "@/components/home/GoogleReviews";
import FAQSection from "@/components/shared/FAQSection";
import ContactForm from "@/components/shared/ContactForm";
import ServiceCard from "@/components/shared/ServiceCard";
import { Phone, ArrowRight, MapPin, Shield, Clock, Award, Check, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommunePhotoGallery from "@/components/shared/CommunePhotoGallery";

function getCommuneContent(commune) {
  const name = commune.name;
  const code = commune.code;
  const nearby = commune.nearby;
  const data = COMMUNE_DATA[commune.slug] || {};

  const geo = data.geo || `${name} est une commune de Haute-Savoie desservie par RT Toiture 74.`;
  const climat = data.climat || `Le climat de ${name} est typique de la Haute-Savoie, avec des précipitations importantes et des hivers enneigés.`;
  const bati = data.bati || `Le parc immobilier de ${name} comprend des maisons individuelles et des constructions variées.`;
  const expertise = data.expertise || `Notre équipe intervient régulièrement à ${name} pour tous types de travaux de couverture, avec une connaissance approfondie des pathologies locales liées au climat de Haute-Savoie.`;
  const materiaux = data.materiaux || `Tuiles mécaniques en terre cuite ou béton, ardoise naturelle, zinc pour la zinguerie.`;
  const processus = data.processus || `Chaque intervention à ${name} débute par un diagnostic gratuit sur place, suivi d'un devis détaillé remis sous 24h. Les travaux sont réalisés par notre équipe salariée avec remise d'un certificat de garantie décennale à la réception.`;
  const realisation = data.realisation || `Nous intervenons régulièrement à ${name} pour des démoussages, traitements hydrofuges, réfections de couverture et travaux de zinguerie.`;
  const faqLocal = data.faqLocal || [];

  const baseFaqs = [
    { question: `Intervenez-vous en urgence à ${name} ?`, answer: `Oui, nous assurons un service d'intervention 7j/7 à ${name} (${code}) pour les urgences : fuite active, tuiles arrachées par le vent, dégâts de tempête. Appelez le 06 69 43 41 42. Nous pouvons réaliser un bâchage provisoire dans la journée si nécessaire, pour protéger l'intérieur en attendant la réparation définitive.` },
    { question: `Êtes-vous certifié RGE pour travailler à ${name} ?`, answer: `Oui, RT Toiture 74 est artisan certifié RGE Qualibat, couvert par une assurance décennale et une responsabilité civile professionnelle. Notre certification RGE vous permet de bénéficier des aides de l'État (MaPrimeRénov', CEE, Éco-PTZ) pour vos travaux de rénovation thermique de toiture à ${name}. Attestations remises avant le début du chantier.` },
    { question: `Quels sont vos délais d'intervention à ${name} ?`, answer: `Pour un diagnostic et devis à ${name}, nous intervenons sous 48 à 72h. Pour les travaux planifiés, le délai est généralement de 1 à 3 semaines selon la période et la charge de travail. En urgence, nous faisons notre maximum pour intervenir sous 24h. Contactez-nous au 06 69 43 41 42.` },
  ];

  return {
    h1: `Couvreur à ${name} (${code}) — Artisan Toiture Haute-Savoie`,
    metaDesc: `Couvreur professionnel à ${name} (${code}). Rénovation, nettoyage, traitement hydrofuge garanti 10 ans. Artisan RGE. Devis gratuit ☎ 06 69 43 41 42`,
    intro: `Vous recherchez un couvreur qualifié à ${name} ? ${geo} RT Toiture 74 intervient à ${name} (${code}) et dans les communes voisines (${nearby.join(", ")}) pour tous vos travaux de toiture et de couverture.`,
    sections: [
      {
        h2: `Expertise locale — Couvreur à ${name}`,
        text: expertise,
      },
      {
        h2: `Contexte climatique et matériaux à ${name}`,
        text: `${climat}\n\n${bati}\n\nMatériaux recommandés à ${name} : ${materiaux}`,
      },
      {
        h2: `Notre processus d'intervention à ${name}`,
        text: `${processus}\n\n${realisation}`,
      },
    ],
    faqs: [...faqLocal.map(f => ({ question: f.q, answer: f.a })), ...baseFaqs],
  };
}

export default function CommunePage() {
  const { slug } = useParams();
  const commune = COMMUNES.find(c => c.slug === slug);

  if (!commune) {
    return <div className="p-20 text-center text-muted-foreground">Page non trouvée</div>;
  }

  const content = getCommuneContent(commune);
  const BASE = 'https://www.rt-toiture74.fr';

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'Zones d\'intervention', item: `${BASE}/services` },
      { '@type': 'ListItem', position: 3, name: `Couvreur ${commune.name}`, item: `${BASE}/couvreur/${slug}` },
    ],
  };

  const localServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Couvreur à ${commune.name} (${commune.code})`,
    description: content.metaDesc,
    url: `${BASE}/couvreur/${slug}`,
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
      <Breadcrumbs items={[{ label: "Zones d'intervention", href: "/services" }, { label: `Couvreur ${commune.name}` }]} />

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
              <h2 className="font-heading text-2xl font-bold mb-6">Votre Couvreur de Confiance à {commune.name}</h2>
              {content.sections.map((section, si) => (
                <div key={si} className="mb-8">
                  <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">{section.h2}</h3>
                  {section.text.split("\n\n").map((p, pi) => (
                    <p key={pi} className="text-muted-foreground leading-relaxed mb-3">{p}</p>
                  ))}
                </div>
              ))}

              {/* Services */}
              <h3 className="font-heading text-xl font-bold mt-8 mb-4">Nos Services à {commune.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {SERVICES.map(s => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl hover:bg-primary/5 transition">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-medium">{s.shortTitle} à {commune.name}</span>
                  </Link>
                ))}
              </div>

              {/* Trust */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: Shield, label: "Certifié RGE" },
                  { icon: Clock, label: "Urgence 7j/7" },
                  { icon: Award, label: "Garantie 10 ans" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                    <Icon className="w-8 h-8 text-primary shrink-0" />
                    <p className="font-semibold text-sm">{label}</p>
                  </div>
                ))}
              </div>

              {/* Nearby */}
              <h3 className="font-heading text-xl font-bold mt-10 mb-4">Communes Proches</h3>
              <div className="flex flex-wrap gap-2">
                {commune.nearby.map(n => {
                  const nearbyCommune = COMMUNES.find(c => c.name === n);
                  return nearbyCommune ? (
                    <Link key={n} href={`/couvreur/${nearbyCommune.slug}`} className="px-4 py-2 bg-muted/50 rounded-full text-sm hover:bg-primary/10 hover:text-primary transition">
                      Couvreur {n}
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
                <h3 className="font-heading text-xl font-bold mb-4 text-center">Devis Gratuit à {commune.name}</h3>
                <ContactForm source={`commune-${slug}`} compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles de conseil */}
      <section className="py-12 bg-muted/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Guides et conseils pour votre toiture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { slug: "quand-nettoyer-toiture-montagne", title: "Quand nettoyer sa toiture en montagne ?" },
              { slug: "mousses-toit-dangereuses", title: "Les mousses sur le toit sont-elles dangereuses ?" },
              { slug: "prix-refaire-toiture-haute-savoie", title: `Quel prix pour refaire une toiture à ${commune.name} ?` },
              { slug: "traitement-hydrofuge-indispensable", title: "Traitement hydrofuge : pourquoi c'est indispensable ?" },
              { slug: "detecter-fuite-toiture", title: "Comment détecter une fuite de toiture ?" },
              { slug: "cout-demoussage-toiture-2025", title: "Combien coûte un démoussage de toiture en 2025 ?" },
            ].map(art => (
              <Link key={art.slug} href={`/blog/${art.slug}`}
                className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border/50 hover:border-primary/40 hover:shadow-sm transition group">
                <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition">{art.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CommunePhotoGallery commune={commune.name} slug={slug} />
      <FAQSection faqs={content.faqs} title={`FAQ — Couvreur ${commune.name}`} />
      <GoogleReviews />
      <CTABand title={`Couvreur à ${commune.name} — Devis Gratuit`} />
    </>
  );
}