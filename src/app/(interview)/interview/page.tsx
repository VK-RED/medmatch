'use client'
import { InterviewerCard } from "@/components/interviewerCard";
import { Button } from "@/components/ui/button";
import { EndChatType, Role } from "@/lib/types";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { INTERVIEW_ENDED, NO_INTERVIEW_EXISTS } from "@/lib/constants";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ILoader } from "@/components/iloader";
import { useRetell } from "@/hooks/useRetell";
import { TimerComponent } from "@/components/timer";
import { useTimer } from "@/hooks/useTimer";

export default function InterviewPage(){

    
    const { status } = useSession();
    const {retellClient,startConversation,stopConversation,conversations,agentResponse,isIntStarted} = useRetell();
    const {toast} = useToast();
    const router = useRouter();
    const[loading,setLoading] = useState(true);
    const[chatId,setChatId] = useState("");
    const [title,setTitle] = useState("");
    const{minutes,seconds} = useTimer({totalMinutes:0, isIntStarted, endInterview});
    

    // TODO CHECK IF THE PREVIOUS PAGE IS AUDIO CHECKING PAGE

    useEffect(()=>{
        if(status === 'unauthenticated'){
            router.push('/');
            return;
        }
        if(status === 'authenticated'){
            initInterview();
        }

    },[])

    useEffect(()=>{

        // Once the  title is received && retellClient is initialised , start the conversation with llm interviewer

        if(title && retellClient){
            console.log("The title and the retell client is initialised !!");
            startConversation();
            setLoading((p)=>false);
        }

    },[title, retellClient]) 


    async function initInterview(){
        const res = await fetch('/api/interview/start',{method:'POST'});
        const data:{chatId:string, title:string} = await res.json();
        setChatId((p)=>data.chatId);
        setTitle((p)=>data.title);
    }

    async function endInterview(){

        if(!conversations) return;

        stopConversation();

        const modConvos = conversations.map((con)=>({
            content:con.content,
            role: con.role === 'agent' ? Role.agent : Role.user,
        }))

        const ceiledMinute = (minutes < 59 && seconds <= 30) ? 1 : 0;
        const timeTaken = 60 - (minutes+ceiledMinute);

        console.log("Conversations --->",conversations);
        console.log("Time Taken ----> ", timeTaken);

        const body:EndChatType = {chatId,conversations:modConvos,timeTaken};

        const res = await fetch('/api/interview/end',{
            method:'POST',
            body:JSON.stringify(body),
        });
        const data = await res.json();

        if(data.message === INTERVIEW_ENDED){

            toast({
                title:'Interview has been Ended Successfully !!',
                description:'Checkout your responses on Past Interviews page'
            })
            
            setTimeout(()=>{
                router.push('/interview/all');
            },1000) 
            return;
        }
        
        if(data.message === NO_INTERVIEW_EXISTS){
            toast({
                title:`Can't end the Interview, Enter Valid ChatId`,
            })
        }
    }


    return(

        
            <div className="h-[90vh] w-screen flex flex-col items-center justify-center relative">
                
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 absolute top-10">
                    {title}
                </h2>

                <div className="flex flex-col items-center py-14 space-y-10  justify-center">

                    {
                        !isIntStarted ? <ILoader />
                        :
                        <>
                            <TimerComponent minutes={minutes} seconds={seconds}/>

                            <InterviewerCard text={agentResponse}/>

                        </>
                    }

                    <div className="absolute bottom-10">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button disabled={loading} className="dark:bg-red-700" variant={"destructive"}>
                                    End Interview
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>End Interviewing?</DialogTitle>
                                    <DialogDescription>
                                        Click the Button below to end the interview.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button disabled={loading} onClick={()=>{
                                        setLoading((p)=>true);
                                        endInterview();
                                        setLoading(false);
                                    }} type="submit">End</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                </div>

            </div>
        
       
    )
}
