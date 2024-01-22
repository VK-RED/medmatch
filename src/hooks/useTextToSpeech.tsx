'use client'

import { useEffect, useRef } from "react";

export const useTextToSpeech = () => {

    // return the speak function and the preferred voice

    const synthRef = useRef<SpeechSynthesis>();
    const voiceRef = useRef<SpeechSynthesisVoice>();

    useEffect(()=>{
        initialize();
    },[])

    const speak = (prompt : string) => {
        if(synthRef.current && voiceRef.current){
            const utterThis = new SpeechSynthesisUtterance(prompt);
            utterThis.voice = voiceRef.current;
            synthRef.current.speak(utterThis);
        }
        else{
            console.log("The Speech Synthesis is not available")
        }
    }

    const getVoices = () => {
        if(synthRef.current){
            const voices = synthRef.current.getVoices();
            const preferredVoice = voices[3];
            voiceRef.current = preferredVoice;
        }
    }

    const initialize = () => {
        synthRef.current = window.speechSynthesis;
        // asynchronously get the voices once the voice object is available
        synthRef.current.onvoiceschanged = getVoices;
    }

    return {speak}

}


