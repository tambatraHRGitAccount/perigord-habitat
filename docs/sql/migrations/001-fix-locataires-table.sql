-- Migration 001: Correction de la table locataires
-- Ajoute les colonnes manquantes pour correspondre au code TypeScript

-- Ajouter la colonne logement_id
ALTER TABLE public.locataires 
ADD COLUMN IF NOT EXISTS logement_id INTEGER 
  REFERENCES public.logements(id) ON DELETE SET NULL;

-- Ajouter la colonne actif
ALTER TABLE public.locataires 
ADD COLUMN IF NOT EXISTS actif BOOLEAN DEFAULT TRUE NOT NULL;

-- Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_locataires_user_id ON public.locataires(user_id);
CREATE INDEX IF NOT EXISTS idx_locataires_logement_id ON public.locataires(logement_id);

-- Commentaires
COMMENT ON COLUMN public.locataires.logement_id IS 'Référence au logement occupé par le locataire';
COMMENT ON COLUMN public.locataires.actif IS 'Indique si le locataire est actif (true) ou archivé (false)';
