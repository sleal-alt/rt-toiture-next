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
    alt: "Toiture avec velux avant démoussage — mousses et lichens à Annecy — RT Toiture 74",
    title: "Démoussage toiture velux avant intervention — Annecy 74",
    caption: "Avant démoussage — lichens et mousses sur velux",
    category: "Démoussage",
    label: "AVANT",
  },
  {
    url: "/images/apres-demossage-velux.jpg",
    alt: "Toiture velux après démoussage professionnel à Annecy — résultat net RT Toiture 74",
    title: "Velux toiture propre après démoussage — couvreur Annecy 74",
    caption: "Après démoussage — résultat immédiat velux",
    category: "Démoussage",
    label: "APRÈS",
  },
  {
    url: "/images/avant-demossage-mousses.jpg",
    alt: "Mousses vertes épaisses sur tuiles béton avant traitement à Annemasse — RT Toiture 74",
    title: "Tuiles béton envahies de mousses avant nettoyage — Annemasse 74",
    caption: "Tuiles béton avec mousses avant nettoyage",
    category: "Démoussage",
    label: "AVANT",
  },
  {
    url: "/images/apres-demossage-net.jpg",
    alt: "Tuiles rouges propres après démoussage haute-pression à Bonneville — RT Toiture 74",
    title: "Résultat démoussage toiture tuiles — Bonneville Haute-Savoie",
    caption: "Tuiles nettoyées — aspect neuf retrouvé",
    category: "Démoussage",
    label: "APRÈS",
  },
  {
    url: "/images/avant-demossage-lichens.jpg",
    alt: "Lichens blancs et orange sur toiture avant intervention à Chamonix — RT Toiture 74",
    title: "Lichens toiture avant démoussage couvreur Chamonix 74",
    caption: "Lichens blancs — diagnostic avant intervention Chamonix",
    category: "Démoussage",
    label: "AVANT",
  },
  {
    url: "/images/apres-demossage-propre.jpg",
    alt: "Toiture assainie et traitée après démoussage à Cluses — artisan RGE RT Toiture 74",
    title: "Toiture nettoyée après démoussage professionnel — Cluses 74",
    caption: "Toiture assainie et traitée — Cluses",
    category: "Démoussage",
    label: "APRÈS",
  },
  {
    url: "/images/avant-peinture-tuiles.jpg",
    alt: "Tuiles canal avant revêtement hydrofuge teinté à Megève — RT Toiture 74",
    title: "Tuiles canal avant traitement hydrofuge coloré — Megève 74",
    caption: "Tuiles canal avant traitement — Megève",
    category: "Peinture & Hydrofuge",
    label: "AVANT",
  },
  {
    url: "/images/apres-peinture-rouge.jpg",
    alt: "Tuiles après revêtement hydrofuge teinté rouge à Sallanches — RT Toiture 74",
    title: "Revêtement hydrofuge rouge — résultat couvreur Sallanches 74",
    caption: "Après revêtement teinté rouge vif — Sallanches",
    category: "Peinture & Hydrofuge",
    label: "APRÈS",
  },
  {
    url: "/images/pendant-revetement-orange.jpg",
    alt: "Application revêtement hydrofuge orange en cours à Saint-Julien-en-Genevois — RT Toiture 74",
    title: "Pose revêtement hydrofuge teinté orange — Saint-Julien-en-Genevois 74",
    caption: "Application en cours — contraste avant/après",
    category: "Peinture & Hydrofuge",
    label: "EN COURS",
  },
  {
    url: "/images/apres-revetement-orange.jpg",
    alt: "Toiture après revêtement hydrofuge orange — résultat chantier à La Roche-sur-Foron — RT Toiture 74",
    title: "Résultat revêtement hydrofuge orange — La Roche-sur-Foron 74",
    caption: "Résultat — tuiles canal orange vif",
    category: "Peinture & Hydrofuge",
    label: "APRÈS",
  },
  {
    url: "/images/avant-mousse-grise.jpg",
    alt: "Toiture tuiles béton grise avec mousses noires avant peinture à Douvaine — RT Toiture 74",
    title: "Toiture dégradée avant peinture — couvreur Douvaine Haute-Savoie",
    caption: "Avant peinture — mousse dense et encrassement",
    category: "Peinture & Hydrofuge",
    label: "AVANT",
  },
  {
    url: "/images/apres-peinture-marron.jpg",
    alt: "Toiture tuiles après peinture marron brillant à Veyrier-du-Lac — RT Toiture 74",
    title: "Peinture toiture marron — résultat professionnel Veyrier-du-Lac 74",
    caption: "Après peinture marron — éclat retrouvé",
    category: "Peinture & Hydrofuge",
    label: "APRÈS",
  },
  {
    url: "/images/maison-apres-face.jpg",
    alt: "Maison avec toiture rénovée vue façade à Annecy — réfection complète RT Toiture 74",
    title: "Réfection toiture complète maison — Annecy Haute-Savoie RT Toiture 74",
    caption: "Vue façade — maison transformée après réfection",
    category: "Rénovation complète",
    label: "APRÈS",
  },
  {
    url: "/images/maison-apres-cote.jpg",
    alt: "Vue latérale maison après rénovation toiture complète à Poisy — RT Toiture 74",
    title: "Rénovation toiture vue côté garage — Poisy Haute-Savoie",
    caption: "Vue côté garage — rénovation complète",
    category: "Rénovation complète",
    label: "APRÈS",
  },
  {
    url: "/images/chantier-chalet.jpg",
    alt: "Chantier démoussage toiture chalet savoyard en montagne — Haute-Savoie RT Toiture 74",
    title: "Démoussage chalet montagne en cours — couvreur Haute-Savoie RT Toiture 74",
    caption: "Chalet en Haute-Savoie — démoussage en cours",
    category: "Démoussage",
    label: "EN COURS",
  },
  {
    url: "/images/artisan-toit.jpg",
    alt: "Artisan couvreur certifié RGE RT Toiture 74 en intervention toiture Haute-Savoie",
    title: "Couvreur RGE Qualibat en intervention — RT Toiture 74 Haute-Savoie",
    caption: "Artisan certifié RGE en intervention — RT Toiture 74",
    category: "Rénovation complète",
    label: "CHANTIER",
  },
  {
    url: "/images/tuiles-mousses-lichens-avant.jpg",
    alt: "Gros plan tuiles avec mousses et lichens verts avant démoussage Haute-Savoie",
    title: "Tuiles envahies de mousses et lichens — avant démoussage RT Toiture 74",
    caption: "Gros plan — mousses et lichens avant traitement",
    category: "Démoussage",
    label: "AVANT",
  },
  {
    url: "/images/tuiles-propres-apres-nettoyage.jpg",
    alt: "Gros plan tuiles propres après démoussage professionnel Haute-Savoie RT Toiture 74",
    title: "Tuiles propres après démoussage — résultat RT Toiture 74",
    caption: "Gros plan — tuiles assainies après nettoyage",
    category: "Démoussage",
    label: "APRÈS",
  },
  {
    url: "/images/chantier-avant-demoussage-velux.jpg",
    alt: "Toiture avec velux couverte de mousses et lichens avant démoussage Haute-Savoie",
    title: "Toiture velux avant démoussage — lichens et mousses — RT Toiture 74",
    caption: "Avant intervention — toiture chargée en lichens",
    category: "Démoussage",
    label: "AVANT",
  },
  {
    url: "/images/chantier-apres-demoussage-velux.jpg",
    alt: "Toiture velux propre après démoussage professionnel RT Toiture 74 Haute-Savoie",
    title: "Toiture velux propre après démoussage — résultat RT Toiture 74",
    caption: "Après démoussage — toiture assainie et traitée",
    category: "Démoussage",
    label: "APRÈS",
  },
  {
    url: "/images/chantier-demoussage-chalet-savoie.jpg",
    alt: "Chantier démoussage chalet Haute-Savoie avec échelle — RT Toiture 74 en intervention",
    title: "Chantier démoussage chalet alpin — Haute-Savoie RT Toiture 74",
    caption: "Chalet savoyard — démoussage en cours avec échelle",
    category: "Démoussage",
    label: "EN COURS",
  },
  {
    url: "/images/avant-hydrofugation-tuiles.jpg",
    alt: "Gros plan tuiles canal poreuses avant traitement hydrofuge Haute-Savoie",
    title: "Tuiles canal avant hydrofugation — surface poreuse — RT Toiture 74",
    caption: "Avant hydrofuge — tuiles poreuses et encrassées",
    category: "Peinture & Hydrofuge",
    label: "AVANT",
  },
  {
    url: "/images/apres-hydrofugation-tuiles.jpg",
    alt: "Gros plan tuiles canal après traitement hydrofuge — imperméabilisation RT Toiture 74",
    title: "Tuiles canal après hydrofugation — imperméabilisées RT Toiture 74",
    caption: "Après hydrofuge — imperméabilisation garantie 10 ans",
    category: "Peinture & Hydrofuge",
    label: "APRÈS",
  },
  {
    url: "/images/peinture-toiture-tuiles-brun.jpg",
    alt: "Gros plan tuiles après peinture toiture brun — résultat professionnel RT Toiture 74",
    title: "Peinture toiture tuiles brun — résultat professionnel RT Toiture 74",
    caption: "Après peinture brun — tuiles uniformes et protégées",
    category: "Peinture & Hydrofuge",
    label: "APRÈS",
  },
  {
    url: "/images/couvreur74-maison-renovee.jpg",
    alt: "Maison Haute-Savoie après rénovation toiture complète — RT Toiture 74",
    title: "Maison après rénovation toiture — RT Toiture 74 Haute-Savoie",
    caption: "Vue façade — maison rénovée par RT Toiture 74",
    category: "Rénovation complète",
    label: "APRÈS",
  },
  {
    url: "/images/epdm-toit-terrasse-velux-evacuation.jpg",
    alt: "Toit terrasse EPDM avec velux et évacuation — étanchéité RT Toiture 74 Haute-Savoie",
    title: "Étanchéité toit terrasse EPDM velux — couvreur Haute-Savoie RT Toiture 74",
    caption: "Toit terrasse EPDM — velux intégré, évacuation chromée",
    category: "EPDM",
    label: "APRÈS",
  },
  {
    url: "/images/epdm-toit-plat-membrane-grise.jpg",
    alt: "Membrane EPDM grise toit plat — étanchéité parfaite Haute-Savoie RT Toiture 74",
    title: "Membrane EPDM pose toit plat — artisan étanchéité 74",
    caption: "Membrane EPDM — finition avec relevés de rive",
    category: "EPDM",
    label: "APRÈS",
  },
  {
    url: "/images/epdm-toit-terrasse-membrane-noire.jpg",
    alt: "Toit terrasse membrane EPDM noire Haute-Savoie — RT Toiture 74 étanchéité",
    title: "Toit terrasse EPDM membrane noire — étanchéité toit plat 74",
    caption: "Membrane EPDM noire — toit terrasse imperméabilisé",
    category: "EPDM",
    label: "APRÈS",
  },
  {
    url: "/images/epdm-toit-plat-finition-releve.jpg",
    alt: "Étanchéité toit plat EPDM avec relevés — finition RT Toiture 74 Haute-Savoie",
    title: "EPDM toit plat relevés de rive — finition étanchéité 74",
    caption: "EPDM avec relevés — étanchéité complète",
    category: "EPDM",
    label: "APRÈS",
  },
  {
    url: "/images/epdm-toit-plat-pose-membrane-neuf.jpg",
    alt: "Pose membrane EPDM toit plat neuf Haute-Savoie — RT Toiture 74",
    title: "Pose membrane EPDM toit plat — étanchéité neuve RT Toiture 74",
    caption: "Grand toit plat — membrane EPDM pose complète",
    category: "EPDM",
    label: "APRÈS",
  },
  {
    url: "/images/epdm-toit-terrasse-maison-moderne.jpg",
    alt: "Toit terrasse EPDM maison moderne — étanchéité Haute-Savoie RT Toiture 74",
    title: "Toit terrasse maison moderne EPDM — étanchéité toit plat 74",
    caption: "Toit terrasse maison moderne — EPDM garanti 20 ans",
    category: "EPDM",
    label: "APRÈS",
  },
  {
    url: "/images/epdm-pose-membrane-construction-neuve.jpg",
    alt: "Pose EPDM construction neuve toit terrasse parpaings Haute-Savoie — RT Toiture 74",
    title: "EPDM construction neuve toit terrasse — couvreur étanchéité 74",
    caption: "Construction neuve — membrane EPDM posée sur dalle",
    category: "EPDM",
    label: "CHANTIER",
  },
  {
    url: "/images/urgence-toiture-bachage-avant-apres.jpg",
    alt: "Urgence toiture bâchage avant-après intervention — RT Toiture 74 Haute-Savoie",
    title: "Bâchage urgence toiture Haute-Savoie — avant et après intervention RT Toiture 74",
    caption: "Urgence toiture — bâchage protecteur posé sous 48h",
    category: "Urgence",
    label: "AVANT/APRÈS",
  },
  {
    url: "/images/urgence-toiture-bachage-intervention.jpg",
    alt: "Intervention urgence toiture bâchage Haute-Savoie — artisan RT Toiture 74",
    title: "Pose bâche urgence toiture — intervention rapide couvreur 74",
    caption: "Bâchage d'urgence — sécurisation sous 48h",
    category: "Urgence",
    label: "CHANTIER",
  },
  {
    url: "/images/urgence-toiture-faitage-degrade-diagnostic.jpg",
    alt: "Faîtage toiture dégradé — diagnostic urgence couvreur Haute-Savoie RT Toiture 74",
    title: "Diagnostic urgence faîtage dégradé — couvreur Haute-Savoie",
    caption: "Faîtage endommagé — diagnostic avant réparation",
    category: "Urgence",
    label: "AVANT",
  },
  {
    url: "/images/urgence-toiture-bachage-bache-bleue.jpg",
    alt: "Bâche bleue urgence toiture après tempête Haute-Savoie — RT Toiture 74",
    title: "Urgence toiture tempête — bâche protection posée rapidement RT Toiture 74",
    caption: "Bâche d'urgence après tempête — sécurisation immédiate",
    category: "Urgence",
    label: "SÉCURISÉ",
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
  {
    src: "/videos/avant-demoussage.mp4",
    poster: "/images/chantier-avant-demoussage-velux.jpg",
    title: "Toiture avant démoussage — état réel",
    desc: "Toiture réelle avant intervention RT Toiture 74 — mousses et lichens sur l'ensemble de la surface",
    category: "Démoussage",
    label: "AVANT",
  },
  {
    src: "/videos/apres-demoussage.mp4",
    poster: "/images/chantier-apres-demoussage-velux.jpg",
    title: "Toiture après démoussage — résultat réel",
    desc: "Même toiture après intervention RT Toiture 74 — résultat immédiat visible, toiture propre et traitée",
    category: "Démoussage",
    label: "APRÈS",
  },
  {
    src: "/videos/hydrofugation-toit.mp4",
    poster: "/images/avant-hydrofugation-tuiles.jpg",
    title: "Application traitement hydrofuge",
    desc: "Application du traitement hydrofuge transparent sur toiture en tuiles — protection garantie 10 ans contre pluie, neige et gel",
    category: "Hydrofuge",
    label: "CHANTIER",
  },
  {
    src: "/videos/hydrofugation-colore.mp4",
    poster: "/images/apres-hydrofugation-tuiles.jpg",
    title: "Revêtement hydrofuge coloré en action",
    desc: "Application d'un revêtement hydrofuge teinté — transformation visuelle immédiate, imperméabilisation et esthétique en une seule intervention",
    category: "Peinture & Hydrofuge",
    label: "CHANTIER",
  },
];

const LABEL_COLORS = {
  "AVANT": "bg-red-500",
  "APRÈS": "bg-emerald-600",
  "EN COURS": "bg-blue-500",
  "CHANTIER": "bg-primary",
  "DRONE": "bg-purple-600",
  "AVANT/APRÈS": "bg-orange-500",
  "SÉCURISÉ": "bg-emerald-700",
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
            Réalisations Toiture Haute-Savoie — Photos Avant/Après
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Photos et vidéos de nos vrais chantiers à Annecy, Bonneville, Chamonix, Cluses et dans tout le 74 — démoussage, peinture toiture, hydrofuge, rénovation complète.
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
                  title={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy"
                  width="400"
                  height="400"
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
