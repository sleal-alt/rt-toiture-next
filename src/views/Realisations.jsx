'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABand from "@/components/shared/CTABand";
import GoogleReviews from "@/components/home/GoogleReviews";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

const PHOTOS = [
  {
    url: "/images/avant-demossage-velux.jpg",
    alt: "Toiture avant démoussage — lichens et mousses — RT Toiture 74",
    caption: "Avant démoussage — lichens et mousses",
    category: "Démoussage",
    label: "AVANT",
  },
  {
    url: "/images/apres-demossage-velux.jpg",
    alt: "Toiture après démoussage professionnel — RT Toiture 74",
    caption: "Après démoussage — résultat immédiat",
    category: "Démoussage",
    label: "APRÈS",
  },
  {
    url: "/images/avant-demossage-mousses.jpg",
    alt: "Mousses et lichens sur tuiles avant traitement — Haute-Savoie",
    caption: "Tuiles avec mousses avant nettoyage",
    category: "Démoussage",
    label: "AVANT",
  },
  {
    url: "/images/apres-demossage-net.jpg",
    alt: "Tuiles propres après démoussage — RT Toiture 74",
    caption: "Tuiles nettoyées — aspect neuf retrouvé",
    category: "Démoussage",
    label: "APRÈS",
  },
  {
    url: "/images/avant-demossage-lichens.jpg",
    alt: "Lichens blancs sur toiture avant intervention",
    caption: "Lichens blancs — diagnostic avant intervention",
    category: "Démoussage",
    label: "AVANT",
  },
  {
    url: "/images/apres-demossage-propre.jpg",
    alt: "Toiture nettoyée après démoussage — RT Toiture 74",
    caption: "Toiture assainie et traitée",
    category: "Démoussage",
    label: "APRÈS",
  },
  {
    url: "/images/avant-peinture-tuiles.jpg",
    alt: "Tuiles canal avant revêtement hydrofuge teinté",
    caption: "Tuiles canal avant traitement",
    category: "Peinture & Hydrofuge",
    label: "AVANT",
  },
  {
    url: "/images/apres-peinture-rouge.jpg",
    alt: "Tuiles après revêtement hydrofuge teinté rouge — RT Toiture 74",
    caption: "Après revêtement teinté rouge vif",
    category: "Peinture & Hydrofuge",
    label: "APRÈS",
  },
  {
    url: "/images/pendant-revetement-orange.jpg",
    alt: "Application revêtement hydrofuge teinté orange en cours",
    caption: "Application en cours — contraste avant/après",
    category: "Peinture & Hydrofuge",
    label: "EN COURS",
  },
  {
    url: "/images/apres-revetement-orange.jpg",
    alt: "Toiture après revêtement hydrofuge teinté orange",
    caption: "Résultat — tuiles canal orange vif",
    category: "Peinture & Hydrofuge",
    label: "APRÈS",
  },
  {
    url: "/images/avant-mousse-grise.jpg",
    alt: "Toiture avec mousse grise dense avant peinture",
    caption: "Avant peinture — mousse dense",
    category: "Peinture & Hydrofuge",
    label: "AVANT",
  },
  {
    url: "/images/apres-peinture-marron.jpg",
    alt: "Toiture après peinture marron brillant — RT Toiture 74",
    caption: "Après peinture marron — éclat retrouvé",
    category: "Peinture & Hydrofuge",
    label: "APRÈS",
  },
  {
    url: "/images/maison-apres-face.jpg",
    alt: "Maison après rénovation toiture rouge bordeaux — RT Toiture 74",
    caption: "Vue façade — maison transformée",
    category: "Rénovation complète",
    label: "APRÈS",
  },
  {
    url: "/images/maison-apres-cote.jpg",
    alt: "Vue côté maison après rénovation toiture",
    caption: "Vue côté garage — rénovation complète",
    category: "Rénovation complète",
    label: "APRÈS",
  },
  {
    url: "/images/chantier-chalet.jpg",
    alt: "Chantier démoussage toiture chalet savoyard",
    caption: "Chalet en Haute-Savoie — démoussage en cours",
    category: "Démoussage",
    label: "EN COURS",
  },
  {
    url: "/images/artisan-toit.jpg",
    alt: "Artisan couvreur RT Toiture 74 en intervention",
    caption: "Artisan certifié RGE en intervention",
    category: "Rénovation complète",
    label: "CHANTIER",
  },
];

