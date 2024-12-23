import { create } from "zustand";

interface ChatState {
  messages: Portfolio.ChatMessage[];
  example_questions: string[];
  addMessage: (message: Portfolio.ChatMessage) => void;
  isLoading: boolean;
  setExampleQuestions: (questions: string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useChat = create<ChatState>((set) => ({
  messages: [
    {
      role: "assistant",
      content: `Hello, I am Lukas Johansson, a full stack developer. Feel free to ask me anything!`,
    },
  ],
  example_questions: [
    "What projects have Lukas worked on?",
    "What is Lukas's favorite programming language?",
    "Tell me more about Lukas.",
    "How can I contact Lukas?",
  ],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setExampleQuestions: (questions) =>
    set(() => ({ example_questions: questions })),
  isLoading: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
}));

export default useChat;
