import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, prisma } from "../../auth/[...nextauth]/route";
import { DEF_PROMPT, READY_MESSAGE, RESPONSE_MISSING, SOMETHING_WENT_WRONG, USER_NOT_EXISTS, USER_NOT_LOGGED_IN } from "@/lib/constants";
import { openai } from "@/lib/openai";


export async function GET(req:NextRequest,res:NextResponse) {
    
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


        // create a new chat and conversation for the given userId

        const chat = await prisma.chat.create({
            data:{
                title:`Interview ${user.chats.length + 1}`,
                userId: user.id,
                conversations:{
                    create:{
                        content:DEF_PROMPT,
                        role:'assistant',
                        userId:user.id,
                    }
                }
            },
            select:{
                conversations:{
                    select:{
                        role:true,
                        content:true,
                    }
                },
                id : true,
            }
        })

        
        // send the initial conversation to openAI

        const firstCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: chat.conversations,
        });

        const firstRes = firstCompletion.choices[0].message.content || RESPONSE_MISSING;

        console.log("THE FIRST COMPLETION RESUT ---->",firstRes);

        if(firstRes ===RESPONSE_MISSING){
            console.log(RESPONSE_MISSING);
            throw new Error(RESPONSE_MISSING);
        }

        // send the ready message to openAI

        const readyConvo : {role:'system'|'assistant'|'user', content:string}[] = chat.conversations;
        readyConvo.push({content:READY_MESSAGE,role:'user'});
        console.log('The Ready Convo is ---------> ', readyConvo);

        const secondCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: readyConvo,
        });

        
        const secondRes = secondCompletion.choices[0].message.content || RESPONSE_MISSING;

        console.log("THE SECOND COMPLETION RESUT ---->",secondRes);

        if(secondRes ===RESPONSE_MISSING){
            console.log(RESPONSE_MISSING);
            throw new Error(RESPONSE_MISSING);
        }

        //put the completionRes in db

        const newConvo = await prisma.conversation.create({
            data:{
                content:secondRes,
                role:'system',
                userId:user.id,
                chatId:chat.id
            }
        })

        return NextResponse.json({message:newConvo.content});


    } catch (error) {
        console.log(error);
        return NextResponse.json({message:SOMETHING_WENT_WRONG})
    }

  }