import { Calendar, Clock, AlertTriangle, CheckCircle2, Lightbulb, Package, BookOpenCheck, Leaf, Shield, ArrowRight } from "lucide-react";
import type { Notice } from "@/types/notice";
import { getCategorieConfig, getTypeConfig } from "@/config/tutosConfig";
import { getTutoContent } from "@/data/tutosContent";

interface TutoDetailContentProps {
  notice: Notice;
}

export function TutoDetailContent({ notice }: TutoDetailContentProps) {
  const categorieConfig = getCategorieConfig(notice.categorie);
  const typeConfig = getTypeConfig(notice.type);
  const CategorieIcon = categorieConfig.icon;
  const TypeIcon = typeConfig.icon;
  
  const content = getTutoContent(notice.id);

  return (
    <div className="space-y-6">
      {/* En-tête avec design amélioré */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className={`${categorieConfig.bg} p-8 md:p-10 relative overflow-hidden`}>
          {/* Motif décoratif en arrière-plan */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
            <CategorieIcon className="w-full h-full" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-start gap-6 mb-6">
              <div className={`w-20 h-20 rounded-2xl ${categorieConfig.bg} border-4 border-white shadow-xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300`}>
                <CategorieIcon className={`w-10 h-10 ${categorieConfig.color}`} />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${categorieConfig.color} bg-white shadow-md hover:shadow-lg transition-shadow`}>
                    {notice.categorie}
                  </span>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${typeConfig.color} shadow-md hover:shadow-lg transition-shadow`}>
                    <TypeIcon size={16} />
                    {typeConfig.label}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 leading-tight">
                  {notice.titre}
                </h1>
                <p className="text-slate-700 text-xl leading-relaxed">
                  {notice.description}
                </p>
              </div>
            </div>

            {/* Métadonnées avec design amélioré */}
            <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-white/50">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <Calendar size={18} className={categorieConfig.color} />
                <span className="text-sm font-medium text-slate-700">
                  {new Date(notice.date).toLocaleDateString("fr-FR", { 
                    day: "numeric", 
                    month: "long", 
                    year: "numeric" 
                  })}
                </span>
              </div>
              {content.duree && (
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <Clock size={18} className={categorieConfig.color} />
                  <span className="text-sm font-medium text-slate-700">{content.duree}</span>
                </div>
              )}
              {content.difficulte && (
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                  <span className="text-sm font-bold text-slate-700">Difficulté: {content.difficulte}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal avec design amélioré */}
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-10 border border-slate-100">
        {/* Introduction avec style amélioré */}
        {content.introduction && (
          <div className="prose prose-lg max-w-none">
            <p className="text-slate-700 text-xl leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-2 first-letter:float-left">
              {content.introduction}
            </p>
          </div>
        )}

        {/* Matériel nécessaire avec design en grille */}
        {content.materiel && content.materiel.length > 0 && (
          <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                <Package className="text-white" size={24} />
              </div>
              Matériel nécessaire
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {content.materiel.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-blue-100">
                  <CheckCircle2 size={22} className="text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tutoriels pas à pas avec design en cartes */}
        {content.etapes && content.etapes.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
                <BookOpenCheck className="text-white" size={26} />
              </div>
              Tutoriels pas à pas
            </h2>
            <div className="space-y-6">
              {content.etapes.map((etape, index) => (
                <div key={index} className="group">
                  <div className="bg-indigo-50 rounded-2xl p-6 border-2 border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-lg">
                    <div className="flex gap-5 mb-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {etape.titre}
                        </h3>
                        <p className="text-slate-700 leading-relaxed">
                          {etape.description}
                        </p>
                      </div>
                    </div>
                    {etape.sousEtapes && etape.sousEtapes.length > 0 && (
                      <div className="grid md:grid-cols-2 gap-3 ml-0 md:ml-19">
                        {etape.sousEtapes.map((sousEtape, idx) => (
                          <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 hover:shadow-md transition-shadow border border-indigo-100">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span className="text-slate-700 text-sm">{sousEtape}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Écogestes avec design en grille */}
        {content.ecogestes && content.ecogestes.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shadow-lg">
                <Leaf className="text-white" size={26} />
              </div>
              Écogestes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.ecogestes.map((ecogeste, index) => (
                <div key={index} className="bg-green-50 rounded-xl p-5 border-2 border-green-100 hover:border-green-300 transition-all hover:shadow-lg group">
                  <div className="flex gap-4">
                    <CheckCircle2 className="text-green-600 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={24} />
                    <p className="text-slate-700 leading-relaxed">{ecogeste}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prévention des pannes avec design en grille */}
        {content.prevention && content.prevention.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg">
                <Shield className="text-white" size={26} />
              </div>
              Prévention des pannes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.prevention.map((conseil, index) => (
                <div key={index} className="bg-orange-50 rounded-xl p-5 border-2 border-orange-100 hover:border-orange-300 transition-all hover:shadow-lg group">
                  <div className="flex gap-4">
                    <Shield className="text-orange-600 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={24} />
                    <p className="text-slate-700 leading-relaxed">{conseil}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Consignes de sécurité avec design en grille */}
        {content.securite && content.securite.length > 0 && (
          <div className="bg-red-50 rounded-2xl p-8 border-l-8 border-red-500 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-lg animate-pulse">
                <AlertTriangle className="text-white" size={26} />
              </div>
              Consignes de sécurité
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {content.securite.map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-red-100">
                  <AlertTriangle className="text-red-600 shrink-0 mt-1" size={20} />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Astuces avec design en grille */}
        {content.astuces && content.astuces.length > 0 && (
          <div className="bg-yellow-50 rounded-2xl p-8 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg">
                <Lightbulb className="text-white" size={26} />
              </div>
              Astuces et conseils
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.astuces.map((astuce, index) => (
                <div key={index} className="flex items-start gap-4 bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-yellow-100 group">
                  <Lightbulb className="text-yellow-600 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={24} />
                  <span className="text-slate-700 leading-relaxed">{astuce}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quand appeler un professionnel avec design en grille */}
        {content.quandAppeler && content.quandAppeler.length > 0 && (
          <div className="bg-purple-50 rounded-2xl p-8 border-2 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg">
                <AlertTriangle className="text-white" size={26} />
              </div>
              Quand faire appel à un professionnel ?
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {content.quandAppeler.map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-white rounded-lg p-4 hover:shadow-md transition-shadow border border-purple-100">
                  <ArrowRight className="text-purple-600 shrink-0 mt-1" size={20} />
                  <span className="text-slate-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
