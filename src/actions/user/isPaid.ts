'use server'

import prisma from "@/lib/prisma"

export const isPaidUser = async (email:string|null|undefined)=>{

    if(!email){
        return false;
    }

    const user = await prisma.user.findUnique(
        {
            where:{
                email
            },
            select:{
                minutesLeft:true
            }
        }
    )

    const minutes = user?.minutesLeft || 0;

    if(minutes > 0) return true;
    return false;

}