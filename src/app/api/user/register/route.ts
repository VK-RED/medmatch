import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs"
import { registerSchema } from "@/lib/types";
import { ZodError } from "zod";
import { USER_CREATED, USER_EXISTS_ALREADY } from "@/lib/constants";

export async function POST(req:NextRequest){


    try {
        const body = await req.json();
        const {name,email,password} = registerSchema.parse(body);

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

            return NextResponse.json({message:USER_CREATED});
        }
        else{
            throw new Error("User Exists Already");
        } 
    } catch (error) {
        if(error instanceof ZodError){
            console.log(error.message);
            const message = `${error.issues[0].message}, Enter Valid ${error.issues[0].path}`
            return NextResponse.json({message});
        }
        else{
            console.log(error);
            return NextResponse.json({message:USER_EXISTS_ALREADY});
        }
    }

    
}