"use client";

import React, { useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendIcon } from "lucide-react";
import useSendMessage from "@/hooks/useSendMessage";

function ChatInput() {
  const sendMessage = useSendMessage();
  const ref = useRef<HTMLFormElement>(null);
  return (
    <div className="flex flex-col gap-y-2">
      <form
        ref={ref}
        className="flex w-full gap-x-2 h-12"
        onSubmit={(e) => {
          e.preventDefault();

          sendMessage(e.currentTarget.message.value);
          ref.current?.reset();
        }}
      >
        <Input
          className="w-full h-12"
          name="message"
          autoComplete="off"
          autoCorrect="off"
          placeholder="Ask Lukas..."
        />
        <Button className="w-16 h-12 p-0">
          <SendIcon />
        </Button>
      </form>
      <p className="text-xs sm:text-sm text-muted-foreground text-center">
        Lukas AI is just an AI and not the real Lukas, so don&apos;t expect
        perfect answers.
      </p>
    </div>
  );
}

export default ChatInput;
