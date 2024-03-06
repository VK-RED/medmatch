import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { SOMETHING_WENT_WRONG, USER_NOT_EXISTS, USER_NOT_LOGGED_IN } from "@/lib/constants";
import { authOptions } from "@/lib/authOptions"

export async function POST(req:NextRequest,res:NextResponse) {
    
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

        return NextResponse.json({chatId : chat.id, title:chat.title});


    } catch (error) {
        console.log(error);
        return NextResponse.json({message:SOMETHING_WENT_WRONG})
    }

  }