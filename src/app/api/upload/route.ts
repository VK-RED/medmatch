import { authOptions } from "@/lib/authOptions";
import { INTERVIEW_INITIALIZED, SOMETHING_WENT_WRONG, USER_NOT_EXISTS, USER_NOT_LOGGED_IN } from "@/lib/constants";
import { openai } from "@/lib/openai";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/*
    - Get the file from the client
    - Parse it and get the file details
    - Prepare the Prompt from the file details and Predefined Text and Behaviours
    - Create a New Interview
    - Send the Conversation and the chatId
*/

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

        const csvfile = formData.get('csvfile') as Blob;

        

        /* TODO:  PARSE THE FILE AND GET BACK THE FILE DETAILS */

        const fileDetails = "This is a Sample data extracted from the Uploaded file ";






        const prompt = "ROLE"+ fileDetails + "BEHAVIOUR";

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

        // Create the convo with the created the prompt
        const convo = await prisma.conversation.create({
            data:{
                role:'system',
                content:prompt,
                chatId:chat.id,
                userId:user.id
            },
            select:{
                role:true,
                content:true,
            }
        })

        return NextResponse.json({message:INTERVIEW_INITIALIZED,chatId:chat.id})

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