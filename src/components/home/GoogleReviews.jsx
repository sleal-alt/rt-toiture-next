'use client'
import React, { useState } from "react";
import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

const GOOGLE_REVIEW_URL = "https://share.google/9bjVg8JW1pUi7lBct";

const REVIEWS = [
  {
    name: "AZ Renovation",
    avatar: "AZ",
    rating: 5,
    date: "il y a 1 mois",
    text: "Super artisan je recommande",
    color: "bg-blue-500",
  },
  {
    name: "Rangi Doerr",
    avatar: "RD",
    rating: 5,
    date: "il y a 1 mois",
    text: "Très satisfait du professionnalisme de Monsieur Reinhardt. Intervention rapide, travail minutieux et résultat irréprochable. Je recommande vivement ses services.",
    color: "bg-green-600",
  },
  {
    name: "Lygie Richar",
    avatar: "LR",
    rating: 5,
    date: "il y a 1 mois",
    text: "Je recommande vivement M Reinhart ! Très professionnel, sérieux et fiable, avec un vrai savoir-faire. Les tarifs sont corrects et transparents, sans mauvaise surprise.",
    color: "bg-purple-600",
  },
  {
    name: "Marc R",
    avatar: "MR",
    rating: 5,
    date: "il y a 1 mois",
    text: "Très satisfait du travail de Monsieur Reinhardt. Intervention rapide, travail soigné et résultat impeccable. Je recommande sans hésitation.",
    color: "bg-orange-500",
  },
  {
    name: "Miri Adolphe",
    avatar: "MA",
    rating: 5,
    date: "il y a 1 mois",
    text: "M. Reinhart est un couvreur très sérieux et professionnel. Personne fiable, ponctuelle et à l'écoute, avec un vrai sens du détail. On sent tout de suite le sérieux et le professionnalisme. Je recommande sans hésitation.",
    color: "bg-rose-500",
  },
  {
    name: "Natou Ziegler",
    avatar: "NZ",
    rating: 5,
    date: "il y a 2 mois",
    text: "Je recommande vivement cette entreprise intervient très rapidement et donne de bons conseils.",
    color: "bg-teal-600",
  },
  {
    name: "Louis Antoine Hoffmann",
    avatar: "LH",
    rating: 5,
    date: "il y a 2 mois",
    text: "Je recommande vivement M. Reinhardt ! Son professionnalisme est irréprochable : travail soigné, respect des délais et grande attention aux détails.",
    color: "bg-indigo-600",
  },
  {
    name: "Rafa Nadal",
    avatar: "RN",
    rating: 5,
    date: "il y a 3 mois",
    text: "Artisans très sérieux réactif et professionnel. Pour un travail au top. Je recommande 👍",
    color: "bg-amber-600",
  },
];

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3 h-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
          {review.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-sm text-gray-900 truncate">{review.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <StarRating rating={review.rating} />
          </div>
        </div>
        <GoogleLogo />
      </div>

      {/* Text */}
      <p className="text-gray-600 text-sm leading-relaxed flex-1">"{review.text}"</p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <span className="text-xs text-gray-400">{review.date}</span>
        <span className="text-xs text-gray-400 flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none">
            <path d="M9 12l2 2 4-4" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="10" stroke="#34A853" strokeWidth="1.5"/>
          </svg>
          Avis vérifié
        </span>
      </div>
    </motion.div>
  );
}

export default function GoogleReviews() {
  const [page, setPage] = useState(0);
  const perPage = 4;
  const totalPages = Math.ceil(REVIEWS.length / perPage);
  const visible = REVIEWS.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          badge="Avis Google Vérifiés"
          title="Ce que Disent nos Clients"
          subtitle="Tous nos avis sont authentiques et vérifiés par Google."
        />

        {/* Rating summary — style Trustindex */}
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-5 flex items-center gap-8 flex-wrap justify-center">
            <div className="flex items-center gap-3">
              <GoogleLogo />
              <span className="font-semibold text-gray-700 text-sm">Google Reviews</span>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900 leading-none">4,9</span>
              <div className="flex gap-0.5 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xs text-gray-500 mt-1">sur 5</span>
            </div>
            <div className="w-px h-10 bg-gray-200 hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900 leading-none">8</span>
              <span className="text-xs text-gray-500 mt-1">avis</span>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="wait">
            {visible.map((r, i) => (
              <ReviewCard key={page * perPage + i} review={r} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Page précédente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${i === page ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"}`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              aria-label="Page suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="flex justify-center mt-8">
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="gap-2 font-semibold border-gray-200 bg-white hover:bg-gray-50">
              <GoogleLogo />
              Voir sur Google Maps
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
