"use client";

import { useState } from "react";
import {
  Grid3x3,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
  Package,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
interface Piece {
  id: number;
  nom: string;
  icone_url: string | null;
  // Stats optionnelles pour l'affichage
  stats?: {
    equipements: number;
  };
}

export default function PiecesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Données de démonstration (données initiales de la base)
  const pieces: Piece[] = [
    {
      id: 1,
      nom: "Séjour",
      icone_url: "/icons/living-room.svg",
      stats: {
        equipements: 8,
      },
    },
    {
      id: 2,
      nom: "Cuisine",
      icone_url: "/icons/kitchen.svg",
      stats: {
        equipements: 12,
      },
    },
    {
      id: 3,
      nom: "Salle de bain",
      icone_url: "/icons/bathroom.svg",
      stats: {
        equipements: 10,
      },
    },
    {
      id: 4,
      nom: "Extérieur",
      icone_url: "/icons/outdoor.svg",
      stats: {
        equipements: 5,
      },
    },
    {
      id: 5,
      nom: "Chambre",
      icone_url: "/icons/bedroom.svg",
      stats: {
        equipements: 6,
      },
    },
    {
      id: 6,
      nom: "Garage",
      icone_url: null,
      stats: {
        equipements: 3,
      },
    },
  ];

  // Filtrage
  const filteredPieces = pieces.filter((piece) => {
    return piece.nom.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Statistiques globales
  const globalStats = {
    total: pieces.length,
    totalEquipements: pieces.reduce((sum, p) => sum + (p.stats?.equipements || 0), 0),
    avecIcone: pieces.filter((p) => p.icone_url !== null).length,
    sansIcone: pieces.filter((p) => p.icone_url === null).length,
  };

  // Icône par défaut pour les pièces
  const getIconeDisplay = (piece: Piece) => {
    if (piece.icone_url) {
      return (
        <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-teal-600" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <Grid3x3 className="w-6 h-6 text-gray-400" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
            <Grid3x3 className="w-8 h-8 text-teal-600" />
            Gestion des pièces
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredPieces.length} pièce(s) trouvée(s)
          </p>
        </div>
        <Button
          className="gap-2 bg-teal-600 hover:bg-teal-700 w-full sm:w-auto"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Nouvelle pièce
        </Button>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Grid3x3 className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-2xl font-bold text-dark dark:text-white">{globalStats.total}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total pièces</p>
        </div>
        <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{globalStats.totalEquipements}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Équipements</p>
        </div>
        <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <ImageIcon className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">{globalStats.avecIcone}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avec icône</p>
        </div>
        <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{globalStats.sansIcone}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Sans icône</p>
        </div>
      </div>

      {/* Recherche */}
      <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Rechercher une pièce..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Vue en grille */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPieces.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Aucune pièce trouvée
          </div>
        ) : (
          filteredPieces.map((piece) => (
            <div
              key={piece.id}
              className="bg-white dark:bg-darkgray p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                {getIconeDisplay(piece)}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => setSelectedPiece(piece)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                      <DialogHeader>
                        <DialogTitle>Détails de la pièce</DialogTitle>
                        <DialogDescription>
                          Informations complètes sur {piece.nom}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedPiece && (
                        <div className="space-y-6">
                          {/* En-tête */}
                          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            {getIconeDisplay(selectedPiece)}
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-dark dark:text-white">
                                {selectedPiece.nom}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                ID: {selectedPiece.id}
                              </p>
                            </div>
                            {selectedPiece.icone_url ? (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                <ImageIcon className="w-3 h-3 mr-1" />
                                Icône définie
                              </Badge>
                            ) : (
                              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Sans icône
                              </Badge>
                            )}
                          </div>

                          {/* Informations */}
                          <div>
                            <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              URL de l'icône
                            </Label>
                            {selectedPiece.icone_url ? (
                              <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <code className="text-sm break-all">
                                  {selectedPiece.icone_url}
                                </code>
                              </div>
                            ) : (
                              <p className="text-base text-gray-400 italic mt-1">
                                Non renseignée
                              </p>
                            )}
                          </div>

                          {/* Statistiques */}
                          <div>
                            <Label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 block">
                              Statistiques
                            </Label>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <Package className="w-6 h-6 text-blue-600 mb-2" />
                              <p className="text-2xl font-bold text-blue-600">
                                {selectedPiece.stats?.equipements || 0}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Équipement(s)
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline">Fermer</Button>
                        <Button className="bg-teal-600 hover:bg-teal-700">
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
              </div>

              <h3 className="text-lg font-semibold text-dark dark:text-white mb-2">
                {piece.nom}
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">ID</span>
                  <span className="font-medium">{piece.id}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Icône</span>
                  {piece.icone_url ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                      Définie
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 text-xs">
                      Non définie
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    Équipements
                  </span>
                  <span className="font-bold text-blue-600">
                    {piece.stats?.equipements || 0}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tableau alternatif (optionnel) */}
      <div className="bg-white dark:bg-darkgray rounded-lg shadow-md overflow-x-auto">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-dark dark:text-white flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Vue tableau
          </h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pièce</TableHead>
              <TableHead>Icône</TableHead>
              <TableHead>URL de l'icône</TableHead>
              <TableHead>Équipements</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPieces.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  Aucune pièce trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredPieces.map((piece) => (
                <TableRow key={piece.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getIconeDisplay(piece)}
                      <div>
                        <p className="font-medium text-dark dark:text-white">{piece.nom}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: {piece.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {piece.icone_url ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <ImageIcon className="w-3 h-3 mr-1" />
                        Définie
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                        Non définie
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {piece.icone_url ? (
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {piece.icone_url}
                      </code>
                    ) : (
                      <span className="text-sm text-gray-400 italic">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-600">
                        {piece.stats?.equipements || 0}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
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
            <DialogTitle>Créer une nouvelle pièce</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau type de pièce à la base de connaissances
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom de la pièce</Label>
              <Input id="nom" placeholder="Ex: Buanderie" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="icone_url">URL de l'icône (optionnel)</Label>
              <Input
                id="icone_url"
                placeholder="Ex: /icons/laundry.svg"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Chemin vers le fichier SVG de l'icône
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <Grid3x3 className="w-4 h-4 inline mr-1" />
                Les pièces initiales : Séjour, Cuisine, Salle de bain, Extérieur
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700">Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