const VIDEOS = [
  {
    src: "/videos/avant-chantier.mp4",
    poster: "/images/avant-demossage-velux.jpg",
    title: "Toiture avant intervention",
    desc: "État d'une toiture avant démoussage — mousses, lichens et algues visibles",
    category: "Démoussage",
    label: "AVANT",
  },
  {
    src: "/videos/apres-chantier.mp4",
    poster: "/images/apres-demossage-velux.jpg",
    title: "Résultat après démoussage",
    desc: "Même toiture après intervention — propre et traitée par RT Toiture 74",
    category: "Démoussage",
    label: "APRÈS",
  },
  {
    src: "/videos/nettoyage-toiture.mp4",
    poster: "/images/avant-demossage-mousses.jpg",
    title: "Nettoyage de toiture en cours",
    desc: "Intervention de nettoyage haute pression par RT Toiture 74 en Haute-Savoie",
    category: "Démoussage",
    label: "CHANTIER",
  },
  {
    src: "/videos/hydrofuge-colore.mp4",
    poster: "/images/pendant-revetement-orange.jpg",
    title: "Application revêtement hydrofuge coloré",
    desc: "Application professionnelle d'un revêtement hydrofuge teinté — transformation visuelle immédiate",
    category: "Peinture & Hydrofuge",
    label: "CHANTIER",
  },
  {
    src: "/videos/hydrofugation.mp4",
    poster: "/images/apres-peinture-rouge.jpg",
    title: "Hydrofugation de toiture",
    desc: "Application du traitement hydrofuge transparent garanti 10 ans par RT Toiture 74",
    category: "Hydrofuge",
    label: "CHANTIER",
  },
  {
    src: "/videos/drone-demossage.mp4",
    poster: "/images/chantier-chalet.jpg",
    title: "Chantier de démoussage — vue drone",
    desc: "Vue aérienne par drone d'un chantier de démoussage en Haute-Savoie par RT Toiture 74",
    category: "Démoussage",
    label: "DRONE",
  },
];

const LABEL_COLORS = {
  "AVANT": "bg-red-500",
  "APRÈS": "bg-emerald-600",
  "EN COURS": "bg-blue-500",
  "CHANTIER": "bg-primary",
  "DRONE": "bg-purple-600",
};

const CATEGORIES = ["Tous", "Démoussage", "Peinture & Hydrofuge", "Hydrofuge", "Rénovation complète"];

function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];
  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white">
        <X className="w-5 h-5" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white">
        <ChevronRight className="w-5 h-5" />
      </button>
      <div onClick={(e) => e.stopPropagation()} className="max-w-4xl w-full">
        <img src={photo.url} alt={photo.alt} className="w-full max-h-[80vh] object-contain rounded-xl" />
        <p className="text-white/70 text-center mt-3 text-sm">{photo.caption}</p>
      </div>
    </div>
  );
}

export default function Realisations() {
  const [filter, setFilter] = useState("Tous");
  const [lightbox, setLightbox] = useState(null);

  const filteredPhotos = filter === "Tous" ? PHOTOS : PHOTOS.filter(p => p.category === filter);
  const filteredVideos = filter === "Tous" ? VIDEOS : VIDEOS.filter(v => v.category === filter);

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => setLightbox(i => (i - 1 + filteredPhotos.length) % filteredPhotos.length);
  const nextPhoto = () => setLightbox(i => (i + 1) % filteredPhotos.length);

  return (
    <>
      {lightbox !== null && (
        <Lightbox photos={filteredPhotos} index={lightbox} onClose={closeLightbox} onPrev={prevPhoto} onNext={nextPhoto} />
      )}

      <Breadcrumbs items={[{ label: "Réalisations" }]} />

      <section className="bg-accent py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
            Nos Réalisations en Haute-Savoie
          </h1>
          <p className="text-white/70 text-lg">
            Photos et vidéos de nos chantiers réels — démoussage, peinture toiture, hydrofuge et rénovation.
          </p>
        </div>
      </section>

      {/* Filtres */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${filter === cat ? "bg-primary text-white shadow" : "bg-muted/60 text-muted-foreground hover:bg-muted"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Photos */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="Photos" title="Galerie Photos" subtitle="Cliquez sur une photo pour l'agrandir." />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredPhotos.map((photo, i) => (
              <motion.div
                key={photo.url}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.05 }}
                className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square shadow-sm"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300" />
                <span className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${LABEL_COLORS[photo.label] || "bg-primary"}`}>
                  {photo.label}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition duration-300">
                  <p className="text-white text-xs font-medium">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading badge="Vidéos" title="Galerie Vidéos" subtitle="Nos interventions filmées sur le terrain." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video, i) => (
              <motion.div
                key={video.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50"
              >
                <div className="relative aspect-video bg-muted">
                  <video
                    controls
                    preload="none"
                    poster={video.poster}
                    className="w-full h-full object-cover"
                    aria-label={video.title}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <span className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${LABEL_COLORS[video.label] || "bg-primary"}`}>
                    {video.label}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{video.category}</span>
                  <h3 className="font-heading font-bold mt-2 mb-1 text-sm">{video.title}</h3>
                  <p className="text-xs text-muted-foreground">{video.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GoogleReviews />
      <CTABand title="Vous souhaitez un résultat similaire ?" />
    </>
  );
}
