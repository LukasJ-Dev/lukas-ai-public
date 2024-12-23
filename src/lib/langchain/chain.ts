import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

import { RunnableMap } from "@langchain/core/runnables";
import { RunnablePassthrough } from "@langchain/core/runnables";

import { z } from "zod";
import get_retrieval from "./chain/retrieval";
import { VectorStore } from "@langchain/core/vectorstores";
import { ChatOpenAI } from "@langchain/openai";

const responseSchema = z.object({
  response: z.string().describe("The response to the answer"),
  example_questions: z
    .array(z.string())
    .describe("Example questions that the user might ask after the response"),
  topic: z.enum(["about_me", "skills", "projects", "personal", "other"]),
  cards: z
    .array(
      z.object({
        title: z.string().describe("The title of the card"),
        description: z.string().describe("The description of the card"),
        images: z.array(z.string()).describe("The images of the card"),
        link: z.string().describe("The link of the card"),
      })
    )
    .optional()
    .describe("Cards to display to the user"),
});

export default async function get_chain(vectorStore: VectorStore) {
  const llm = new ChatOpenAI({ model: "gpt-4o" });
  const retriever = await get_retrieval(vectorStore);

  const systemTemplate = `
  <SECRET>

    <INFO>
    {context}
    </INFO>
  `;

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    new MessagesPlaceholder("chat_history"),
    ["user", "{input}"],
  ]);

  const llmWithFormat = llm.withStructuredOutput(responseSchema);

  const runnable = RunnableMap.from({
    input: new RunnablePassthrough().pick("input"),
    chat_history: new RunnablePassthrough().pick("chat_history"),
    context: retriever,
  })
    .pipe((context) => {
      return promptTemplate.invoke({
        input: context.input,
        chat_history: context.chat_history,
        context: context.context,
      });
    })
    .pipe(llmWithFormat);

  return runnable;
}
