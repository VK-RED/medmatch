import { NO_INTERVIEW_EXISTS, SOMETHING_WENT_WRONG, USER_NOT_LOGGED_IN } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, prisma } from "../../auth/[...nextauth]/route";

export async function GET(req:NextRequest,{ params }: { params: { id: string } }){
    try {
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) return NextResponse.json({message:USER_NOT_LOGGED_IN});

        const {id} = params;

        const chat = await prisma.chat.findFirst({
            where:{
                id,
            },
            select:{
                id : true,
                title: true,
                conversations :{
                    select:{
                        id: true,
                        content: true,
                        role: true,
                    },
                    orderBy:{
                        createdAt:"asc",
                    }
                }
            }
        })

        if(!chat)   return NextResponse.json({message:NO_INTERVIEW_EXISTS});

        return NextResponse.json({interview:chat});

    } catch (error) {
        console.log(error);
        throw new Error(SOMETHING_WENT_WRONG);
    }
}