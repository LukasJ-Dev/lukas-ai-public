import ChatConversation from "@/components/chat_conversation";
import ChatInput from "@/components/chat_input";
import ExampleQuestions from "@/components/example_questions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucideLink } from "lucide-react";
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background p-4 max-w-6xl mx-auto gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-4 items-center justify-between">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="/lukas.png"
              alt="A image of Lukas"
              width={48}
              height={48}
              className="rounded-full"
            />
            <h1 className="text-lg sm:text-2xl font-bold">Lukas AI</h1>
          </div>
          <Button variant="outline" size="sm">
            <LucideLink className="w-4 h-4" />
            Go to the normal website
          </Button>
        </div>
        <Separator />
      </div>

      <ChatConversation />
      <ExampleQuestions
      /*
        questions={[
          "What projects have Lukas worked on?",
          "What is Lukas's favorite programming language?",
          "Tell me more about Lukas.",
          "How can I contact Lukas?",
        ]}
        isLarge={true}*/
      />
      <ChatInput />
    </div>
  );
}
