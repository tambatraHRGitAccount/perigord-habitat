"use client";

import { useState, useRef } from "react";
import { Plus, ArrowLeft, ArrowRight, Upload, Info, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CreateIncidentDTO, IncidentPriorite, IncidentTypeSinistre } from "@/types/incident";

/* ── données ── */
const PIECES = ["Cuisine", "Salle de bain", "Chambre", "Salon", "WC", "Entrée", "Buanderie", "Autre"];
const PRIORITES: { value: IncidentPriorite; label: string }[] = [
  { value: "basse",    label: "Basse"   },
  { value: "normale",  label: "Normale" },
  { value: "haute",    label: "Haute"   },
  { value: "urgente",  label: "Urgente" },
];
const TYPES_SINISTRE: { value: IncidentTypeSinistre; label: string; description: string }[] = [
  { value: "sinistre",   label: "Sinistre",    description: "Dégâts des eaux, incendie, catastrophe naturelle, etc." },
  { value: "vandalisme", label: "Vandalisme",  description: "Dégradations volontaires par un tiers, vol, tentative d'effraction." },
  { value: "vetuste",    label: "Vétusté",     description: "Usure naturelle liée au temps ou au défaut d'entretien." },
];
const TOTAL_STEPS = 3;

interface Props {
  onSubmit: (incident: CreateIncidentDTO) => Promise<void>;
}

