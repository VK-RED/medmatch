'use client'
import { DropZone } from "@/components/dropzone"
import { Fileviewer } from "@/components/fileViewer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function InterviewTypePage(){

    const[file,setFile] = useState<File|null>(null);
    const router = useRouter();
    const[disabled,setDisabled] = useState(true);
    const[fileName,setFileName] = useState("");

    useEffect(()=>{
        console.log(file);
    },[file])

    const sendFile = async()=>{
        if(!file) return;
        const formData = new FormData();
        formData.append('file',file);
        const res = await fetch("/api/upload",{
            method:'POST',
            body:formData,
        })
        const {chatId,title} = await res.json();
        router.push(`/interview/personalised/${title}/${chatId}`)
    }
    
    return (
        <div className="py-20 flex flex-col items-center">

            <div className="flex flex-col items-center space-y-6 mb-20 w-full">

                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Upload files to get Customised Interview !
                </h2>

                <DropZone setFile={setFile} setDisabled={setDisabled} setFileName={setFileName}/>
                {file && <Fileviewer fileName={fileName} fileUrl={URL.createObjectURL(file)}/>}
                <Button disabled={disabled} onClick={sendFile}>SEND</Button>
            </div>

            <div className="border border-b border-dashed border-gray-400 max-w-7xl w-full" />

            <div className="flex flex-col items-center mt-20">
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Quick start with General OB-GYN Questions !
                </h2>
                <p className="text-md text-muted-foreground mb-10">{`Incase you don't have any files. You can go with General OB-GYN interview`}</p>
                <Button onClick={()=>{
                    router.push('/interview')
                }}>GET STARTED</Button>
            </div>
        </div>
        
    )
}

