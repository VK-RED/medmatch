import { INTERVIEW_ENDED, NO_INTERVIEW_EXISTS, SOMETHING_WENT_WRONG, USER_NOT_LOGGED_IN } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { authOptions, prisma } from "../../auth/[...nextauth]/route";
import { endChatSchema } from "@/lib/types";

export async function POST(req:NextRequest){
    try {
        
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) return NextResponse.json({message:USER_NOT_LOGGED_IN});

        const {body} = await req.json();
        const parsedBody = endChatSchema.parse(body);

        const {chatId} = parsedBody;

        const existingChat = await prisma.chat.findFirst({
            where:{
                id: chatId,
            }
        })

        if(!existingChat) return NextResponse.json({message:NO_INTERVIEW_EXISTS});

        const chat = await prisma.chat.update({
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