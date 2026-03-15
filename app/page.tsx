import Link from "next/link";
import { Home, Search, Wrench, FileText, LayoutDashboard } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Qui fait quoi ?</h1>
                <p className="text-xs sm:text-sm text-gray-600">Plateforme de gestion des incidents locatifs</p>
              </div>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3 py-2 sm:px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
            >
              <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
            Un problème dans votre logement ?
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            Découvrez rapidement qui doit intervenir, qui paie, et comment résoudre votre problème
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="relative">
            <Search className="absolute left-4 sm:left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
            <input
              type="text"
              placeholder="Rechercher un problème..."
              className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-4 sm:py-6 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-base sm:text-lg shadow-lg"
            />
          </div>
        </div>

        {/* Main CTA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-16">
          <Link
            href="/schema-logement-konva"
            className="group bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="p-3 sm:p-4 bg-white/20 rounded-xl sm:rounded-2xl">
                <Home className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">Plan interactif</h3>
                <p className="text-white/90 text-sm sm:text-base">Dessin du logement avec React Konva</p>
              </div>
            </div>
            <p className="text-white/80 mb-4">
              Cliquez sur les pièces du plan de votre logement pour identifier rapidement qui doit intervenir
            </p>
            <div className="flex items-center gap-2 text-white font-semibold">
              Accéder au plan
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

          <Link
            href="/schema-logement"
            className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-gray-100 hover:border-indigo-300 transition-all"
          >
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="p-3 sm:p-4 bg-indigo-100 rounded-xl sm:rounded-2xl">
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Schéma par liste</h3>
                <p className="text-gray-600 text-sm sm:text-base">Navigation par cartes</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Version liste avec cartes dépliables pour chaque pièce de votre logement
            </p>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold group-hover:text-indigo-700">
              Accéder à la liste
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🟠</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Locataire</h4>
            <p className="text-gray-600 text-sm">
              Entretien courant et petites réparations à votre charge
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🔴</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Bailleur</h4>
            <p className="text-gray-600 text-sm">
              Grosses réparations et vétusté à la charge du bailleur
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🔵</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Contrat d'entretien</h4>
            <p className="text-gray-600 text-sm">
              Équipements couverts par un contrat (chaudière, VMC, etc.)
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
