# Guide d'Installation des Données

Ce guide explique comment initialiser les données dans votre base Supabase pour utiliser la plateforme.

## Méthode 1: Initialisation Automatique (Recommandée)

### Étape 1: Créer les données de base
1. Ouvrez Supabase Dashboard
2. Allez dans **SQL Editor**
3. Exécutez le script `docs/sql/00-init-base-data.sql`

Ce script crée:
- Le bailleur "Périgord Habitat"
- Une agence à Périgueux
- Des codes d'accès
- Des logements
- Les pièces (Cuisine, Salle de bain, etc.)
- Les équipements de base

### Étape 2: Créer votre compte utilisateur
1. Connectez-vous à l'application avec votre email/mot de passe
2. Allez sur la page `/client/incidents`
3. Un formulaire d'initialisation apparaîtra automatiquement
4. Remplissez vos informations (nom, prénom, téléphone)
5. Cliquez sur "Créer mon profil"

Le système créera automatiquement:
- Votre profil locataire
- L'association avec un logement
- 3 incidents exemples pour tester

## Méthode 2: Initialisation Manuelle via SQL

### Étape 1: Créer les données de base
Exécutez `docs/sql/00-init-base-data.sql` comme dans la Méthode 1

### Étape 2: Récupérer votre UUID utilisateur
```sql
-- Connectez-vous à l'application puis exécutez:
SELECT id, email FROM auth.users ORDER BY created_at DESC LIMIT 5;
```

### Étape 3: Créer votre profil locataire
Exécutez le script `docs/sql/create-locataire-for-current-user.sql` en étant connecté

OU remplacez `USER_UUID_ICI` par votre UUID dans cette requête:
```sql
INSERT INTO locataires (user_id, bailleur_id, logement_id, code_acces_id, nom, prenom, telephone, actif)
VALUES 
('USER_UUID_ICI', 1, 1, 1, 'Votre Nom', 'Votre Prénom', '06 12 34 56 78', TRUE);
```

### Étape 4: Créer des incidents exemples
```sql
-- Récupérez votre ID locataire
SELECT id FROM locataires WHERE user_id = 'USER_UUID_ICI';

-- Créez des incidents (remplacez LOCATAIRE_ID par votre ID)
INSERT INTO incidents (bailleur_id, locataire_id, logement_id, titre, description, statut, priorite, piece)
VALUES 
(1, LOCATAIRE_ID, 1, 'Fuite sous l''évier', 'Fuite d''eau sous l''évier de la cuisine', 'nouveau', 'haute', 'Cuisine'),
(1, LOCATAIRE_ID, 1, 'Radiateur ne chauffe pas', 'Le radiateur de la chambre reste froid', 'en_cours', 'haute', 'Chambre'),
(1, LOCATAIRE_ID, 1, 'Ampoule grillée', 'Ampoule du plafonnier grillée', 'nouveau', 'basse', 'Entrée');
```

## Vérification

Pour vérifier que tout est bien configuré:

```sql
-- Vérifier votre profil locataire
SELECT 
    l.id,
    l.nom,
    l.prenom,
    log.reference as logement,
    log.adresse
FROM locataires l
LEFT JOIN logements log ON l.logement_id = log.id
WHERE l.user_id = auth.uid();

-- Vérifier vos incidents
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
```

## Résolution des Problèmes

### Erreur "Cannot coerce the result to a single JSON object"
- Votre profil locataire n'existe pas
- Utilisez la Méthode 1 (initialisation automatique) ou créez manuellement votre profil

### Aucun incident n'apparaît
- Vérifiez que votre profil locataire existe
- Vérifiez que les incidents sont bien liés à votre locataire_id
- Exécutez les requêtes de vérification ci-dessus

### Les données de base n'existent pas
- Exécutez d'abord `docs/sql/00-init-base-data.sql`
- Vérifiez que le script s'est exécuté sans erreur

## Scripts SQL Disponibles

- `00-init-base-data.sql` - Initialise les données de base (bailleurs, logements, pièces)
- `create-locataire-for-current-user.sql` - Crée un profil pour l'utilisateur connecté
- `insert-real-data.sql` - Script complet avec toutes les données

## Support

Si vous rencontrez des problèmes, vérifiez:
1. Que le schéma de base de données est bien créé (`database-supabase-complete.sql`)
2. Que les données de base sont initialisées
3. Que votre utilisateur est bien connecté
4. Que les permissions RLS sont correctement configurées
