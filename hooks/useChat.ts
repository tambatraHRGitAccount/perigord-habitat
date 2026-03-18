"use client";

import { useState, useRef } from "react";

export type AttachedMedia = {
  name: string;
  type: "image" | "video" | "file";
  url?: string; // object URL pour image/video
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  medias?: AttachedMedia[];
};

function buildSimulatedResponse(text: string, medias: AttachedMedia[]): string {
  const hasImage = medias.some((m) => m.type === "image");
  const hasVideo = medias.some((m) => m.type === "video");
  const hasFile = medias.some((m) => m.type === "file");

  const parts: string[] = [];

  if (hasImage) {
    parts.push("📷 Image");
  }
  if (hasVideo) {
    parts.push("🎥 Vidéo");
  }
  if (hasFile) {
    parts.push("📄 Document");
  }

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
  const [message, setMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const idRef = useRef(0);

  const nextId = () => String(++idRef.current);

  const addFiles = (newFiles: File[]) => {
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = () => {
    if (!message.trim() && attachedFiles.length === 0) return;

    const medias: AttachedMedia[] = attachedFiles.map((f) => {
      if (f.type.startsWith("image/")) {
        return { name: f.name, type: "image", url: URL.createObjectURL(f) };
      } else if (f.type.startsWith("video/")) {
        return { name: f.name, type: "video", url: URL.createObjectURL(f) };
      }
      return { name: f.name, type: "file" };
    });

    const userMsg: ChatMessage = {
      id: nextId(),
      role: "user",
      content: message.trim(),
      medias: medias.length > 0 ? medias : undefined,
    };

    const assistantMsg: ChatMessage = {
      id: nextId(),
      role: "assistant",
      content: buildSimulatedResponse(message.trim(), medias),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setMessage("");
    setAttachedFiles([]);
  };

  const resetChat = () => {
    setMessages([]);
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
    handleSend,
    handleKeyDown,
    resetChat,
  };
}
