"use client";

import { useState } from "react";
import {
  Home,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Building2,
  Users,
  AlertTriangle,
  MapPin,
  Calendar,
  Filter,
  Download,
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

// Types basés sur database-supabase-minimal.sql
interface Logement {
  id: number;
  bailleur_id: number;
  reference: string;
  adresse: string | null;
  // Relations optionnelles pour l'affichage
  bailleur?: {
    nom: string;
    couleur_primaire: string | null;
  };
  stats?: {
    locataires: number;
    incidents_actifs: number;
  };
}

export default function LogementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bailleurFilter, setBailleurFilter] = useState<string>("tous");
  const [selectedLogement, setSelectedLogement] = useState<Logement | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Données de démonstration
  const logements: Logement[] = [
    {
      id: 1,
      bailleur_id: 1,
      reference: "HSP-A-001",
      adresse: "12 Rue de la République, 75001 Paris",
      bailleur: {
        nom: "Habitat Social Paris",
        couleur_primaire: "#3B82F6",
      },
      stats: {
        locataires: 1,
        incidents_actifs: 2,
      },
    },
    {
      id: 2,
      bailleur_id: 1,
      reference: "HSP-A-002",
      adresse: "45 Avenue des Champs, 75008 Paris",
      bailleur: {
        nom: "Habitat Social Paris",
        couleur_primaire: "#3B82F6",
      },
      stats: {
        locataires: 1,
        incidents_actifs: 0,
      },
    },
    {
      id: 3,
      bailleur_id: 2,
      reference: "LC-B-101",
      adresse: "8 Boulevard Victor Hugo, 69002 Lyon",
      bailleur: {
        nom: "Logis Confort",
        couleur_primaire: "#10B981",
      },
      stats: {
        locataires: 1,
        incidents_actifs: 1,
      },
    },
    {
      id: 4,
      bailleur_id: 2,
      reference: "LC-B-102",
      adresse: null,
      bailleur: {
        nom: "Logis Confort",
        couleur_primaire: "#10B981",
      },
      stats: {
        locataires: 0,
        incidents_actifs: 0,
      },
    },
    {
      id: 5,
      bailleur_id: 3,
      reference: "RP-C-050",
      adresse: "23 Rue Pasteur, 33000 Bordeaux",
      bailleur: {
        nom: "Résidence Plus",
        couleur_primaire: "#8B5CF6",
      },
      stats: {
        locataires: 1,
        incidents_actifs: 3,
      },
    },
  ];

  // Liste unique des bailleurs pour le filtre
  const bailleurs = Array.from(
    new Map(
      logements
        .filter((l) => l.bailleur)
        .map((l) => [l.bailleur_id, { id: l.bailleur_id, nom: l.bailleur!.nom }])
    ).values()
  );

  // Filtrage
  const filteredLogements = logements.filter((logement) => {
    const matchSearch =
      logement.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (logement.adresse && logement.adresse.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchBailleur =
      bailleurFilter === "tous" || logement.bailleur_id.toString() === bailleurFilter;

    return matchSearch && matchBailleur;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
            <Home className="w-8 h-8 text-blue-600" />
            Gestion des logements
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredLogements.length} logement(s) trouvé(s)
          </p>
        </div>
        <Button
          className="gap-2 bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Nouveau logement
        </Button>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher par référence ou adresse..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={bailleurFilter} onValueChange={setBailleurFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Bailleur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les bailleurs</SelectItem>
              {bailleurs.map((bailleur) => (
                <SelectItem key={bailleur.id} value={bailleur.id.toString()}>
                  {bailleur.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tableau des logements */}
      <div className="bg-white dark:bg-darkgray rounded-lg shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Référence</TableHead>
              <TableHead>Adresse</TableHead>
              <TableHead>Bailleur</TableHead>
              <TableHead>Locataires</TableHead>
              <TableHead>Incidents</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Aucun logement trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredLogements.map((logement) => (
                <TableRow key={logement.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-blue-600" />
                      <span className="font-medium font-mono">{logement.reference}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {logement.adresse ? (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{logement.adresse}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Non renseignée</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {logement.bailleur && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            backgroundColor: logement.bailleur.couleur_primaire || "#6B7280",
                          }}
                        >
                          {logement.bailleur.nom.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm">{logement.bailleur.nom}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">
                        {logement.stats?.locataires || 0}
                      </span>
                      {logement.stats && logement.stats.locataires === 0 && (
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                          Vacant
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          logement.stats && logement.stats.incidents_actifs > 0
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`font-medium ${
                          logement.stats && logement.stats.incidents_actifs > 0
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {logement.stats?.incidents_actifs || 0}
                      </span>
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
                            onClick={() => setSelectedLogement(logement)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Détails du logement</DialogTitle>
                            <DialogDescription>
                              Informations complètes sur le logement {logement.reference}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedLogement && (
                            <div className="space-y-6">
                              {/* En-tête */}
                              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="w-16 h-16 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                  <Home className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-dark dark:text-white font-mono">
                                    {selectedLogement.reference}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    ID: {selectedLogement.id}
                                  </p>
                                </div>
                                {selectedLogement.stats && selectedLogement.stats.locataires === 0 && (
                                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                                    Vacant
                                  </Badge>
                                )}
                              </div>

                              {/* Informations */}
                              <div className="space-y-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Adresse
                                  </Label>
                                  {selectedLogement.adresse ? (
                                    <div className="flex items-start gap-2 mt-1">
                                      <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                      <p className="text-base">{selectedLogement.adresse}</p>
                                    </div>
                                  ) : (
                                    <p className="text-base text-gray-400 italic mt-1">
                                      Non renseignée
                                    </p>
                                  )}
                                </div>

                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Bailleur
                                  </Label>
                                  {selectedLogement.bailleur && (
                                    <div className="flex items-center gap-3 mt-1">
                                      <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                                        style={{
                                          backgroundColor:
                                            selectedLogement.bailleur.couleur_primaire || "#6B7280",
                                        }}
                                      >
                                        {selectedLogement.bailleur.nom.substring(0, 2).toUpperCase()}
                                      </div>
                                      <div>
                                        <p className="font-medium">{selectedLogement.bailleur.nom}</p>
                                        <p className="text-xs text-gray-500">
                                          ID: {selectedLogement.bailleur_id}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline">Fermer</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700">
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
            <DialogTitle>Créer un nouveau logement</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau logement à la plateforme
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bailleur">Bailleur</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionner un bailleur" />
                </SelectTrigger>
                <SelectContent>
                  {bailleurs.map((bailleur) => (
                    <SelectItem key={bailleur.id} value={bailleur.id.toString()}>
                      {bailleur.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reference">Référence</Label>
              <Input
                id="reference"
                placeholder="Ex: HSP-A-001"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="adresse">Adresse (optionnel)</Label>
              <Input
                id="adresse"
                placeholder="Ex: 12 Rue de la République, 75001 Paris"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
