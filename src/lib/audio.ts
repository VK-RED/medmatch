import path from "path";
import { Readable } from "stream";
import fs from "fs";
import { CreateAudioOutput } from "./types";

const createAudioName = () => {

    const word = "akfjvnekvnervmopervoin";
    let res = "";

    for(let i= 0; i < 5; i++){
        const j = Math.floor(Math.random()*word.length);
        res += word.charAt(j);
    }

    res += ".mp3";

    return res;
}

export const createAudioFile = (audioStream:Readable) : Promise<CreateAudioOutput> => {

    const audioName = createAudioName();
    const audioPath = path.join(__dirname,`/../../../../../../${audioName}`);

    return new Promise((res,rej)=>{
        const fileStream = fs.createWriteStream(audioPath);
        audioStream.pipe(fileStream);
        fileStream.on('finish', () => res({audioPath,message:"File Saved Successfully"}));
        fileStream.on('error', error => rej({message:"Problem in Saving the file"}));
    })
}