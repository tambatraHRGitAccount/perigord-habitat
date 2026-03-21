-- Migration 003: Création automatique du locataire lors de l'inscription
-- CRITIQUE : Ce trigger résout le problème principal où aucun locataire n'est créé lors de l'inscription

-- Fonction qui crée automatiquement un locataire lors de la création d'un utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  default_bailleur_id INTEGER;
  user_full_name TEXT;
  first_name TEXT;
  last_name TEXT;
BEGIN
  -- Récupérer l'ID du bailleur par défaut (le premier bailleur actif)
  SELECT id INTO default_bailleur_id
  FROM public.bailleurs
  WHERE actif = TRUE
  ORDER BY id ASC
  LIMIT 1;

  -- Si aucun bailleur n'existe, utiliser l'ID 1 par défaut
  IF default_bailleur_id IS NULL THEN
    default_bailleur_id := 1;
  END IF;

  -- Extraire le nom complet des métadonnées
  user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', 'Nouveau Locataire');
  
  -- Séparer prénom et nom (simple split sur le premier espace)
  first_name := SPLIT_PART(user_full_name, ' ', 1);
  last_name := CASE 
    WHEN POSITION(' ' IN user_full_name) > 0 
    THEN SUBSTRING(user_full_name FROM POSITION(' ' IN user_full_name) + 1)
    ELSE ''
  END;

  -- Créer l'entrée locataire
  INSERT INTO public.locataires (
    user_id,
    bailleur_id,
    nom,
    prenom,
    actif
  ) VALUES (
    NEW.id,
    default_bailleur_id,
    COALESCE(NULLIF(last_name, ''), 'Locataire'),
    first_name,
    TRUE
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger qui s'exécute après l'insertion d'un nouvel utilisateur
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Commentaire
COMMENT ON FUNCTION public.handle_new_user() IS 
  'Crée automatiquement un profil locataire lors de l''inscription d''un nouvel utilisateur. '
  'Extrait le nom complet des métadonnées et l''assigne au premier bailleur actif.';
