import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const ILoader = () => {
    return (
        <div className="flex items-center space-x-4 border border-1 p-10 rounded-xl shadow-xl">
                
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-slate-300 dark:bg-slate-700" />
                    <Skeleton className="h-4 w-[200px] bg-slate-300 dark:bg-slate-700" />
                    <Skeleton className="h-4 w-[150px] bg-slate-300 dark:bg-slate-700" />
                    
                </div>
                <span>
                    <Avatar className="w-8 h-8 order-2 ml-4">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                </span>

            </div>
    )
}