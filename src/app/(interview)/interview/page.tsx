'use client'

import { Button } from "@/components/ui/button";
import useRecognise from "@/hooks/useRecognise";
import useRecording from "@/hooks/useRecording";

export default function InterviewPage(){

    // const {startRecording,stopRecording,isrecording:isRecording} = useRecording();
    const {startRecording, stopRecording, isRecording, transcription} = useRecognise();
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
                        startRecording();
                    }}>Start</Button>
                </div>

            </div>

            {/* <div className="flex flex-col items-center space-y-4">

                <div>
                    Tap the button to stop the voice 
                </div>
                <div>
                    <Button onClick={()=>{
                        stopRecording();
                    }}>Stop</Button>
                </div>

            </div> */}

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
