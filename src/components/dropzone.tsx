'use client'

import { Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { Icons } from "./icons";

export const DropZone = ({setFile}:{setFile:Dispatch<SetStateAction<File | null>>}) => {

    const onDrop = (acceptedFiles:File[]) => {
        const csvFile = acceptedFiles[0];
        setFile((p)=>csvFile);
    };  

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept:{
            'text/csv' : ['.csv'], 
            'application/pdf' : ['.pdf']
        }
    });


    return (

        <div className=" flex flex-col items-center max-w-3xl border-2 border-dashed border-gray-400 mx-auto py-20 px-10 text-center bg-muted cursor-pointer gap-2 rounded-2xl outline-none mt-20" {...getRootProps()}>
            <input {...getInputProps()} />
            <Icons.cloudUpload/>
            <p className="font-bold text-slate-500 dark:text-gray-300" >Drag files to Upload or Click here</p>
            <p className=" text-slate-400 text-sm dark:text-gray-400" >CSV or PDF only</p>
        </div>
        
    );
};