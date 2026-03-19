"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthContext } from "@/providers/AuthProvider";

export type AttachedMedia = {
  name: string;
  type: "image" | "video" | "file";
  url?: string;
  storage_path?: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  medias?: AttachedMedia[];
};

export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
};

function buildSimulatedResponse(text: string, medias: AttachedMedia[]): string {
  const hasImage = medias.some((m) => m.type === "image");
  const hasVideo = medias.some((m) => m.type === "video");
  const hasFile = medias.some((m) => m.type === "file");

  const parts: string[] = [];

  if (hasImage) parts.push("📷 Image reçue.");
  if (hasVideo) parts.push("🎥 Vidéo reçue.");
  if (hasFile) parts.push("📄 Document reçu.");

  if (text) {
    const lower = text.toLowerCase();
    if (lower.includes("fuite") || lower.includes("eau")) {
      parts.push("💧 Concernant la fuite d'eau : c'est généralement la responsabilité du propriétaire si c'est une canalisation encastrée, ou du locataire s'il s'agit d'un joint ou robinet.");
    } else if (lower.includes("chauffage") || lower.includes("chaud")) {
      parts.push("🔥 Pour le chauffage : le propriétaire est responsable du bon fonctionnement de l'installation. Signalez-le par écrit en recommandé.");
    } else if (lower.includes("serrure") || lower.includes("porte")) {
      parts.push("🔑 Pour la serrure : si la dégradation est due à l'usure normale, c'est au propriétaire d'intervenir. Si c'est suite à une négligence, c'est au locataire.");
    } else if (lower.includes("dégât") || lower.includes("sinistre")) {
      parts.push("🏠 Pour un dégât des eaux : contactez votre assurance dans les 5 jours ouvrés et informez votre propriétaire immédiatement.");
    } else if (text) {
      parts.push(`Je prends en compte votre demande : "${text}". Une analyse détaillée est en cours pour identifier les responsabilités et les démarches à suivre.`);
    }
  }

  if (parts.length === 0) {
    parts.push("Bonjour ! Comment puis-je vous aider avec votre logement ?");
  }

  return parts.join("\n\n");
}

