'use client';

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { VoiceRecorder } from "@/components/voiceRecording";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";


export default function ReadyPage(){

    const {status} = useSession();
    const [inDevices,setInDevices] = useState<MediaDeviceInfo[]>([]);
    const [outDevies,setOutDevices] = useState<MediaDeviceInfo[]>([]);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
    const[isRecording,setIsRecording] = useState(false);
    const [isPlaying,setIsPlaying] = useState(false);
    const chunks = useRef<Blob[]>([]);
    const[inputId,setInputId] = useState("default");
    const[outputId,setOutputId] = useState("default");
    const router = useRouter();

    //Check the login status and allow users

    useEffect(()=>{
        if(status === 'unauthenticated'){
            router.push("/");
        }
    },[status])
    
    useEffect(()=>{
        getDevices();
    },[])

    useEffect(()=>{
        if(mediaRecorder && isRecording){
            startRecording();
        }
    },[mediaRecorder])

    const startRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.start();
            console.log(isRecording);
        }
    }

    const stopRecording = () => {
        
        if(mediaRecorder){
            mediaRecorder.stop();
            setIsRecording((P)=>false);
        }
    }

    //  This sets the audio input device
    const changeAudioInput = (deviceId:string) => {
        setInputId((p)=>deviceId);
        localStorage.setItem('audioIn',deviceId);
    }

    //  This sets the audio output device
    const changeAudioOutput = (deviceId:string) => {
        setOutputId((p)=>deviceId);
        localStorage.setItem('audioOut',deviceId);
    }

    // When user clicks on an audio input record the 
    const handleStream = async () => {

        const stream = await navigator.mediaDevices.getUserMedia({audio:{deviceId:inputId}});
        
        const initializeRecorder = (stream:MediaStream):Promise<MediaRecorder> => {

            return new Promise ((res,rej) => {

                const recorder = new MediaRecorder(stream);
    
                //Implement the interface
        
                recorder.onstart = () => {
                    chunks.current = [];
                }
        
                recorder.ondataavailable = (ev) => {
                    chunks.current.push(ev.data);
                }
        
                recorder.onstop = () => {
                    console.log("vf")
                    const aBlob = new Blob(chunks.current,{type:'audio/mp3'});
                    const uri = URL.createObjectURL(aBlob);
                    console.log(uri);
                    const a = new Audio(uri);
                    //@ts-ignore
                    a.setSinkId(outputId);
                    a.play();
                }
        
                res(recorder);
                
            })
            
        }
        const res = await initializeRecorder(stream);
        setIsRecording((p)=>true)
        setMediaRecorder((p)=>res);
    }

    //Get all input and output options
    const getDevices = async () => {
        const d = await navigator.mediaDevices.enumerateDevices();
        setInDevices((p) => d.filter((de)=>de.kind =='audioinput'));
        setOutDevices((p) => d.filter((de)=>de.kind =='audiooutput'));    
        console.log(d);    
    }

    const testAudio = () => {
        const audio = new Audio('https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3');
        //@ts-ignore
        audio.setSinkId(outputId);
        audio.play();
        setIsPlaying((p)=>true);
        setTimeout(()=>{
            audio.pause();
            setIsPlaying((p)=>false);
        },10000)
    }

    if(status === 'loading'){
        return (
            <div>
                Loading ...
            </div>
        )
    }

    if(status === 'authenticated'){

        return (
            <div className="pt-10 flex flex-col items-center justify-center h-[93vh] relative">

                <div className="absolute top-60">
                
                    <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                        Test your Mic and Speakers
                    </h2>

                    {/* DISPLAY THE MIC OPTIONS */}

                    <div className="flex items-center space-x-5 mt-20 relative left-4">
                        <div className="text-md">Mic Inputs</div>

                        <div>
                            <Select onValueChange={(value)=>changeAudioInput(value)}>

                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Source"/>
                                </SelectTrigger>

                                <SelectContent>

                                    {
                                        inDevices.map((d,ind)=>(
                                            <SelectItem key={ind} value={d.deviceId}>{d.label}</SelectItem>
                                        ))
                                    }
                                    
                                </SelectContent>

                            </Select>
                        </div>

                        <Button onClick={()=>{
                            if(!isRecording){
                                handleStream();
                            }
                            else{
                                stopRecording();
                            }
                        }}>
                            {isRecording ? "Stop" : "Test Mic"}
                        </Button>

                    
                    </div>

                    {/* DISPLAY THE SPEAKER OPTIONS */}

                    <div className="flex items-center space-x-5 mt-10">
                        <div className="text-md">Audio Outputs</div>

                        <div>
                            <Select onValueChange={(value)=>changeAudioOutput(value)}>

                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Source"/>
                                </SelectTrigger>

                                <SelectContent>

                                    {
                                        outDevies.map((d,ind)=>(
                                            <SelectItem key={ind} value={d.deviceId}>{d.label}</SelectItem>
                                        ))
                                    }
                                    
                                </SelectContent>

                            </Select>
                        </div>

                        <Button onClick={testAudio}>
                            Test Audio
                        </Button>

                    
                    </div>

                    <div className="mt-10">
                        {isRecording && <VoiceRecorder />}
                    </div>


                    {!isRecording && !isPlaying &&
                        <Button className="w-full" onClick={()=>{
                            router.push('/interview');
                        }}>
                            Start Interview
                        </Button>
                    }

                    

                </div>
                
            </div>
        )
    }
}

