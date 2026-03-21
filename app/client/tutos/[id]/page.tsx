"use client";

import { useParams, useRouter } from "next/navigation";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { TutosService } from "@/services/tutosService";
import { TutoDetailContent } from "@/components/tutos/TutoDetailContent";
import { ArrowLeft, FileQuestion, Video, AlertCircle } from "lucide-react";
import { SignalerIncidentDialog } from "@/components/client/SignalerIncidentDialog";
import type { CreateIncidentDTO } from "@/types/incident";

export default function TutoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const notice = TutosService.getNoticeById(id);

  if (!notice) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <HeaderApp />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md border border-slate-100">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-indigo-100 flex items-center justify-center">
              <FileQuestion size={48} className="text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Tutoriel introuvable
            </h1>
            <p className="text-slate-600 mb-8 text-lg">
              Le tutoriel que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <button
              onClick={() => router.push("/client/tutos")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl font-semibold group"
            >
              <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
              Retour aux tutoriels
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <HeaderApp />
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Barre d'actions en haut */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-700 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-md hover:shadow-xl group border border-slate-200 hover:border-indigo-600 font-medium"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Retour aux tutoriels
          </button>

          <button
            onClick={() => {
              alert("Fonctionnalité vidéo à venir !");
            }}
            className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-xl font-medium"
          >
            <Video size={20} />
            Voir la vidéo tuto
          </button>

          <SignalerIncidentDialog 
            onSubmit={async (incident: CreateIncidentDTO) => {
              console.log("Incident signalé:", incident);
            }}
          >
            <button className="inline-flex items-center gap-2 px-5 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all shadow-md hover:shadow-xl font-medium">
              <AlertCircle size={20} />
              Signaler un incident
            </button>
          </SignalerIncidentDialog>
        </div>

        <TutoDetailContent notice={notice} />
      </main>
    </div>
  );
}
