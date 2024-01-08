import { useEffect, useState } from "react";

const useRecognise = () => {

    const [recognition,setRecognition] = useState<SpeechRecognition>();
    const [isRecognising, setRecognising] = useState(false);
    const [transcription, setTranscription] = useState("");

    useEffect(()=>{
        initialize();
    },[])

    const initialize = () => {
        const Recognition = webkitSpeechRecognition;

        const recognition = new Recognition();

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
            console.log(event);
            const latestTranscript = event.results[event.results.length - 1][0].transcript;
            setTranscription((prevTranscript) => prevTranscript + ' ' + latestTranscript);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        //Set the recognition
        setRecognition(recognition);
    }

    //Start and stop the Recordings

    const startRecording = () => {
        if(recognition){
            recognition.start();
            setRecognising(p => true);
        }
    }

    const stopRecording = () => {
        if(recognition){
            recognition.stop();
            setRecognising(p => false);
        }
    }

    return {startRecording, stopRecording, isRecording:isRecognising, transcription}

    

}

export default useRecognise;