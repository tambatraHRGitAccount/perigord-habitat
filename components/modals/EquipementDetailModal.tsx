'use client';
import React from 'react';
import type { Equipement } from '@/types/equipement';

interface Props {
  equipement: Equipement | null;
  onClose: () => void;
}

export function EquipementDetailModal({ equipement, onClose }: Props) {
  if (!equipement) return null;

  const getBadgeColor = () => {
    switch (equipement.typeRemarque) {
      case 'bailleur':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'locataire':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'contrat':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-5 flex items-center justify-between border-b border-indigo-800">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">{equipement.nom}</h2>
            <p className="text-indigo-100 text-sm mt-1">{equipement.piece}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors ml-4"
            aria-label="Fermer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Responsable */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Responsable
            </h3>
            <div className={`inline-flex items-center px-4 py-2.5 rounded-lg border-2 font-semibold text-base ${getBadgeColor()}`}>
              {equipement.responsable}
            </div>
          </div>

          {/* Informations principales */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Charge locative</div>
              <div className="font-semibold text-gray-900 text-base">
                {equipement.chargeLocative ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Oui
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Non
                  </span>
                )}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Contrat de maintenance</div>
              <div className="font-semibold text-gray-900 text-base">
                {equipement.contratMaintenance ? (
                  <span className="text-green-600 flex items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Oui
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Non
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Référence légale */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Référence légale
            </h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-4">
              <p className="text-gray-700 text-sm leading-relaxed">{equipement.referenceLegale}</p>
            </div>
          </div>

          {/* Remarque */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Remarque
            </h3>
            <div className={`border-l-4 rounded-r-lg p-4 ${
              equipement.typeRemarque === 'bailleur' ? 'bg-blue-50 border-blue-400' :
              equipement.typeRemarque === 'locataire' ? 'bg-orange-50 border-orange-400' :
              'bg-purple-50 border-purple-400'
            }`}>
              <p className="text-gray-700 text-sm leading-relaxed">{equipement.remarque}</p>
            </div>
          </div>

          {/* ID (pour référence) */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-400 font-mono">ID: {equipement.id}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
          >
            Fermer
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
