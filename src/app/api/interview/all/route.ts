import { SOMETHING_WENT_WRONG, USER_NOT_EXISTS, USER_NOT_LOGGED_IN } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, prisma } from "../../auth/[...nextauth]/route";
import { AllInterviewsType } from "@/lib/types";


export async function GET(req:NextRequest):Promise<NextResponse<AllInterviewsType>>{

    try {
        
        const session = await getServerSession(authOptions);
        if(!session || !session.user || !session.user.email) return NextResponse.json({message:USER_NOT_LOGGED_IN});

        const email = session.user.email;

        const user = await prisma.user.findFirst({
            where:{
                email
            },
            select:{
                chats:{
                    orderBy:{
                        createdAt:"asc"
                    },
                    select:{
                        id:true,
                        title:true,
                    }
                },
                id:true,
            }
        })

        if(!user || !user.id) return NextResponse.json({message:USER_NOT_EXISTS});

        const chats = user.chats;

        return NextResponse.json({interviews:chats});

    } catch (error) {
        console.log(error);
        throw new Error(SOMETHING_WENT_WRONG);
    }
}