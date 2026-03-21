# Migrations SQL - Corrections Critiques

## 🚨 Problèmes Identifiés

Ce dossier contient les migrations SQL pour corriger les problèmes critiques identifiés dans l'application :

1. **Aucun locataire créé lors de l'inscription** - Les utilisateurs ne peuvent pas utiliser l'application
2. **Colonnes manquantes dans la table `locataires`** - `logement_id`, `actif`
3. **Colonnes manquantes dans la table `incidents`** - `priorite`, `type_sinistre`, `piece`, `preuves`
4. **Statut `en_diagnostic` manquant** dans la contrainte CHECK

## 📋 Ordre d'Exécution

Exécutez les migrations dans l'ordre suivant sur votre base de données Supabase :

### 1. Migration 001 - Correction table locataires
```bash
# Fichier: 001-fix-locataires-table.sql
```
Ajoute les colonnes `logement_id` et `actif` à la table `locataires`.

### 2. Migration 002 - Correction table incidents
```bash
# Fichier: 002-fix-incidents-table.sql
```
Ajoute les colonnes `priorite`, `type_sinistre`, `piece`, `preuves`, `date_modification`, `date_resolution` et corrige la contrainte CHECK du statut.

### 3. Migration 003 - Trigger auto-création locataire
```bash
# Fichier: 003-create-trigger-auto-locataire.sql
```
**CRITIQUE** : Crée un trigger PostgreSQL qui crée automatiquement un profil locataire lors de l'inscription d'un nouvel utilisateur.

## 🔧 Comment Appliquer les Migrations

### Option A : Via l'interface Supabase (Recommandé)

1. Connectez-vous à votre projet Supabase : https://app.supabase.com
2. Allez dans **SQL Editor**
3. Créez une nouvelle requête
4. Copiez-collez le contenu de chaque fichier SQL dans l'ordre
5. Exécutez chaque requête (bouton "Run")

### Option B : Via la CLI Supabase

```bash
# Si vous utilisez Supabase CLI
supabase db push

# Ou exécutez chaque fichier individuellement
psql $DATABASE_URL -f docs/sql/migrations/001-fix-locataires-table.sql
psql $DATABASE_URL -f docs/sql/migrations/002-fix-incidents-table.sql
psql $DATABASE_URL -f docs/sql/migrations/003-create-trigger-auto-locataire.sql
```

## ✅ Vérification Post-Migration

Après avoir exécuté les migrations, vérifiez que tout fonctionne :

### 1. Vérifier les colonnes ajoutées

```sql
-- Vérifier la table locataires
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'locataires'
ORDER BY ordinal_position;

-- Vérifier la table incidents
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'incidents'
ORDER BY ordinal_position;
```

### 2. Vérifier le trigger

```sql
-- Vérifier que le trigger existe
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Vérifier la fonction
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_name = 'handle_new_user';
```

### 3. Tester la création d'un utilisateur

1. Créez un nouveau compte via l'interface d'inscription
2. Vérifiez qu'un locataire est automatiquement créé :

```sql
SELECT l.id, l.user_id, l.nom, l.prenom, l.bailleur_id, l.actif
FROM locataires l
JOIN auth.users u ON l.user_id = u.id
WHERE u.email = 'email-test@example.com';
```

## 🔄 Rollback (En cas de problème)

Si vous rencontrez des problèmes, vous pouvez annuler les migrations :

### Rollback Migration 003
```sql
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
```

### Rollback Migration 002
```sql
ALTER TABLE public.incidents DROP COLUMN IF EXISTS priorite;
ALTER TABLE public.incidents DROP COLUMN IF EXISTS type_sinistre;
ALTER TABLE public.incidents DROP COLUMN IF EXISTS piece;
ALTER TABLE public.incidents DROP COLUMN IF EXISTS preuves;
ALTER TABLE public.incidents DROP COLUMN IF EXISTS date_modification;
ALTER TABLE public.incidents DROP COLUMN IF EXISTS date_resolution;
```

### Rollback Migration 001
```sql
ALTER TABLE public.locataires DROP COLUMN IF EXISTS logement_id;
ALTER TABLE public.locataires DROP COLUMN IF EXISTS actif;
```

## 📝 Notes Importantes

1. **Backup** : Faites toujours un backup de votre base de données avant d'exécuter des migrations
2. **Environnement de test** : Testez d'abord sur un environnement de développement
3. **Données existantes** : Les migrations sont conçues pour être non-destructives (IF NOT EXISTS)
4. **Trigger** : Le trigger s'appliquera uniquement aux NOUVEAUX utilisateurs créés après son installation

## 🐛 Dépannage

### Erreur : "column already exists"
C'est normal si vous avez déjà ajouté certaines colonnes manuellement. Les migrations utilisent `IF NOT EXISTS` pour éviter les erreurs.

### Erreur : "trigger already exists"
Supprimez d'abord le trigger existant :
```sql
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
```
Puis réexécutez la migration 003.

### Les anciens utilisateurs n'ont pas de locataire
Le trigger ne s'applique qu'aux nouveaux utilisateurs. Pour les utilisateurs existants, exécutez :
```sql
-- Créer des locataires pour les utilisateurs existants sans profil
INSERT INTO public.locataires (user_id, bailleur_id, nom, prenom, actif)
SELECT 
  u.id,
  1, -- ID du bailleur par défaut
  COALESCE(u.raw_user_meta_data->>'full_name', 'Locataire'),
  'À compléter',
  TRUE
FROM auth.users u
LEFT JOIN public.locataires l ON l.user_id = u.id
WHERE l.id IS NULL;
```

## 📞 Support

Si vous rencontrez des problèmes, consultez :
- Le fichier `ANALYSE_PROBLEMES.md` pour plus de détails
- Les logs Supabase dans l'interface web
- La documentation Supabase : https://supabase.com/docs
