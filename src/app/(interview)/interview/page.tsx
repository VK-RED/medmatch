'use client'

import { Button } from "@/components/ui/button";
import useRecognise from "@/hooks/useRecognise";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";

export default function InterviewPage(){

    // Speech to text and text-to-speech hooks 

    const {startRecording, stopRecording, isRecording, transcription} = useRecognise();
    const {speak} = useTextToSpeech();
    const { data: session } = useSession()
    
    useEffect(()=>{
        console.log(session);
    },[session])

    const initialize = () => {
        speak('I am not in danger, I am the danger')
    }

    return(
        <div className="h-screen w-screen flex flex-col items-center py-14 space-y-10">

            <div>
                Welcome to the Interview page
            </div>

            <div className="flex flex-col items-center space-y-4">

                <div>
                    Tap the button to record the voice 
                </div>
                <div>
                    <Button onClick={()=>{
                        initialize();                        
                    }}>Start</Button>
                </div>

            </div>

            <div>
                {isRecording ? `Your voice is being Recorded !!` : `Your Voice is not recorded !!`}
            </div>

            <div>
                {
                    transcription   
                }
            </div>
        </div>
    )
}
