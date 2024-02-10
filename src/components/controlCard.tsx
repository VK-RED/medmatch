import { ControlCardProps } from "@/lib/types"
import { Button } from "./ui/button"
import { Icons } from "./icons"
import { useTextToSpeech } from "@/hooks/useTextToSpeech"

export const ControlCard = ({startRecording,stopRecording,isRecording,chat}:ControlCardProps) => {

    const {speak} = useTextToSpeech();

    const handleRecord = () => {

        // if the state is recording simply stop and  send the recording to backend
        // else start recording 
        if(isRecording){
            stopRecording();
            chat();

        }
        else{
            startRecording();
        }
    }

    return (
        <div className="p-3 flex-col text-center">
           <Button onClick={handleRecord}>
                {isRecording ? 'Send' : 'Record'}
           </Button>

           {
                isRecording &&
                <div className="flex items-center justify-between">

                        <div className="relative top-[6px] animate-pulse">
                            <Icons.solidDot/>
                        </div>
                        

                        <div className="text-sm tracking-tighter text-red-600 animate-pulse mt-6 relative top-[-6px]">
                                Recording 
                        </div>

                </div>
            }

           
        </div>
    )
}