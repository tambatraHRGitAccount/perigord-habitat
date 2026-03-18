"use client";

import { useRef } from "react";
import { Send, Paperclip, Mic, X, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";

interface ChatInputProps {
  message: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  attachedFile: File | null;
  onFileChange: (file: File | null) => void;
}

export function ChatInput({
  message,
  onChange,
  onKeyDown,
  onSend,
  attachedFile,
  onFileChange,
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { listening, toggle: toggleMic } = useSpeechRecognition((text) => {
    onChange(message ? `${message} ${text}` : text);
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onFileChange(file);
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-lg focus-within:border-indigo-500 transition-colors">
        {/* Fichier attaché */}
        {attachedFile && (
          <div className="flex items-center gap-2 mx-4 mt-3 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg w-fit text-xs text-indigo-700">
            <Paperclip className="w-3 h-3 shrink-0" />
            <span className="truncate max-w-[200px]">{attachedFile.name}</span>
            <button onClick={() => onFileChange(null)} className="ml-1 hover:text-indigo-900">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <textarea
          value={message}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={listening ? "Parlez maintenant..." : "Décrivez votre problème..."}
          rows={3}
          className="w-full bg-transparent resize-none px-5 pt-4 pb-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
        />

        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-1">
            {/* Bouton fichier */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 w-8 h-8"
              onClick={() => fileInputRef.current?.click()}
              title="Joindre un fichier"
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            {/* Bouton micro */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMic}
              title={listening ? "Arrêter l'écoute" : "Dicter un message"}
              className={`w-8 h-8 transition-colors ${
                listening
                  ? "text-red-500 hover:text-red-600 bg-red-50"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>

          <Button
            onClick={onSend}
            disabled={!message.trim() && !attachedFile}
            size="sm"
            className="gap-1.5"
          >
            <Send className="w-4 h-4" />
            Envoyer
          </Button>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        Appuyez sur{" "}
        <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">Entrée</kbd> pour envoyer ·{" "}
        <kbd className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">Maj+Entrée</kbd> pour un saut de ligne
      </p>
    </div>
  );
}
