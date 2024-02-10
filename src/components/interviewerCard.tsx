import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { InterviewCardProps } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export const InterviewerCard = ({text}:InterviewCardProps) => {

    return  (
        
        <div className="flex items-end space-x-2 p-4 max-w-[700px] min-w-[700px]">
            <Avatar className="w-8 h-8 order-2 ml-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="p-3 rounded-lg bg-gray-200 dark:bg-zinc-800 order-1 mx-4 min-h-[50px] flex-col ">
                <Badge className="tracking-tighter mt-1 mb-2">Interviewer</Badge>
                <p className="mx-1">{text}</p>
            </div>
        </div>
        
    )
}


  