-- Migration 002: Correction de la table incidents
-- Ajoute les colonnes manquantes pour correspondre au code TypeScript

-- Ajouter la colonne priorite
ALTER TABLE public.incidents 
ADD COLUMN IF NOT EXISTS priorite VARCHAR(10) 
  CHECK (priorite IN ('basse', 'normale', 'haute', 'urgente')) 
  DEFAULT 'normale' NOT NULL;

-- Ajouter la colonne type_sinistre
ALTER TABLE public.incidents 
ADD COLUMN IF NOT EXISTS type_sinistre VARCHAR(20) 
  CHECK (type_sinistre IN ('sinistre', 'vandalisme', 'vetuste'));

-- Ajouter la colonne piece
ALTER TABLE public.incidents 
ADD COLUMN IF NOT EXISTS piece VARCHAR(100);

-- Ajouter la colonne preuves (stockage JSON des noms de fichiers)
ALTER TABLE public.incidents 
ADD COLUMN IF NOT EXISTS preuves JSONB;

-- Ajouter la colonne date_modification
ALTER TABLE public.incidents 
ADD COLUMN IF NOT EXISTS date_modification TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Ajouter la colonne date_resolution
ALTER TABLE public.incidents 
ADD COLUMN IF NOT EXISTS date_resolution TIMESTAMP WITH TIME ZONE;

-- Corriger la contrainte CHECK du statut pour inclure 'en_diagnostic'
ALTER TABLE public.incidents 
DROP CONSTRAINT IF EXISTS incidents_statut_check;

ALTER TABLE public.incidents 
ADD CONSTRAINT incidents_statut_check 
CHECK (statut::text = ANY (ARRAY[
  'nouveau'::character varying,
  'en_diagnostic'::character varying,
  'en_cours'::character varying,
  'resolu'::character varying,
  'ferme'::character varying
]::text[]));

-- Créer des index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_incidents_priorite ON public.incidents(priorite);
CREATE INDEX IF NOT EXISTS idx_incidents_piece ON public.incidents(piece);
CREATE INDEX IF NOT EXISTS idx_incidents_type_sinistre ON public.incidents(type_sinistre);

-- Commentaires
COMMENT ON COLUMN public.incidents.priorite IS 'Niveau d''urgence de l''incident (basse, normale, haute, urgente)';
COMMENT ON COLUMN public.incidents.type_sinistre IS 'Type de sinistre déclaré (sinistre, vandalisme, vétusté)';
COMMENT ON COLUMN public.incidents.piece IS 'Pièce du logement concernée par l''incident';
COMMENT ON COLUMN public.incidents.preuves IS 'Liste des fichiers de preuve (photos, vidéos) au format JSON';
COMMENT ON COLUMN public.incidents.date_modification IS 'Date de dernière modification de l''incident';
COMMENT ON COLUMN public.incidents.date_resolution IS 'Date de résolution de l''incident';
