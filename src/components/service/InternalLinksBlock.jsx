import React from "react";
import Link from "next/link";
import { SERVICES, COMMUNES } from "@/lib/siteData";
import { ArrowRight, MapPin } from "lucide-react";

// Mapping service slug → chemin silo commune
// À compléter au fur et à mesure des nouveaux silos créés
const SERVICE_TO_COMMUNE_PATH = {
  "zinguerie":                       "/zingueur",
  "demoussage-nettoyage-toiture":    "/demoussage-toiture",
  "traitement-fongicide-toiture":    "/couvreur",
  "traitement-hydrofuge-toiture":    "/couvreur",
  "revetement-hydrofuge-teinte":     "/couvreur",
  "peinture-toiture":                "/couvreur",
  "couverture-toiture":              "/couvreur",
  "etancheite-toit-terrasse-epdm":   "/couvreur",
};

const KEY_COMMUNES = [
  "annecy", "annemasse", "cluses", "sallanches",
  "megeve", "chamonix-mont-blanc", "bonneville", "saint-julien-en-genevois",
];

export default function InternalLinksBlock({ slug, serviceName }) {
  const otherServices = SERVICES.filter(s => s.slug !== slug).slice(0, 6);
  const featuredCommunes = COMMUNES.filter(c => KEY_COMMUNES.includes(c.slug)).slice(0, 8);
  const communePath = SERVICE_TO_COMMUNE_PATH[slug] || "/couvreur";

  return (
    <section className="py-14 bg-muted/40 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Services associés */}
        <div>
          <h2 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full inline-block" />
            Services associés
          </h2>
          <ul className="space-y-2">
            {otherServices.map(s => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition group"
                >
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  <span>{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Zones d'intervention */}
        <div>
          <h2 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-primary rounded-full inline-block" />
            Zones d'intervention — Haute-Savoie (74)
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Nous intervenons également pour {serviceName.toLowerCase()} à{" "}
            {featuredCommunes.slice(0, 3).map((c, i) => (
              <span key={c.slug}>
                <Link href={`${communePath}/${c.slug}`} className="text-primary hover:underline font-medium">{c.name}</Link>
                {i < 2 ? ", " : ""}
              </span>
            ))}{" "}et dans toute la Haute-Savoie.
          </p>
          <div className="flex flex-wrap gap-2">
            {featuredCommunes.map(c => (
              <Link
                key={c.slug}
                href={`${communePath}/${c.slug}`}
                className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-card border border-border/50 hover:border-primary/40 hover:text-primary transition"
              >
                <MapPin className="w-3 h-3" />
                {c.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
