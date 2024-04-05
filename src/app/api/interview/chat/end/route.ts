import { Cache } from "@/db/Cache";
import { authOptions } from "@/lib/authOptions";
import { INTERVIEW_ENDED, SOMETHING_WENT_WRONG, USER_FIRST_MESSAGE, USER_NOT_LOGGED_IN } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest,NextResponse } from "next/server";

// TODO : ADD ZOD VALIDATIONS

export async function POST(req:NextRequest){
    try {
        
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) return NextResponse.json({message:USER_NOT_LOGGED_IN});

        const user = await prisma.user.findFirst({
            where:{
                email:session.user.email,
            },
            select:{
                id:true,
            }
        });

        if(!user){
            throw new Error("User Not found !!!");
        }

        const userId = user.id;

        const {chatId} : {chatId:string} = await req.json();

        const cache = Cache.getInstance();
        const chainHistory = cache.getConvoArr(chatId);

        for(const chat of chainHistory){
            const chatContent = chat.content.toString();
            if(chatContent === USER_FIRST_MESSAGE){
                continue;
            }
            await prisma.conversation.create({
                data:{
                    content: chat.content.toString(),
                    role: chat._getType() === 'ai' ? 'assistant' : 'user',
                    chatId,
                    userId
                }
            })
        }

        await prisma.chat.update({
            where:{
                id:chatId
            },
            data:{
                completed:true,
            }
        });

        //clear the cache
        cache.removeChain(chatId);
        cache.removeConvoArr(chatId);

        return NextResponse.json({message:INTERVIEW_ENDED})        

    } catch (error) {
        console.log(error);
        throw new Error(SOMETHING_WENT_WRONG);
    }
}