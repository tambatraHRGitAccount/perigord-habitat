"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  Mail,
  Home,
  Building2,
  AlertTriangle,
  Calendar,
  CheckCircle,
  XCircle,
  MapPin,
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
interface Locataire {
  id: number;
  user_id: string; // UUID de auth.users
  bailleur_id: number;
  nom: string;
  prenom: string;
  telephone: string | null;
  date_creation: string;
  // Relations optionnelles pour l'affichage
  bailleur?: {
    nom: string;
    couleur_primaire: string | null;
  };
  logement?: {
    reference: string;
    adresse: string | null;
  };
  stats?: {
    incidents_total: number;
    incidents_actifs: number;
  };
}

export default function LocatairesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bailleurFilter, setBailleurFilter] = useState<string>("tous");
  const [selectedLocataire, setSelectedLocataire] = useState<Locataire | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Données de démonstration
  const locataires: Locataire[] = [
    {
      id: 1,
      user_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      bailleur_id: 1,
      nom: "Dupont",
      prenom: "Marie",
      telephone: "06 12 34 56 78",
      date_creation: "2023-01-15T10:00:00Z",
      bailleur: {
        nom: "Habitat Social Paris",
        couleur_primaire: "#3B82F6",
      },
      logement: {
        reference: "HSP-A-001",
        adresse: "12 Rue de la République, 75001 Paris",
      },
      stats: {
        incidents_total: 8,
        incidents_actifs: 2,
      },
    },
    {
      id: 2,
      user_id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      bailleur_id: 1,
      nom: "Martin",
      prenom: "Jean",
      telephone: "06 23 45 67 89",
      date_creation: "2023-02-20T14:30:00Z",
      bailleur: {
        nom: "Habitat Social Paris",
        couleur_primaire: "#3B82F6",
      },
      logement: {
        reference: "HSP-A-002",
        adresse: "45 Avenue des Champs, 75008 Paris",
      },
      stats: {
        incidents_total: 3,
        incidents_actifs: 0,
      },
    },
    {
      id: 3,
      user_id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
      bailleur_id: 2,
      nom: "Bernard",
      prenom: "Sophie",
      telephone: null,
      date_creation: "2023-03-10T09:15:00Z",
      bailleur: {
        nom: "Logis Confort",
        couleur_primaire: "#10B981",
      },
      logement: {
        reference: "LC-B-101",
        adresse: "8 Boulevard Victor Hugo, 69002 Lyon",
      },
      stats: {
        incidents_total: 5,
        incidents_actifs: 1,
      },
    },
    {
      id: 4,
      user_id: "d4e5f6a7-b8c9-0123-def1-234567890123",
      bailleur_id: 2,
      nom: "Petit",
      prenom: "Lucas",
      telephone: "06 45 67 89 01",
      date_creation: "2023-04-05T16:45:00Z",
      bailleur: {
        nom: "Logis Confort",
        couleur_primaire: "#10B981",
      },
      logement: {
        reference: "LC-B-102",
        adresse: null,
      },
      stats: {
        incidents_total: 2,
        incidents_actifs: 0,
      },
    },
    {
      id: 5,
      user_id: "e5f6a7b8-c9d0-1234-ef12-345678901234",
      bailleur_id: 3,
      nom: "Moreau",
      prenom: "Emma",
      telephone: "06 56 78 90 12",
      date_creation: "2023-05-12T11:20:00Z",
      bailleur: {
        nom: "Résidence Plus",
        couleur_primaire: "#8B5CF6",
      },
      logement: {
        reference: "RP-C-050",
        adresse: "23 Rue Pasteur, 33000 Bordeaux",
      },
      stats: {
        incidents_total: 12,
        incidents_actifs: 3,
      },
    },
  ];

  // Liste unique des bailleurs pour le filtre
  const bailleurs = Array.from(
    new Map(
      locataires
        .filter((l) => l.bailleur)
        .map((l) => [l.bailleur_id, { id: l.bailleur_id, nom: l.bailleur!.nom }])
    ).values()
  );

  // Fonctions utilitaires
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getIncidentsBadge = (actifs: number) => {
    if (actifs === 0) {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Aucun
        </Badge>
      );
    } else if (actifs <= 2) {
      return (
        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
          <AlertTriangle className="w-3 h-3 mr-1" />
          {actifs}
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          <XCircle className="w-3 h-3 mr-1" />
          {actifs}
        </Badge>
      );
    }
  };

  // Filtrage
  const filteredLocataires = locataires.filter((locataire) => {
    const fullName = `${locataire.prenom} ${locataire.nom}`.toLowerCase();
    const matchSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      (locataire.telephone && locataire.telephone.includes(searchTerm)) ||
      (locataire.logement && locataire.logement.reference.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchBailleur =
      bailleurFilter === "tous" || locataire.bailleur_id.toString() === bailleurFilter;

    return matchSearch && matchBailleur;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
            <Users className="w-8 h-8 text-purple-600" />
            Gestion des locataires
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredLocataires.length} locataire(s) trouvé(s)
          </p>
        </div>
        <Button
          className="gap-2 bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Nouveau locataire
        </Button>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom, téléphone ou logement..."
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

      {/* Tableau des locataires */}
      <div className="bg-white dark:bg-darkgray rounded-lg shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Locataire</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Bailleur</TableHead>
              <TableHead>Logement</TableHead>
              <TableHead>Incidents actifs</TableHead>
              <TableHead>Total incidents</TableHead>
              <TableHead>Date création</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLocataires.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  Aucun locataire trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredLocataires.map((locataire) => (
                <TableRow key={locataire.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 font-bold">
                        {locataire.prenom.charAt(0)}
                        {locataire.nom.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-dark dark:text-white">
                          {locataire.prenom} {locataire.nom}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: {locataire.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {locataire.telephone ? (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{locataire.telephone}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Non renseigné</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {locataire.bailleur && (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            backgroundColor: locataire.bailleur.couleur_primaire || "#6B7280",
                          }}
                        >
                          {locataire.bailleur.nom.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm">{locataire.bailleur.nom}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {locataire.logement && (
                      <div>
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium font-mono">
                            {locataire.logement.reference}
                          </span>
                        </div>
                        {locataire.logement.adresse && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                            {locataire.logement.adresse}
                          </p>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {locataire.stats && getIncidentsBadge(locataire.stats.incidents_actifs)}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{locataire.stats?.incidents_total || 0}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {formatDate(locataire.date_creation)}
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
                            onClick={() => setSelectedLocataire(locataire)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Détails du locataire</DialogTitle>
                            <DialogDescription>
                              Informations complètes sur {locataire.prenom} {locataire.nom}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedLocataire && (
                            <div className="space-y-6">
                              {/* En-tête */}
                              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 font-bold text-2xl">
                                  {selectedLocataire.prenom.charAt(0)}
                                  {selectedLocataire.nom.charAt(0)}
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-dark dark:text-white">
                                    {selectedLocataire.prenom} {selectedLocataire.nom}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    ID: {selectedLocataire.id} • User ID: {selectedLocataire.user_id.substring(0, 8)}...
                                  </p>
                                </div>
                              </div>

                              {/* Informations de contact */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Téléphone
                                  </Label>
                                  {selectedLocataire.telephone ? (
                                    <div className="flex items-center gap-2 mt-1">
                                      <Phone className="w-4 h-4 text-gray-400" />
                                      <p className="text-base">{selectedLocataire.telephone}</p>
                                    </div>
                                  ) : (
                                    <p className="text-base text-gray-400 italic mt-1">
                                      Non renseigné
                                    </p>
                                  )}
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Date de création
                                  </Label>
                                  <p className="text-base mt-1">
                                    {formatDate(selectedLocataire.date_creation)}
                                  </p>
                                </div>
                              </div>

                              {/* Bailleur */}
                              <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  Bailleur
                                </Label>
                                {selectedLocataire.bailleur && (
                                  <div className="flex items-center gap-3 mt-1">
                                    <div
                                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                                      style={{
                                        backgroundColor:
                                          selectedLocataire.bailleur.couleur_primaire || "#6B7280",
                                      }}
                                    >
                                      {selectedLocataire.bailleur.nom.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                      <p className="font-medium">{selectedLocataire.bailleur.nom}</p>
                                      <p className="text-xs text-gray-500">
                                        ID: {selectedLocataire.bailleur_id}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Logement */}
                              <div>
                                <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  Logement
                                </Label>
                                {selectedLocataire.logement && (
                                  <div className="mt-1 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Home className="w-5 h-5 text-blue-600" />
                                      <span className="font-medium font-mono">
                                        {selectedLocataire.logement.reference}
                                      </span>
                                    </div>
                                    {selectedLocataire.logement.adresse ? (
                                      <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                          {selectedLocataire.logement.adresse}
                                        </p>
                                      </div>
                                    ) : (
                                      <p className="text-sm text-gray-400 italic ml-7">
                                        Adresse non renseignée
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>

                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline">Fermer</Button>
                            <Button className="bg-purple-600 hover:bg-purple-700">
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
            <DialogTitle>Créer un nouveau locataire</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau locataire à la plateforme
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" placeholder="Ex: Marie" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" placeholder="Ex: Dupont" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="telephone">Téléphone (optionnel)</Label>
              <Input
                id="telephone"
                type="tel"
                placeholder="Ex: 06 12 34 56 78"
                className="mt-1"
              />
            </div>
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
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <Mail className="w-4 h-4 inline mr-1" />
                L'email et le mot de passe seront configurés via Supabase Auth
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
