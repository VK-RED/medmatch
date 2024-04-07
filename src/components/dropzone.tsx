'use client'

import { Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";
import { Icons } from "./icons";

export const DropZone = ({setFile,setDisabled,setFileName}:{setFile:Dispatch<SetStateAction<File | null>>, setDisabled:Dispatch<SetStateAction<boolean>>,
setFileName: Dispatch<SetStateAction<string>>}) => {

    const onDrop = (acceptedFiles:File[]) => {
        const file = acceptedFiles[0];
        setFile((p)=>file);
        setDisabled((p)=>false);
        setFileName((p)=>file.name)
    };  

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept:{
            'text/csv' : ['.csv'], 
            'application/pdf' : ['.pdf']
        }
    });


    return (

        <div className=" flex flex-col w-full items-center max-w-3xl border-2 border-dashed border-gray-400 mx-auto py-20 px-10 text-center bg-muted cursor-pointer gap-2 rounded-2xl outline-none" {...getRootProps()}>
            <input {...getInputProps()} />
            <Icons.cloudUpload/>
            <p className="font-bold text-slate-500 dark:text-gray-300" >Drag files to Upload or Click here</p>
            <p className=" text-slate-400 text-sm dark:text-gray-400" >CSV or PDF only</p>
        </div>
        
    );
};