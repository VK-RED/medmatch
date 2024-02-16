import { Icons } from "./icons"

export const VoiceRecorder = () => {

    return (
        <div className="text-red-500 animate-pulse flex justify-center">
            <div className="py-[0.4px]">
                <Icons.solidDot/>
            </div>
            <div className="py-1 text-sm">Your response is being recorded</div>
            
        </div>
    )
}