-- ============================================
-- INSERTION DE DONNÉES RÉELLES
-- ============================================

-- 1. Insérer un bailleur
INSERT INTO bailleurs (nom, couleur_primaire, couleur_secondaire, actif) 
VALUES 
('Périgord Habitat', '#4F46E5', '#818CF8', TRUE)
ON CONFLICT DO NOTHING;

-- 2. Insérer une agence
INSERT INTO agences (bailleur_id, nom, adresse, telephone, email, horaires, actif)
VALUES 
(1, 'Agence Périgueux Centre', '15 Rue de la République, 24000 Périgueux', '05 53 XX XX XX', 'contact@perigord-habitat.fr', 'Lun-Ven: 9h-12h / 14h-17h', TRUE)
ON CONFLICT DO NOTHING;

-- 3. Insérer des codes d'accès
INSERT INTO codes_acces (bailleur_id, code, description, actif)
VALUES 
(1, 'PH2024-001', 'Code pour nouveaux locataires 2024', TRUE),
(1, 'PH2024-002', 'Code pour renouvellement bail', TRUE)
ON CONFLICT (code) DO NOTHING;

-- 4. Insérer des logements
INSERT INTO logements (bailleur_id, agence_id, reference, adresse, type_logement)
VALUES 
(1, 1, 'LOG-001', '12 Avenue Georges Pompidou, 24000 Périgueux', 'T3'),
(1, 1, 'LOG-002', '8 Rue Victor Hugo, 24000 Périgueux', 'T2'),
(1, 1, 'LOG-003', '25 Boulevard Montaigne, 24000 Périgueux', 'T4'),
(1, 1, 'LOG-004', '5 Place du Coderc, 24000 Périgueux', 'T1'),
(1, 1, 'LOG-005', '18 Rue Taillefer, 24000 Périgueux', 'T3')
ON CONFLICT (bailleur_id, reference) DO NOTHING;

-- 5. Insérer des pièces
INSERT INTO pieces (nom, description, icone_url)
VALUES 
('Cuisine', 'Espace de préparation des repas', NULL),
('Salle de bain', 'Salle d''eau avec douche ou baignoire', NULL),
('Chambre', 'Chambre à coucher', NULL),
('Salon', 'Pièce de vie principale', NULL),
('WC', 'Toilettes', NULL),
('Entrée', 'Hall d''entrée', NULL),
('Buanderie', 'Espace pour le linge', NULL)
ON CONFLICT DO NOTHING;

-- 6. Insérer des équipements
INSERT INTO equipements (piece_id, nom, description, sous_contrat)
VALUES 
-- Cuisine
(1, 'Évier', 'Évier de cuisine avec robinetterie', FALSE),
(1, 'Plaques de cuisson', 'Plaques électriques ou gaz', FALSE),
(1, 'Four', 'Four encastrable', FALSE),
(1, 'Hotte aspirante', 'Hotte de cuisine', FALSE),
(1, 'Réfrigérateur', 'Réfrigérateur fourni', TRUE),
(1, 'Lave-vaisselle', 'Lave-vaisselle intégré', TRUE),

-- Salle de bain
(2, 'Douche', 'Cabine de douche', FALSE),
(2, 'Baignoire', 'Baignoire standard', FALSE),
(2, 'Lavabo', 'Lavabo avec robinetterie', FALSE),
(2, 'WC', 'Toilettes dans salle de bain', FALSE),
(2, 'Chauffe-eau', 'Chauffe-eau électrique', TRUE),
(2, 'VMC', 'Ventilation mécanique contrôlée', TRUE),

-- Chambre
(3, 'Radiateur', 'Radiateur électrique', FALSE),
(3, 'Volets', 'Volets roulants', FALSE),
(3, 'Fenêtre', 'Fenêtre double vitrage', FALSE),

-- Salon
(4, 'Radiateur', 'Radiateur électrique', FALSE),
(4, 'Fenêtre', 'Fenêtre double vitrage', FALSE),
(4, 'Volets', 'Volets roulants', FALSE),

-- WC
(5, 'WC', 'Toilettes séparées', FALSE),
(5, 'Lavabo', 'Lave-mains', FALSE),

-- Entrée
(6, 'Porte d''entrée', 'Porte blindée', FALSE),
(6, 'Interphone', 'Interphone vidéo', FALSE),

-- Buanderie
(7, 'Lave-linge', 'Machine à laver fournie', TRUE),
(7, 'Sèche-linge', 'Sèche-linge fourni', TRUE)
ON CONFLICT DO NOTHING;

