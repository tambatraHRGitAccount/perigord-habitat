'use client';
import React from 'react';
import * as THREE from 'three';
import { LARGEUR_MAISON, PROFONDEUR_MAISON, HAUTEUR_MUR } from '@/lib/three/constantes';

interface Props { filDefer?: boolean }

export function Toit({ filDefer = false }: Props) {
  const debord = 0.8; // Débord plus important pour style villa moderne
  const L = LARGEUR_MAISON + debord * 2;
  const P = PROFONDEUR_MAISON + debord * 2;
  const base = HAUTEUR_MUR;
  const epaisseur = 0.3;

  return (
    <group>
      {/* Toit plat principal */}
      <mesh position={[0, base + epaisseur / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[L, epaisseur, P]} />
        <meshStandardMaterial 
          color="#e8e8e8" 
          roughness={0.7} 
          metalness={0.1}
          wireframe={filDefer}
        />
      </mesh>

      {/* Acrotère (rebord moderne) */}
      <mesh position={[0, base + epaisseur + 0.25, L / 2]} castShadow>
        <boxGeometry args={[L, 0.5, 0.15]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.6} wireframe={filDefer} />
      </mesh>
      <mesh position={[0, base + epaisseur + 0.25, -L / 2]} castShadow>
        <boxGeometry args={[L, 0.5, 0.15]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.6} wireframe={filDefer} />
      </mesh>
      <mesh position={[P / 2, base + epaisseur + 0.25, 0]} castShadow>
        <boxGeometry args={[0.15, 0.5, P]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.6} wireframe={filDefer} />
      </mesh>
      <mesh position={[-P / 2, base + epaisseur + 0.25, 0]} castShadow>
        <boxGeometry args={[0.15, 0.5, P]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.6} wireframe={filDefer} />
      </mesh>

      {/* Panneaux solaires (détail moderne) */}
      {!filDefer && (
        <>
          <mesh position={[-2, base + epaisseur + 0.05, 0]} rotation={[0, 0, 0]} castShadow>
            <boxGeometry args={[3, 0.05, 4]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[2.5, base + epaisseur + 0.05, 0]} rotation={[0, 0, 0]} castShadow>
            <boxGeometry args={[3, 0.05, 4]} />
            <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.8} />
          </mesh>
        </>
      )}
    </group>
  );
}
