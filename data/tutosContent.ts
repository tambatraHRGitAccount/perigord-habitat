export interface TutoContent {
  id: number;
  duree?: string;
  difficulte?: string;
  introduction?: string;
  materiel?: string[];
  etapes?: {
    titre: string;
    description: string;
    sousEtapes?: string[];
  }[];
  ecogestes?: string[];
  prevention?: string[];
  securite?: string[];
  astuces?: string[];
  quandAppeler?: string[];
}

const TUTOS_CONTENT: Record<number, TutoContent> = {
  // PLOMBERIE
  1: {
    id: 1,
    duree: "15-30 minutes",
    difficulte: "Facile",
    introduction: "Un bouchon dans les canalisations peut rapidement devenir problématique. Voici des méthodes naturelles et efficaces pour déboucher vos canalisations sans produits chimiques agressifs.",
    materiel: [
      "Ventouse",
      "Bicarbonate de soude (1/2 tasse)",
      "Vinaigre blanc (1/2 tasse)",
      "Eau bouillante",
      "Gants de protection",
      "Seau"
    ],
    etapes: [
      {
        titre: "Méthode naturelle (à essayer en premier)",
        description: "Cette méthode écologique est efficace pour les bouchons légers.",
        sousEtapes: [
          "Versez 1/2 tasse de bicarbonate de soude dans la canalisation",
          "Ajoutez 1/2 tasse de vinaigre blanc",
          "Laissez agir 30 minutes (la réaction chimique va dissoudre le bouchon)",
          "Versez de l'eau bouillante pour rincer"
        ]
      },
      {
        titre: "Méthode à la ventouse",
        description: "Si la méthode naturelle ne suffit pas, utilisez une ventouse.",
        sousEtapes: [
          "Remplissez l'évier d'eau (5-10 cm de hauteur)",
          "Placez la ventouse sur l'évacuation en la couvrant complètement",
          "Effectuez des mouvements de va-et-vient vigoureux pendant 20-30 secondes",
          "Répétez l'opération 5-10 fois si nécessaire",
          "Retirez la ventouse d'un coup sec"
        ]
      }
    ],
    ecogestes: [
      "Utilisez du vinaigre blanc et du bicarbonate plutôt que des produits chimiques",
      "Faites ce traitement préventif 1 fois par mois",
      "L'eau bouillante seule peut suffire pour l'entretien régulier",
      "Le marc de café aide à désodoriser les canalisations"
    ],
    prevention: [
      "Ne jetez jamais de graisse dans l'évier",
      "Utilisez une grille de protection sur l'évacuation",
      "Nettoyez régulièrement avec du vinaigre blanc",
      "Évitez les cheveux dans les canalisations de douche",
      "Versez de l'eau bouillante une fois par semaine"
    ],
    securite: [
      "Portez des gants de protection",
      "Ne mélangez jamais différents produits chimiques",
      "Aérez bien la pièce pendant l'opération",
      "En cas d'échec répété, contactez un professionnel"
    ],
    astuces: [
      "Pour les bouchons tenaces, laissez agir toute la nuit",
      "Un cintre déplié peut aider à retirer les cheveux",
      "Le sel et le bicarbonate ensemble sont très efficaces"
    ],
    quandAppeler: [
      "Le bouchon persiste après plusieurs tentatives",
      "L'eau remonte dans d'autres évacuations",
      "Odeurs nauséabondes persistantes",
      "Plusieurs canalisations bouchées simultanément"
    ]
  }
};

export function getTutoContent(id: number): TutoContent {
  return TUTOS_CONTENT[id] || {
    id,
    introduction: "Contenu en cours de rédaction. Revenez bientôt pour plus de détails !",
    ecogestes: ["Ce tutoriel sera bientôt disponible avec des instructions détaillées."],
    prevention: ["Contenu à venir."],
    etapes: []
  };
}
