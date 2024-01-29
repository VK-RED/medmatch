import { CHAT_COMPLETED, NO_INTERVIEW_EXISTS, RESPONSE_MISSING, SOMETHING_WENT_WRONG, USER_NOT_EXISTS, USER_NOT_LOGGED_IN } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, prisma } from "../../auth/[...nextauth]/route";
import { chatSchema } from "@/lib/types";
import { openai } from "@/lib/openai";
import { ZodError } from "zod";

export async function POST(req:NextRequest){

    try {
        
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) return NextResponse.json({message:USER_NOT_LOGGED_IN});

        const {body} = await req.json();

        const parsedBody = chatSchema.parse(body);

        const {chatId, message} = parsedBody;
        
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

        // only allow convo if the chat is not completed
        // create new convo
        const newConvo = await prisma.conversation.create({
            data:{
                content: message,
                role: 'user',
                userId: user.id,
                chatId 
            }
        })

        //get all convos for the chatId
        const allConvos = await prisma.conversation.findMany({
            where:{
                chatId,
            },
            orderBy:{
                createdAt:"asc"
            },
            select:{
                role: true,
                content: true,
            }
        })

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: allConvos
        });

        const res = completion.choices[0].message.content || RESPONSE_MISSING;

        if(res ===RESPONSE_MISSING){
            console.log(RESPONSE_MISSING);
            throw new Error(RESPONSE_MISSING);
        }

        // create a new convo for the openAI result and return it back
        const resConvo = await prisma.conversation.create({
            data:{
                content: res,
                role: 'system',
                userId: user.id,
                chatId 
            }
        })

        return NextResponse.json({message:resConvo.content})

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