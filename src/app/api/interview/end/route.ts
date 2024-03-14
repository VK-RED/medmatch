import { INTERVIEW_ENDED, NO_INTERVIEW_EXISTS, SOMETHING_WENT_WRONG, USER_NOT_LOGGED_IN } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions"
import { ConvoArrType, Role, endChatSchema } from "@/lib/types";

export async function POST(req:NextRequest){
    try {
        
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) return NextResponse.json({message:USER_NOT_LOGGED_IN});

        const body = await req.json();

        const parsedBody = endChatSchema.parse(body);

        const {chatId,conversations} = parsedBody;

        const existingChat = await prisma.chat.findFirst({
            where:{
                id: chatId,
            }
        })

        if(!existingChat) return NextResponse.json({message:NO_INTERVIEW_EXISTS});

        // Create the conversations for the given chatId & userId

        const isAllConvosCreated = await createAllConversations(conversations,chatId,session.user.email);

        if(!isAllConvosCreated) throw new Error("Conversations Not created !!");

        await prisma.chat.update({
            where:{
                id:chatId
            },
            data:{
                completed:true,
            }
        });

        return NextResponse.json({message:INTERVIEW_ENDED})        

    } catch (error) {
        if(error instanceof ZodError){
            console.log(error.message);
            throw new Error(`${error.issues[0].message}, Enter Valid ${error.issues[0].path}`);
        }
        else{
            console.log(error);
            throw new Error(SOMETHING_WENT_WRONG);
        }
        
    }
}

function createAllConversations(conversations:ConvoArrType, chatId:string,email:string):Promise<boolean>{

    return new Promise(async (res,rej) => {

        try {

            const user = await prisma.user.findFirst({
                where:{
                    email,
                },
                select:{
                    id:true,
                }
            });

            if(!user){
                throw new Error("User Not found !!!");
            }

            const userId = user.id;

            for(const convo of conversations){
                const res = await createConversation(convo,chatId,userId);
                if(!res){
                    throw new Error("Error in creating a Conversation !");
                }

            }
    
            res(true);
            
        } catch (error) {
            console.log(error);
            rej(false);
        }

    })
}

function createConversation(convo:{role:Role,content:string}, chatId:string, userId:string) : (Promise<boolean>){

    return new Promise(async (res,rej)=>{

        try {
            
            const newConvo = await prisma.conversation.create({
                data:{
                    role: convo.role === Role.user ? 'user' : 'assistant',
                    content: convo.content,
                    chatId,
                    userId,
                }
            });

            console.log("The New Convo is : ")
            console.log(newConvo);

            res(true);

        } catch (error) {
            console.log(error);
            rej(false)
        }

    })
}