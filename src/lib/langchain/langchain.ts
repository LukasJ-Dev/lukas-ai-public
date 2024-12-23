import { HumanMessage, AIMessage } from "@langchain/core/messages";
import get_chain from "./chain";
import { getVectorStore } from "./vector_store";

export default async function generate_response(
  question: string,
  messages: Portfolio.ChatMessage[]
) {
  try {
    const chat_history = messages.map((message) => {
      if (message.role === "user") {
        return new HumanMessage(message.content);
      } else {
        return new AIMessage(message.content);
      }
    });

    const vectorStore = await getVectorStore();

    const chain = await get_chain(vectorStore);

    const response = await chain.invoke({
      chat_history: chat_history,
      input: question,
    });

    return response;
  } catch (e) {
    throw e;
  }
}
