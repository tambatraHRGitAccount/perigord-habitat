"use client";

import { useState } from "react";
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Grid3x3,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Filter,
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

// Types basés sur database-supabase-minimal.sql
interface Equipement {
  id: number;
  piece_id: number;
  nom: string;
  sous_contrat: boolean;
  // Relation optionnelle pour l'affichage
  piece?: {
    nom: string;
  };
  stats?: {
    pannes: number;
  };
}

export default function EquipementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pieceFilter, setPieceFilter] = useState<string>("tous");
  const [contratFilter, setContratFilter] = useState<string>("tous");
  const [selectedEquipement, setSelectedEquipement] = useState<Equipement | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Données de démonstration
  const equipements: Equipement[] = [
    {
      id: 1,
      piece_id: 1,
      nom: "Radiateur électrique",
      sous_contrat: true,
      piece: { nom: "Séjour" },
      stats: { pannes: 3 },
    },
    {
      id: 2,
      piece_id: 1,
      nom: "Fenêtre double vitrage",
      sous_contrat: false,
      piece: { nom: "Séjour" },
      stats: { pannes: 1 },
    },
    {
      id: 3,
      piece_id: 1,
      nom: "Volet roulant électrique",
      sous_contrat: true,
      piece: { nom: "Séjour" },
      stats: { pannes: 5 },
    },
    {
      id: 4,
      piece_id: 2,
      nom: "Four encastrable",
      sous_contrat: false,
      piece: { nom: "Cuisine" },
      stats: { pannes: 2 },
    },
    {
      id: 5,
      piece_id: 2,
      nom: "Réfrigérateur",
      sous_contrat: false,
      piece: { nom: "Cuisine" },
      stats: { pannes: 4 },
    },
    {
      id: 6,
      piece_id: 2,
      nom: "Plaque de cuisson",
      sous_contrat: true,
      piece: { nom: "Cuisine" },
      stats: { pannes: 2 },
    },
    {
      id: 7,
      piece_id: 2,
      nom: "Hotte aspirante",
      sous_contrat: true,
      piece: { nom: "Cuisine" },
      stats: { pannes: 1 },
    },
    {
      id: 8,
      piece_id: 2,
      nom: "Lave-vaisselle",
      sous_contrat: false,
      piece: { nom: "Cuisine" },
      stats: { pannes: 3 },
    },
    {
      id: 9,
      piece_id: 3,
      nom: "Chauffe-eau électrique",
      sous_contrat: true,
      piece: { nom: "Salle de bain" },
      stats: { pannes: 6 },
    },
    {
      id: 10,
      piece_id: 3,
      nom: "VMC",
      sous_contrat: true,
      piece: { nom: "Salle de bain" },
      stats: { pannes: 2 },
    },
    {
      id: 11,
      piece_id: 3,
      nom: "Robinetterie",
      sous_contrat: false,
      piece: { nom: "Salle de bain" },
      stats: { pannes: 4 },
    },
    {
      id: 12,
      piece_id: 4,
      nom: "Portail automatique",
      sous_contrat: true,
      piece: { nom: "Extérieur" },
      stats: { pannes: 3 },
    },
  ];

  // Liste unique des pièces pour le filtre
  const pieces = Array.from(
    new Map(
      equipements
        .filter((e) => e.piece)
        .map((e) => [e.piece_id, { id: e.piece_id, nom: e.piece!.nom }])
    ).values()
  );

  // Fonctions utilitaires
  const getContratBadge = (sous_contrat: boolean) => {
    return sous_contrat ? (
      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
        <FileText className="w-3 h-3 mr-1" />
        Sous contrat
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
        <XCircle className="w-3 h-3 mr-1" />
        Hors contrat
      </Badge>
    );
  };

  const getPannesBadge = (pannes: number) => {
    if (pannes === 0) {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Aucune
        </Badge>
      );
    } else if (pannes <= 3) {
      return (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {pannes}
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <XCircle className="w-3 h-3 mr-1" />
          {pannes}
        </Badge>
      );
    }
  };

  // Filtrage
  const filteredEquipements = equipements.filter((equipement) => {
    const matchSearch = equipement.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchPiece =
      pieceFilter === "tous" || equipement.piece_id.toString() === pieceFilter;
    const matchContrat =
      contratFilter === "tous" ||
      (contratFilter === "sous_contrat" && equipement.sous_contrat) ||
      (contratFilter === "hors_contrat" && !equipement.sous_contrat);

    return matchSearch && matchPiece && matchContrat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
            <Package className="w-8 h-8 text-indigo-600" />
            Gestion des équipements
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredEquipements.length} équipement(s) trouvé(s)
          </p>
        </div>
        <Button
          className="gap-2 bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Nouvel équipement
        </Button>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher un équipement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={pieceFilter} onValueChange={setPieceFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Pièce" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Toutes les pièces</SelectItem>
              {pieces.map((piece) => (
                <SelectItem key={piece.id} value={piece.id.toString()}>
                  {piece.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={contratFilter} onValueChange={setContratFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Contrat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les statuts</SelectItem>
              <SelectItem value="sous_contrat">Sous contrat</SelectItem>
              <SelectItem value="hors_contrat">Hors contrat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tableau des équipements */}
      <div className="bg-white dark:bg-darkgray rounded-lg shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Équipement</TableHead>
              <TableHead>Pièce</TableHead>
              <TableHead>Statut contrat</TableHead>
              <TableHead>Pannes référencées</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  Aucun équipement trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredEquipements.map((equipement) => (
                <TableRow key={equipement.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                        <Package className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-dark dark:text-white">{equipement.nom}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: {equipement.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {equipement.piece && (
                      <div className="flex items-center gap-2">
                        <Grid3x3 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{equipement.piece.nom}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{getContratBadge(equipement.sous_contrat)}</TableCell>
                  <TableCell>
                    {equipement.stats && getPannesBadge(equipement.stats.pannes)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedEquipement(equipement)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Détails de l'équipement</DialogTitle>
                            <DialogDescription>
                              Informations complètes sur {equipement.nom}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedEquipement && (
                            <div className="space-y-6">
                              {/* En-tête */}
                              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="w-16 h-16 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                                  <Package className="w-8 h-8 text-indigo-600" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-dark dark:text-white">
                                    {selectedEquipement.nom}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    ID: {selectedEquipement.id}
                                  </p>
                                </div>
                                {getContratBadge(selectedEquipement.sous_contrat)}
                              </div>

                              {/* Informations */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Pièce
                                  </Label>
                                  {selectedEquipement.piece && (
                                    <div className="flex items-center gap-2 mt-1">
                                      <Grid3x3 className="w-5 h-5 text-gray-400" />
                                      <p className="text-base font-medium">
                                        {selectedEquipement.piece.nom}
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Statut contrat
                                  </Label>
                                  <div className="mt-1">
                                    {selectedEquipement.sous_contrat ? (
                                      <div className="flex items-center gap-2 text-blue-600">
                                        <FileText className="w-5 h-5" />
                                        <span className="font-medium">Sous contrat</span>
                                      </div>
                                    ) : (
                                      <div className="flex items-center gap-2 text-gray-600">
                                        <XCircle className="w-5 h-5" />
                                        <span className="font-medium">Hors contrat</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>


                              {/* Note sur le contrat */}
                              {selectedEquipement.sous_contrat && (
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                  <p className="text-sm text-blue-800 dark:text-blue-200">
                                    <FileText className="w-4 h-4 inline mr-1" />
                                    Cet équipement est couvert par un contrat de maintenance
                                  </p>
                                </div>
                              )}
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
            <DialogTitle>Créer un nouvel équipement</DialogTitle>
            <DialogDescription>
              Ajoutez un nouvel équipement à la base de connaissances
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="piece">Pièce</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionner une pièce" />
                </SelectTrigger>
                <SelectContent>
                  {pieces.map((piece) => (
                    <SelectItem key={piece.id} value={piece.id.toString()}>
                      {piece.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="nom">Nom de l'équipement</Label>
              <Input id="nom" placeholder="Ex: Lave-linge" className="mt-1" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sous_contrat">Sous contrat de maintenance</Label>
                <p className="text-sm text-gray-500">
                  L'équipement est-il couvert par un contrat ?
                </p>
              </div>
              <Switch id="sous_contrat" />
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
