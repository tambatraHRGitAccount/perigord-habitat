-- ============================================
-- QUICK START - DÉMARRAGE RAPIDE
-- ============================================
-- Copiez et exécutez ce script dans Supabase SQL Editor
-- Vous devez être CONNECTÉ à l'application avant d'exécuter ce script
-- ============================================

-- ÉTAPE 1: Créer les données de base (bailleurs, logements, pièces)
INSERT INTO bailleurs (id, nom, couleur_primaire, couleur_secondaire, actif) 
VALUES (1, 'Périgord Habitat', '#4F46E5', '#818CF8', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO agences (id, bailleur_id, nom, adresse, telephone, email, actif)
VALUES (1, 1, 'Agence Périgueux', '15 Rue de la République, 24000 Périgueux', '05 53 XX XX XX', 'contact@perigord-habitat.fr', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO codes_acces (id, bailleur_id, code, description, actif)
VALUES (1, 1, 'PH2024-001', 'Code nouveaux locataires', TRUE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO logements (id, bailleur_id, agence_id, reference, adresse, type_logement)
VALUES (1, 1, 1, 'LOG-001', '12 Avenue Georges Pompidou, 24000 Périgueux', 'T3')
ON CONFLICT (id) DO NOTHING;

INSERT INTO pieces (id, nom, description) VALUES 
(1, 'Cuisine', 'Espace de préparation des repas'),
(2, 'Salle de bain', 'Salle d''eau'),
(3, 'Chambre', 'Chambre à coucher'),
(4, 'Salon', 'Pièce de vie'),
(5, 'WC', 'Toilettes'),
(6, 'Entrée', 'Hall d''entrée')
ON CONFLICT (id) DO NOTHING;

-- ÉTAPE 2: Créer votre profil locataire
INSERT INTO locataires (user_id, bailleur_id, logement_id, code_acces_id, nom, prenom, telephone, actif)
VALUES (auth.uid(), 1, 1, 1, 'Utilisateur', 'Test', '06 12 34 56 78', TRUE)
ON CONFLICT (user_id) DO UPDATE SET
    bailleur_id = 1,
    logement_id = 1,
    actif = TRUE;

-- ÉTAPE 3: Créer des incidents exemples
INSERT INTO incidents (bailleur_id, locataire_id, logement_id, titre, description, statut, priorite, piece)
SELECT 
    1,
    l.id,
    l.logement_id,
    titre,
    description,
    statut,
    priorite,
    piece
FROM locataires l,
(VALUES 
    ('Fuite sous l''évier', 'Fuite d''eau sous l''évier de la cuisine', 'nouveau', 'haute', 'Cuisine'),
    ('Radiateur ne chauffe pas', 'Le radiateur de la chambre reste froid', 'en_cours', 'haute', 'Chambre'),
    ('Ampoule grillée', 'Ampoule du plafonnier grillée', 'nouveau', 'basse', 'Entrée'),
    ('Porte cassée', 'Porte du placard ne ferme plus', 'resolu', 'normale', 'Cuisine'),
    ('Fenêtre bloquée', 'Fenêtre difficile à fermer', 'nouveau', 'normale', 'Salon')
) AS incidents(titre, description, statut, priorite, piece)
WHERE l.user_id = auth.uid()
ON CONFLICT DO NOTHING;

-- VÉRIFICATION
SELECT 
    '✅ Configuration terminée!' as message,
    l.nom || ' ' || l.prenom as votre_nom,
    log.reference as votre_logement,
    COUNT(i.id) as nombre_incidents
FROM locataires l
LEFT JOIN logements log ON l.logement_id = log.id
LEFT JOIN incidents i ON i.locataire_id = l.id
WHERE l.user_id = auth.uid()
GROUP BY l.nom, l.prenom, log.reference;

-- ============================================
-- C'EST TOUT! Allez sur /client/incidents
-- ============================================
