"use client";

import React from "react";
import ChatBubble from "./chat_bubble";
import useChat from "@/hooks/useChat";
import LoadingBubble from "./chat_bubbles/loading_bubble";

function ChatConversation() {
  const { messages, isLoading } = useChat();

  return (
    <div className="flex flex-col gap-y-4 flex-1 p-4 overflow-y-auto">
      {messages.map((message, index) => (
        <ChatBubble key={index} message={message} />
      ))}
      {isLoading && <LoadingBubble />}
    </div>
  );
}

export default ChatConversation;
