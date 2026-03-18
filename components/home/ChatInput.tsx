"use client";

import { useRef, useCallback } from "react";
import { Send, Paperclip, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { FilePreview } from "./FilePreview";

interface ChatInputProps {
  message: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  attachedFiles: File[];
  onAddFiles: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
}

export function ChatInput({
  message,
  onChange,
  onKeyDown,
  onSend,
  attachedFiles,
  onAddFiles,
  onRemoveFile,
}: ChatInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef(message);
  messageRef.current = message;

  const handleSpeechResult = useCallback((text: string) => {
    const current = messageRef.current;
    onChange(current ? `${current} ${text}` : text);
  }, [onChange]);

  const { listening, toggle: toggleMic } = useSpeechRecognition(handleSpeechResult);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []) as File[];
    if (files.length > 0) onAddFiles(files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files) as File[];
    if (files.length > 0) onAddFiles(files);
  };

  return (
    <div className="w-full max-w-2xl">
      <div
        className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-lg focus-within:border-indigo-500 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Aperçus fichiers */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 pt-3">
            {attachedFiles.map((file, i) => (
              <FilePreview key={i} file={file} onRemove={() => onRemoveFile(i)} />
            ))}
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
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 w-8 h-8"
              onClick={() => fileInputRef.current?.click()}
              title="Joindre des fichiers"
            >
              <Paperclip className="w-4 h-4" />
            </Button>

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
            disabled={!message.trim() && attachedFiles.length === 0}
            size="sm"
            className="gap-1.5"
          >
            <Send className="w-4 h-4" />
            Envoyer
          </Button>
        </div>
      </div>
    </div>
  );
}
