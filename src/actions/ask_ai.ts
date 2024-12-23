"use server";

import generate_response from "@/lib/langchain/langchain";
import { serverActionHandler } from "@/lib/server_action_handler";

export const ask_ai = async (
  question: string,
  messages: Portfolio.ChatMessage[]
) =>
  serverActionHandler("ask_ai", async (serverActionLogger) => {
    const response = await generate_response(question, messages);
    serverActionLogger.log("AI response", { response });
    return response;
  });
