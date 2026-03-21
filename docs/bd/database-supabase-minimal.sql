-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.ai_responses (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  category text NOT NULL,
  piece text,
  problem text NOT NULL,
  keywords ARRAY NOT NULL,
  responsable text,
  response text NOT NULL,
  legal_ref text,
  priority integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT ai_responses_pkey PRIMARY KEY (id)
);
CREATE TABLE public.bailleurs (
  id integer NOT NULL DEFAULT nextval('bailleurs_id_seq'::regclass),
  nom character varying NOT NULL,
  logo_url character varying,
  couleur_primaire character varying,
  api_key character varying UNIQUE,
  actif boolean DEFAULT true,
  date_creation timestamp with time zone DEFAULT now(),
  CONSTRAINT bailleurs_pkey PRIMARY KEY (id)
);
CREATE TABLE public.conversations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL DEFAULT 'Nouvelle discussion'::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT conversations_pkey PRIMARY KEY (id),
  CONSTRAINT conversations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.equipements (
  id integer NOT NULL DEFAULT nextval('equipements_id_seq'::regclass),
  piece_id integer NOT NULL,
  nom character varying NOT NULL,
  sous_contrat boolean DEFAULT false,
  CONSTRAINT equipements_pkey PRIMARY KEY (id),
  CONSTRAINT equipements_piece_id_fkey FOREIGN KEY (piece_id) REFERENCES public.pieces(id)
);
CREATE TABLE public.incidents (
  id integer NOT NULL DEFAULT nextval('incidents_id_seq'::regclass),
  bailleur_id integer NOT NULL,
  locataire_id integer NOT NULL,
  logement_id integer NOT NULL,
  panne_id integer,
  titre character varying NOT NULL,
  description text,
  statut character varying DEFAULT 'nouveau'::character varying CHECK (statut::text = ANY (ARRAY['nouveau'::character varying, 'en_cours'::character varying, 'resolu'::character varying, 'ferme'::character varying]::text[])),
  responsable_identifie character varying CHECK (responsable_identifie::text = ANY (ARRAY['locataire'::character varying, 'bailleur'::character varying, 'contrat'::character varying, 'a_verifier'::character varying]::text[])),
  diagnostic_ia jsonb,
  date_creation timestamp with time zone DEFAULT now(),
  CONSTRAINT incidents_pkey PRIMARY KEY (id),
  CONSTRAINT incidents_bailleur_id_fkey FOREIGN KEY (bailleur_id) REFERENCES public.bailleurs(id),
  CONSTRAINT incidents_locataire_id_fkey FOREIGN KEY (locataire_id) REFERENCES public.locataires(id),
  CONSTRAINT incidents_logement_id_fkey FOREIGN KEY (logement_id) REFERENCES public.logements(id),
  CONSTRAINT incidents_panne_id_fkey FOREIGN KEY (panne_id) REFERENCES public.pannes(id)
);
CREATE TABLE public.locataires (
  id integer NOT NULL DEFAULT nextval('locataires_id_seq'::regclass),
  user_id uuid UNIQUE,
  bailleur_id integer NOT NULL,
  nom character varying NOT NULL,
  prenom character varying NOT NULL,
  telephone character varying,
  date_creation timestamp with time zone DEFAULT now(),
  CONSTRAINT locataires_pkey PRIMARY KEY (id),
  CONSTRAINT locataires_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT locataires_bailleur_id_fkey FOREIGN KEY (bailleur_id) REFERENCES public.bailleurs(id)
);
CREATE TABLE public.logements (
  id integer NOT NULL DEFAULT nextval('logements_id_seq'::regclass),
  bailleur_id integer NOT NULL,
  reference character varying NOT NULL,
  adresse text,
  CONSTRAINT logements_pkey PRIMARY KEY (id),
  CONSTRAINT logements_bailleur_id_fkey FOREIGN KEY (bailleur_id) REFERENCES public.bailleurs(id)
);
CREATE TABLE public.medias (
  id integer NOT NULL DEFAULT nextval('medias_id_seq'::regclass),
  incident_id integer NOT NULL,
  type_media character varying NOT NULL CHECK (type_media::text = ANY (ARRAY['photo'::character varying, 'video'::character varying, 'audio'::character varying]::text[])),
  url character varying NOT NULL,
  analyse_ia jsonb,
  date_upload timestamp with time zone DEFAULT now(),
  CONSTRAINT medias_pkey PRIMARY KEY (id),
  CONSTRAINT medias_incident_id_fkey FOREIGN KEY (incident_id) REFERENCES public.incidents(id)
);
CREATE TABLE public.message_medias (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL,
  name text NOT NULL,
  media_type text NOT NULL CHECK (media_type = ANY (ARRAY['image'::text, 'video'::text, 'file'::text])),
  storage_path text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT message_medias_pkey PRIMARY KEY (id),
  CONSTRAINT message_medias_message_id_fkey FOREIGN KEY (message_id) REFERENCES public.messages(id)
);
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL,
  role text NOT NULL CHECK (role = ANY (ARRAY['user'::text, 'assistant'::text])),
  content text NOT NULL DEFAULT ''::text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id)
);
CREATE TABLE public.pannes (
  id integer NOT NULL DEFAULT nextval('pannes_id_seq'::regclass),
  equipement_id integer NOT NULL,
  titre character varying NOT NULL,
  description text,
  responsable character varying NOT NULL CHECK (responsable::text = ANY (ARRAY['locataire'::character varying, 'bailleur'::character varying, 'contrat'::character varying, 'a_verifier'::character varying]::text[])),
  qui_paie character varying NOT NULL CHECK (qui_paie::text = ANY (ARRAY['locataire'::character varying, 'bailleur'::character varying, 'bailleur_recuperable'::character varying]::text[])),
  reference_juridique text,
  auto_depannage_etapes jsonb,
  CONSTRAINT pannes_pkey PRIMARY KEY (id),
  CONSTRAINT pannes_equipement_id_fkey FOREIGN KEY (equipement_id) REFERENCES public.equipements(id)
);
CREATE TABLE public.pieces (
  id integer NOT NULL DEFAULT nextval('pieces_id_seq'::regclass),
  nom character varying NOT NULL,
  icone_url character varying,
  CONSTRAINT pieces_pkey PRIMARY KEY (id)
);