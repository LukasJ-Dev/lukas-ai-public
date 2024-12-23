import useChat from "@/hooks/useChat";
import { ask_ai } from "@/actions/ask_ai";
import { useMutation } from "@tanstack/react-query";

import { sendGAEvent } from "@next/third-parties/google";

function useSendMessage() {
  const { addMessage, messages, setExampleQuestions, setIsLoading } = useChat();

  const { mutate, isPending } = useMutation({
    mutationFn: (message: string) => ask_ai(message, messages),
    onSuccess: (response) => {
      setIsLoading(false);

      const data =
        response.status === "success"
          ? response.data
          : {
              response: "Something went wrong, please try again later.",
              example_questions: [],
              topic: "error",
              cards: [],
            };

      addMessage({
        role: "assistant",
        content: data.response,
        cards: data.cards,
      });
      sendGAEvent("message_success", {
        conversationLength: messages.length,
        topic: data.topic,
      });
      setExampleQuestions(data.example_questions);
    },
    onError: (error) => {
      console.error(error);
      sendGAEvent("message_error", {
        conversationLength: messages.length,
      });
      addMessage({
        role: "assistant",
        content: "Something went wrong. Please try again.",
      });
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  return (message: string) => {
    if (isPending) return;
    addMessage({
      role: "user",
      content: message,
    });
    mutate(message);
  };
}

export default useSendMessage;
