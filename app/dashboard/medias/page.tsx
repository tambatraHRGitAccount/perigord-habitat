"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  Video,
  Mic,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  Calendar,
  AlertTriangle,
  Upload,
  Grid3x3,
  List,
  Play,
  Pause,
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
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Types basés sur database-supabase-minimal.sql
interface Media {
  id: number;
  incident_id: number;
  type_media: "photo" | "video" | "audio";
  url: string;
  analyse_ia: {
    description?: string;
    tags?: string[];
    confidence?: number;
  } | null;
  date_upload: string;
  // Relation pour l'affichage
  incident?: {
    id: number;
    titre: string;
    locataire: string;
    logement: string;
  };
}

export default function MediasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("tous");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  // Données de démonstration
  const medias: Media[] = [
    {
      id: 1,
      incident_id: 1,
      type_media: "photo",
      url: "/images/demo/fuite-eau.jpg",
      analyse_ia: {
        description: "Fuite d'eau sous l'évier de cuisine",
        tags: ["eau", "fuite", "cuisine", "plomberie"],
        confidence: 0.92,
      },
      date_upload: "2024-03-13T10:35:00Z",
      incident: {
        id: 1,
        titre: "Fuite d'eau dans la cuisine",
        locataire: "Marie Dupont",
        logement: "A101",
      },
    },
    {
      id: 2,
      incident_id: 1,
      type_media: "video",
      url: "/videos/demo/fuite-eau.mp4",
      analyse_ia: {
        description: "Vidéo montrant l'écoulement d'eau",
        tags: ["eau", "fuite", "vidéo"],
        confidence: 0.88,
      },
      date_upload: "2024-03-13T10:40:00Z",
      incident: {
        id: 1,
        titre: "Fuite d'eau dans la cuisine",
        locataire: "Marie Dupont",
        logement: "A101",
      },
    },
    {
      id: 3,
      incident_id: 2,
      type_media: "photo",
      url: "/images/demo/chauffage.jpg",
      analyse_ia: {
        description: "Radiateur froid, pas de chauffage",
        tags: ["chauffage", "radiateur", "panne"],
        confidence: 0.85,
      },
      date_upload: "2024-03-12T18:50:00Z",
      incident: {
        id: 2,
        titre: "Chauffage en panne",
        locataire: "Jean Martin",
        logement: "B205",
      },
    },
    {
      id: 4,
      incident_id: 2,
      type_media: "audio",
      url: "/audio/demo/bruit-chauffage.mp3",
      analyse_ia: {
        description: "Enregistrement audio du bruit anormal",
        tags: ["audio", "bruit", "chauffage"],
        confidence: 0.75,
      },
      date_upload: "2024-03-12T19:00:00Z",
      incident: {
        id: 2,
        titre: "Chauffage en panne",
        locataire: "Jean Martin",
        logement: "B205",
      },
    },
    {
      id: 5,
      incident_id: 3,
      type_media: "photo",
      url: "/images/demo/volet.jpg",
      analyse_ia: {
        description: "Volet cassé, mécanisme endommagé",
        tags: ["volet", "cassé", "fenêtre"],
        confidence: 0.90,
      },
      date_upload: "2024-03-11T14:25:00Z",
      incident: {
        id: 3,
        titre: "Volet cassé",
        locataire: "Sophie Bernard",
        logement: "C312",
      },
    },
    {
      id: 6,
      incident_id: 4,
      type_media: "photo",
      url: "/images/demo/electricite.jpg",
      analyse_ia: {
        description: "Tableau électrique, disjoncteur",
        tags: ["électricité", "disjoncteur", "panne"],
        confidence: 0.87,
      },
      date_upload: "2024-03-10T09:20:00Z",
      incident: {
        id: 4,
        titre: "Problème électrique",
        locataire: "Pierre Dubois",
        logement: "D108",
      },
    },
  ];

  // Fonctions utilitaires
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "photo":
        return <ImageIcon className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "audio":
        return <Mic className="w-5 h-5" />;
      default:
        return <ImageIcon className="w-5 h-5" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      photo: { label: "Photo", className: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
      video: { label: "Vidéo", className: "bg-purple-100 text-purple-700 hover:bg-purple-100" },
      audio: { label: "Audio", className: "bg-green-100 text-green-700 hover:bg-green-100" },
    };
    const variant = variants[type] || variants.photo;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filtrage
  const filteredMedias = medias.filter((media) => {
    const incidentTitre = media.incident?.titre || "";
    const incidentLocataire = media.incident?.locataire || "";
    const incidentLogement = media.incident?.logement || "";
    
    const matchSearch =
      incidentTitre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incidentLocataire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incidentLogement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      media.analyse_ia?.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchType = typeFilter === "tous" || media.type_media === typeFilter;

    return matchSearch && matchType;
  });

  // Statistiques
  const stats = {
    total: medias.length,
    photos: medias.filter((m) => m.type_media === "photo").length,
    videos: medias.filter((m) => m.type_media === "video").length,
    audios: medias.filter((m) => m.type_media === "audio").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-bold text-dark dark:text-white flex items-center gap-2">
            <ImageIcon className="w-8 h-8 text-indigo-600" />
            Gestion des médias
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {filteredMedias.length} média(s) trouvé(s)
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
            <Download className="w-4 h-4" />
            Télécharger
          </Button>
          <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700 flex-1 sm:flex-none">
            <Upload className="w-4 h-4" />
            Uploader
          </Button>
        </div>
      </div>

      {/* Filtres et vue */}
      <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher par incident, locataire, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Type de média" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les types</SelectItem>
              <SelectItem value="photo">Photos</SelectItem>
              <SelectItem value="video">Vidéos</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="flex-1"
            >
              <Grid3x3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="flex-1"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-lg">
              <ImageIcon className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Photos</p>
              <p className="text-2xl font-bold text-blue-600">{stats.photos}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ImageIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Vidéos</p>
              <p className="text-2xl font-bold text-purple-600">{stats.videos}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Video className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-darkgray p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Audio</p>
              <p className="text-2xl font-bold text-green-600">{stats.audios}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Mic className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Grille ou Liste des médias */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMedias.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              Aucun média trouvé
            </div>
          ) : (
            filteredMedias.map((media) => (
              <Dialog key={media.id}>
                <DialogTrigger asChild>
                  <div className="bg-white dark:bg-darkgray rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group">
                    {/* Aperçu */}
                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {media.type_media === "photo" && (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-20"></div>
                      )}
                      {media.type_media === "video" && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-20"></div>
                          <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                        </>
                      )}
                      {media.type_media === "audio" && (
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-20"></div>
                      )}
                      <div className="relative z-10">
                        {getTypeIcon(media.type_media)}
                      </div>
                      <div className="absolute top-2 right-2">
                        {getTypeBadge(media.type_media)}
                      </div>
                    </div>

                    {/* Informations */}
                    <div className="p-4">
                      <h3 className="font-medium text-dark dark:text-white mb-1 truncate">
                        {media.incident?.titre || "Incident inconnu"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {media.incident ? `${media.incident.locataire} - ${media.incident.logement}` : "N/A"}
                      </p>
                      {media.analyse_ia?.tags && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {media.analyse_ia.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {formatDate(media.date_upload)}
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Détails du média #{media.id}</DialogTitle>
                    <DialogDescription>
                      Incident: {media.incident?.titre || "Incident inconnu"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    {/* Aperçu grand format */}
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                      {media.type_media === "photo" && (
                        <div className="text-center">
                          <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Aperçu de la photo</p>
                        </div>
                      )}
                      {media.type_media === "video" && (
                        <div className="text-center">
                          <Video className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Lecteur vidéo</p>
                        </div>
                      )}
                      {media.type_media === "audio" && (
                        <div className="text-center">
                          <Mic className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Lecteur audio</p>
                        </div>
                      )}
                    </div>

                    {/* Informations */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Type</p>
                        <p className="text-base">{getTypeBadge(media.type_media)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Date</p>
                        <p className="text-base">{formatDate(media.date_upload)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Locataire</p>
                        <p className="text-base">{media.incident?.locataire || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Logement</p>
                        <p className="text-base">{media.incident?.logement || "N/A"}</p>
                      </div>
                    </div>

                    {/* Analyse IA */}
                    {media.analyse_ia && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Analyse IA</h4>
                        {media.analyse_ia.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {media.analyse_ia.description}
                          </p>
                        )}
                        {media.analyse_ia.tags && (
                          <div className="flex flex-wrap gap-2">
                            {media.analyse_ia.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {media.analyse_ia.confidence && (
                          <p className="text-xs text-gray-500 mt-2">
                            Confiance: {(media.analyse_ia.confidence * 100).toFixed(0)}%
                          </p>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" className="flex-1 gap-2">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2 text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))
          )}
        </div>
      ) : (
        // Vue liste
        <div className="bg-white dark:bg-darkgray rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMedias.length === 0 ? (
              <div className="text-center py-12 text-gray-500">Aucun média trouvé</div>
            ) : (
              filteredMedias.map((media) => (
                <div
                  key={media.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getTypeIcon(media.type_media)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-dark dark:text-white truncate">
                          {media.incident?.titre || "Incident inconnu"}
                        </h3>
                        {getTypeBadge(media.type_media)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {media.incident ? `${media.incident.locataire} - ${media.incident.logement}` : "N/A"}
                      </p>
                      {media.analyse_ia?.tags && (
                        <div className="flex flex-wrap gap-1">
                          {media.analyse_ia.tags.slice(0, 4).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDate(media.date_upload)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
