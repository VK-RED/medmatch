import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../auth/[...nextauth]/route";
import * as bcrypt from "bcryptjs"

export async function POST(req:NextRequest){

    //TODO: ADD ZOD VALIDATIONS
    const {name,email,password} : {name:string, email:string, password:string} = await req.json();

    const hashedPassword = bcrypt.hashSync(password,10);

    const existingUser = await prisma.user.findFirst({
        where:{
            email
        }
    })

    if(!existingUser){
        const user = await prisma.user.create({
            data:{
                email,
                name,
                password:hashedPassword,
            }
        })

        return NextResponse.json({message:"User Created Successfully !!!"});
    }
    else{
        throw new Error("User Exists Already");
    } 

    
}