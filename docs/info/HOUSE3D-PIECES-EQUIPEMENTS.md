# Schéma 3D interactif — pièces et équipements implémentés

Ce document recense les pièces et équipements déjà développés dans le schéma interactif 3D de l'application.

## Source
- Fichier principal des données 3D : `components/house3d/houseData.ts`
- Composant de scène 3D : `components/house3d/HouseScene.tsx`
- Page qui charge la scène 3D : `backup/schema-logement-konva/page.tsx`

## Pièces actives
1. **Séjour**
2. **Cuisine**
3. **Salle de bain**
4. **Extérieur**

## Équipements par pièce

### 1. Séjour
- Tapis de salon
- Canapé
- Table basse
- Télévision
- Lampadaire
- Fauteuil
- Bibliothèque
- Plante verte
- Porte
- Papier peint décollé ou crayonné
- Interrupteur / Prise électrique
- Volet
- Sol (parquet / carrelage)
- Thermostat
- Détecteur de fumée (DAAF)
- Radiateur
- Tableau décoratif

### 2. Cuisine
- Réfrigérateur
- Plan de travail
- Plaque de cuisson
- Évier
- Four
- Meubles hauts
- Hotte aspirante
- Table de cuisine
- 4 chaises de cuisine
- Lave-vaisselle
- Micro-ondes
- Poubelle de tri
- Robinet cuisine
- Serrure de porte cuisine
- Radiateur cuisine
- Radiateur électrique
- Interphone / Sonnette

### 3. Salle de bain
- Douche italienne
- Meuble vasque
- Miroir
- Toilettes (WC)
- Machine à laver
- Colonne de rangement
- Sèche-serviettes
- Tapis de bain
- Panier à linge
- Joints d'étanchéité
- Chasse d'eau
- Robinet salle de bain
- Grille de ventilation
- Cumulus / Chauffe-eau

### 4. Extérieur
- Cave / cellier
- Chaudière
- VMC
- Allée / chemin
- Boîte aux lettres
- Portail
- Balcon (évacuation)
- Fosse septique
- Pelouse / haies
- Arbre
- Garage
- Route d'accès garage

## Remarques
- Chaque élément est défini comme un objet `Equipment` dans `components/house3d/houseData.ts`.
- Les objets contiennent : `id`, `name`, `description`, `consumption`, `tips`, `position`, `size`, `color`, et `type`.
- Le schéma 3D est exploité par le composant `HouseScene` et les composants enfants du dossier `components/house3d/`.
