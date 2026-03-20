# Utilisation du Module Incidents

## Vue d'ensemble

Le module incidents permet aux locataires de signaler et suivre leurs incidents dans leur logement.

## Architecture

```
types/
  ├── incident.ts          # Types TypeScript pour les incidents
  ├── user.ts             # Types pour les utilisateurs
  └── media.ts            # Types pour les médias

services/
  ├── incident.service.ts  # Service CRUD pour les incidents
  └── media.service.ts     # Service pour les médias

hooks/
  ├── useIncidents.ts      # Hook pour gérer les incidents
  └── useCurrentUser.ts    # Hook pour l'utilisateur connecté

api/incidents/
  └── route.ts            # API routes GET/POST

config/
  └── incident.config.ts   # Configuration des statuts et priorités

components/client/
  ├── IncidentCard.tsx           # Carte d'affichage d'un incident
  ├── SignalerIncidentDialog.tsx # Dialog de création d'incident
  └── InitializeUserData.tsx     # Composant d'initialisation

app/client/incidents/
  └── page.tsx            # Page principale des incidents
```

## Fonctionnalités

### 1. Affichage des Incidents
- Liste tous les incidents du locataire connecté
- Filtrage par statut (nouveau, en diagnostic, en cours, résolu, fermé)
- Affichage de la priorité (basse, normale, haute, urgente)
- Affichage de la pièce concernée
- Date de création

### 2. Création d'Incident
Le dialog de création comporte 3 étapes:

**Étape 1: Type de sinistre**
- Sinistre (dégâts des eaux, incendie, etc.)
- Vandalisme (dégradations, effraction)
- Vétusté (usure naturelle)
- Description détaillée
- Upload de photos/vidéos

**Étape 2: Localisation**
- Titre de l'incident
- Pièce concernée (Cuisine, Salle de bain, etc.)
- Niveau d'urgence (basse, normale, haute, urgente)

**Étape 3: Confirmation**
- Récapitulatif des informations
- Validation et envoi

### 3. Statuts des Incidents

| Statut | Description | Couleur |
|--------|-------------|---------|
| nouveau | Incident vient d'être signalé | Bleu |
| en_diagnostic | En cours d'analyse | Violet |
| en_cours | Intervention en cours | Orange |
| resolu | Problème résolu | Vert |
| ferme | Incident fermé | Gris |

### 4. Priorités

| Priorité | Description | Couleur |
|----------|-------------|---------|
| basse | Peut attendre | Gris |
| normale | À traiter normalement | Jaune |
| haute | À traiter rapidement | Orange |
| urgente | Intervention immédiate | Rouge |

## Utilisation

### Pour les Développeurs

#### Récupérer les incidents d'un locataire
```typescript
import { useIncidents } from "@/hooks/useIncidents";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function MyComponent() {
  const { locataire } = useCurrentUser();
  const { incidents, loading, error } = useIncidents(locataire?.id ?? null);
  
  // incidents contient la liste des incidents
}
```

#### Créer un incident
```typescript
const { createIncident } = useIncidents(locataireId);

await createIncident(logementId, bailleurId, {
  titre: "Fuite d'eau",
  description: "Fuite sous l'évier",
  priorite: "haute",
  piece: "Cuisine",
  type_sinistre: "sinistre",
});
```

#### Filtrer les incidents
```typescript
const { filterByStatut } = useIncidents(locataireId);

const nouveaux = filterByStatut("nouveau");
const enCours = filterByStatut("en_cours");
const tous = filterByStatut("tous");
```

### Pour les Utilisateurs

1. **Accéder à la page incidents**: `/client/incidents`

2. **Première utilisation**:
   - Si aucun profil n'existe, un formulaire d'initialisation s'affiche
   - Remplir nom, prénom, téléphone
   - Cliquer sur "Créer mon profil"
   - Des incidents exemples sont créés automatiquement

3. **Signaler un incident**:
   - Cliquer sur "Signaler un incident"
   - Suivre les 3 étapes du formulaire
   - Valider

4. **Filtrer les incidents**:
   - Utiliser les boutons de filtre en haut de la page
   - Tous / Nouveaux / En diagnostic / En cours / Résolus / Fermés

## Base de Données

### Table incidents
```sql
CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    bailleur_id INTEGER NOT NULL,
    locataire_id INTEGER NOT NULL,
    logement_id INTEGER NOT NULL,
    panne_id INTEGER,
    titre VARCHAR(255) NOT NULL,
    description TEXT,
    statut VARCHAR(20) DEFAULT 'nouveau',
    priorite VARCHAR(20) DEFAULT 'normale',
    responsable_identifie VARCHAR(20),
    diagnostic_ia JSONB,
    date_creation TIMESTAMPTZ DEFAULT NOW(),
    date_modification TIMESTAMPTZ DEFAULT NOW(),
    date_resolution TIMESTAMPTZ
);
```

### Relations
- `bailleur_id` → bailleurs(id)
- `locataire_id` → locataires(id)
- `logement_id` → logements(id)
- `panne_id` → pannes(id) (optionnel)

## API Routes

### GET /api/incidents
Récupère tous les incidents du locataire connecté

**Réponse:**
```json
{
  "incidents": [
    {
      "id": 1,
      "titre": "Fuite d'eau",
      "description": "...",
      "statut": "nouveau",
      "priorite": "haute",
      "piece": "Cuisine",
      "date_creation": "2024-03-20T10:00:00Z"
    }
  ]
}
```

### POST /api/incidents
Crée un nouvel incident

**Body:**
```json
{
  "titre": "Fuite d'eau",
  "description": "Fuite sous l'évier",
  "priorite": "haute",
  "piece": "Cuisine",
  "type_sinistre": "sinistre"
}
```

**Réponse:**
```json
{
  "incident": {
    "id": 1,
    "titre": "Fuite d'eau",
    ...
  }
}
```

## Évolutions Futures

- [ ] Upload réel de photos/vidéos
- [ ] Notifications en temps réel
- [ ] Chat avec le gestionnaire
- [ ] Suivi des interventions
- [ ] Historique détaillé
- [ ] Export PDF des incidents
- [ ] Analyse IA pour diagnostic automatique
