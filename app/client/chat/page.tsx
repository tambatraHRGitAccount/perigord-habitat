"use client";

import { useChat } from "@/hooks/useChat";
import { HeaderApp } from "@/components/layout/HeaderApp";
import { SuggestionChips } from "@/components/home/SuggestionChips";
import { ChatInput } from "@/components/home/ChatInput";
import { ChatMessages } from "@/components/home/ChatMessages";
import { ChatSidebar } from "@/components/home/ChatSidebar";

export default function HomePage() {
  const {
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
  } = useChat();

  const isChatMode = conversations.length > 0;

  const chatInput = (
    <ChatInput
      message={message}
      onChange={setMessage}
      onKeyDown={handleKeyDown}
      onSend={handleSend}
      attachedFiles={attachedFiles}
      onAddFiles={addFiles}
      onRemoveFile={removeFile}
      isSending={sending}
    />
  );

  if (loading) {
    return (
      <div className="h-screen bg-white flex flex-col overflow-hidden">
        <HeaderApp onLogoClick={resetChat} />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Chargement de vos discussions...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <HeaderApp onLogoClick={resetChat} />

      {isChatMode ? (
        <div className="flex flex-1 overflow-hidden">
          <ChatSidebar
            conversations={conversations}
            activeConvId={activeConvId}
            onNew={newConversation}
            onSwitch={switchConversation}
          />

          <div className="flex flex-col flex-1 overflow-hidden">
            {messages.length > 0 ? (
              <>
                <ChatMessages messages={messages} isTyping={sending} />
                <div className="px-6 py-3">
                  <div className="max-w-2xl mx-auto">
                    {chatInput}
                  </div>
                </div>
              </>
            ) : (
              <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
                <div className="text-center mb-10">
                  <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-gray-900">
                    Nouvelle discussion
                  </h1>
                  <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto">
                    Posez-moi n'importe quelle question sur vos incidents locatifs.
                  </p>
                </div>
                <SuggestionChips onSelect={setMessage} />
                {chatInput}
              </main>
            )}
          </div>
        </div>
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 text-gray-900">
              Qui fait quoi ?
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto">
              Posez-moi n'importe quelle question sur vos incidents locatifs.
            </p>
          </div>
          <SuggestionChips onSelect={setMessage} />
          {chatInput}
        </main>
      )}
    </div>
  );
}
