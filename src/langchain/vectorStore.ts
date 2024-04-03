import { embeddings } from "@/lib/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

export const createVectorStore = async (file:File) => {

    let loader;

    if(file.type === 'text/csv'){
        loader = new CSVLoader(file);
    }
    else{
        loader = new PDFLoader(file);
    }

    const docs = await loader.load();
    
    const splitter = new RecursiveCharacterTextSplitter();
    const splitDocs = await splitter.splitDocuments(docs);

    const vectorstore = await MemoryVectorStore.fromDocuments(splitDocs,embeddings);
    return vectorstore;
}