"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Panne } from "@/types/panne";
import { INTERVENANT_CONFIG, PAYEUR_CONFIG } from "@/types/panne";
import { User, Wallet, Scale, CheckCircle2 } from "lucide-react";

interface PanneDetailModalProps {
  panne: Panne | null;
  open: boolean;
  onClose: () => void;
}

export function PanneDetailModal({ panne, open, onClose }: PanneDetailModalProps) {
  if (!panne) return null;

  const intervenantConfig = INTERVENANT_CONFIG[panne.intervenant];
  const payeurConfig = PAYEUR_CONFIG[panne.payeur];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{panne.nom}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 mt-4">
          {/* Qui doit intervenir */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User size={16} />
              Qui doit intervenir ?
            </div>
            <div className={`flex items-center gap-2 p-3 rounded-lg ${intervenantConfig.bg}`}>
              <span className="text-2xl">{intervenantConfig.emoji}</span>
              <span className={`font-semibold ${intervenantConfig.color}`}>
                {intervenantConfig.label}
              </span>
            </div>
          </div>

          {/* Qui paie */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Wallet size={16} />
              Qui paie ?
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <span className="font-semibold text-gray-900">{payeurConfig.label}</span>
            </div>
          </div>

          {/* Pourquoi */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Scale size={16} />
              Pourquoi ?
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-sm text-blue-900 leading-relaxed">{panne.raison}</p>
            </div>
          </div>

          {/* Comment diagnostiquer */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <CheckCircle2 size={16} />
              Comment diagnostiquer ?
            </div>
            <div className="flex flex-col gap-2">
              {panne.diagnostic.map((question, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 rounded-lg bg-gray-50">
                  <span className="text-gray-400 font-mono text-sm mt-0.5">✓</span>
                  <span className="text-sm text-gray-700">{question}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badge zone */}
          <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
            <Badge variant="outline" className="capitalize">
              {panne.zone.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
