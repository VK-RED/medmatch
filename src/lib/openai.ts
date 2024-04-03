import OpenAI from 'openai';

import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const embeddings = new OpenAIEmbeddings();

export const chatModel = new ChatOpenAI({
  openAIApiKey: OPENAI_API_KEY,
});

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, 
});