This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




Voici les leviers par ordre d'impact, du plus simple au plus avancé :

1. Post-processing (impact maximal, ~1 jour)
Installer @react-three/postprocessing et envelopper la scène :


// SSAO + Bloom + Anti-aliasing
<EffectComposer>
  <SSAO radius={0.4} intensity={30} luminanceInfluence={0.6} />
  <Bloom intensity={0.4} luminanceThreshold={0.9} mipmapBlur />
  <SMAA />
  <Vignette eskil={false} offset={0.1} darkness={0.6} />
</EffectComposer>
Le SSAO seul transforme l'aspect en ajoutant des ombres de contact dans les coins — c'est ce qui donne l'impression de profondeur.

2. Matériaux physiques (impact fort, par objet)
Remplacer MeshStandardMaterial par MeshPhysicalMaterial pour les surfaces clés :

Surface	Propriétés à activer
Parquet / carrelage	clearcoat: 0.3–0.8, clearcoatRoughness: 0.1
Canapé / tissu	sheen: 1, sheenColor, sheenRoughness: 0.8
Vitres / fenêtres	transmission: 1, thickness: 0.1, ior: 1.5
Plan de travail	clearcoat: 0.9, metalness: 0.1
3. Sol réfléchissant avec MeshReflectorMaterial

// Pour le parquet séjour / carrelage salle de bain
<MeshReflectorMaterial
  blur={[300, 100]}
  resolution={1024}
  mixBlur={1}
  mixStrength={40}
  roughness={0.8}
  depthScale={1.2}
/>
4. Éclairage + ombres améliorés
Passer de PCFShadowMap → PCFSoftShadowMap (ombres douces)
Remplacer les pointLight par des RectAreaLight (plafonniers réalistes)
Ajouter une <Environment files="votre.hdr" /> avec une vraie HDR map (Polyhaven)
5. Textures PBR (travail conséquent mais résultat photo-réaliste)
Ajouter map + normalMap + roughnessMap + aoMap sur les matériaux importants. Les maps gratuites sont sur polyhaven.com. Utiliser useTexture de @react-three/drei.

Recommandation
Commencer par le post-processing (étape 1) — c'est 20 lignes de code pour 80% du gain visuel. Ensuite les matériaux physiques sur parquet + tissus.

Tu veux que je commence par l'une de ces étapes ?