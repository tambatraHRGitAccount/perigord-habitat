"use client";

import { SquarePen, MessagesSquare } from "lucide-react";
import type { Conversation } from "@/hooks/useChat";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConvId: string | null;
  onNew: () => void;
  onSwitch: (id: string) => void;
}

export function ChatSidebar({
  conversations,
  activeConvId,
  onNew,
  onSwitch,
}: ChatSidebarProps) {
  return (
    <aside className="hidden sm:flex flex-col w-60 shrink-0 border-r border-gray-100 bg-white overflow-hidden">

      {/* Header sidebar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <MessagesSquare size={16} className="text-indigo-500" />
          <span className="text-sm font-semibold text-gray-800">Discussions</span>
        </div>
        <button
          onClick={onNew}
          title="Nouvelle discussion"
          className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-150"
        >
          <SquarePen size={15} />
        </button>
      </div>

      {/* Liste */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-10 px-4 text-center">
            <MessagesSquare size={28} className="text-gray-200" />
            <p className="text-xs text-gray-400 leading-relaxed">
              Démarrez une discussion pour la retrouver ici
            </p>
          </div>
        ) : (
          conversations.map((conv) => {
            const isActive = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => onSwitch(conv.id)}
                className={cn(
                  "group w-full flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150",
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                )}
              >
                <span
                  className={cn(
                    "mt-0.5 flex-shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-150",
                    isActive
                      ? "bg-indigo-500 scale-110"
                      : "bg-gray-300 group-hover:bg-gray-400"
                  )}
                />
                <span className="truncate text-sm leading-snug font-medium">
                  {conv.title}
                </span>
              </button>
            );
          })
        )}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100">
        <button
          onClick={onNew}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 active:scale-[0.98] transition-all duration-150"
        >
          <SquarePen size={14} />
          Nouvelle discussion
        </button>
      </div>
    </aside>
  );
}
