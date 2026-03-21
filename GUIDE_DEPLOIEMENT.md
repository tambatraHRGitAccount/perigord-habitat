# 🚀 Guide de Déploiement - Corrections Critiques

## 📋 Checklist de Déploiement

### Phase 1 : Préparation (5 min)
- [ ] Lire `ANALYSE_PROBLEMES.md` pour comprendre les problèmes
- [ ] Lire `CORRECTIONS_APPLIQUEES.md` pour voir les solutions
- [ ] Faire un backup de la base de données Supabase
- [ ] Vérifier que vous avez accès à l'interface Supabase

### Phase 2 : Migrations SQL (10 min)
- [ ] Se connecter à Supabase Dashboard
- [ ] Aller dans **SQL Editor**
- [ ] Exécuter les migrations dans l'ordre :

#### Migration 1 : Table locataires
```sql
-- Copier-coller le contenu de : docs/sql/migrations/001-fix-locataires-table.sql
-- Cliquer sur "Run"
-- Vérifier : "Success. No rows returned"
```

#### Migration 2 : Table incidents
```sql
-- Copier-coller le contenu de : docs/sql/migrations/002-fix-incidents-table.sql
-- Cliquer sur "Run"
-- Vérifier : "Success. No rows returned"
```

#### Migration 3 : Trigger auto-création locataire (CRITIQUE)
```sql
-- Copier-coller le contenu de : docs/sql/migrations/003-create-trigger-auto-locataire.sql
-- Cliquer sur "Run"
-- Vérifier : "Success. No rows returned"
```

#### Migration 4 : Locataires pour utilisateurs existants
```sql
-- Copier-coller le contenu de : docs/sql/migrations/004-create-missing-locataires.sql
-- Cliquer sur "Run"
-- Vérifier le message de confirmation
```

### Phase 3 : Vérification Base de Données (5 min)

#### Vérifier les colonnes ajoutées
```sql
-- Vérifier locataires
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'locataires' 
  AND column_name IN ('logement_id', 'actif');

-- Résultat attendu : 2 lignes
```

```sql
-- Vérifier incidents
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'incidents' 
  AND column_name IN ('priorite', 'type_sinistre', 'piece', 'preuves');

-- Résultat attendu : 4 lignes
```

#### Vérifier le trigger
```sql
-- Vérifier que le trigger existe
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Résultat attendu : 1 ligne avec trigger_name = 'on_auth_user_created'
```

#### Vérifier les données
```sql
-- Vérifier que tous les utilisateurs ont un locataire
SELECT 
  COUNT(DISTINCT u.id) as total_users,
  COUNT(DISTINCT l.id) as total_locataires
FROM auth.users u
LEFT JOIN public.locataires l ON l.user_id = u.id;

-- Résultat attendu : total_users = total_locataires
```

### Phase 4 : Déploiement du Code (2 min)

Les fichiers suivants ont été modifiés et doivent être déployés :

- ✅ `services/incident.service.ts`
- ✅ `api/incidents/route.ts`

**Commandes Git** :
```bash
git add services/incident.service.ts
git add api/incidents/route.ts
git commit -m "fix: ajout des champs type_sinistre et preuves dans la création d'incidents"
git push
```

### Phase 5 : Tests (10 min)

#### Test 1 : Inscription d'un nouvel utilisateur
1. Aller sur `/client/auth/register`
2. Créer un nouveau compte avec :
   - Nom complet : "Test Utilisateur"
   - Email : "test@example.com"
   - Mot de passe : "Test123456!"
3. Vérifier la confirmation par email
4. Se connecter

**Vérification SQL** :
```sql
-- Vérifier que le locataire a été créé automatiquement
SELECT l.id, l.nom, l.prenom, l.user_id, l.bailleur_id, l.actif
FROM locataires l
JOIN auth.users u ON l.user_id = u.id
WHERE u.email = 'test@example.com';

-- Résultat attendu : 1 ligne avec les données du locataire
```

#### Test 2 : Création d'un incident
1. Se connecter avec le compte test
2. Aller sur `/client/incidents`
3. Cliquer sur "Signaler un incident"
4. Remplir le formulaire :
   - Type : "Sinistre"
   - Description : "Test de création d'incident"
   - Titre : "Fuite d'eau"
   - Pièce : "Cuisine"
   - Priorité : "Haute"
5. Soumettre

**Vérification SQL** :
```sql
-- Vérifier que l'incident a été créé avec tous les champs
SELECT 
  i.id,
  i.titre,
  i.priorite,
  i.type_sinistre,
  i.piece,
  i.statut,
  i.locataire_id,
  l.nom as locataire_nom
FROM incidents i
JOIN locataires l ON i.locataire_id = l.id
JOIN auth.users u ON l.user_id = u.id
WHERE u.email = 'test@example.com'
ORDER BY i.date_creation DESC
LIMIT 1;

-- Résultat attendu : 1 ligne avec tous les champs remplis
```

