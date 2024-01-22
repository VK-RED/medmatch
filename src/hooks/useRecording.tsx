import { useEffect, useRef, useState } from "react"


//Since this hook is also dependent on SpeechRecognition, we tend to use the useRecognise Hook .

const useRecording = () => {

    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
    const [isrecording, setIsRecording] = useState(false);
    const chunks = useRef<Blob[]>([]);
    const recognitionRef = useRef<SpeechRecognition>();

    // Get the stream to initialize the mediaRecorder
    const initializeRecorder = (stream:MediaStream) => {

        const recorder = new MediaRecorder(stream);

        //Implement the interface

        recorder.onstart = () => {
            chunks.current = [];
        }

        recorder.ondataavailable = (ev) => {
            chunks.current.push(ev.data);
        }

        recorder.onstop = () => {
            const audioBlob = new Blob(chunks.current,{type:'audio/wav'});
            console.log(`The chunks are -> `, chunks.current);
            console.log('The audioBlob is .....' , audioBlob);
        }

        setMediaRecorder(recorder);

        // Initialize recognition

        recognitionRef.current = new webkitSpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.lang = 'en-US';
        recognition.continuous = true;

        recognition.onresult = (e) => {
            const lIndex = e.results.length - 1;
            const isFinal = e.results[lIndex].isFinal;

            if(isFinal){
                console.log(`The Sound has been ended !!!`);
                console.log(e.results[lIndex][0].transcript);
                stopRecording();
            }
        }

    }

    // When the page gets mounted for the first time, initialize the recorder

    useEffect(()=>{
        navigator   
            .mediaDevices
            .getUserMedia({audio:true})
            .then(initializeRecorder)
    },[])

    //functions to start and stop recording

    const startRecording = () => {
        if(mediaRecorder && recognitionRef.current){
            mediaRecorder.start();
            recognitionRef.current.start();
            setIsRecording((pr) => true);
        }
    }

    const stopRecording = () => {
        if(mediaRecorder && recognitionRef.current){
            mediaRecorder.stop();
            recognitionRef.current.stop();
            setIsRecording((pr) => false);
        }
    }

    return  {
        isrecording,
        startRecording,
        stopRecording,
    }

}

export default useRecording;