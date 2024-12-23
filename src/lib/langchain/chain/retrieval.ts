import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

import { VectorStore } from "@langchain/core/vectorstores";

import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

export default async function get_retrieval(vectorStore: VectorStore) {
  const retriever = vectorStore.asRetriever();
  const llm = new ChatOpenAI({ model: "gpt-4o" });

  const systemPrompt = `<SECRET>`;

  const rephrasePrompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
  ]);

  const historyAwareRetriever = await createHistoryAwareRetriever({
    llm,
    retriever,
    rephrasePrompt,
  });

  return historyAwareRetriever;
}
