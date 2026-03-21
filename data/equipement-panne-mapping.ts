// Mapping entre les aria-label des équipements SVG et les IDs de pannes
export const EQUIPEMENT_TO_PANNE: Record<string, string> = {
  // Cuisine - Nouveaux labels du SVG mis à jour
  "Intensité éclairage LED": "sejour-prise-hs",
  "Température réfrigérateur": "cuisine-plaques-defectueuses",
  "Givre réfrigérateur": "cuisine-plaques-defectueuses",
  "Position réfrigérateur": "cuisine-plaques-defectueuses",
  "Lave-vaissaille et lavage à la main": "cuisine-evier-bouche",
  "Programme Éco": "cuisine-hotte-panne",
  "Casseroles et couverture": "cuisine-plaques-defectueuses",
  "Taille de la casserole": "cuisine-plaques-defectueuses",
  "Four": "cuisine-plaques-defectueuses",
  "Plaques éléctriques": "cuisine-plaques-defectueuses",
  
  // Anciens labels (au cas où)
  "Fuite d'eau": "cuisine-fuite-evier",
  "Mousseur pour robinet": "cuisine-evier-bouche",
  "DPE et étiquettes énergie": "cuisine-plaques-defectueuses",
  "Lavage à 30°C": "cuisine-hotte-panne",
  "Essorage et séchage": "cuisine-hotte-panne",
  
  // Salle de bain
  "Douche et Bain": "sdb-douche-bouchee",
  "Température chauffe-eau": "sdb-chauffe-eau-panne",
  "Aérations": "sdb-moisissures",
  
  // Salon
  "Température recommandée": "sejour-radiateur-froid",
  "Absence prolongée": "sejour-radiateur-froid",
  "Ampoules économes": "sejour-prise-hs",
  "Connexion internet économe": "sejour-prise-hs",
  "Durée usage tablette": "sejour-prise-hs",
  "Consommation TV taille écran": "sejour-prise-hs",
  "Appication EDF & Moi": "sejour-prise-hs",
  "Utilisation climatiseur": "sejour-radiateur-froid",
  
  // Chambre
  "Coût par degré": "sejour-radiateur-froid",
  "Part éclairage consommation": "sejour-prise-hs",
  "Isolation Logement": "sejour-fenetre-bloquee",
  "Consommation ordinateur": "sejour-prise-hs",
  "Aides financières": "sejour-fenetre-bloquee",
  "Économies en arrêtant veille": "sejour-prise-hs",
};
