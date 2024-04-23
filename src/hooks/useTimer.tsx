'use client'

import { useTimerProps } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export const useTimer = ({totalMinutes, isIntStarted, endInterview}:useTimerProps) => {

    const minRef = useRef<number>(totalMinutes);
    const secsRef = useRef<number>(59);
    
    const [minutes,setMinutes] = useState(minRef.current);
    const [seconds, setSeconds] = useState(secsRef.current);

    const endRef = useRef<()=>Promise<void>>();

    useEffect(()=>{
        if(endInterview){
            endRef.current = endInterview;
        }
    },[endInterview])

    useEffect(()=>{

        if(isIntStarted){
            const timerInterval = setInterval(()=>{

                if(minRef.current == 0 && secsRef.current == 0){
                    console.log("Interview Ended");
                    clearInterval(timerInterval);
                    if(endRef.current){
                        endRef.current();
                    }
                }
                else{
                    if(secsRef.current == 0){
                        minRef.current = minRef.current-1;
                        secsRef.current = 59
                    }
                    else{
                        secsRef.current = secsRef.current-1;
                    }
                    
                    setSeconds((p)=>secsRef.current);
                    setMinutes((p)=>minRef.current);
                }
    
            },1000)
    
            return ()=>{
                clearInterval(timerInterval);
            }
        }

    },[isIntStarted])

    return {minutes,seconds};
}