'use client';
import { EffectComposer, Bloom, Vignette, SMAA, N8AO } from '@react-three/postprocessing';
import { useScene } from '@/hooks/useSceneStore';

export function PostEffets() {
  const { modeJourNuit, pieceActive } = useScene();
  const estInterieur = pieceActive !== 'exterieur';

  return (
    <EffectComposer multisampling={0}>
      {/* Occlusion ambiante : ombres de contact dans les coins et entre objets */}
      <N8AO
        aoRadius={estInterieur ? 0.8 : 1.5}
        intensity={estInterieur ? 3 : 2}
        distanceFalloff={1}
        quality="medium"
        halfRes={false}
        depthAwareUpsampling={true}
      />

      {/* Bloom : halo lumineux sur les lumières émissives */}
      <Bloom
        intensity={modeJourNuit === 'nuit' ? 0.5 : 0.12}
        luminanceThreshold={0.92}
        luminanceSmoothing={0.05}
        mipmapBlur
      />

      {/* Vignetage : assombrit légèrement les bords pour centrer le regard */}
      <Vignette offset={0.2} darkness={modeJourNuit === 'nuit' ? 0.7 : 0.4} eskil={false} />

      {/* Anti-aliasing morphologique (SMAA) — remplace l'antialias natif désactivé */}
      <SMAA />
    </EffectComposer>
  );
}
