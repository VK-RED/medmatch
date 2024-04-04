import { Cache } from "@/db/Cache";
import { authOptions } from "@/lib/authOptions";
import { SOMETHING_WENT_WRONG, USER_NOT_LOGGED_IN } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { openai } from "@/lib/openai";

export async function POST(req:NextRequest){

    //TODO : ADD ZOD VALIDATIONS

    try {

        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) return NextResponse.json({message:USER_NOT_LOGGED_IN});

        const {chatId} = await req.json();

        //Get the chain and the conversations from local Cache

        const cache = Cache.getInstance();

        const chain = cache.getChain(chatId);
        const chatHistory = cache.getConvoArr(chatId)

        const userMessage = "You can start asking the questions !";

        //@ts-ignore
        const langRes = await chain.invoke({
            chat_history : chatHistory,
            input:userMessage,
        })

        //@ts-ignore
        const res : string = langRes.answer;

        const HUMAN_MESSAGE = new HumanMessage(userMessage);
        const AI_MESSAGE = new AIMessage(res);

        cache.updateConvoArr(chatId,HUMAN_MESSAGE,AI_MESSAGE);

        //send the langchain response and get back an audio buffer/blob

        const audio = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: res,
        });

        const buffer = Buffer.from(await audio.arrayBuffer());
        const audioBase64 = buffer.toString('base64');
        const audioUri = `data:audio/mp3;base64,${audioBase64}`;

        return NextResponse.json({message:res, audioUri})

    } catch (error) {
        console.log(error);
        throw new Error(SOMETHING_WENT_WRONG);
    }
    
}