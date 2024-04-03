'use client'

import { DropZone } from "@/components/dropzone"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"

export default function InterviewTypePage(){

    const[csvfile,setCsvfile] = useState<File|null>(null);

    useEffect(()=>{
        console.log(csvfile);
    },[csvfile])

    const sendFile = async()=>{
        if(!csvfile) return;
        const formData = new FormData();
        formData.append('csvfile',csvfile);
        const res = await fetch("/api/upload",{
            method:'POST',
            body:formData,
        })
        console.log(await res.json());
    }
    
    return (
        <div>
            <CsvDropZone setCsvfile={setCsvfile}/>
            <div>
                <Button onClick={sendFile}>SEND</Button>
            </div>
        </div>
        
    )
}

