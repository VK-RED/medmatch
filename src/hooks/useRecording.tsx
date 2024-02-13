import { useEffect, useRef, useState } from "react"

const useRecording = () => {

    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
    const [isrecording, setIsRecording] = useState(false);
    const [audioUrl,setAudioUrl] = useState("");
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
            const url = URL.createObjectURL(aBlob);
            formRef.current?.append('audio',aBlob,'audio.mp3');
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
        audioUrl,
        formData: formRef.current,
        audioBlob
    }

}

export default useRecording;