'use client';
import { useEffect, useState, useRef } from 'react';
import type { IdPiece } from '@/types/maison';

interface Props {
  pieceActive: IdPiece | 'exterieur' | 'interieur';
}

const NOMS_PIECES: Record<string, string> = {
  exterieur: 'Vue Extérieure',
  interieur: 'Vue Intérieure',
  sejour: 'Séjour',
  cuisine: 'Cuisine',
  chambre: 'Chambre',
  salleDeBain: 'Salle de Bain',
  couloir: 'Couloir',
};

export function TransitionPiece({ pieceActive }: Props) {
  const [afficher, setAfficher] = useState(false);
  const piecePrecedenteRef = useRef(pieceActive);

  useEffect(() => {
    // Vérifier si la pièce a changé
    if (pieceActive !== piecePrecedenteRef.current) {
      piecePrecedenteRef.current = pieceActive;
      
      // Utiliser setTimeout pour éviter l'appel synchrone de setState
      const showTimer = setTimeout(() => {
        setAfficher(true);
      }, 0);
      
      const hideTimer = setTimeout(() => {
        setAfficher(false);
      }, 2000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [pieceActive]);

  if (!afficher) return null;

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
      {/* <div 
        className="bg-black/80 backdrop-blur-xl rounded-2xl border-2 border-white/30 px-8 py-6 shadow-2xl animate-fade-in-out"
        style={{
          animation: 'fadeInOut 2s ease-in-out',
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="text-5xl">
            {pieceActive === 'exterieur' ? '🏡' : 
             pieceActive === 'interieur' ? '🏠' :
             pieceActive === 'sejour' ? '🛋️' :
             pieceActive === 'cuisine' ? '🍳' :
             pieceActive === 'chambre' ? '🛏️' :
             pieceActive === 'salleDeBain' ? '🚿' :
             pieceActive === 'couloir' ? '🚪' : '🏠'}
          </div>
          <h2 className="text-white text-2xl font-bold">
            {NOMS_PIECES[pieceActive] || pieceActive}
          </h2>
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <span>Chargement...</span>
          </div>
        </div>
      </div>
       */}
      
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.9); }
          20% { opacity: 1; transform: scale(1); }
          80% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.9); }
        }
      `}</style>
    </div>
  );
}
