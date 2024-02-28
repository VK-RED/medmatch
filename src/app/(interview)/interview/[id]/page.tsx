import prisma from "@/lib/prisma";
import { GetInterviewByIdProps } from "@/lib/types";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { InterviewerCard } from "@/components/interviewerCard";
import { UserReplyCard } from "@/components/userReplyCard";
import { authOptions } from "@/lib/authOptions"

export default async function GetInterviewById(props:GetInterviewByIdProps) {

    const session = await getServerSession(authOptions);

    if(!session || !session.user || !session.user.email){
        redirect("/")
    }

    const user = await prisma.user.findFirst({
        where:{
            email: session.user?.email
        },
        select:{
            id:true,
        }
    })

    if(!user) redirect('/');

    const interviewId = props.params.id;

    const chat = await prisma.chat.findFirst({
        where:{
            id:interviewId,
            userId:user.id,
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

    console.log(chat);

    if(!chat) redirect('/');

    return (
        <div className="flex flex-col items-center pt-10 pb-10">

            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {chat.title}
            </h2>

            <div className="mt-5 space-y-5">
                {
                    chat.conversations.map((c,ind)=>{
            
                        if(c.role === 'system'){

                            if(ind == 1){
                                return (
                                    <div key={c.id} className="lg:relative lg:left-12">
                                        <InterviewerCard text={c.content}/>
                                    </div>
                                )
                            }

                            return (
                                <InterviewerCard key={c.id} text={c.content}/>
                            )
                        }
                        if(c.role === 'user'){
                            return (                              
                                <UserReplyCard key={c.id} transcription={c.content} session={session}/>                               
                            )
                        }
                    })
                }
            </div>
            
        </div>
    )
}