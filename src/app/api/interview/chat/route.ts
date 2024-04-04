import { CHAT_COMPLETED, NO_INTERVIEW_EXISTS, SOMETHING_WENT_WRONG, USER_NOT_EXISTS, USER_NOT_LOGGED_IN } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions"
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatResponse, CreateAudioOutput } from "@/lib/types";
import { openai } from "@/lib/openai";
import { ZodError } from "zod";
import fs from "fs";
import { Readable } from "stream";
import { createAudioFile } from "@/lib/audio";
import { Cache } from "@/db/Cache";


export async function POST(req:NextRequest): Promise<NextResponse<ChatResponse>> 

{

    try {
        
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) return NextResponse.json({message:USER_NOT_LOGGED_IN});

        const formData = await req.formData();
       
        const aBlob = formData.get('audio') as Blob;
        const chatId = formData.get('chatId') as string;

        //convert the blob to node buffer
        const audioBuffer = Buffer.from(await aBlob.arrayBuffer());

        const audioStream = new Readable();
        audioStream.push(audioBuffer);
        audioStream.push(null);

        const {audioPath,message} : CreateAudioOutput = await createAudioFile(audioStream);

        console.log("The AudioPath is ----> ",audioPath);

        if(!audioPath) return NextResponse.json({message:SOMETHING_WENT_WRONG});

        const email = session.user.email;

        const user = await prisma.user.findFirst({
            where:{
                email,
            },
            select:{
                id:true,
            }
        });

        if(!user || !user.id) return NextResponse.json({message:USER_NOT_EXISTS});

        const chat = await prisma.chat.findFirst({
            where:{
                id: chatId,
            },
        })

        if(!chat){
            return NextResponse.json({message:NO_INTERVIEW_EXISTS});
        }

        if(chat.completed){
            return NextResponse.json({message:CHAT_COMPLETED});
        }

        //send the audio to openai get the transcribed text and get back the message

        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(audioPath),
            model: "whisper-1",
        })

        console.log(transcription.text);

        const userMessage = transcription.text;

        // Delete the file once it's been sent to openai
        if(fs.existsSync(audioPath)){
            console.log("fileexists, therefore it is removed");
            fs.unlinkSync(audioPath);
        }

        
        //Get the chain and the conversations from local Cache

        const cache = Cache.getInstance();

        const chain = cache.getChain(chatId);
        const chatHistory = cache.getConvoArr(chatId)

        //@ts-ignore
        const langRes = await chain.invoke({
            chat_history : chatHistory,
            input:userMessage,
        })

        //@ts-ignore
        const res : string = langRes.answer;

        const HUMAN_MESSAGE = new HumanMessage(userMessage);
        const AI_MESSAGE = new AIMessage(res);

        cache.updateConvoArr(chat.id,HUMAN_MESSAGE,AI_MESSAGE);

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

        if(error instanceof ZodError){
            console.log(error.message);
            throw new Error(`${error.issues[0].message}, Check the ${error.issues[0].path} field`);
        }
        else{
            console.log(error);
            throw new Error(SOMETHING_WENT_WRONG);
        }
        
    }
    
}