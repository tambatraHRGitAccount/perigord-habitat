import { createClient } from "@/lib/supabase/client";
import type { Media, CreateMediaDTO } from "@/types/media";

export class MediaService {
  private supabase = createClient();

  async getMediasByIncident(incidentId: number): Promise<Media[]> {
    const { data, error } = await this.supabase
      .from("medias")
      .select("*")
      .eq("incident_id", incidentId)
      .order("date_upload", { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createMedia(media: CreateMediaDTO): Promise<Media> {
    const { data, error } = await this.supabase
      .from("medias")
      .insert(media)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async uploadFile(file: File, bucket: string = "incident-files"): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  }

  async deleteMedia(id: number): Promise<void> {
    const { error } = await this.supabase
      .from("medias")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}

export const mediaService = new MediaService();
