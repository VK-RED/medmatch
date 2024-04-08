import { authOptions } from "@/lib/authOptions";
import { INTERVIEW_INITIALIZATION_FAILED, INTERVIEW_INITIALIZED, SOMETHING_WENT_WRONG, USER_NOT_EXISTS, USER_NOT_LOGGED_IN } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { createVectorStore } from "@/langchain/vectorStore";
import { createChain } from "@/langchain/chain";
import { Cache } from "@/db/Cache";

export async function POST(req:NextRequest){

    try {

        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) return NextResponse.json({message:USER_NOT_LOGGED_IN});

        // get the email
        const email = session.user.email;

        // get the user and Id
        const user = await prisma.user.findFirst({
            where:{
                email,
            },
            select:{
                id:true,
                chats:true,
            }
        })

        if(!user || !user.id) return NextResponse.json({message:USER_NOT_EXISTS});

        const formData = await req.formData();
        const file = formData.get('file') as File;

        const vectorStore = await createVectorStore(file);
        const chain = await createChain(vectorStore);

        // create a new chat get the id and title
        
        const chat = await prisma.chat.create({
            data:{
                title:`Interview ${user.chats.length + 1}`,
                userId: user.id,
            },
            select:{
                id : true,
                title:true,
            }
        })

        // store the chain in local Cache !

        const cache = Cache.getInstance(); 
        cache.setChain(chat.id,chain); 
        

        return NextResponse.json({message:INTERVIEW_INITIALIZED,chatId:chat.id, title:user.chats.length + 1})

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:INTERVIEW_INITIALIZATION_FAILED});
    }
    
}