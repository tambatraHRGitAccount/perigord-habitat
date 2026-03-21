export type MediaType = "photo" | "video" | "audio";

export interface Media {
  id: number;
  incident_id: number;
  type_media: MediaType;
  url: string;
  taille_octets?: number;
  analyse_ia?: any;
  date_upload: string;
}

export interface CreateMediaDTO {
  incident_id: number;
  type_media: MediaType;
  url: string;
  taille_octets?: number;
}
