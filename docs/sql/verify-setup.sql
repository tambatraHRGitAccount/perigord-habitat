-- ============================================
-- SCRIPT DE VÉRIFICATION DE LA CONFIGURATION
-- Exécutez ce script pour vérifier que tout est bien configuré
-- ============================================

-- 1. Vérifier les données de base
SELECT '=== DONNÉES DE BASE ===' as section;

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

-- 2. Vérifier l'utilisateur connecté
SELECT '=== UTILISATEUR CONNECTÉ ===' as section;

SELECT 
    auth.uid() as user_id,
    auth.email() as email,
    CASE 
        WHEN auth.uid() IS NULL THEN '❌ Non connecté'
        ELSE '✅ Connecté'
    END as statut;

-- 3. Vérifier le profil locataire
SELECT '=== PROFIL LOCATAIRE ===' as section;

SELECT 
    CASE 
        WHEN COUNT(*) = 0 THEN '❌ Aucun profil locataire trouvé'
        ELSE '✅ Profil locataire existe'
    END as statut,
    COUNT(*) as nombre_profils
FROM locataires 
WHERE user_id = auth.uid();

-- 4. Détails du profil (si existe)
SELECT '=== DÉTAILS DU PROFIL ===' as section;

SELECT 
    l.id as locataire_id,
    l.nom,
    l.prenom,
    l.telephone,
    l.bailleur_id,
    b.nom as bailleur_nom,
    l.logement_id,
    log.reference as logement_reference,
    log.adresse as logement_adresse,
    log.type_logement
FROM locataires l
LEFT JOIN bailleurs b ON l.bailleur_id = b.id
LEFT JOIN logements log ON l.logement_id = log.id
WHERE l.user_id = auth.uid();

-- 5. Vérifier les incidents
SELECT '=== INCIDENTS ===' as section;

SELECT 
    CASE 
        WHEN COUNT(*) = 0 THEN '⚠️ Aucun incident (normal pour un nouveau compte)'
        ELSE CONCAT('✅ ', COUNT(*), ' incident(s) trouvé(s)')
    END as statut,
    COUNT(*) as nombre_incidents
FROM incidents i
JOIN locataires l ON i.locataire_id = l.id
WHERE l.user_id = auth.uid();

-- 6. Liste des incidents (si existent)
SELECT '=== LISTE DES INCIDENTS ===' as section;

SELECT 
    i.id,
    i.titre,
    i.statut,
    i.priorite,
    i.piece,
    i.date_creation,
    CASE 
        WHEN i.statut = 'nouveau' THEN '🔵'
        WHEN i.statut = 'en_diagnostic' THEN '🟣'
        WHEN i.statut = 'en_cours' THEN '🟠'
        WHEN i.statut = 'resolu' THEN '🟢'
        WHEN i.statut = 'ferme' THEN '⚪'
    END as icone_statut
FROM incidents i
JOIN locataires l ON i.locataire_id = l.id
WHERE l.user_id = auth.uid()
ORDER BY i.date_creation DESC
LIMIT 10;

-- 7. Diagnostic final
SELECT '=== DIAGNOSTIC FINAL ===' as section;

SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM bailleurs) = 0 THEN 
            '❌ ERREUR: Aucun bailleur. Exécutez docs/sql/00-init-base-data.sql'
        WHEN (SELECT COUNT(*) FROM logements) = 0 THEN 
            '❌ ERREUR: Aucun logement. Exécutez docs/sql/00-init-base-data.sql'
        WHEN auth.uid() IS NULL THEN 
            '❌ ERREUR: Non connecté. Connectez-vous à l''application'
        WHEN (SELECT COUNT(*) FROM locataires WHERE user_id = auth.uid()) = 0 THEN 
            '⚠️ ATTENTION: Aucun profil locataire. Allez sur /client/incidents pour créer votre profil'
        ELSE 
            '✅ TOUT EST OK! Vous pouvez utiliser l''application'
    END as diagnostic;

-- 8. Actions recommandées
SELECT '=== ACTIONS RECOMMANDÉES ===' as section;

SELECT 
    CASE 
        WHEN (SELECT COUNT(*) FROM bailleurs) = 0 THEN 
            '1. Exécutez docs/sql/00-init-base-data.sql pour créer les données de base'
        WHEN auth.uid() IS NULL THEN 
            '1. Connectez-vous à l''application avec votre compte'
        WHEN (SELECT COUNT(*) FROM locataires WHERE user_id = auth.uid()) = 0 THEN 
            '1. Allez sur /client/incidents et remplissez le formulaire d''initialisation'
        ELSE 
            '✅ Aucune action requise. Tout est configuré!'
    END as action;
