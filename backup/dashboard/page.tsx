import Link from "next/link";
import { 
  AlertTriangle, 
  Building2, 
  Home, 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle,
  TrendingUp
} from "lucide-react";

const page = () => {
  // Données de démonstration
  const stats = [
    {
      title: "Incidents actifs",
      value: "24",
      change: "+12%",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      trend: "up"
    },
    {
      title: "Bailleurs",
      value: "8",
      change: "+2",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: "up"
    },
    {
      title: "Logements",
      value: "156",
      change: "+5",
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-100",
      trend: "up"
    },
    {
      title: "Locataires",
      value: "142",
      change: "+8",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      trend: "up"
    },
  ];

  const recentIncidents = [
    { id: 1, titre: "Fuite d'eau dans la cuisine", locataire: "Marie Dupont", statut: "nouveau", date: "Il y a 2h" },
    { id: 2, titre: "Chauffage en panne", locataire: "Jean Martin", statut: "en_cours", date: "Il y a 5h" },
    { id: 3, titre: "Volet cassé", locataire: "Sophie Bernard", statut: "nouveau", date: "Il y a 1j" },
    { id: 4, titre: "Problème électrique", locataire: "Pierre Dubois", statut: "en_cours", date: "Il y a 2j" },
  ];

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case "nouveau":
        return <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700">Nouveau</span>;
      case "en_cours":
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">En cours</span>;
      case "resolu":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Résolu</span>;
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{statut}</span>;
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-dark dark:text-white mb-2">
            Bienvenue sur Qui fait quoi
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Tableau de bord administrateur - Vue d'ensemble de la plateforme
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-darkgray p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-dark dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Incidents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-darkgray p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-dark dark:text-white">
                Incidents récents
              </h2>
              <Link
                href="/dashboard/incidents"
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Voir tout →
              </Link>
            </div>
            <div className="space-y-3">
              {recentIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-medium text-dark dark:text-white text-sm sm:text-base">
                      {incident.titre}
                    </h3>
                    {getStatutBadge(incident.statut)}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{incident.locataire}</span>
                    <span>{incident.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-darkgray p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg sm:text-xl font-bold text-dark dark:text-white mb-4">
              Actions rapides
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Link
                href="/dashboard/incidents"
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors text-center group"
              >
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-orange-600 group-hover:text-indigo-600" />
                <p className="text-sm font-medium text-dark dark:text-white">
                  Gérer incidents
                </p>
              </Link>
              <Link
                href="/dashboard/bailleurs"
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors text-center group"
              >
                <Building2 className="w-8 h-8 mx-auto mb-2 text-blue-600 group-hover:text-indigo-600" />
                <p className="text-sm font-medium text-dark dark:text-white">
                  Bailleurs
                </p>
              </Link>
              <Link
                href="/dashboard/logements"
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors text-center group"
              >
                <Home className="w-8 h-8 mx-auto mb-2 text-green-600 group-hover:text-indigo-600" />
                <p className="text-sm font-medium text-dark dark:text-white">
                  Logements
                </p>
              </Link>
              <Link
                href="/dashboard/locataires"
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors text-center group"
              >
                <Users className="w-8 h-8 mx-auto mb-2 text-purple-600 group-hover:text-indigo-600" />
                <p className="text-sm font-medium text-dark dark:text-white">
                  Locataires
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Powered by Qui fait quoi - Plateforme de gestion des incidents locatifs
          </p>
        </div>
      </div>
    </>
  );
};

export default page;
