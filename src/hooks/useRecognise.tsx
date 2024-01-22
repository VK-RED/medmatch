import { useEffect, useRef, useState } from "react";

const useRecognise = () => {

    const recognitionRef = useRef<SpeechRecognition>();
    const [isRecognising, setRecognising] = useState(false);
    const [transcription, setTranscription] = useState("");

    useEffect(()=>{
        initialize();
    },[])

    const initialize = () => {
        const Recognition = webkitSpeechRecognition;

        recognitionRef.current = new Recognition();
        const recognition = recognitionRef.current;

        recognition.lang = 'en-US';
        recognition.continuous = true;

        // recognition start functions

        recognition.onstart = function() {
            console.log('Voice Is Activated, You Can Speak');
         };

         recognition.onaudiostart = () => {
            console.log("Audio capturing started");
          };
          

        // When the transcription is detected 

        recognition.onresult = (event) => {
            const latestTranscript = event.results[event.results.length - 1][0].transcript;
            setTranscription((prevTranscript) => prevTranscript + ' ' + latestTranscript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

    }

    //Start and stop the Recordings

    const startRecording = () => {
        if(recognitionRef.current){
            recognitionRef.current.start();
            setTimeout(()=>{
                setRecognising(p => true);
            },1000)
        }
    }

    const stopRecording = () => {
        if(recognitionRef.current){
            recognitionRef.current.stop();
            setRecognising(p => false);
        }
    }

    return {startRecording, stopRecording, isRecording:isRecognising, transcription}

}

export default useRecognise;