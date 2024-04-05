'use client'
import { DropZone } from "@/components/dropzone"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function InterviewTypePage(){

    const[file,setFile] = useState<File|null>(null);
    const router = useRouter();

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
        <div>
            <DropZone setFile={setFile}/>
            <div>
                <Button onClick={sendFile}>SEND</Button>
            </div>
        </div>
        
    )
}

