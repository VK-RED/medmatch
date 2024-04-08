import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { MessagesPlaceholder } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { chatModel } from "@/lib/openai";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { LANGCHAIN_SYSTEM_PROMPT } from "@/lib/constants";

export const createChain = async (vectorStore:MemoryVectorStore) =>{
    
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", LANGCHAIN_SYSTEM_PROMPT],
        new MessagesPlaceholder('chat_history'),
        ["user", "{input}"],
    ]);

    const documentChain = await createStuffDocumentsChain({
        llm:chatModel,
        prompt,
    })

    const retriever = vectorStore.asRetriever();

    const historyAwarePrompt = ChatPromptTemplate.fromMessages([
        new MessagesPlaceholder("chat_history"),
        ["user", "{input}"],
        [
          "user",
          "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
        ],
    ]);

    // Get the relevant docs based on chat History and user's response
    const historyAwareRetriever= await createHistoryAwareRetriever({
        llm: chatModel,
        retriever,
        rephrasePrompt: historyAwarePrompt,
    });

    const retrievalChain = await createRetrievalChain({
        combineDocsChain: documentChain,
        retriever:historyAwareRetriever,
    });

    return retrievalChain;
}   