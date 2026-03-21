-- Migration 004: Créer des locataires pour les utilisateurs existants
-- Cette migration crée des profils locataires pour tous les utilisateurs qui n'en ont pas encore

-- Créer des locataires pour les utilisateurs existants sans profil
INSERT INTO public.locataires (user_id, bailleur_id, nom, prenom, actif)
SELECT 
  u.id,
  (SELECT id FROM public.bailleurs WHERE actif = TRUE ORDER BY id ASC LIMIT 1), -- Premier bailleur actif
  COALESCE(
    NULLIF(SUBSTRING(u.raw_user_meta_data->>'full_name' FROM POSITION(' ' IN u.raw_user_meta_data->>'full_name') + 1), ''),
    'Locataire'
  ) as nom,
  COALESCE(
    SPLIT_PART(u.raw_user_meta_data->>'full_name', ' ', 1),
    'Nouveau'
  ) as prenom,
  TRUE
FROM auth.users u
LEFT JOIN public.locataires l ON l.user_id = u.id
WHERE l.id IS NULL;

-- Afficher le résultat
SELECT 
  COUNT(*) as nombre_locataires_crees,
  'Locataires créés avec succès pour les utilisateurs existants' as message
FROM public.locataires
WHERE created_at >= NOW() - INTERVAL '1 minute';

-- Vérifier qu'il n'y a plus d'utilisateurs sans locataire
SELECT 
  CASE 
    WHEN COUNT(*) = 0 THEN '✅ Tous les utilisateurs ont un profil locataire'
    ELSE '⚠️ ' || COUNT(*) || ' utilisateur(s) sans profil locataire'
  END as statut
FROM auth.users u
LEFT JOIN public.locataires l ON l.user_id = u.id
WHERE l.id IS NULL;
