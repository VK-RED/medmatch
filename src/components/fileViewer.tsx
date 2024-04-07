'use client'
import { File } from 'lucide-react';

export const Fileviewer = ({fileName,fileUrl}:{fileName:string,fileUrl:string}) => {

    const openNewTab = () => {
        window.open(fileUrl);
    }

    return (
        <div onClick={openNewTab} 
            className="flex space-x-2 cursor-pointer">
            <File className="h-6 w-6"/>
            <div className="dark:decoration-white decoration-black underline underline-offset-4">
                {fileName}
            </div>
        </div>
    )
}