import type { Materiel, Piece } from "@/types/materiel";

export const PIECES: Piece[] = [
  "Tous",
  "Cuisine",
  "Salle de bain",
  "Chambre",
  "Salon",
  "WC",
  "Entrée",
  "Buanderie",
];

export const RESPONSABLE_COLORS: Record<string, string> = {
  Propriétaire: "bg-blue-100 text-blue-700",
  Locataire: "bg-orange-100 text-orange-700",
  Partagé: "bg-purple-100 text-purple-700",
};

export const MATERIELS: Materiel[] = [
  { id: 1,  nom: "Chaudière",            piece: "Cuisine",      responsable: "Propriétaire", description: "Entretien annuel obligatoire à la charge du propriétaire.",                                                    emoji: "🔥" },
  { id: 2,  nom: "Robinetterie évier",   piece: "Cuisine",      responsable: "Locataire",    description: "Remplacement des joints et petites réparations à la charge du locataire.",                                    emoji: "🚿" },
  { id: 3,  nom: "Hotte aspirante",      piece: "Cuisine",      responsable: "Propriétaire", description: "Réparation ou remplacement si panne non liée à un mauvais usage.",                                           emoji: "💨" },
  { id: 4,  nom: "Plaques de cuisson",   piece: "Cuisine",      responsable: "Propriétaire", description: "Fourni par le propriétaire si logement meublé.",                                                              emoji: "🍳" },
  { id: 5,  nom: "Réfrigérateur",        piece: "Cuisine",      responsable: "Propriétaire", description: "Entretien courant (dégivrage) à la charge du locataire.",                                                     emoji: "🧊" },
  { id: 6,  nom: "Évier",               piece: "Cuisine",      responsable: "Partagé",      description: "Débouchage : locataire. Fuite de canalisation encastrée : propriétaire.",                                     emoji: "🪣" },
  { id: 7,  nom: "Baignoire / Douche",   piece: "Salle de bain", responsable: "Propriétaire", description: "Remplacement si vétusté, joints à la charge du locataire.",                                                 emoji: "🛁" },
  { id: 8,  nom: "Robinetterie lavabo",  piece: "Salle de bain", responsable: "Locataire",    description: "Joints, aérateurs et petites réparations à la charge du locataire.",                                        emoji: "🚰" },
  { id: 9,  nom: "Chauffe-eau",          piece: "Salle de bain", responsable: "Propriétaire", description: "Entretien et remplacement à la charge du propriétaire.",                                                    emoji: "♨️" },
  { id: 10, nom: "Miroir",               piece: "Salle de bain", responsable: "Locataire",    description: "Remplacement si bris accidentel à la charge du locataire.",                                                 emoji: "🪞" },
  { id: 11, nom: "Ventilation (VMC)",    piece: "Salle de bain", responsable: "Partagé",      description: "Nettoyage des grilles : locataire. Réparation moteur : propriétaire.",                                      emoji: "🌀" },
  { id: 12, nom: "WC / Chasse d'eau",   piece: "WC",           responsable: "Partagé",      description: "Mécanisme de chasse : locataire. Fuite encastrée : propriétaire.",                                           emoji: "🚽" },
  { id: 13, nom: "Abattant WC",          piece: "WC",           responsable: "Locataire",    description: "Remplacement à la charge du locataire.",                                                                      emoji: "🪠" },
  { id: 14, nom: "Radiateur",            piece: "Chambre",      responsable: "Propriétaire", description: "Purge : locataire. Remplacement : propriétaire.",                                                             emoji: "🌡️" },
  { id: 15, nom: "Volets / Stores",      piece: "Chambre",      responsable: "Partagé",      description: "Lames cassées par usure : propriétaire. Mauvais usage : locataire.",                                         emoji: "🪟" },
  { id: 16, nom: "Serrure de porte",     piece: "Chambre",      responsable: "Partagé",      description: "Perte de clé : locataire. Vétusté : propriétaire.",                                                          emoji: "🔐" },
  { id: 17, nom: "Parquet / Sol",        piece: "Chambre",      responsable: "Propriétaire", description: "Usure normale : propriétaire. Dégradation : locataire.",                                                     emoji: "🪵" },
  { id: 18, nom: "Interphone / Digicode",piece: "Entrée",       responsable: "Propriétaire", description: "Réparation et remplacement à la charge du propriétaire.",                                                    emoji: "📟" },
  { id: 19, nom: "Boîte aux lettres",    piece: "Entrée",       responsable: "Propriétaire", description: "Fournie et entretenue par le propriétaire.",                                                                  emoji: "📬" },
  { id: 20, nom: "Tableau électrique",   piece: "Salon",        responsable: "Propriétaire", description: "Mise aux normes et réparations à la charge du propriétaire.",                                                emoji: "⚡" },
  { id: 21, nom: "Prises électriques",   piece: "Salon",        responsable: "Propriétaire", description: "Remplacement si défaillance à la charge du propriétaire.",                                                   emoji: "🔌" },
  { id: 22, nom: "Détecteur de fumée",   piece: "Salon",        responsable: "Propriétaire", description: "Installation obligatoire par le propriétaire, entretien courant par le locataire.",                          emoji: "🔔" },
  { id: 23, nom: "Machine à laver",      piece: "Buanderie",    responsable: "Propriétaire", description: "Si fournie dans le logement meublé, entretien courant au locataire.",                                        emoji: "🫧" },
  { id: 24, nom: "Sèche-linge",          piece: "Buanderie",    responsable: "Propriétaire", description: "Nettoyage filtre à la charge du locataire.",                                                                  emoji: "🌬️" },
];
