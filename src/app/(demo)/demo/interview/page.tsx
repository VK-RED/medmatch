'use client'
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useRetell } from "@/hooks/useRetell";
import { InterviewComponent } from "@/components/interviewComponent";

export default function DemoInterview(){

    const { status } = useSession();
    const {retellClient,startConversation,agentResponse,isIntStarted, stopConversation} = useRetell();
    const {toast} = useToast();
    const router = useRouter();
    const[loading,setLoading] = useState(true);
    const stopConversationRef = useRef(stopConversation);

    // As the ref of stopConversation keeps changing whenever any of the values of useRetell changes
    // So we store it in a Ref and that will be used by the useEffect hook later .

    useEffect(()=>{
        stopConversationRef.current = stopConversation;
    },[stopConversation])

    useEffect(()=>{
        if(status === 'unauthenticated'){
            router.push('/');
            return; 
        }
        if(status === 'authenticated'){

            const toastTimeout = setTimeout(() => {
                toast({ title: "Your Interview is going to end within a Minute !" });
            }, 60000);

            const stopConversationTimeout = setTimeout(()=>{

                stopConversationRef.current();
                toast({
                    title:"Your Demo Interview has ended Successfully !"
                })
                router.push("/");
            },120000)

            return () => {
                clearTimeout(toastTimeout);
                clearTimeout(stopConversationTimeout);
            }
        }
    },[])

    useEffect(()=>{

        // Once the retellClient is initialised,start the conversation with llm interviewer

        if(status === 'authenticated' && retellClient){
            console.log("The title and the retell client is initialised !!");
            startConversation();
            setLoading((p)=>false);
        }

    },[retellClient])
    
    const endInterview = () => {
        stopConversation();
        toast({
            title:"Your demo Interview has ended Successfully !"
        })
        setTimeout(()=>{
            router.push("/");
        },300);
    }


    return (
        <InterviewComponent 
            agentResponse={agentResponse}
            isIntStarted={isIntStarted}
            loading={loading}
            setLoading={setLoading}
            title={`Demo Interview`}
            endInterview={endInterview}
        />
    )
}