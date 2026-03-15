"use client";

import { useState } from "react";
import {
  Building2,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Key,
  Home,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Palette,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Types
interface Bailleur {
  id: number;
  nom: string;
  logo_url: string | null;
  couleur_primaire: string | null;
  api_key: string;
  actif: boolean;
  date_creation: string;
  stats: {
    logements: number;
    locataires: number;
    incidents_actifs: number;
  };
}

export default function BailleursPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statutFilter, setStatutFilter] = useState<string>("tous");
  const [selectedBailleur, setSelectedBailleur] = useState<Bailleur | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Données de démonstration
  const bailleurs: Bailleur[] = [
    {
      id: 1,
      nom: "Habitat Social Paris",
      logo_url: "/logos/habitat-paris.png",
      couleur_primaire: "#3B82F6",
      api_key: "hsp_live_abc123xyz789",
      actif: true,
      date_creation: "2023-01-15T10:00:00Z",
      stats: {
        logements: 89,
        locataires: 82,
        incidents_actifs: 12,
      },
    },
    {
      id: 2,
      nom: "Logis Confort",
      logo_url: "/logos/logis-confort.png",
      couleur_primaire: "#10B981",
      api_key: "lc_live_def456uvw012",
      actif: true,
      date_creation: "2023-03-20T14:30:00Z",
      stats: {
        logements: 67,
        locataires: 60,
        incidents_actifs: 8,
      },
    },
    {
      id: 3,
      nom: "Résidence Plus",
      logo_url: null,
      couleur_primaire: "#8B5CF6",
      api_key: "rp_live_ghi789rst345",
      actif: true,
      date_creation: "2023-06-10T09:15:00Z",
      stats: {
        logements: 45,
        locataires: 42,
        incidents_actifs: 5,
      },
    },
    {
      id: 4,
      nom: "Foyer Solidaire",
      logo_url: "/logos/foyer-solidaire.png",
      couleur_primaire: "#F59E0B",
      api_key: "fs_live_jkl012mno678",
      actif: false,
      date_creation: "2022-11-05T16:45:00Z",
      stats: {
        logements: 23,
        locataires: 20,
        incidents_actifs: 2,
      },
    },
  ];

  // Fonctions utilitaires
  const getStatutBadge = (actif: boolean) => {
    return actif ? (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        <CheckCircle className="w-3 h-3 mr-1" />
        Actif
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
        <XCircle className="w-3 h-3 mr-1" />
        Inactif
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const maskApiKey = (apiKey: string) => {
    const parts = apiKey.split("_");
    if (parts.length >= 3) {
      return `${parts[0]}_${parts[1]}_${"*".repeat(12)}`;
    }
    return apiKey.substring(0, 8) + "*".repeat(apiKey.length - 8);
  };

  // Filtrage
  const filteredBailleurs = bailleurs.filter((bailleur) => {
    const matchSearch = bailleur.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatut =
      statutFilter === "tous" ||
      (statutFilter === "actif" && bailleur.actif) ||
      (statutFilter === "inactif" && !bailleur.actif);

    return matchSearch && matchStatut;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 shrink-0" />
            <span className="truncate">Gestion des bailleurs</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredBailleurs.length} bailleur(s) trouvé(s)
          </p>
        </div>
        <Button
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 shrink-0"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Nouveau bailleur
        </Button>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher un bailleur..."
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
              <SelectItem value="actif">Actifs</SelectItem>
              <SelectItem value="inactif">Inactifs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tableau des bailleurs */}
      <div className="bg-white dark:bg-darkgray rounded-lg shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bailleur</TableHead>
              <TableHead>Couleur</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Logements</TableHead>
              <TableHead>Locataires</TableHead>
              <TableHead>Incidents</TableHead>
              <TableHead>API Key</TableHead>
              <TableHead>Date création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBailleurs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                  Aucun bailleur trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredBailleurs.map((bailleur) => (
                <TableRow key={bailleur.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: bailleur.couleur_primaire || "#6B7280" }}
                      >
                        {bailleur.nom.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-dark dark:text-white">{bailleur.nom}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: {bailleur.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: bailleur.couleur_primaire || "#6B7280" }}
                      ></div>
                      <span className="text-sm font-mono">{bailleur.couleur_primaire || "N/A"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatutBadge(bailleur.actif)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{bailleur.stats.logements}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{bailleur.stats.locataires}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-orange-600">
                        {bailleur.stats.incidents_actifs}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-gray-400" />
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {maskApiKey(bailleur.api_key)}
                      </code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(bailleur.date_creation)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedBailleur(bailleur)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Détails du bailleur</DialogTitle>
                            <DialogDescription>
                              Informations complètes sur {bailleur.nom}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedBailleur && (
                            <div className="space-y-6">
                              {/* En-tête avec logo */}
                              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div
                                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
                                  style={{
                                    backgroundColor: selectedBailleur.couleur_primaire || "#6B7280",
                                  }}
                                >
                                  {selectedBailleur.nom.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-dark dark:text-white">
                                    {selectedBailleur.nom}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    ID: {selectedBailleur.id}
                                  </p>
                                </div>
                                {getStatutBadge(selectedBailleur.actif)}
                              </div>

                              {/* Informations */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Couleur primaire
                                  </Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div
                                      className="w-8 h-8 rounded border border-gray-300"
                                      style={{
                                        backgroundColor: selectedBailleur.couleur_primaire || "#6B7280",
                                      }}
                                    ></div>
                                    <code className="text-sm">
                                      {selectedBailleur.couleur_primaire || "Non défini"}
                                    </code>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Date de création
                                  </Label>
                                  <p className="text-base mt-1">
                                    {formatDate(selectedBailleur.date_creation)}
                                  </p>
                                </div>
                              </div>

                              {/* API Key */}
                              <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  Clé API
                                </Label>
                                <div className="flex items-center gap-2 mt-1">
                                  <code className="flex-1 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded">
                                    {selectedBailleur.api_key}
                                  </code>
                                  <Button variant="outline" size="sm">
                                    Copier
                                  </Button>
                                </div>
                              </div>

                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline">Fermer</Button>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                              <Edit className="w-4 h-4 mr-2" />
                              Modifier
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
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

      {/* Dialog de création */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouveau bailleur</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau bailleur social à la plateforme
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom du bailleur</Label>
              <Input id="nom" placeholder="Ex: Habitat Social Paris" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="couleur">Couleur primaire</Label>
              <div className="flex gap-2 mt-1">
                <Input id="couleur" type="color" className="w-20 h-10" defaultValue="#3B82F6" />
                <Input placeholder="#3B82F6" className="flex-1" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="actif">Statut</Label>
                <p className="text-sm text-gray-500">Activer le bailleur immédiatement</p>
              </div>
              <Switch id="actif" defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
