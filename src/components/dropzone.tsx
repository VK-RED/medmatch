'use client'

import { Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";

export const DropZone = ({setCsvfile}:{setCsvfile:Dispatch<SetStateAction<File | null>>}) => {

    const onDrop = (acceptedFiles:File[]) => {
        const csvFile = acceptedFiles[0];
        setCsvfile((p)=>csvFile);
    };  

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept:{
            'text/csv' : ['.csv'], 
            'application/pdf' : ['.pdf']
        }
    });

    //TODO : STYLE THE COMPONENTS 

    return (
        <div className='flex flex-col mt-20 items-center  cursor-pointer border border-red-500'>
            <div className="text-red-200" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop your files or click to select files</p>
            </div>
        </div>
    );
};