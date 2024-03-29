'use client'

import { useEffect } from "react"

export default function InterviewTypePage(){
    useEffect(()=>{

        (async()=>{
            const res = await fetch("/api/upload",{method:"POST"});
            const data = await res.json();
            console.log(data);
        })()
    })
    return (
        <div>
            SEE THE CONSOLE 
        </div>
    )
}
