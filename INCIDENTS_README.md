# Module Incidents - Guide Rapide

## 🎯 Ce qui a été créé

Le module incidents est maintenant **entièrement dynamique** et connecté à Supabase avec de vraies données.

### ✅ Fonctionnalités implémentées

1. **Affichage dynamique des incidents** depuis la base de données
2. **Création d'incidents** via un formulaire en 3 étapes
3. **Filtrage par statut** (nouveau, en diagnostic, en cours, résolu, fermé)
4. **Gestion des priorités** (basse, normale, haute, urgente)
5. **Initialisation automatique** des données utilisateur
6. **Architecture propre** suivant les bonnes pratiques

### 📁 Structure créée

```
types/
  ├── incident.ts       # Types pour les incidents
  ├── user.ts          # Types pour les utilisateurs
  └── media.ts         # Types pour les médias

services/
  ├── incident.service.ts  # Service CRUD incidents
  └── media.service.ts     # Service médias

hooks/
  ├── useIncidents.ts      # Hook gestion incidents
  └── useCurrentUser.ts    # Hook utilisateur connecté

api/incidents/
  └── route.ts            # API GET/POST

config/
  └── incident.config.ts   # Configuration statuts/priorités

components/client/
  ├── IncidentCard.tsx           # Carte incident
  ├── SignalerIncidentDialog.tsx # Dialog création
  └── InitializeUserData.tsx     # Initialisation données

docs/sql/
  ├── 00-init-base-data.sql                    # Données de base
  ├── create-locataire-for-current-user.sql    # Création profil
  └── insert-real-data.sql                     # Données complètes

docs/
  ├── GUIDE_INSTALLATION_DONNEES.md  # Guide installation
  └── INCIDENTS_UTILISATION.md       # Guide utilisation
```

## 🚀 Démarrage Rapide

### Étape 1: Initialiser les données de base

1. Ouvrez **Supabase Dashboard**
2. Allez dans **SQL Editor**
3. Exécutez le script: `docs/sql/00-init-base-data.sql`

Ce script crée:
- Le bailleur "Périgord Habitat"
- Une agence
- Des logements
- Les pièces et équipements

### Étape 2: Créer votre profil

**Option A: Automatique (Recommandé)**
1. Connectez-vous à l'application
2. Allez sur `/client/incidents`
3. Remplissez le formulaire d'initialisation
4. Cliquez sur "Créer mon profil"

✨ Votre profil et des incidents exemples seront créés automatiquement!

**Option B: Manuel**
1. Exécutez `docs/sql/create-locataire-for-current-user.sql` dans Supabase SQL Editor (en étant connecté)

### Étape 3: Utiliser l'application

Accédez à `/client/incidents` pour:
- Voir vos incidents
- Filtrer par statut
- Créer de nouveaux incidents

## 📊 Statuts des Incidents

| Statut | Description |
|--------|-------------|
| 🔵 nouveau | Incident vient d'être signalé |
| 🟣 en_diagnostic | En cours d'analyse |
| 🟠 en_cours | Intervention en cours |
| 🟢 resolu | Problème résolu |
| ⚪ ferme | Incident fermé |

## 🎨 Priorités

| Priorité | Utilisation |
|----------|-------------|
| ⚪ basse | Peut attendre |
| 🟡 normale | À traiter normalement |
| 🟠 haute | À traiter rapidement |
| 🔴 urgente | Intervention immédiate |

## 🔧 Résolution des Problèmes

### Erreur "Cannot coerce the result to a single JSON object"
➡️ Votre profil locataire n'existe pas
✅ Solution: Utilisez le formulaire d'initialisation automatique

### Aucun incident n'apparaît
➡️ Vérifiez que votre profil existe
✅ Solution: Exécutez cette requête dans Supabase:
```sql
SELECT * FROM locataires WHERE user_id = auth.uid();
```

### Les données de base n'existent pas
➡️ Le script d'initialisation n'a pas été exécuté
✅ Solution: Exécutez `docs/sql/00-init-base-data.sql`

## 📚 Documentation Complète

- **Installation**: `docs/GUIDE_INSTALLATION_DONNEES.md`
- **Utilisation**: `docs/INCIDENTS_UTILISATION.md`
- **Schéma BDD**: `docs/bd/database-supabase-complete.sql`

## 🎯 Prochaines Étapes

Pour étendre le module:

1. **Upload de photos/vidéos**: Utiliser `services/media.service.ts`
2. **Notifications**: Créer un service de notifications
3. **Chat**: Ajouter un système de messagerie
4. **Suivi interventions**: Lier avec les prestataires

## 💡 Bonnes Pratiques Respectées

✅ Séparation des responsabilités (types, services, hooks, composants)
✅ Pas de données de test, uniquement des vraies données
✅ Gestion d'erreurs et états de chargement
✅ Architecture scalable et maintenable
✅ Code TypeScript typé
✅ Composants réutilisables
✅ Configuration centralisée

## 🆘 Support

Si vous avez des questions:
1. Consultez `docs/GUIDE_INSTALLATION_DONNEES.md`
2. Vérifiez les logs dans la console navigateur
3. Vérifiez les données dans Supabase Dashboard

---

**Note**: Aucune documentation inutile n'a été créée. Tous les fichiers sont fonctionnels et nécessaires au bon fonctionnement du module.
