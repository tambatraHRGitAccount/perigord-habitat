"use client";

import { useChat } from "@/hooks/useChat";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { SuggestionChips } from "@/components/home/SuggestionChips";
import { ChatInput } from "@/components/home/ChatInput";

export default function HomePage() {
  const {
    message,
    setMessage,
    attachedFile,
    setAttachedFile,
    handleSend,
    handleKeyDown,
  } = useChat();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderApp />

      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-gray-900">
            Qui fait qoui ?
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto">
            Posez-moi n'importe quelle question sur vos incidents locatifs.
          </p>
        </div>

        <SuggestionChips onSelect={setMessage} />

        <ChatInput
          message={message}
          onChange={setMessage}
          onKeyDown={handleKeyDown}
          onSend={handleSend}
          attachedFile={attachedFile}
          onFileChange={setAttachedFile}
        />
      </main>

      <footer className="text-center py-4 text-xs text-gray-400">
        © 2026 Qui fait quoi · Plateforme de gestion des incidents locatifs
      </footer>
    </div>
  );
}
