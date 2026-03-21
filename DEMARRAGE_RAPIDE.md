# 🚀 Démarrage Rapide - Module Incidents

## En 3 minutes chrono!

### 📋 Prérequis
- ✅ Compte Supabase créé
- ✅ Schéma de base de données créé (`database-supabase-complete.sql`)
- ✅ Compte utilisateur créé dans l'application

### 🎯 Méthode 1: Automatique (RECOMMANDÉ)

1. **Ouvrez Supabase SQL Editor**
2. **Connectez-vous à l'application** (important!)
3. **Copiez-collez** le contenu de `docs/sql/QUICK_START.sql`
4. **Exécutez** le script
5. **Allez sur** `/client/incidents`

✨ **C'est tout!** Vous avez maintenant:
- Votre profil locataire
- Un logement assigné
- 5 incidents exemples

### 🎯 Méthode 2: Via l'interface

1. **Connectez-vous** à l'application
2. **Exécutez** `docs/sql/00-init-base-data.sql` dans Supabase
3. **Allez sur** `/client/incidents`
4. **Remplissez** le formulaire qui s'affiche
5. **Cliquez** sur "Créer mon profil"

✨ Votre profil et des incidents exemples sont créés automatiquement!

## 🎨 Ce que vous pouvez faire

### Voir vos incidents
- Tous vos incidents s'affichent sur `/client/incidents`
- Filtrez par statut: Tous, Nouveaux, En cours, Résolus, etc.

### Créer un incident
1. Cliquez sur "Signaler un incident"
2. Suivez les 3 étapes:
   - Type de sinistre (sinistre, vandalisme, vétusté)
   - Localisation (pièce, priorité)
   - Confirmation
3. Validez!

### Statuts disponibles
- 🔵 **nouveau** - Vient d'être signalé
- 🟣 **en_diagnostic** - En cours d'analyse
- 🟠 **en_cours** - Intervention en cours
- 🟢 **resolu** - Problème résolu
- ⚪ **ferme** - Incident fermé

### Priorités
- ⚪ **basse** - Peut attendre
- 🟡 **normale** - À traiter normalement
- 🟠 **haute** - À traiter rapidement
- 🔴 **urgente** - Intervention immédiate

## ❓ Problèmes?

### "Cannot coerce the result to a single JSON object"
➡️ Votre profil n'existe pas
✅ Exécutez `docs/sql/QUICK_START.sql` (en étant connecté!)

### Aucun incident ne s'affiche
➡️ Vérifiez votre profil avec:
```sql
SELECT * FROM locataires WHERE user_id = auth.uid();
```

### Les données de base n'existent pas
➡️ Exécutez d'abord:
```sql
-- Dans Supabase SQL Editor
\i docs/sql/00-init-base-data.sql
```

## 🔍 Vérifier la configuration

Exécutez `docs/sql/verify-setup.sql` pour un diagnostic complet!

## 📚 Documentation complète

- **Guide complet**: `docs/GUIDE_INSTALLATION_DONNEES.md`
- **Utilisation**: `docs/INCIDENTS_UTILISATION.md`
- **README détaillé**: `INCIDENTS_README.md`

## 💡 Astuce

Le script `QUICK_START.sql` fait tout en une seule fois:
- Crée les données de base
- Crée votre profil
- Crée des incidents exemples

**Temps d'exécution**: ~2 secondes ⚡

---

**Besoin d'aide?** Consultez `docs/GUIDE_INSTALLATION_DONNEES.md`
