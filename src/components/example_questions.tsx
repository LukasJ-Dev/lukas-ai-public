"use client";

import useChat from "@/hooks/useChat";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import useSendMessage from "@/hooks/useSendMessage";

function SmallExampleQuestions({
  questions,
  onClickQuestion,
}: {
  questions: string[];
  onClickQuestion: (question: string) => void;
}) {
  return (
    <ScrollArea className="h-12 w-full" type="always">
      <ul className="flex flex-row gap-x-2 text-sm text-nowrap">
        {questions.map((question) => (
          <li key={question}>
            <button
              className="p-2 rounded-xl bg-card flex flex-row gap-2 items-center"
              onClick={() => onClickQuestion(question)}
            >
              {question}
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function LargeExampleQuestions({
  questions,
  onClickQuestion,
}: {
  questions: string[];
  onClickQuestion: (question: string) => void;
}) {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-lg font-bold">Questions you can ask:</h2>
      <ul className="flex p-4 flex-col gap-y-2 text-md sm:text-lg">
        {questions.map((question) => (
          <li key={question}>
            <button
              className="p-2 rounded-lg bg-card w-full h-full text-left flex flex-row justify-between"
              onClick={() => onClickQuestion(question)}
            >
              {question}
              <ArrowRightIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExampleQuestions() {
  const { example_questions, messages } = useChat();
  const sendMessage = useSendMessage();

  const isLarge = messages.filter((m) => m.role === "user").length === 0;

  const onClickQuestion = (question: string) => {
    sendMessage(question);
  };

  if (isLarge) {
    return (
      <LargeExampleQuestions
        questions={example_questions}
        onClickQuestion={onClickQuestion}
      />
    );
  }
  return (
    <SmallExampleQuestions
      questions={example_questions}
      onClickQuestion={onClickQuestion}
    />
  );
}

export default ExampleQuestions;