/* ── composant barre de progression ── */
function StepBar({ step }: { step: number }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span className="font-medium text-indigo-600">
          {step === 1 ? "Type d'incident" : step === 2 ? "Localisation" : "Confirmation"}
        </span>
        <span>Étape {step} sur {TOTAL_STEPS}</span>
      </div>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function SignalerIncidentDialog({ onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  /* étape 1 */
  const [typeSinistre, setTypeSinistre] = useState<IncidentTypeSinistre | "">("");
  const [description, setDescription] = useState("");
  const [fichiers, setFichiers] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  /* étape 2 */
  const [titre, setTitre] = useState("");
  const [piece, setPiece] = useState("");
  const [priorite, setPriorite] = useState<IncidentPriorite>("normale");

  const reset = () => {
    setStep(1);
    setTypeSinistre(""); setDescription(""); setFichiers([]);
    setTitre(""); setPiece(""); setPriorite("normale");
  };

  const handleClose = (v: boolean) => { if (!v) reset(); setOpen(v); };

  const canNext1 = typeSinistre !== "" && description.trim().length > 0;
  const canNext2 = titre.trim().length > 0 && piece !== "";

  const handleSubmit = async () => {
    if (!typeSinistre || !piece) return;
    try {
      await onSubmit({
        titre: titre || `${TYPES_SINISTRE.find(t => t.value === typeSinistre)?.label} — ${piece}`,
        piece,
        priorite,
        type_sinistre: typeSinistre,
        description,
        preuves: fichiers.map((f) => f.name),
      });
      handleClose(false);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button className="gap-2"><Plus size={16} /> Signaler un incident</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="text-gray-400 hover:text-gray-700 transition-colors">
                <ArrowLeft size={18} />
              </button>
            )}
            <DialogTitle className="text-base">Signaler un incident</DialogTitle>
          </div>
          <StepBar step={step} />
        </DialogHeader>

        {/* ── Étape 1 : Type de sinistre ── */}
        {step === 1 && (
          <div className="flex flex-col gap-5 pt-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Quel est le type de sinistre ?</h2>
              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Sélectionnez la catégorie qui correspond le mieux à votre situation pour nous aider à traiter votre demande rapidement.
              </p>
            </div>

            {/* Radio cards */}
            <div className="flex flex-col gap-2">
              {TYPES_SINISTRE.map(({ value, label, description: desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTypeSinistre(value)}
                  className={`flex items-start justify-between gap-3 p-4 rounded-xl border text-left transition-all ${
                    typeSinistre === value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 bg-white hover:border-indigo-200"
                  }`}
                >
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                  <div className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                    typeSinistre === value ? "border-indigo-600 bg-indigo-600" : "border-gray-300"
                  }`}>
                    {typeSinistre === value && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="desc">Description détaillée</Label>
              <Textarea
                id="desc"
                placeholder="Décrivez précisément les faits, la date et l'heure approximative…"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Upload */}
            <div className="flex flex-col gap-1.5">
              <Label>Preuves (Photos/Vidéos)</Label>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-6 hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors"
              >
                <Upload size={24} className="text-gray-400" />
                <span className="text-sm text-gray-500">Cliquez pour ajouter des fichiers</span>
                <span className="text-xs text-gray-400">PNG, JPG ou MP4 · Max 50MB</span>
              </button>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/*,video/mp4"
                className="hidden"
                onChange={(e) => setFichiers(Array.from(e.target.files ?? []))}
              />
              {fichiers.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {fichiers.map((f, i) => (
                    <span key={i} className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
                      {f.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Contexte légal */}
            <div className="flex gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-blue-700">Contexte Légal</p>
                <p className="text-xs text-blue-600 leading-relaxed">
                  Toute fausse déclaration peut entraîner la nullité du contrat et des poursuites pénales conformément à l'article L113-8 du Code des assurances.
                </p>
                <button className="self-start flex items-center gap-1 text-xs font-medium text-blue-700 hover:underline mt-0.5">
                  Consulter les conditions générales <ExternalLink size={11} />
                </button>
              </div>
            </div>

            <Button onClick={() => setStep(2)} disabled={!canNext1} className="gap-2 w-full">
              Suivant <ArrowRight size={16} />
            </Button>
          </div>
        )}

        {/* ── Étape 2 : Localisation & priorité ── */}
        {step === 2 && (
          <div className="flex flex-col gap-5 pt-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Où se situe le problème ?</h2>
              <p className="text-sm text-gray-500 mt-1">Précisez la pièce concernée et l'urgence de la situation.</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="titre-inc">Titre de l'incident</Label>
              <Input
                id="titre-inc"
                placeholder="Ex : Fuite d'eau sous l'évier"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Pièce concernée</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PIECES.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPiece(p)}
                    className={`py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                      piece === p
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-600 hover:border-indigo-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Niveau d'urgence</Label>
              <div className="grid grid-cols-2 gap-2">
                {PRIORITES.map(({ value, label }) => {
                  const colors: Record<string, string> = {
                    basse: "border-gray-300 text-gray-600",
                    normale: "border-yellow-400 text-yellow-700",
                    haute: "border-orange-400 text-orange-700",
                    urgente: "border-red-500 text-red-700",
                  };
                  const active: Record<string, string> = {
                    basse: "bg-gray-50 border-gray-400",
                    normale: "bg-yellow-50 border-yellow-500",
                    haute: "bg-orange-50 border-orange-500",
                    urgente: "bg-red-50 border-red-600",
                  };
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPriorite(value)}
                      className={`py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                        priorite === value ? active[value] : "border-gray-200 text-gray-500"
                      } ${colors[value]}`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button onClick={() => setStep(3)} disabled={!canNext2} className="gap-2 w-full">
              Suivant <ArrowRight size={16} />
            </Button>
          </div>
        )}

        {/* ── Étape 3 : Confirmation ── */}
        {step === 3 && (
          <div className="flex flex-col gap-5 pt-2">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Récapitulatif</h2>
              <p className="text-sm text-gray-500 mt-1">Vérifiez les informations avant d'envoyer votre signalement.</p>
            </div>

            <div className="flex flex-col gap-3 bg-gray-50 rounded-xl p-4 text-sm">
              <Row label="Type" value={TYPES_SINISTRE.find(t => t.value === typeSinistre)?.label ?? ""} />
              <Row label="Titre" value={titre || `${TYPES_SINISTRE.find(t => t.value === typeSinistre)?.label} — ${piece}`} />
              <Row label="Pièce" value={piece} />
              <Row label="Priorité" value={PRIORITES.find(p => p.value === priorite)?.label ?? ""} />
              <Row label="Description" value={description} />
              {fichiers.length > 0 && (
                <Row label="Fichiers" value={`${fichiers.length} fichier(s) joint(s)`} />
              )}
            </div>

            <div className="flex gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
              <Check size={16} className="text-green-600 shrink-0 mt-0.5" />
              <p className="text-xs text-green-700 leading-relaxed">
                Votre signalement sera transmis à votre gestionnaire. Vous recevrez une confirmation et un suivi dans vos notifications.
              </p>
            </div>

            <Button onClick={handleSubmit} className="gap-2 w-full bg-indigo-600 hover:bg-indigo-700">
              <Check size={16} /> Envoyer le signalement
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-400 w-24 shrink-0">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );
}
