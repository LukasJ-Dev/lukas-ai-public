import { TextLoader } from "langchain/document_loaders/fs/text";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

import { Document } from "langchain/document";

export async function loadAndSplitMDs() {
  const directoryLoader = new DirectoryLoader("./data", {
    ".md": (path: string) => new TextLoader(path),
  });

  const docs = await directoryLoader.load();

  const textSplitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitDocs = await textSplitter.splitDocuments(docs).then((docs) =>
    docs.map((doc) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        source: doc?.metadata?.source.split("\\").pop(),
      },
    }))
  );
  return splitDocs;
}

export async function createVectorStoreFromMDs(
  splitDocs: Document<Record<string, unknown>>[]
) {
  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-large",
  });

  const pinecone = new PineconeClient();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

  const vectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

  return vectorStore;
}

export async function getVectorStore() {
  try {
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
    });

    const pinecone = new PineconeClient();

    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    return vectorStore;
  } catch (e) {
    throw e;
  }
}
