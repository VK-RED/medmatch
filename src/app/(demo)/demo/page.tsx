'use client';
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { DemoLoader } from "@/components/demoLoader";
import { useToast } from "@/components/ui/use-toast";

export default function DemoPage(){

    const router = useRouter();
    const {status} = useSession();
    const {toast} = useToast();

    useEffect(()=>{
        if(status === 'unauthenticated'){
            router.push("/");
        }
    },[status])

    if(status === 'loading' || status === 'unauthenticated'){
        if(status === 'unauthenticated'){
            toast({title:"Signin to continue !"});
        }
        
        return (
            <DemoLoader />
        )
    }

    if(status === 'authenticated'){
        return (
            <div className="flex flex-col justify-center items-center border h-[1024px]">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-10">
                    Quick start with General OB-GYN Questions !
                </h2>
                <Button
                    onClick={()=>{
                    router.push('/demo/interview')
                }}>GET STARTED</Button>
            </div>
        )
    }
    
}