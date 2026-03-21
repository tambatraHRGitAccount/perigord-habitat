"use client";

import { useParams, useRouter } from "next/navigation";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { TutosService } from "@/services/tutosService";
import { TutoDetailContent } from "@/components/tutos/TutoDetailContent";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function TutoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const notice = TutosService.getNoticeById(id);

  if (!notice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
        <HeaderApp />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md border border-slate-100">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold group"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <HeaderApp />
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Bouton retour amélioré */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-700 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-md hover:shadow-xl mb-8 group border border-slate-200 hover:border-indigo-600 font-medium"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Retour aux tutoriels
        </button>

        <TutoDetailContent notice={notice} />
      </main>
    </div>
  );
}
