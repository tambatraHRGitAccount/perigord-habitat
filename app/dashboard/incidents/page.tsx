"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Calendar,
  User,
  Home,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Types
// Types basés sur database-supabase-minimal.sql
interface Incident {
  id: number;
  bailleur_id: number;
  locataire_id: number;
  logement_id: number;
  panne_id: number | null;
  titre: string;
  description: string | null;
  statut: "nouveau" | "en_cours" | "resolu" | "ferme";
  responsable_identifie: "locataire" | "bailleur" | "contrat" | "a_verifier" | null;
  diagnostic_ia: any | null;
  date_creation: string;
  // Relations pour l'affichage
  locataire?: {
    nom: string;
    prenom: string;
  };
  logement?: {
    reference: string;
    adresse: string | null;
  };
  bailleur?: {
    nom: string;
  };
}

function IncidentsContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [statutFilter, setStatutFilter] = useState<string>("tous");
  const [responsableFilter, setResponsableFilter] = useState<string>("tous");

  // Initialiser les filtres depuis l'URL
  useEffect(() => {
    const statutParam = searchParams.get("statut");
    if (statutParam) {
      setStatutFilter(statutParam);
    }
  }, [searchParams]);

  // Données de démonstration
  const incidents: Incident[] = [
    {
      id: 1,
      bailleur_id: 1,
      locataire_id: 1,
      logement_id: 1,
      panne_id: null,
      titre: "Fuite d'eau dans la cuisine",
      description: "Robinet qui fuit depuis ce matin",
      statut: "nouveau",
      responsable_identifie: "bailleur",
      diagnostic_ia: null,
      date_creation: "2024-03-13T10:30:00Z",
      locataire: { nom: "Dupont", prenom: "Marie" },
      logement: { reference: "A101", adresse: "12 rue de la Paix, 75001 Paris" },
      bailleur: { nom: "Habitat Social Paris" },
    },
    {
      id: 2,
      bailleur_id: 1,
      locataire_id: 2,
      logement_id: 2,
      panne_id: null,
      titre: "Chauffage en panne",
      description: "Plus de chauffage depuis hier soir",
      statut: "en_cours",
      responsable_identifie: "contrat",
      diagnostic_ia: null,
      date_creation: "2024-03-12T18:45:00Z",
      locataire: { nom: "Martin", prenom: "Jean" },
      logement: { reference: "B205", adresse: "45 avenue Victor Hugo, 75016 Paris" },
      bailleur: { nom: "Habitat Social Paris" },
    },
    {
      id: 3,
      bailleur_id: 2,
      locataire_id: 3,
      logement_id: 3,
      panne_id: null,
      titre: "Volet cassé",
      description: "Volet de la chambre ne ferme plus",
      statut: "nouveau",
      responsable_identifie: "a_verifier",
      diagnostic_ia: null,
      date_creation: "2024-03-11T14:20:00Z",
      locataire: { nom: "Bernard", prenom: "Sophie" },
      logement: { reference: "C312", adresse: "8 boulevard Haussmann, 75009 Paris" },
      bailleur: { nom: "Logis Confort" },
    },
    {
      id: 4,
      bailleur_id: 1,
      locataire_id: 4,
      logement_id: 4,
      panne_id: null,
      titre: "Problème électrique",
      description: "Disjoncteur qui saute régulièrement",
      statut: "en_cours",
      responsable_identifie: "bailleur",
      diagnostic_ia: null,
      date_creation: "2024-03-10T09:15:00Z",
      locataire: { nom: "Dubois", prenom: "Pierre" },
      logement: { reference: "D108", adresse: "23 rue de Rivoli, 75004 Paris" },
      bailleur: { nom: "Habitat Social Paris" },
    },
    {
      id: 5,
      bailleur_id: 2,
      locataire_id: 5,
      logement_id: 5,
      panne_id: null,
      titre: "Porte d'entrée bloquée",
      description: "Serrure défectueuse",
      statut: "resolu",
      responsable_identifie: "locataire",
      diagnostic_ia: null,
      date_creation: "2024-03-09T16:30:00Z",
      locataire: { nom: "Leroy", prenom: "Claire" },
      logement: { reference: "E201", adresse: "56 rue du Faubourg Saint-Antoine, 75012 Paris" },
      bailleur: { nom: "Logis Confort" },
    },
  ];

  // Fonctions utilitaires
  const getStatutBadge = (statut: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      nouveau: { label: "Nouveau", className: "bg-orange-100 text-orange-700 hover:bg-orange-100" },
      en_cours: { label: "En cours", className: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
      resolu: { label: "Résolu", className: "bg-green-100 text-green-700 hover:bg-green-100" },
      ferme: { label: "Fermé", className: "bg-gray-100 text-gray-700 hover:bg-gray-100" },
    };
    const variant = variants[statut] || variants.nouveau;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const getResponsableBadge = (responsable: string | null) => {
    if (!responsable) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">Non défini</Badge>;
    }
    const variants: Record<string, { label: string; className: string }> = {
      locataire: { label: "Locataire", className: "bg-purple-100 text-purple-700 hover:bg-purple-100" },
      bailleur: { label: "Bailleur", className: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100" },
      contrat: { label: "Contrat", className: "bg-cyan-100 text-cyan-700 hover:bg-cyan-100" },
      a_verifier: { label: "À vérifier", className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" },
    };
    const variant = variants[responsable] || variants.a_verifier;
    return <Badge variant="outline" className={variant.className}>{variant.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Il y a moins d'1h";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return "Il y a 1 jour";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString("fr-FR");
  };

  // Filtrage
  const filteredIncidents = incidents.filter((incident) => {
    const locataireNom = incident.locataire ? `${incident.locataire.prenom} ${incident.locataire.nom}` : "";
    const logementRef = incident.logement?.reference || "";
    
    const matchSearch =
      incident.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (incident.description && incident.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      locataireNom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      logementRef.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatut = statutFilter === "tous" || incident.statut === statutFilter;
    const matchResponsable = responsableFilter === "tous" || incident.responsable_identifie === responsableFilter;

    return matchSearch && matchStatut && matchResponsable;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            Gestion des incidents
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredIncidents.length} incident(s) trouvé(s)
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Download className="w-4 h-4" />
            Exporter
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 flex-1 sm:flex-none">
            <Plus className="w-4 h-4" />
            Nouvel incident
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher un incident..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statutFilter} onValueChange={setStatutFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les statuts</SelectItem>
              <SelectItem value="nouveau">Nouveau</SelectItem>
              <SelectItem value="en_cours">En cours</SelectItem>
              <SelectItem value="resolu">Résolu</SelectItem>
              <SelectItem value="ferme">Fermé</SelectItem>
            </SelectContent>
          </Select>
          <Select value={responsableFilter} onValueChange={setResponsableFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Responsable" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les responsables</SelectItem>
              <SelectItem value="locataire">Locataire</SelectItem>
              <SelectItem value="bailleur">Bailleur</SelectItem>
              <SelectItem value="contrat">Contrat</SelectItem>
              <SelectItem value="a_verifier">À vérifier</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tableau des incidents */}
      <div className="bg-white dark:bg-darkgray rounded-lg shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Incident</TableHead>
              <TableHead>Locataire</TableHead>
              <TableHead>Logement</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIncidents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  Aucun incident trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredIncidents.map((incident) => (
                <TableRow key={incident.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell className="font-medium">#{incident.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-dark dark:text-white">{incident.titre}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                        {incident.description || "Pas de description"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {incident.locataire ? `${incident.locataire.prenom} ${incident.locataire.nom}` : "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">{incident.logement?.reference || "N/A"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {incident.logement?.adresse || "Pas d'adresse"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatutBadge(incident.statut)}</TableCell>
                  <TableCell>{getResponsableBadge(incident.responsable_identifie)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {formatDate(incident.date_creation)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        title="Voir les détails"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}


export default function IncidentsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des incidents...</p>
        </div>
      </div>
    }>
      <IncidentsContent />
    </Suspense>
  );
}
