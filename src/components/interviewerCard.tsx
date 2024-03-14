import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { InterviewerCardProps } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export const InterviewerCard = ({text}:InterviewerCardProps) => {

    return  (
        
        <div className="flex items-end space-x-2 p-4 max-w-[350px] sm:max-w-[500px] lg:max-w-[700px] justify-end">
            <Avatar className="w-8 h-8 order-2 ml-2">
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


  