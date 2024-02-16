import { useEffect, useRef, useState } from "react"

const useRecording = () => {

    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
    const [isrecording, setIsRecording] = useState(false);
    const chunks = useRef<Blob[]>([]);
    const formRef = useRef<FormData|null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob>()
    const mediaStreamRef = useRef<MediaStream|null>(null);
    const [initial,setInitial] = useState(true);

    // Get the stream to initialize the mediaRecorder
    const initializeRecorder = (stream:MediaStream) => {
        mediaStreamRef.current = stream;
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
            mediaStreamRef.current?.getTracks().forEach(track => {console.log(track); return track.stop()});
            mediaStreamRef.current = null;
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
        if(initial && mediaRecorder){
            mediaRecorder.start();
            setIsRecording((pr) => true);
            setInitial((p)=>false)
        }
        else if(!initial && mediaRecorder){
            navigator.mediaDevices.getUserMedia({audio:true})
            .then(stream => {
                initializeRecorder(stream);
                if (mediaRecorder) {
                    mediaRecorder.start();
                    console.log("Media Recorder started")
                    setIsRecording(true);
                }
            })
            .catch(error => {
                console.error('Error accessing media devices:', error);
            });
        }
        else{
            console.log("Something weird is happenning !!")
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
        formData: formRef.current,
        audioBlob,
    }

}

export default useRecording;