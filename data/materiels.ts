import type { Materiel, Piece } from "@/types/materiel";

export const PIECE_IMAGES: Record<Exclude<Piece, "Tous">, string> = {
  "Salle de séjour": "/images/house.img/sallon.jpg",
  "Cuisine":         "/images/house.img/cuisine.jpg",
  "Salle de bain":   "/images/house.img/bain.jpg",
  "Extérieur":       "/images/house.img/exterieur.jpg",
};

export const PIECES: Piece[] = [
  "Tous",
  "Salle de séjour",
  "Cuisine",
  "Salle de bain",
  "Extérieur",
];

export const RESPONSABLE_COLORS: Record<string, string> = {
  Propriétaire: "bg-blue-100 text-blue-700",
  Locataire: "bg-orange-100 text-orange-700",
  Partagé: "bg-purple-100 text-purple-700",
};

export const MATERIELS: Materiel[] = [
  // ── Cuisine ──
  { id: 1,  nom: "Chaudière",             piece: "Cuisine",         responsable: "Propriétaire", description: "Entretien annuel obligatoire à la charge du propriétaire.",                                             emoji: "🔥" },
  { id: 2,  nom: "Robinetterie évier",    piece: "Cuisine",         responsable: "Locataire",    description: "Remplacement des joints et petites réparations à la charge du locataire.",                             emoji: "🚿" },
  { id: 3,  nom: "Hotte aspirante",       piece: "Cuisine",         responsable: "Propriétaire", description: "Réparation ou remplacement si panne non liée à un mauvais usage.",                                    emoji: "💨" },
  { id: 4,  nom: "Plaques de cuisson",    piece: "Cuisine",         responsable: "Propriétaire", description: "Fourni par le propriétaire si logement meublé.",                                                       emoji: "🍳" },
  { id: 5,  nom: "Réfrigérateur",         piece: "Cuisine",         responsable: "Propriétaire", description: "Entretien courant (dégivrage) à la charge du locataire.",                                              emoji: "🧊" },
  { id: 6,  nom: "Évier",                piece: "Cuisine",         responsable: "Partagé",      description: "Débouchage : locataire. Fuite de canalisation encastrée : propriétaire.",                              emoji: "🪣" },
  // ── Salle de bain ──
  { id: 7,  nom: "Baignoire / Douche",    piece: "Salle de bain",   responsable: "Propriétaire", description: "Remplacement si vétusté, joints à la charge du locataire.",                                           emoji: "🛁" },
  { id: 8,  nom: "Robinetterie lavabo",   piece: "Salle de bain",   responsable: "Locataire",    description: "Joints, aérateurs et petites réparations à la charge du locataire.",                                  emoji: "🚰" },
  { id: 9,  nom: "Chauffe-eau",           piece: "Salle de bain",   responsable: "Propriétaire", description: "Entretien et remplacement à la charge du propriétaire.",                                              emoji: "♨️" },
  { id: 10, nom: "Miroir",                piece: "Salle de bain",   responsable: "Locataire",    description: "Remplacement si bris accidentel à la charge du locataire.",                                           emoji: "🪞" },
  { id: 11, nom: "Ventilation (VMC)",     piece: "Salle de bain",   responsable: "Partagé",      description: "Nettoyage des grilles : locataire. Réparation moteur : propriétaire.",                                emoji: "🌀" },
  { id: 12, nom: "WC / Chasse d'eau",    piece: "Salle de bain",   responsable: "Partagé",      description: "Mécanisme de chasse : locataire. Fuite encastrée : propriétaire.",                                    emoji: "🚽" },
  { id: 13, nom: "Abattant WC",           piece: "Salle de bain",   responsable: "Locataire",    description: "Remplacement à la charge du locataire.",                                                               emoji: "🪠" },
  // ── Salle de séjour ──
  { id: 14, nom: "Radiateur",             piece: "Salle de séjour", responsable: "Propriétaire", description: "Purge : locataire. Remplacement : propriétaire.",                                                     emoji: "🌡️" },
  { id: 15, nom: "Volets / Stores",       piece: "Salle de séjour", responsable: "Partagé",      description: "Lames cassées par usure : propriétaire. Mauvais usage : locataire.",                                  emoji: "🪟" },
  { id: 16, nom: "Serrure de porte",      piece: "Salle de séjour", responsable: "Partagé",      description: "Perte de clé : locataire. Vétusté : propriétaire.",                                                   emoji: "🔐" },
  { id: 17, nom: "Parquet / Sol",         piece: "Salle de séjour", responsable: "Propriétaire", description: "Usure normale : propriétaire. Dégradation : locataire.",                                              emoji: "🪵" },
  { id: 18, nom: "Tableau électrique",    piece: "Salle de séjour", responsable: "Propriétaire", description: "Mise aux normes et réparations à la charge du propriétaire.",                                         emoji: "⚡" },
  { id: 19, nom: "Prises électriques",    piece: "Salle de séjour", responsable: "Propriétaire", description: "Remplacement si défaillance à la charge du propriétaire.",                                            emoji: "🔌" },
  { id: 20, nom: "Détecteur de fumée",    piece: "Salle de séjour", responsable: "Propriétaire", description: "Installation obligatoire par le propriétaire, entretien courant par le locataire.",                   emoji: "🔔" },
  { id: 21, nom: "Machine à laver",       piece: "Salle de séjour", responsable: "Propriétaire", description: "Si fournie dans le logement meublé, entretien courant au locataire.",                                 emoji: "🫧" },
  { id: 22, nom: "Sèche-linge",           piece: "Salle de séjour", responsable: "Propriétaire", description: "Nettoyage filtre à la charge du locataire.",                                                          emoji: "🌬️" },
  // ── Extérieur ──
  { id: 23, nom: "Interphone / Digicode", piece: "Extérieur",       responsable: "Propriétaire", description: "Réparation et remplacement à la charge du propriétaire.",                                             emoji: "📟" },
  { id: 24, nom: "Boîte aux lettres",     piece: "Extérieur",       responsable: "Propriétaire", description: "Fournie et entretenue par le propriétaire.",                                                          emoji: "📬" },
  { id: 25, nom: "Portail / Portillon",   piece: "Extérieur",       responsable: "Propriétaire", description: "Entretien et réparation à la charge du propriétaire.",                                                emoji: "🚪" },
  { id: 26, nom: "Jardin / Espaces verts",piece: "Extérieur",       responsable: "Locataire",    description: "Entretien courant du jardin (tonte, taille) à la charge du locataire.",                               emoji: "🌿" },
];
