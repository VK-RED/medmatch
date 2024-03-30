'use client'

import { Dispatch, SetStateAction } from "react";
import { useDropzone } from "react-dropzone";

export const CsvDropZone = ({setCsvfile}:{setCsvfile:Dispatch<SetStateAction<File | null>>}) => {

    const onDrop = (acceptedFiles:File[]) => {
        const csvFile = acceptedFiles[0];
        setCsvfile((p)=>csvFile);
    };  

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept:{
            'text/csv' : ['.csv'], // accept only CSV files
        }
    });

    //TODO : STYLE THE COMPONENTS 

    return (
        <div className='flex flex-col mt-20 items-center  cursor-pointer border border-red-500'>
            <div className="text-red-200" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drop your CSV files or click to select files</p>
            </div>
        </div>
    );
};