-- 7. Insérer des pannes courantes
INSERT INTO pannes (equipement_id, titre, description, categorie, responsable, qui_paie, reference_juridique)
VALUES 
-- Évier
(1, 'Fuite sous l''évier', 'Fuite d''eau au niveau du siphon ou des raccords', 'plomberie', 'bailleur', 'bailleur', 'Article 6 loi du 6 juillet 1989'),
(1, 'Évier bouché', 'Évacuation lente ou bouchée', 'plomberie', 'locataire', 'locataire', 'Entretien courant'),
(1, 'Robinet qui goutte', 'Robinet défectueux', 'plomberie', 'bailleur', 'bailleur', 'Article 6 loi du 6 juillet 1989'),

-- Plaques de cuisson
(2, 'Plaque ne chauffe plus', 'Une ou plusieurs plaques ne fonctionnent plus', 'electricite', 'bailleur', 'bailleur', 'Article 6 loi du 6 juillet 1989'),

-- Chauffe-eau
(11, 'Pas d''eau chaude', 'Chauffe-eau ne produit plus d''eau chaude', 'plomberie', 'contrat', 'bailleur', 'Contrat d''entretien'),
(11, 'Fuite chauffe-eau', 'Fuite au niveau du chauffe-eau', 'plomberie', 'bailleur', 'bailleur', 'Article 6 loi du 6 juillet 1989'),

-- Radiateur
(13, 'Radiateur ne chauffe pas', 'Radiateur froid malgré le chauffage allumé', 'chauffage', 'bailleur', 'bailleur', 'Article 6 loi du 6 juillet 1989'),
(13, 'Radiateur fait du bruit', 'Bruits anormaux dans le radiateur', 'chauffage', 'bailleur', 'bailleur', 'Article 6 loi du 6 juillet 1989'),

-- Fenêtre
(15, 'Fenêtre ne ferme plus', 'Problème de fermeture de fenêtre', 'fenetres', 'bailleur', 'bailleur', 'Article 6 loi du 6 juillet 1989'),
(15, 'Vitre cassée', 'Vitre brisée', 'fenetres', 'a_verifier', 'locataire', 'Dépend des circonstances'),

-- WC
(10, 'WC bouché', 'Toilettes bouchées', 'plomberie', 'locataire', 'locataire', 'Entretien courant'),
(10, 'Fuite WC', 'Fuite au niveau du réservoir ou de la cuvette', 'plomberie', 'bailleur', 'bailleur', 'Article 6 loi du 6 juillet 1989'),
(10, 'Chasse d''eau ne fonctionne pas', 'Mécanisme de chasse défectueux', 'plomberie', 'bailleur', 'bailleur', 'Article 6 loi du 6 juillet 1989')
ON CONFLICT DO NOTHING;

-- ============================================
-- IMPORTANT: CRÉER UN LOCATAIRE POUR L'UTILISATEUR CONNECTÉ
-- ============================================
-- Cette requête doit être exécutée APRÈS la création d'un compte utilisateur
-- Remplacez 'USER_UUID_ICI' par l'UUID réel de l'utilisateur depuis auth.users

-- Exemple pour créer un locataire (à adapter avec le vrai user_id):
-- INSERT INTO locataires (user_id, bailleur_id, logement_id, code_acces_id, nom, prenom, telephone, actif)
-- VALUES 
-- ('USER_UUID_ICI', 1, 1, 1, 'Dupont', 'Marie', '06 12 34 56 78', TRUE);

-- ============================================
-- SCRIPT POUR RÉCUPÉRER L'UUID DE L'UTILISATEUR CONNECTÉ
-- ============================================
-- Exécutez cette requête dans Supabase SQL Editor pour voir les utilisateurs:
-- SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 10;

-- ============================================
-- INSÉRER DES INCIDENTS EXEMPLES (après avoir créé le locataire)
-- ============================================
-- Remplacez les IDs par les vrais IDs de votre base

-- INSERT INTO incidents (bailleur_id, locataire_id, logement_id, titre, description, statut, priorite, piece)
-- VALUES 
-- (1, 1, 1, 'Fuite sous l''évier de la cuisine', 'J''ai remarqué une fuite d''eau sous l''évier depuis ce matin. L''eau s''accumule dans le placard.', 'nouveau', 'haute', 'Cuisine'),
-- (1, 1, 1, 'Radiateur chambre ne chauffe pas', 'Le radiateur de la chambre principale reste froid même quand le chauffage est allumé.', 'en_cours', 'haute', 'Chambre'),
-- (1, 1, 1, 'Ampoule grillée dans l''entrée', 'L''ampoule du plafonnier de l''entrée est grillée.', 'nouveau', 'basse', 'Entrée'),
-- (1, 1, 1, 'Porte de placard cassée', 'La porte du placard de la cuisine ne ferme plus correctement, la charnière est cassée.', 'resolu', 'normale', 'Cuisine'),
-- (1, 1, 1, 'Fenêtre du salon difficile à fermer', 'La fenêtre du salon est difficile à fermer, il faut forcer.', 'nouveau', 'normale', 'Salon');