#### Test 3 : Affichage des incidents
1. Rester sur `/client/incidents`
2. Vérifier que l'incident créé s'affiche
3. Vérifier les filtres (Tous, Nouveau, En cours, etc.)
4. Vérifier que seuls les incidents du locataire connecté s'affichent

#### Test 4 : Relation locataire automatique
```sql
-- Vérifier que l'incident est bien lié au locataire connecté
SELECT 
  i.id as incident_id,
  i.titre,
  l.id as locataire_id,
  l.nom,
  u.email
FROM incidents i
JOIN locataires l ON i.locataire_id = l.id
JOIN auth.users u ON l.user_id = u.id
WHERE u.email = 'test@example.com';

-- Résultat attendu : Tous les incidents du locataire test
```

### Phase 6 : Nettoyage (2 min)

#### Supprimer le compte de test
```sql
-- Supprimer l'utilisateur de test (cascade supprimera le locataire et les incidents)
DELETE FROM auth.users WHERE email = 'test@example.com';
```

---

## ✅ Critères de Succès

Toutes les conditions suivantes doivent être remplies :

### Base de Données
- [x] Toutes les migrations ont été exécutées sans erreur
- [x] Les colonnes `logement_id` et `actif` existent dans `locataires`
- [x] Les colonnes `priorite`, `type_sinistre`, `piece`, `preuves` existent dans `incidents`
- [x] Le trigger `on_auth_user_created` existe et fonctionne
- [x] Tous les utilisateurs existants ont un profil locataire

### Application
- [x] Un nouvel utilisateur peut s'inscrire
- [x] Un locataire est automatiquement créé lors de l'inscription
- [x] Un utilisateur peut créer un incident avec tous les champs
- [x] Les incidents s'affichent correctement
- [x] Les filtres fonctionnent
- [x] Seuls les incidents du locataire connecté sont visibles

### Code
- [x] `services/incident.service.ts` inclut `type_sinistre` et `preuves`
- [x] `api/incidents/route.ts` inclut `type_sinistre` et `preuves`
- [x] Aucune erreur dans les logs du navigateur
- [x] Aucune erreur dans les logs Supabase

---

## 🐛 Dépannage

### Problème : "column does not exist"

**Cause** : Les migrations n'ont pas été exécutées correctement.

**Solution** :
1. Vérifier que toutes les migrations ont été exécutées
2. Vérifier les logs Supabase pour voir les erreurs
3. Réexécuter les migrations si nécessaire

### Problème : "locataire is null"

**Cause** : Le trigger n'a pas créé le locataire ou l'utilisateur existait avant le trigger.

**Solution** :
```sql
-- Vérifier si le locataire existe
SELECT * FROM locataires WHERE user_id = 'USER_ID_ICI';

-- Si non, créer manuellement
INSERT INTO locataires (user_id, bailleur_id, nom, prenom, actif)
VALUES ('USER_ID_ICI', 1, 'Nom', 'Prenom', TRUE);
```

### Problème : "Cannot create incident"

**Cause** : Le locataire n'a pas de `logement_id` ou `bailleur_id`.

**Solution** :
```sql
-- Vérifier les données du locataire
SELECT * FROM locataires WHERE user_id = 'USER_ID_ICI';

-- Mettre à jour si nécessaire
UPDATE locataires 
SET logement_id = 1, bailleur_id = 1 
WHERE user_id = 'USER_ID_ICI';
```

### Problème : Trigger ne se déclenche pas

**Cause** : Le trigger n'a pas été créé correctement.

**Solution** :
```sql
-- Supprimer et recréer le trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Réexécuter la migration 003
```

---

## 📞 Support

Si vous rencontrez des problèmes non résolus par ce guide :

1. Vérifier les logs Supabase : Dashboard > Database > Logs
2. Vérifier les logs du navigateur : Console (F12)
3. Consulter `ANALYSE_PROBLEMES.md` pour plus de détails
4. Consulter `docs/sql/migrations/README.md` pour les détails des migrations

---

## 🎉 Félicitations !

Si tous les tests passent, votre application est maintenant pleinement fonctionnelle :

- ✅ Les utilisateurs peuvent s'inscrire et un locataire est créé automatiquement
- ✅ Les utilisateurs peuvent créer des incidents avec tous les champs
- ✅ Les incidents sont correctement liés au locataire connecté
- ✅ L'application respecte la logique métier définie dans le schéma SQL

**Prochaines étapes recommandées** :
1. Implémenter l'upload réel des fichiers de preuve
2. Ajouter une page de gestion du profil utilisateur
3. Ajouter des notifications pour les nouveaux incidents
4. Améliorer la gestion des erreurs
