'use client';
import { useRetell } from "@/hooks/useRetell";
import { useToast } from "./ui/use-toast";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ILoader } from "./iloader";
import { InterviewerCard } from "./interviewerCard";
import { Button } from "./ui/button";
import { TimerComponent } from "./timer";
import { useTimer } from "@/hooks/useTimer";

export const DemoInterviewCard = ({isDemoStarted,setIsDemoStarted}:{isDemoStarted:boolean,setIsDemoStarted:Dispatch<SetStateAction<boolean>>}) => {
    const {retellClient,startConversation,agentResponse,isIntStarted, stopConversation} = useRetell();
    const {toast} = useToast();
    const[loading,setLoading] = useState(true);
    const stopConversationRef = useRef(stopConversation);
    const {minutes,seconds} = useTimer({totalMinutes:2,isIntStarted})
    // As the ref of stopConversation keeps changing whenever any of the values of useRetell changes
    // So we store it in a Ref and that will be used by the useEffect hook later .

    useEffect(()=>{
        stopConversationRef.current = stopConversation;
    },[stopConversation])

    useEffect(()=>{
        if(retellClient){
            console.log("The title and the retell client is initialised !!");

            if(isDemoStarted){
                console.log("Demo Interview Initialised by the client!")
                startConversation();
                setLoading((p)=>false);
                
                const toastTimeout = setTimeout(() => {
                    toast({ title: "Your Interview is going to end within a Minute !" });
                }, 120000);

                const stopConversationTimeout = setTimeout(()=>{

                    endInterview();
                    toast({
                        title:"Your Demo Interview has ended Successfully !"
                    })

                },180000) // demo - interview will be stopped after 3 mins

                return () => {
                    clearTimeout(toastTimeout);
                    clearTimeout(stopConversationTimeout);
                }
            }
        }
        
    },[retellClient, isDemoStarted])
    
    const endInterview = () => {
        setLoading((p)=>true);
        stopConversationRef.current();
        setLoading((p)=>false);
        setIsDemoStarted((p)=>false);
        toast({
            title:"Your demo Interview has ended Successfully !"
        });

    }

    if(isDemoStarted){
        return (
            <div>
                <div className="flex flex-col items-center pt-2 pb-8 space-y-6 justify-center">

                    {isIntStarted && <TimerComponent minutes={minutes} seconds={seconds}/>}

                    {
                        (!isIntStarted || loading) ? <ILoader />
                        :
                        <>  
                            <InterviewerCard text={agentResponse}/>
                        </>
                    }

                    <Button disabled={loading} onClick={endInterview}
                            className="dark:bg-red-700" 
                            variant={"destructive"}>
                        {`End Interview`}
                    </Button>

                </div>

            </div>
        )
    }
    else{
        return null;
    }
}