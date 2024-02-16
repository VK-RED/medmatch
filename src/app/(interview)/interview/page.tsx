'use client'

import { InterviewerCard } from "@/components/interviewerCard";
import { Button } from "@/components/ui/button";
import useRecording from "@/hooks/useRecording";
import { ChatResponse } from "@/lib/types";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { VoiceRecorder } from "@/components/voiceRecording"

export default function InterviewPage(){

    // Speech to text and text-to-speech hooks 
    const { data: session } = useSession()
    const {startRecording, stopRecording, isrecording, formData} = useRecording();
    const [iResponse,setIresponse] = useState("");

    //handle the chatID
    const chatId = "clso8pb0900021nn9l3sj1gtm";

    useEffect(()=>{
        if(!session){
            // handle this case route the user to landing page
        }
    },[session])

    async function chat(){
        formData?.append("chatId",chatId);

        const res = await fetch("/api/interview/chat",{
            method:"POST",
            body: formData,
        })

        const data:ChatResponse = await res.json();
        setIresponse((p)=>data.message);
        const audio = new Audio(data.audioUri);
        audio.play();
        console.log(data);
    }


    return(
        <div className="h-[90vh] w-screen flex flex-col items-center justify-center">
            
            <div className="flex flex-col items-center py-14 space-y-10  justify-center">
                <InterviewerCard text={iResponse}/>

                {   isrecording &&
                    <div>
                        <VoiceRecorder />
                    </div>
                }


                <div className="flex items-center space-x-4">

                    <div>
                        <Button onClick={()=>{
                            if(!isrecording){
                                startRecording();
                                return;
                            }
                            stopRecording();
                        }}>{isrecording ? "Stop" : "Start"}</Button>
                    </div>

                    {!isrecording && <div>
                        <Button onClick={chat}>{'Send'}</Button>
                    </div>}

                </div>

            </div>

        </div>
    )
}
