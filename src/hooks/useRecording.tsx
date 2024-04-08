import { useEffect, useRef, useState } from "react"

const useRecording = () => {

    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
    const [isrecording, setIsRecording] = useState(false);
    const chunks = useRef<Blob[]>([]);
    const formRef = useRef<FormData|null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob>()

    // Get the stream to initialize the mediaRecorder
    const initializeRecorder = (stream:MediaStream) => {
        const recorder = new MediaRecorder(stream);

        //Implement the interface

        recorder.onstart = () => {
            chunks.current = [];
            formRef.current = new FormData();
        }

        recorder.ondataavailable = (ev) => {
            chunks.current.push(ev.data);
        }

        recorder.onstop = () => {
            const aBlob = new Blob(chunks.current,{type:'audio/mp3'});
            setAudioBlob((p) => aBlob);
            formRef.current?.append('audio',aBlob,'audio.mp3');
        }

        setMediaRecorder(recorder);

    }

    // When the page gets mounted for the first time, initialize the recorder

    useEffect(()=>{

        const deviceId = localStorage.getItem('audioIn') || "default";

        navigator   
        .mediaDevices
        .getUserMedia({audio:{deviceId}})
        .then(initializeRecorder)
        
    },[])

    //functions to start and stop recording

    const startRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.start();
            setIsRecording((p)=>true);
        }
    }

    const stopRecording = () => {
        if(mediaRecorder){
            mediaRecorder.stop();
            setIsRecording((pr) => false);
        }
    }

    const endStream = () => {
        if(mediaRecorder?.stream){
            mediaRecorder.stream.getTracks().forEach((track)=>{
                track.stop();
            })
        }
    }

    return  {
        isrecording,    
        startRecording,
        stopRecording,
        formData: formRef.current,
        audioBlob,
        endStream,
    }

}

export default useRecording;