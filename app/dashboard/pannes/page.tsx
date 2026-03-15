"use client";

import { useState } from "react";
import {
  Wrench,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  Grid3x3,
  User,
  Building2,
  FileText,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  DollarSign,
  BookOpen,
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
import { Textarea } from "@/components/ui/textarea";

// Types basés sur database-supabase-minimal.sql
interface Panne {
  id: number;
  equipement_id: number;
  titre: string;
  description: string | null;
  responsable: "locataire" | "bailleur" | "contrat" | "a_verifier";
  qui_paie: "locataire" | "bailleur" | "bailleur_recuperable";
  reference_juridique: string | null;
  auto_depannage_etapes: any | null;
  // Relation optionnelle pour l'affichage
  equipement?: {
    nom: string;
    piece: {
      nom: string;
    };
  };
  stats?: {
    incidents_lies: number;
  };
}

export default function PannesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [responsableFilter, setResponsableFilter] = useState<string>("tous");
  const [selectedPanne, setSelectedPanne] = useState<Panne | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Données de démonstration
  const pannes: Panne[] = [
    {
      id: 1,
      equipement_id: 1,
      titre: "Radiateur ne chauffe plus",
      description: "Le radiateur électrique ne produit plus de chaleur",
      responsable: "bailleur",
      qui_paie: "bailleur",
      reference_juridique: "Article 6 de la loi du 6 juillet 1989",
      auto_depannage_etapes: null,
      equipement: {
        nom: "Radiateur électrique",
        piece: { nom: "Séjour" },
      },
      stats: { incidents_lies: 8 },
    },
    {
      id: 2,
      equipement_id: 4,
      titre: "Four ne s'allume pas",
      description: null,
      responsable: "locataire",
      qui_paie: "locataire",
      reference_juridique: "Entretien courant - Article 1754 du Code civil",
      auto_depannage_etapes: {
        etapes: [
          { ordre: 1, titre: "Vérifier l'alimentation", description: "Contrôler que le four est bien branché" },
          { ordre: 2, titre: "Tester le disjoncteur", description: "Vérifier que le disjoncteur n'a pas sauté" },
        ],
      },
      equipement: {
        nom: "Four encastrable",
        piece: { nom: "Cuisine" },
      },
      stats: { incidents_lies: 3 },
    },
    {
      id: 3,
      equipement_id: 9,
      titre: "Chauffe-eau en panne",
      description: "Plus d'eau chaude disponible",
      responsable: "contrat",
      qui_paie: "bailleur",
      reference_juridique: "Contrat de maintenance",
      auto_depannage_etapes: null,
      equipement: {
        nom: "Chauffe-eau électrique",
        piece: { nom: "Salle de bain" },
      },
      stats: { incidents_lies: 12 },
    },
    {
      id: 4,
      equipement_id: 11,
      titre: "Fuite robinet",
      description: "Le robinet fuit au niveau du joint",
      responsable: "a_verifier",
      qui_paie: "bailleur_recuperable",
      reference_juridique: "À déterminer selon l'origine de la fuite",
      auto_depannage_etapes: null,
      equipement: {
        nom: "Robinetterie",
        piece: { nom: "Salle de bain" },
      },
      stats: { incidents_lies: 5 },
    },
  ];

  // Fonctions utilitaires
  const getResponsableBadge = (responsable: string) => {
    switch (responsable) {
      case "locataire":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            <User className="w-3 h-3 mr-1" />
            Locataire
          </Badge>
        );
      case "bailleur":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Building2 className="w-3 h-3 mr-1" />
            Bailleur
          </Badge>
        );
      case "contrat":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            <FileText className="w-3 h-3 mr-1" />
            Contrat
          </Badge>
        );
      case "a_verifier":
        return (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            <HelpCircle className="w-3 h-3 mr-1" />
            À vérifier
          </Badge>
        );
      default:
        return null;
    }
  };

  const getQuiPaieBadge = (qui_paie: string) => {
    switch (qui_paie) {
      case "locataire":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            <DollarSign className="w-3 h-3 mr-1" />
            Locataire
          </Badge>
        );
      case "bailleur":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <DollarSign className="w-3 h-3 mr-1" />
            Bailleur
          </Badge>
        );
      case "bailleur_recuperable":
        return (
          <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
            <DollarSign className="w-3 h-3 mr-1" />
            Bailleur (récupérable)
          </Badge>
        );
      default:
        return null;
    }
  };

  // Filtrage
  const filteredPannes = pannes.filter((panne) => {
    const matchSearch =
      panne.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (panne.description && panne.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (panne.equipement && panne.equipement.nom.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchResponsable =
      responsableFilter === "tous" || panne.responsable === responsableFilter;

    return matchSearch && matchResponsable;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
            <Wrench className="w-8 h-8 text-amber-600" />
            Base de connaissances - Pannes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredPannes.length} panne(s) trouvée(s)
          </p>
        </div>
        <Button
          className="gap-2 bg-amber-600 hover:bg-amber-700 w-full sm:w-auto"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Nouvelle panne
        </Button>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher une panne..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
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

      {/* Tableau des pannes */}
      <div className="bg-white dark:bg-darkgray rounded-lg shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Panne</TableHead>
              <TableHead>Équipement</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Qui paie</TableHead>
              <TableHead>Auto-dépannage</TableHead>
              <TableHead>Incidents liés</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPannes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  Aucune panne trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredPannes.map((panne) => (
                <TableRow key={panne.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-dark dark:text-white">{panne.titre}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: {panne.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {panne.equipement && (
                      <div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium">{panne.equipement.nom}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Grid3x3 className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{panne.equipement.piece.nom}</span>
                        </div>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{getResponsableBadge(panne.responsable)}</TableCell>
                  <TableCell>{getQuiPaieBadge(panne.qui_paie)}</TableCell>
                  <TableCell>
                    {panne.auto_depannage_etapes ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Disponible
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                        Non disponible
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-amber-600">
                      {panne.stats?.incidents_lies || 0}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedPanne(panne)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Détails de la panne</DialogTitle>
                            <DialogDescription>{panne.titre}</DialogDescription>
                          </DialogHeader>
                          {selectedPanne && (
                            <div className="space-y-6">
                              {/* En-tête */}
                              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="w-16 h-16 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                                  <Wrench className="w-8 h-8 text-amber-600" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-dark dark:text-white">
                                    {selectedPanne.titre}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    ID: {selectedPanne.id}
                                  </p>
                                </div>
                              </div>

                              {/* Description */}
                              {selectedPanne.description && (
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Description
                                  </Label>
                                  <p className="text-base mt-1">{selectedPanne.description}</p>
                                </div>
                              )}

                              {/* Équipement */}
                              {selectedPanne.equipement && (
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Équipement concerné
                                  </Label>
                                  <div className="mt-1 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                      <Package className="w-5 h-5 text-indigo-600" />
                                      <span className="font-medium">{selectedPanne.equipement.nom}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Grid3x3 className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {selectedPanne.equipement.piece.nom}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Responsabilités */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Responsable
                                  </Label>
                                  <div className="mt-1">{getResponsableBadge(selectedPanne.responsable)}</div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Qui paie
                                  </Label>
                                  <div className="mt-1">{getQuiPaieBadge(selectedPanne.qui_paie)}</div>
                                </div>
                              </div>

                              {/* Référence juridique */}
                              {selectedPanne.reference_juridique && (
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Référence juridique
                                  </Label>
                                  <div className="mt-1 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                      <FileText className="w-4 h-4 inline mr-1" />
                                      {selectedPanne.reference_juridique}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Auto-dépannage */}
                              {selectedPanne.auto_depannage_etapes && (
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 block">
                                    Guide d'auto-dépannage
                                  </Label>
                                  <div className="space-y-2">
                                    {selectedPanne.auto_depannage_etapes.etapes?.map((etape: any, index: number) => (
                                      <div
                                        key={index}
                                        className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                                      >
                                        <div className="flex items-start gap-2">
                                          <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                            {etape.ordre}
                                          </div>
                                          <div>
                                            <p className="font-medium text-green-800 dark:text-green-200">
                                              {etape.titre}
                                            </p>
                                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                              {etape.description}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline">Fermer</Button>
                            <Button className="bg-amber-600 hover:bg-amber-700">
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer une nouvelle panne</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle panne à la base de connaissances
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="titre">Titre de la panne</Label>
              <Input id="titre" placeholder="Ex: Radiateur ne chauffe plus" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="description">Description (optionnel)</Label>
              <Textarea
                id="description"
                placeholder="Description détaillée de la panne..."
                className="mt-1"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="equipement">Équipement</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionner un équipement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Radiateur électrique (Séjour)</SelectItem>
                  <SelectItem value="4">Four encastrable (Cuisine)</SelectItem>
                  <SelectItem value="9">Chauffe-eau électrique (Salle de bain)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="responsable">Responsable</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Qui est responsable" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="locataire">Locataire</SelectItem>
                    <SelectItem value="bailleur">Bailleur</SelectItem>
                    <SelectItem value="contrat">Contrat</SelectItem>
                    <SelectItem value="a_verifier">À vérifier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="qui_paie">Qui paie</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Qui paie la réparation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="locataire">Locataire</SelectItem>
                    <SelectItem value="bailleur">Bailleur</SelectItem>
                    <SelectItem value="bailleur_recuperable">Bailleur (récupérable)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="reference_juridique">Référence juridique (optionnel)</Label>
              <Input
                id="reference_juridique"
                placeholder="Ex: Article 6 de la loi du 6 juillet 1989"
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700">Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
