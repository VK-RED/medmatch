'use client'
import { InterviewerCard } from "@/components/interviewerCard";
import { Button } from "@/components/ui/button";
import useRecording from "@/hooks/useRecording";
import { ChatResponse } from "@/lib/types";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { VoiceRecorder } from "@/components/voiceRecording";
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
import { useParams } from 'next/navigation'

export default function PersonalisedInterview(){

    const {title,id} = useParams<{ title: string; id: string }>()
    const { status } = useSession()
    const {startRecording, stopRecording, isrecording, formData} = useRecording();
    const [iResponse,setIresponse] = useState("");
    const {toast} = useToast();
    const router = useRouter();
    const[loading,setLoading] = useState(true);

    useEffect(()=>{

        if(status === 'unauthenticated'){
            router.push('/');
            return;
        }
        if(status === 'authenticated'){
            startInterview();
        }

    },[])

    
    async function chat(){

        formData?.append("chatId",id);
        setLoading((p)=>true)
        const res = await fetch("/api/interview/chat",{
            method:"POST",
            body: formData,
        })

        const data:ChatResponse = await res.json();
        setIresponse((p)=>data.message);
        const audio = new Audio(data.audioUri);
        // const outputId = localStorage.getItem('audioOut') || "default";
        // //@ts-ignore
        // audio.setSinkId(outputId);
        audio.play();
        formData?.delete('audio');
        setLoading((p)=>false);
    }

    async function startInterview(){
        const res = await fetch('/api/interview/chat/start',
        {
            method:'POST',
            body:JSON.stringify({
                chatId:id,
            })
        });
        const data:{message:string,audioUri:string} = await res.json();
        setIresponse((p)=>data.message);
        setLoading((p)=>false);
        const audio = new Audio(data.audioUri);
        // const outputId = localStorage.getItem('audioOut') || "default";
        // //@ts-ignore
        // audio.setSinkId(outputId);
        audio.play();
    }

    // TODO : Fix the End Interview

    async function endInterview(){

        const body = {chatId:id};
        const res = await fetch('/api/interview/chat/end',{
            method:'POST',
            body:JSON.stringify(body),
        });
        const data = await res.json();
        console.log(data);

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
                {`Interview ${title}`}
            </h2>

            <div className="flex flex-col items-center py-14 space-y-10  justify-center">

                {
                    loading ? <ILoader />
                    :
                    <>

                        <InterviewerCard text={iResponse}/>

                        {   isrecording &&
                            <div>
                                <VoiceRecorder />
                            </div>
                        }


                        <div className="flex flex-col items-center space-y-5 w-full">

                            <Button disabled={loading}
                                onClick={()=>{
                                if(!isrecording){
                                    startRecording();
                                    return;
                                }
                                stopRecording();
                            }}>{isrecording ? "Stop Recording" : "Start Recording"}</Button>
                        
    
                            {formData?.get('audio') && <Button disabled={loading} onClick={chat}>{'Send Response'}</Button>}

                        </div>

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