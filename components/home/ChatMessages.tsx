"use client";

import { useEffect, useRef } from "react";
import { Paperclip } from "lucide-react";
import Image from "next/image";
import type { ChatMessage } from "@/hooks/useChat";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          {msg.role === "assistant" && (
            <div className="shrink-0 w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <Image src="/logo-default.png" alt="QFQ" width={32} height={32} />
            </div>
          )}

          <div className={`max-w-[75%] flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}>

            {/* Médias attachés */}
            {msg.medias && msg.medias.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {msg.medias.map((media, i) => {
                  if (media.type === "image" && media.url) {
                    return (
                      <div key={i} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={media.url}
                          alt={media.name}
                          className="max-h-48 max-w-xs object-cover"
                        />
                      </div>
                    );
                  }
                  if (media.type === "video" && media.url) {
                    return (
                      <div key={i} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <video
                          src={media.url}
                          controls
                          className="max-h-48 max-w-xs object-cover"
                        />
                      </div>
                    );
                  }
                  return (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-700">
                      <Paperclip size={12} />
                      <span className="truncate max-w-[180px]">{media.name}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Texte du message */}
            {msg.content && (
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
