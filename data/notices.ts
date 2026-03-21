import type { Notice, NoticeCategorie } from "@/types/notice";

export const CATEGORIES: NoticeCategorie[] = ["Plomberie", "Électricité", "Chauffage", "Ventilation", "Entretien"];

export const NOTICES: Notice[] = [
  // === PLOMBERIE ===
  { 
    id: 1, 
    titre: "Débouchage des canalisations", 
    categorie: "Plomberie", 
    type: "tutoriel",
    description: "Tutoriel pas à pas pour déboucher vos canalisations avec des méthodes simples et efficaces.", 
    date: "2026-03-15" 
  },
  { 
    id: 2, 
    titre: "Remplacer un joint de robinet", 
    categorie: "Plomberie", 
    type: "tutoriel",
    description: "Guide complet pour remplacer un joint défectueux et éviter les fuites d'eau.", 
    date: "2026-03-10" 
  },
  { 
    id: 3, 
    titre: "Prévenir les fuites d'eau", 
    categorie: "Plomberie", 
    type: "prevention",
    description: "Conseils pour détecter et prévenir les fuites avant qu'elles ne deviennent problématiques.", 
    date: "2026-03-05" 
  },
  { 
    id: 4, 
    titre: "Économiser l'eau au quotidien", 
    categorie: "Plomberie", 
    type: "ecogeste",
    description: "Gestes simples pour réduire votre consommation d'eau et préserver l'environnement.", 
    date: "2026-03-01" 
  },
  { 
    id: 5, 
    titre: "Purger un radiateur", 
    categorie: "Plomberie", 
    type: "tutoriel",
    description: "Étapes détaillées pour purger vos radiateurs et améliorer leur efficacité.", 
    date: "2026-02-28" 
  },
  { 
    id: 6, 
    titre: "Entretien du chauffe-eau", 
    categorie: "Plomberie", 
    type: "prevention",
    description: "Maintenance préventive pour prolonger la durée de vie de votre chauffe-eau.", 
    date: "2026-02-25" 
  },

  // === ÉLECTRICITÉ ===
  { 
    id: 7, 
    titre: "Utiliser le tableau électrique", 
    categorie: "Électricité", 
    type: "tutoriel",
    description: "Guide complet pour comprendre et utiliser votre tableau électrique en toute sécurité.", 
    date: "2026-03-14" 
  },
  { 
    id: 8, 
    titre: "Réinitialiser un disjoncteur", 
    categorie: "Électricité", 
    type: "tutoriel",
    description: "Procédure pas à pas pour réarmer un disjoncteur qui a sauté.", 
    date: "2026-03-12" 
  },
  { 
    id: 9, 
    titre: "Changer une ampoule en sécurité", 
    categorie: "Électricité", 
    type: "tutoriel",
    description: "Consignes de sécurité et méthode pour remplacer vos ampoules sans risque.", 
    date: "2026-03-08" 
  },
  { 
    id: 10, 
    titre: "Réduire sa consommation électrique", 
    categorie: "Électricité", 
    type: "ecogeste",
    description: "Astuces pour diminuer votre facture d'électricité et votre empreinte carbone.", 
    date: "2026-03-04" 
  },
  { 
    id: 11, 
    titre: "Utiliser les multiprises correctement", 
    categorie: "Électricité", 
    type: "prevention",
    description: "Règles de sécurité pour éviter les surcharges et les risques d'incendie.", 
    date: "2026-02-27" 
  },
  { 
    id: 12, 
    titre: "Détecter une installation défectueuse", 
    categorie: "Électricité", 
    type: "prevention",
    description: "Signes d'alerte d'une installation électrique vieillissante ou dangereuse.", 
    date: "2026-02-22" 
  },

  // === CHAUFFAGE ===
  { 
    id: 13, 
    titre: "Entretien de la chaudière", 
    categorie: "Chauffage", 
    type: "tutoriel",
    description: "Procédure d'entretien annuel et consignes de sécurité pour votre chaudière.", 
    date: "2026-03-13" 
  },
  { 
    id: 14, 
    titre: "Régler son thermostat", 
    categorie: "Chauffage", 
    type: "tutoriel",
    description: "Guide pour programmer et optimiser votre thermostat selon vos besoins.", 
    date: "2026-03-09" 
  },
  { 
    id: 15, 
    titre: "Chauffer intelligemment", 
    categorie: "Chauffage", 
    type: "ecogeste",
    description: "Conseils pour chauffer efficacement tout en réduisant votre consommation.", 
    date: "2026-03-06" 
  },
  { 
    id: 16, 
    titre: "Prévenir les pannes de chauffage", 
    categorie: "Chauffage", 
    type: "prevention",
    description: "Vérifications régulières pour éviter les pannes en plein hiver.", 
    date: "2026-03-02" 
  },
  { 
    id: 17, 
    titre: "Améliorer l'isolation thermique", 
    categorie: "Chauffage", 
    type: "ecogeste",
    description: "Gestes simples pour limiter les déperditions de chaleur dans votre logement.", 
    date: "2026-02-26" 
  },
  { 
    id: 18, 
    titre: "Radiateurs : mode d'emploi", 
    categorie: "Chauffage", 
    type: "tutoriel",
    description: "Utilisation optimale de vos radiateurs pour un confort maximal.", 
    date: "2026-02-20" 
  },

  // === VENTILATION ===
  { 
    id: 19, 
    titre: "Nettoyer les grilles de VMC", 
    categorie: "Ventilation", 
    type: "tutoriel",
    description: "Tutoriel pas à pas pour nettoyer efficacement vos grilles de ventilation.", 
    date: "2026-03-11" 
  },
  { 
    id: 20, 
    titre: "Bien aérer son logement", 
    categorie: "Ventilation", 
    type: "ecogeste",
    description: "Bonnes pratiques d'aération pour un air sain sans gaspiller d'énergie.", 
    date: "2026-03-07" 
  },
  { 
    id: 21, 
    titre: "Lutter contre l'humidité", 
    categorie: "Ventilation", 
    type: "prevention",
    description: "Prévenir les problèmes d'humidité et de moisissures grâce à une bonne ventilation.", 
    date: "2026-03-03" 
  },
  { 
    id: 22, 
    titre: "Entretien de la VMC", 
    categorie: "Ventilation", 
    type: "prevention",
    description: "Maintenance régulière de votre système de ventilation mécanique contrôlée.", 
    date: "2026-02-24" 
  },
  { 
    id: 23, 
    titre: "Ventilation et économies d'énergie", 
    categorie: "Ventilation", 
    type: "ecogeste",
    description: "Comment ventiler efficacement sans augmenter votre facture de chauffage.", 
    date: "2026-02-18" 
  },
  { 
    id: 24, 
    titre: "Détecter un problème de VMC", 
    categorie: "Ventilation", 
    type: "prevention",
    description: "Signes d'un dysfonctionnement de votre système de ventilation.", 
    date: "2026-02-15" 
  },

  // === ENTRETIEN ===
  { 
    id: 25, 
    titre: "Détecteur de fumée : test mensuel", 
    categorie: "Entretien", 
    type: "tutoriel",
    description: "Procédure de test et d'entretien de votre détecteur de fumée.", 
    date: "2026-03-16" 
  },
  { 
    id: 26, 
    titre: "Entretien des joints de fenêtres", 
    categorie: "Entretien", 
    type: "tutoriel",
    description: "Comment nettoyer et entretenir les joints pour une meilleure isolation.", 
    date: "2026-03-10" 
  },
  { 
    id: 27, 
    titre: "Tri sélectif et recyclage", 
    categorie: "Entretien", 
    type: "ecogeste",
    description: "Guide complet pour bien trier vos déchets et participer au recyclage.", 
    date: "2026-03-05" 
  },
  { 
    id: 28, 
    titre: "Entretien saisonnier du logement", 
    categorie: "Entretien", 
    type: "prevention",
    description: "Checklist des vérifications à effectuer à chaque changement de saison.", 
    date: "2026-02-28" 
  },
  { 
    id: 29, 
    titre: "Produits ménagers écologiques", 
    categorie: "Entretien", 
    type: "ecogeste",
    description: "Recettes et astuces pour nettoyer votre logement de façon naturelle.", 
    date: "2026-02-23" 
  },
  { 
    id: 30, 
    titre: "Prévenir les nuisibles", 
    categorie: "Entretien", 
    type: "prevention",
    description: "Mesures préventives pour éviter l'apparition d'insectes et de rongeurs.", 
    date: "2026-02-19" 
  },
  { 
    id: 31, 
    titre: "Entretien des sols et revêtements", 
    categorie: "Entretien", 
    type: "tutoriel",
    description: "Conseils adaptés à chaque type de sol pour un entretien optimal.", 
    date: "2026-02-16" 
  },
  { 
    id: 32, 
    titre: "Économies d'eau et d'énergie", 
    categorie: "Entretien", 
    type: "ecogeste",
    description: "Gestes quotidiens pour un logement plus écologique et économique.", 
    date: "2026-02-12" 
  },
];
