-- ============================================
-- SCRIPT D'INITIALISATION DES DONNÉES DE BASE
-- À exécuter en premier dans Supabase SQL Editor
-- ============================================

-- 1. Créer le bailleur principal
INSERT INTO bailleurs (id, nom, couleur_primaire, couleur_secondaire, actif) 
VALUES (1, 'Périgord Habitat', '#4F46E5', '#818CF8', TRUE)
ON CONFLICT (id) DO UPDATE SET
    nom = EXCLUDED.nom,
    couleur_primaire = EXCLUDED.couleur_primaire,
    couleur_secondaire = EXCLUDED.couleur_secondaire,
    actif = EXCLUDED.actif;

-- 2. Créer l'agence principale
INSERT INTO agences (id, bailleur_id, nom, adresse, telephone, email, horaires, actif)
VALUES (1, 1, 'Agence Périgueux Centre', '15 Rue de la République, 24000 Périgueux', '05 53 XX XX XX', 'contact@perigord-habitat.fr', 'Lun-Ven: 9h-12h / 14h-17h', TRUE)
ON CONFLICT (id) DO UPDATE SET
    bailleur_id = EXCLUDED.bailleur_id,
    nom = EXCLUDED.nom,
    adresse = EXCLUDED.adresse,
    telephone = EXCLUDED.telephone,
    email = EXCLUDED.email,
    horaires = EXCLUDED.horaires,
    actif = EXCLUDED.actif;

-- 3. Créer un code d'accès
INSERT INTO codes_acces (id, bailleur_id, code, description, actif)
VALUES (1, 1, 'PH2024-001', 'Code pour nouveaux locataires 2024', TRUE)
ON CONFLICT (id) DO UPDATE SET
    bailleur_id = EXCLUDED.bailleur_id,
    code = EXCLUDED.code,
    description = EXCLUDED.description,
    actif = EXCLUDED.actif;

-- 4. Créer des logements
INSERT INTO logements (id, bailleur_id, agence_id, reference, adresse, type_logement)
VALUES 
(1, 1, 1, 'LOG-001', '12 Avenue Georges Pompidou, 24000 Périgueux', 'T3'),
(2, 1, 1, 'LOG-002', '8 Rue Victor Hugo, 24000 Périgueux', 'T2'),
(3, 1, 1, 'LOG-003', '25 Boulevard Montaigne, 24000 Périgueux', 'T4')
ON CONFLICT (id) DO UPDATE SET
    bailleur_id = EXCLUDED.bailleur_id,
    agence_id = EXCLUDED.agence_id,
    reference = EXCLUDED.reference,
    adresse = EXCLUDED.adresse,
    type_logement = EXCLUDED.type_logement;

-- 5. Créer les pièces
INSERT INTO pieces (id, nom, description)
VALUES 
(1, 'Cuisine', 'Espace de préparation des repas'),
(2, 'Salle de bain', 'Salle d''eau avec douche ou baignoire'),
(3, 'Chambre', 'Chambre à coucher'),
(4, 'Salon', 'Pièce de vie principale'),
(5, 'WC', 'Toilettes'),
(6, 'Entrée', 'Hall d''entrée'),
(7, 'Buanderie', 'Espace pour le linge')
ON CONFLICT (id) DO UPDATE SET
    nom = EXCLUDED.nom,
    description = EXCLUDED.description;

-- 6. Créer quelques équipements de base
INSERT INTO equipements (id, piece_id, nom, description, sous_contrat)
VALUES 
(1, 1, 'Évier', 'Évier de cuisine avec robinetterie', FALSE),
(2, 1, 'Plaques de cuisson', 'Plaques électriques ou gaz', FALSE),
(3, 1, 'Four', 'Four encastrable', FALSE),
(4, 1, 'Hotte aspirante', 'Hotte de cuisine', FALSE),
(5, 2, 'Douche', 'Cabine de douche', FALSE),
(6, 2, 'Lavabo', 'Lavabo avec robinetterie', FALSE),
(7, 2, 'Chauffe-eau', 'Chauffe-eau électrique', TRUE),
(8, 3, 'Radiateur', 'Radiateur électrique', FALSE),
(9, 3, 'Fenêtre', 'Fenêtre double vitrage', FALSE),
(10, 5, 'WC', 'Toilettes', FALSE)
ON CONFLICT (id) DO UPDATE SET
    piece_id = EXCLUDED.piece_id,
    nom = EXCLUDED.nom,
    description = EXCLUDED.description,
    sous_contrat = EXCLUDED.sous_contrat;

-- Vérification
SELECT 'Bailleurs' as table_name, COUNT(*) as count FROM bailleurs
UNION ALL
SELECT 'Agences', COUNT(*) FROM agences
UNION ALL
SELECT 'Codes d''accès', COUNT(*) FROM codes_acces
UNION ALL
SELECT 'Logements', COUNT(*) FROM logements
UNION ALL
SELECT 'Pièces', COUNT(*) FROM pieces
UNION ALL
SELECT 'Équipements', COUNT(*) FROM equipements;

-- Message de succès
SELECT 'Données de base initialisées avec succès !' as message;
