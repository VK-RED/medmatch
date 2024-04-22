'use client'

import { TimerProps } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

export const TimerComponent = ({totalMinutes}:TimerProps) => {

    const minRef = useRef<number>(totalMinutes);
    const secsRef = useRef<number>(59);
    
    const [minutes,setMinutes] = useState(minRef.current);
    const [seconds, setSeconds] = useState(secsRef.current);

    useEffect(()=>{

        const timerInterval = setInterval(()=>{

            if(minRef.current == 0 && secsRef.current == 0){
                console.log("Interview Ended");
                clearInterval(timerInterval);
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


    },[])


    return (

        <div className="countdown font-mono text-2xl">
            {/* @ts-ignore */}
            <span style={{"--value":minutes}}></span>:
            {/* @ts-ignore */}
            <span style={{"--value":seconds}}></span>
        </div>

    )
}