export function useChat() {
  const supabase = useMemo(() => createClient(), []);
  const { user, loading: authLoading } = useAuthContext();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  // Charge les conversations quand l'user est prêt
  useEffect(() => {
    if (authLoading) return;
    if (!user) { setLoading(false); return; }
    loadConversations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user?.id]);

  const loadConversations = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("conversations")
      .select("id, title")
      .order("updated_at", { ascending: false });

    if (data) {
      setConversations(data.map((c) => ({ id: c.id, title: c.title, messages: [] })));
    }
    setLoading(false);
  };

  const loadMessages = useCallback(async (convId: string): Promise<ChatMessage[]> => {
    const { data: msgs } = await supabase
      .from("messages")
      .select("id, role, content, message_medias(id, name, media_type, storage_path)")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true });

    if (!msgs) return [];

    const result: ChatMessage[] = await Promise.all(
      msgs.map(async (msg) => {
        const rawMedias = (msg.message_medias ?? []) as {
          id: string;
          name: string;
          media_type: string;
          storage_path: string | null;
        }[];

        const medias: AttachedMedia[] = await Promise.all(
          rawMedias.map(async (m) => {
            let url: string | undefined;
            if ((m.media_type === "image" || m.media_type === "video") && m.storage_path) {
              const { data } = await supabase.storage
                .from("chat-medias")
                .createSignedUrl(m.storage_path, 3600);
              url = data?.signedUrl;
            }
            return {
              name: m.name,
              type: m.media_type as "image" | "video" | "file",
              url,
              storage_path: m.storage_path ?? undefined,
            };
          })
        );

        return {
          id: msg.id,
          role: msg.role as "user" | "assistant",
          content: msg.content,
          medias: medias.length > 0 ? medias : undefined,
        };
      })
    );

    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messages = conversations.find((c) => c.id === activeConvId)?.messages ?? [];

  const addFiles = (newFiles: File[]) => {
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFile = async (
    file: File,
    userId: string
  ): Promise<AttachedMedia> => {
    let mediaType: "image" | "video" | "file" = "file";
    if (file.type.startsWith("image/")) mediaType = "image";
    else if (file.type.startsWith("video/")) mediaType = "video";

    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${userId}/${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage.from("chat-medias").upload(path, file);

    if (error) {
      // Fallback : URL locale si l'upload échoue
      const url = mediaType !== "file" ? URL.createObjectURL(file) : undefined;
      return { name: file.name, type: mediaType, url };
    }

    let url: string | undefined;
    if (mediaType === "image" || mediaType === "video") {
      const { data } = await supabase.storage
        .from("chat-medias")
        .createSignedUrl(path, 3600);
      url = data?.signedUrl;
    }

    return { name: file.name, type: mediaType, storage_path: path, url };
  };

  const handleSend = async () => {
    if ((!message.trim() && attachedFiles.length === 0) || sending) return;

    setSending(true);

    if (!user) {
      setSending(false);
      return;
    }

    // Upload des fichiers
    const uploadedMedias = await Promise.all(
      attachedFiles.map((f) => uploadFile(f, user.id))
    );

    const userContent = message.trim();
    const assistantContent = buildSimulatedResponse(userContent, uploadedMedias);

    let convId = activeConvId;

    // Créer la conversation si c'est la première
    if (!convId) {
      const { data: newConv } = await supabase
        .from("conversations")
        .insert({
          user_id: user.id,
          title: userContent.slice(0, 45) || "Nouvelle discussion",
        })
        .select("id, title")
        .single();

      if (!newConv) {
        setSending(false);
        return;
      }

      convId = newConv.id;
      setActiveConvId(convId);
      setConversations((prev) => [
        { id: newConv.id, title: newConv.title, messages: [] },
        ...prev,
      ]);
    }

    // Enregistrer le message utilisateur
    const { data: userMsg } = await supabase
      .from("messages")
      .insert({ conversation_id: convId, role: "user", content: userContent })
      .select("id")
      .single();

    // Enregistrer les médias du message utilisateur
    if (userMsg && uploadedMedias.length > 0) {
      await supabase.from("message_medias").insert(
        uploadedMedias.map((m) => ({
          message_id: userMsg.id,
          name: m.name,
          media_type: m.type,
          storage_path: m.storage_path ?? null,
        }))
      );
    }

    // Enregistrer la réponse assistant
    const { data: assistantMsg } = await supabase
      .from("messages")
      .insert({ conversation_id: convId, role: "assistant", content: assistantContent })
      .select("id")
      .single();

    // Mettre à jour updated_at de la conversation
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", convId);

    // Mise à jour locale immédiate
    const localUserMsg: ChatMessage = {
      id: userMsg?.id ?? crypto.randomUUID(),
      role: "user",
      content: userContent,
      medias: uploadedMedias.length > 0 ? uploadedMedias : undefined,
    };

    const localAssistantMsg: ChatMessage = {
      id: assistantMsg?.id ?? crypto.randomUUID(),
      role: "assistant",
      content: assistantContent,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? { ...c, messages: [...c.messages, localUserMsg, localAssistantMsg] }
          : c
      )
    );

    setMessage("");
    setAttachedFiles([]);
    setSending(false);
  };

  const newConversation = () => {
    setActiveConvId(null);
    setMessage("");
    setAttachedFiles([]);
  };

  const switchConversation = async (id: string) => {
    setActiveConvId(id);
    setMessage("");
    setAttachedFiles([]);

    // Charger les messages seulement si pas déjà en mémoire
    const existing = conversations.find((c) => c.id === id);
    if (existing && existing.messages.length > 0) return;

    const msgs = await loadMessages(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages: msgs } : c))
    );
  };

  const resetChat = () => {
    setActiveConvId(null);
    setMessage("");
    setAttachedFiles([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
    message,
    setMessage,
    attachedFiles,
    addFiles,
    removeFile,
    messages,
    conversations,
    activeConvId,
    handleSend,
    handleKeyDown,
    resetChat,
    newConversation,
    switchConversation,
    loading,
    sending,
  };
}
