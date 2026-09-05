'use client'
import React from "react";
import { SERVICES } from "@/lib/siteData";
import { IMAGES } from "@/lib/images";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceCard from "@/components/shared/ServiceCard";
import CTABand from "@/components/shared/CTABand";
import GoogleReviews from "@/components/home/GoogleReviews";

export default function Services() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Services" }]} />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.zone} alt="Toitures Haute-Savoie" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-accent/90" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Nos Services de Couverture en Haute-Savoie
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Du nettoyage au remplacement complet, nous proposons une gamme complète de services pour protéger et embellir votre toiture.
          </p>
        </div>
      </section>

      {/* Intro expert */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-14">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-4">
                Pourquoi entretenir régulièrement sa toiture en Haute-Savoie ?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le département 74 cumule des conditions climatiques particulièrement agressives pour les toitures : enneigement prolongé de novembre à avril, cycles gel-dégel qui dilatent et fissurent les matériaux, précipitations abondantes toute l'année et fort rayonnement UV en altitude. Dans ce contexte, une toiture non entretenue se dégrade deux à trois fois plus vite qu'en plaine.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Les mousses et lichens — favorisés par l'humidité permanente — retiennent l'eau sous les tuiles, accélèrent le gel des matériaux et peuvent provoquer des infiltrations en 3 à 5 ans. Un démoussage suivi d'un traitement hydrofuge préventif protège votre toiture pour 8 à 10 ans au coût d'une simple réparation, là où l'inaction conduit à une réfection complète bien plus onéreuse.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                RT Toiture 74 propose une gamme complète de services adaptés à chaque situation : nettoyage préventif, traitements de protection, réfection partielle ou complète, zinguerie et étanchéité. Notre diagnostic sur site — toujours gratuit — permet d'identifier le traitement le plus adapté et d'éviter toute dépense inutile.
              </p>
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold mb-4">RT Toiture 74 — Artisan local certifié RGE</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Artisan couvreur basé en Haute-Savoie, RT Toiture 74 réalise l'intégralité de ses chantiers en équipe salariée — pas de sous-traitance. Notre certification RGE Qualibat vous ouvre droit aux aides de l'État : MaPrimeRénov', Certificats d'Économie d'Énergie (CEE) et Éco-PTZ pour les travaux d'isolation de toiture.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Diagnostic et devis gratuit", desc: "Inspection sur site, devis remis sous 24h, sans engagement." },
                  { label: "Équipe salariée — pas de sous-traitance", desc: "Qualité constante, responsabilité directe sur chaque chantier." },
                  { label: "Certification RGE Qualibat", desc: "Accès aux aides MaPrimeRénov', CEE et Éco-PTZ." },
                  { label: "Garantie décennale systématique", desc: "Attestation remise avant le démarrage de chaque chantier." },
                ].map(item => (
                  <div key={item.label} className="p-3 bg-muted/40 rounded-xl">
                    <p className="font-semibold text-sm mb-0.5">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Grille services */}
          <h2 className="font-heading text-2xl font-bold mb-8 text-center">Nos services de toiture</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(service => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading badge="Notre Processus" title="Comment Ça Marche ?" subtitle="Un processus simple et transparent pour vos travaux de toiture." />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Diagnostic", desc: "Inspection gratuite de votre toiture et identification des travaux nécessaires." },
              { step: "02", title: "Devis", desc: "Devis détaillé, transparent et sans engagement sous 24h." },
              { step: "03", title: "Travaux", desc: "Intervention professionnelle dans le respect des délais annoncés." },
              { step: "04", title: "Garantie", desc: "Suivi post-travaux et garantie jusqu'à 10 ans selon les prestations." },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground font-heading font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />
      <CTABand />
    </>
  );
}