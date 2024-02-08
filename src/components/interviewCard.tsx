import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { InterviewCardProps } from "@/lib/types"

export const InterviewCard = ({text}:InterviewCardProps) => {

    return  (
        
        <div className="flex items-end space-x-2 p-4 max-w-[700px]">
            <Avatar className="w-8 h-8 order-2 ml-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-900 order-1 mx-4">
                <p className="text-md">{text}</p>
            </div>
        </div>
        
    )
}


  