"use server";

import {
  loadAndSplitMDs,
  createVectorStoreFromMDs,
} from "@/lib/langchain/vector_store";

export async function index_data() {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("This function is only available in development mode");
  }
  const splitDocs = await loadAndSplitMDs();
  const vectorStore = await createVectorStoreFromMDs(splitDocs);
  return vectorStore;
}
