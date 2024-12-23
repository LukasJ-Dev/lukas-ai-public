import React from "react";
import { UserCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChatCard from "./chat_card";

function AssistantBubble({ message }: { message: Portfolio.ChatMessage }) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-row gap-x-2 items-center">
        <img src="/lukas.png" width={32} height={32} className="rounded-full" />
        <strong className="text-lg">Lukas AI</strong>
      </div>

      <div
        className={`bg-card flex flex-col p-2 rounded-lg w-fit max-w-screen overflow-x-hidden`}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="prose prose-invert prose-sm md:prose-md"
        >
          {message.content.replace(/\n/g, "  \n")}
        </ReactMarkdown>
        <div className="flex flex-row gap-x-2 max-w-screen flex-wrap">
          {message.cards?.map((card) => (
            <ChatCard card={card} key={card.title} />
          ))}
        </div>
      </div>
    </div>
  );
}

function UserBubble({ message }: { message: Portfolio.ChatMessage }) {
  return (
    <div className="flex flex-col gap-y-2 items-end">
      <div className="flex flex-row gap-x-2 items-center">
        <UserCircle className="w-6 h-6" />
        <strong className="text-lg">You</strong>
      </div>

      <div
        className={`bg-primary flex flex-col p-2 rounded-lg w-fit text-black prose-sm md:prose-md`}
      >
        {message.content}
      </div>
    </div>
  );
}

function ChatBubble({ message }: { message: Portfolio.ChatMessage }) {
  return message.role === "assistant" ? (
    <AssistantBubble message={message} />
  ) : (
    <UserBubble message={message} />
  );
}

export default ChatBubble;
