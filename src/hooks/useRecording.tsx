import { useEffect, useRef, useState } from "react"

const useRecording = () => {

    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
    const [isrecording, setIsRecording] = useState(false);
    const [audioUrl,setAudioUrl] = useState("");
    const chunks = useRef<Blob[]>([]);

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
            const audioBlob = new Blob(chunks.current,{type:'audio/mp3'});
            const url = URL.createObjectURL(audioBlob);
            setAudioUrl((u)=>url);
        }

        setMediaRecorder(recorder);

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
        if(mediaRecorder){
            mediaRecorder.start();
            setIsRecording((pr) => true);
        }
    }

    const stopRecording = () => {
        if(mediaRecorder){
            mediaRecorder.stop();
            setIsRecording((pr) => false);
        }
    }

    return  {
        isrecording,
        startRecording,
        stopRecording,
        audioUrl
    }

}

export default useRecording;