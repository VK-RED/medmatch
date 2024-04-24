'use client'
import { isPaidUser } from "@/actions/user/isPaid";
import { DropZone } from "@/components/dropzone"
import { Fileviewer } from "@/components/fileViewer";
import { Icons } from "@/components/icons";
import { TypePageLoader } from "@/components/typePageLoader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { INTERVIEW_INITIALIZATION_FAILED, INTERVIEW_INITIALIZED, TRY_LATER } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function InterviewTypePage(){

    const[file,setFile] = useState<File|null>(null);
    const router = useRouter();
    const[disabled,setDisabled] = useState(true);
    const[fileName,setFileName] = useState("");
    const {status, data:session} = useSession();
    const {toast} = useToast();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{

        if(status === 'unauthenticated'){
            router.push('/');
            return;
        }
        if(status === 'authenticated'){
            (async ()=>{
                const res = await isPaidUser(session.user?.email);
                if(!res){
                    router.push("/");
                    return;
                }
            })()
        }

    },[status])
    

    useEffect(()=>{
        console.log(file);
    },[file])

    const sendFile = async()=>{
        if(!file) return;
        setLoading((p)=>true);
        toast({
            title:"Hang on for a moment !! Our Interviewer is preparing Questions !"
        })
        const formData = new FormData();
        formData.append('file',file);
        const res = await fetch("/api/upload",{
            method:'POST',
            body:formData,
        })
        const {message,title,chatId} : {message:string, title?:string, chatId?:string} = await res.json();
        setLoading((p)=>false);

        if(message === INTERVIEW_INITIALIZATION_FAILED){
            toast({title:TRY_LATER});
        }
        else{
            toast({title:INTERVIEW_INITIALIZED});
            setTimeout(()=>{
                router.push(`/interview/personalised/${title}/${chatId}`)
            },500);
        }
        
    }

    if(status === 'loading'){
        return (<TypePageLoader />)
    }
    if(status === 'authenticated'){
        return (
            <div className="py-20 flex flex-col items-center">

                <div className="flex flex-col items-center mb-20">
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Quick start with General OB-GYN Questions !
                    </h2>
                    <p className="text-md text-muted-foreground mb-10">{`Incase you don't have any files. You can go with General OB-GYN interview`}</p>
                    <Button disabled={loading}
                        onClick={()=>{
                        router.push('/interview')
                    }}>GET STARTED</Button>
                </div>

                <div className="border border-b border-dashed border-gray-400 max-w-7xl w-full" />

                <div className="flex flex-col items-center space-y-6 w-full mt-20">

                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Upload files to get Customised Interview !
                    </h2>

                    <DropZone setFile={setFile} setDisabled={setDisabled} setFileName={setFileName}/>
                    {file && <Fileviewer fileName={fileName} fileUrl={URL.createObjectURL(file)}/>}
                    <Button disabled={disabled||loading} onClick={sendFile}>
                        {loading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        SEND
                    </Button>
                </div>

                
            </div>
            
        )
    }
}

