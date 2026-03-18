"use client";

import { useState } from "react";

export function useChat() {
  const [message, setMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  const handleSend = () => {
    if (!message.trim() && !attachedFile) return;
    // TODO: envoyer message + attachedFile
    setMessage("");
    setAttachedFile(null);
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
    attachedFile,
    setAttachedFile,
    handleSend,
    handleKeyDown,
  };
}
