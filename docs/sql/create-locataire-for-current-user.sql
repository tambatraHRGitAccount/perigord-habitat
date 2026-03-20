-- ============================================
-- CRÉER UN LOCATAIRE POUR L'UTILISATEUR CONNECTÉ
-- ============================================
-- Ce script crée automatiquement un locataire pour l'utilisateur actuellement connecté
-- Exécutez ce script dans Supabase SQL Editor en étant connecté avec votre compte

-- 1. Vérifier l'utilisateur connecté
SELECT 
    auth.uid() as user_id,
    auth.email() as email;

-- 2. Créer le locataire pour l'utilisateur connecté
INSERT INTO locataires (
    user_id, 
    bailleur_id, 
    logement_id, 
    code_acces_id, 
    nom, 
    prenom, 
    telephone, 
    actif
)
VALUES (
    auth.uid(),  -- UUID de l'utilisateur connecté
    1,           -- ID du bailleur (Périgord Habitat)
    1,           -- ID du logement (LOG-001)
    1,           -- ID du code d'accès
    'Utilisateur',  -- Nom (à personnaliser)
    'Test',         -- Prénom (à personnaliser)
    '06 12 34 56 78',  -- Téléphone
    TRUE
)
ON CONFLICT (user_id) DO UPDATE SET
    bailleur_id = EXCLUDED.bailleur_id,
    logement_id = EXCLUDED.logement_id,
    code_acces_id = EXCLUDED.code_acces_id,
    nom = EXCLUDED.nom,
    prenom = EXCLUDED.prenom,
    telephone = EXCLUDED.telephone,
    actif = EXCLUDED.actif;

-- 3. Vérifier que le locataire a été créé
SELECT 
    l.id,
    l.user_id,
    l.nom,
    l.prenom,
    l.bailleur_id,
    l.logement_id,
    log.reference as logement_reference,
    log.adresse as logement_adresse
FROM locataires l
LEFT JOIN logements log ON l.logement_id = log.id
WHERE l.user_id = auth.uid();

-- 4. Créer quelques incidents pour cet utilisateur
INSERT INTO incidents (
    bailleur_id, 
    locataire_id, 
    logement_id, 
    titre, 
    description, 
    statut, 
    priorite, 
    piece
)
SELECT 
    1,  -- bailleur_id
    l.id,  -- locataire_id
    l.logement_id,  -- logement_id
    titre,
    description,
    statut,
    priorite,
    piece
FROM locataires l,
(VALUES 
    ('Fuite sous l''évier de la cuisine', 'J''ai remarqué une fuite d''eau sous l''évier depuis ce matin. L''eau s''accumule dans le placard sous l''évier.', 'nouveau', 'haute', 'Cuisine'),
    ('Radiateur chambre ne chauffe pas', 'Le radiateur de la chambre principale reste froid même quand le chauffage est allumé. La pièce est très froide.', 'en_cours', 'haute', 'Chambre'),
    ('Ampoule grillée dans l''entrée', 'L''ampoule du plafonnier de l''entrée est grillée depuis hier soir.', 'nouveau', 'basse', 'Entrée'),
    ('Porte de placard cassée', 'La porte du placard de la cuisine ne ferme plus correctement, la charnière supérieure est cassée.', 'resolu', 'normale', 'Cuisine'),
    ('Fenêtre du salon difficile à fermer', 'La fenêtre du salon est difficile à fermer, il faut forcer. Le mécanisme semble bloqué.', 'nouveau', 'normale', 'Salon'),
    ('WC qui fuit', 'Le réservoir des WC fuit légèrement, on entend l''eau couler en permanence.', 'en_diagnostic', 'normale', 'WC'),
    ('Hotte aspirante bruyante', 'La hotte de la cuisine fait un bruit anormal depuis quelques jours.', 'nouveau', 'basse', 'Cuisine')
) AS incidents(titre, description, statut, priorite, piece)
WHERE l.user_id = auth.uid()
ON CONFLICT DO NOTHING;

-- 5. Vérifier les incidents créés
SELECT 
    i.id,
    i.titre,
    i.statut,
    i.priorite,
    i.piece,
    i.date_creation
FROM incidents i
JOIN locataires l ON i.locataire_id = l.id
WHERE l.user_id = auth.uid()
ORDER BY i.date_creation DESC;
