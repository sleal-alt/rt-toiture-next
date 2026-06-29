'use client'
import React from "react";
import Script from "next/script";
import { Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

const GOOGLE_REVIEW_URL = "https://share.google/9bjVg8JW1pUi7lBct";

// Remplacer par ton ID Trustindex après inscription sur trustindex.io
const TRUSTINDEX_WIDGET_ID = "REMPLACER_PAR_TON_ID_TRUSTINDEX";

const FALLBACK_REVIEWS = [
  { name: "Marie L.", avatar: "ML", rating: 5, date: "il y a 2 semaines", text: "Travail impeccable sur notre toiture à Annecy. Timothée est ponctuel, très professionnel et le résultat est parfait. Je recommande vivement.", service: "Démoussage & hydrofuge" },
  { name: "Pierre D.", avatar: "PD", rating: 5, date: "il y a 1 mois", text: "Intervention rapide suite à une fuite. Réparation efficace et durable. Un artisan de confiance qui connaît parfaitement son métier en Haute-Savoie.", service: "Réparation toiture" },
  { name: "Sophie M.", avatar: "SM", rating: 5, date: "il y a 1 mois", text: "Excellent rapport qualité-prix pour le nettoyage complet de notre toiture à Annemasse. Le traitement hydrofuge garanti 10 ans nous rassure pour l'avenir.", service: "Nettoyage + hydrofuge" },
  { name: "Jean-Marc R.", avatar: "JR", rating: 5, date: "il y a 2 mois", text: "En montagne, il faut un couvreur qui comprend les contraintes climatiques. Timothée a su adapter ses solutions à notre altitude à Chamonix. Résultat parfait.", service: "Couverture complète" },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function FallbackReviews() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {FALLBACK_REVIEWS.map((r, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-card rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
              {r.avatar}
            </div>
            <div>
              <p className="font-semibold text-sm">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.date}</p>
            </div>
            <div className="ml-auto"><GoogleLogo /></div>
          </div>
          <StarRating rating={r.rating} />
          <p className="text-muted-foreground text-sm leading-relaxed mt-3">"{r.text}"</p>
          <span className="inline-block mt-3 text-xs text-primary font-medium bg-primary/10 px-2.5 py-1 rounded-full">{r.service}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function GoogleReviews() {
  const useTrustindex = TRUSTINDEX_WIDGET_ID !== "REMPLACER_PAR_TON_ID_TRUSTINDEX";

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Avis Google Vérifiés"
          title="Ce que Disent nos Clients"
          subtitle="4.9/5 — Plus de 80 avis vérifiés sur Google. La satisfaction de nos clients en Haute-Savoie est notre meilleure récompense."
        />

        <div className="flex items-center justify-center gap-6 mb-10 flex-wrap">
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl font-bold font-heading">4.9</span>
            <StarRating rating={5} />
            <span className="text-xs text-muted-foreground mt-0.5">sur 5</span>
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl font-bold font-heading">80+</span>
            <span className="text-sm text-muted-foreground">avis vérifiés</span>
            <GoogleLogo />
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl font-bold font-heading text-primary">RGE</span>
            <span className="text-sm text-muted-foreground">Certifié</span>
            <span className="text-xs text-muted-foreground">Artisan</span>
          </div>
        </div>

        {useTrustindex ? (
          <>
            <div className="trustindex-widget" data-url={`https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`} />
            <Script src={`https://cdn.trustindex.io/loader.js?${TRUSTINDEX_WIDGET_ID}`} strategy="lazyOnload" />
          </>
        ) : (
          <FallbackReviews />
        )}

        <div className="flex justify-center mt-10">
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2 font-semibold">
              <GoogleLogo />
              Voir tous les avis Google
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
