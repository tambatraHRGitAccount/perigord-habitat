"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Shield,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  UserCog,
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

// Types pour les utilisateurs admin
interface Utilisateur {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: "super_admin" | "admin" | "gestionnaire";
  actif: boolean;
  date_creation: string;
  derniere_connexion: string | null;
}

export default function UtilisateursPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("tous");
  const [selectedUtilisateur, setSelectedUtilisateur] = useState<Utilisateur | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Données de démonstration
  const utilisateurs: Utilisateur[] = [
    {
      id: "u1",
      email: "admin@quifaitquoi.fr",
      nom: "Administrateur",
      prenom: "Super",
      role: "super_admin",
      actif: true,
      date_creation: "2023-01-01T10:00:00Z",
      derniere_connexion: "2024-03-13T09:30:00Z",
    },
    {
      id: "u2",
      email: "marie.dupont@quifaitquoi.fr",
      nom: "Dupont",
      prenom: "Marie",
      role: "admin",
      actif: true,
      date_creation: "2023-02-15T14:00:00Z",
      derniere_connexion: "2024-03-12T16:45:00Z",
    },
    {
      id: "u3",
      email: "jean.martin@quifaitquoi.fr",
      nom: "Martin",
      prenom: "Jean",
      role: "gestionnaire",
      actif: true,
      date_creation: "2023-03-20T11:00:00Z",
      derniere_connexion: "2024-03-10T14:20:00Z",
    },
    {
      id: "u4",
      email: "sophie.bernard@quifaitquoi.fr",
      nom: "Bernard",
      prenom: "Sophie",
      role: "gestionnaire",
      actif: false,
      date_creation: "2023-04-10T09:00:00Z",
      derniere_connexion: null,
    },
  ];

  // Fonctions utilitaires
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <Shield className="w-3 h-3 mr-1" />
            Super Admin
          </Badge>
        );
      case "admin":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <UserCog className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        );
      case "gestionnaire":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            <Users className="w-3 h-3 mr-1" />
            Gestionnaire
          </Badge>
        );
      default:
        return null;
    }
  };

  const getStatutBadge = (actif: boolean) => {
    return actif ? (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        <CheckCircle className="w-3 h-3 mr-1" />
        Actif
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filtrage
  const filteredUtilisateurs = utilisateurs.filter((utilisateur) => {
    const fullName = `${utilisateur.prenom} ${utilisateur.nom}`.toLowerCase();
    const matchSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      utilisateur.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === "tous" || utilisateur.role === roleFilter;

    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
            <Users className="w-8 h-8 text-cyan-600" />
            Gestion des utilisateurs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredUtilisateurs.length} utilisateur(s) trouvé(s)
          </p>
        </div>
        <Button
          className="gap-2 bg-cyan-600 hover:bg-cyan-700 w-full sm:w-auto"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Nouvel utilisateur
        </Button>
      </div>

      {/* Filtres */}
      <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les rôles</SelectItem>
              <SelectItem value="super_admin">Super Admin</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="gestionnaire">Gestionnaire</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white dark:bg-darkgray rounded-lg shadow-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière connexion</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUtilisateurs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredUtilisateurs.map((utilisateur) => (
                <TableRow key={utilisateur.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600 font-bold">
                        {utilisateur.prenom.charAt(0)}
                        {utilisateur.nom.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-dark dark:text-white">
                          {utilisateur.prenom} {utilisateur.nom}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">ID: {utilisateur.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{utilisateur.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(utilisateur.role)}</TableCell>
                  <TableCell>{getStatutBadge(utilisateur.actif)}</TableCell>
                  <TableCell>
                    {utilisateur.derniere_connexion ? (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {formatDate(utilisateur.derniere_connexion)}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">Jamais connecté</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setSelectedUtilisateur(utilisateur)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Détails de l'utilisateur</DialogTitle>
                            <DialogDescription>
                              Informations complètes sur {utilisateur.prenom} {utilisateur.nom}
                            </DialogDescription>
                          </DialogHeader>
                          {selectedUtilisateur && (
                            <div className="space-y-6">
                              {/* En-tête */}
                              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center text-cyan-600 font-bold text-2xl">
                                  {selectedUtilisateur.prenom.charAt(0)}
                                  {selectedUtilisateur.nom.charAt(0)}
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-xl font-bold text-dark dark:text-white">
                                    {selectedUtilisateur.prenom} {selectedUtilisateur.nom}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    ID: {selectedUtilisateur.id}
                                  </p>
                                </div>
                                {getStatutBadge(selectedUtilisateur.actif)}
                              </div>

                              {/* Informations */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Email
                                  </Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <p className="text-base">{selectedUtilisateur.email}</p>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Rôle
                                  </Label>
                                  <div className="mt-1">{getRoleBadge(selectedUtilisateur.role)}</div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Date de création
                                  </Label>
                                  <p className="text-base mt-1">
                                    {formatDate(selectedUtilisateur.date_creation)}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Dernière connexion
                                  </Label>
                                  <p className="text-base mt-1">
                                    {selectedUtilisateur.derniere_connexion
                                      ? formatDate(selectedUtilisateur.derniere_connexion)
                                      : "Jamais connecté"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline">Fermer</Button>
                            <Button className="bg-cyan-600 hover:bg-cyan-700">
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
            <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
            <DialogDescription>
              Ajoutez un nouvel utilisateur administrateur
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Ex: marie.dupont@quifaitquoi.fr"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="role">Rôle</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="gestionnaire">Gestionnaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="actif">Compte actif</Label>
                <p className="text-sm text-gray-500">Activer le compte immédiatement</p>
              </div>
              <Switch id="actif" defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Annuler
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700">Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
