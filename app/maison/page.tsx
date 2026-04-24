'use client';
import React from 'react';
import { FournisseurScene } from '@/hooks/SceneProvider';
import { CanvasMaison } from '@/components/CanvasMaison';
import { InterfaceMaison } from '@/components/InterfaceMaison';

export default function Page() {
  return (
    <FournisseurScene>
      <div className="relative w-screen h-screen bg-gray-900 overflow-hidden">
        <CanvasMaison />
        <InterfaceMaison />
      </div>
    </FournisseurScene>
  );
}
