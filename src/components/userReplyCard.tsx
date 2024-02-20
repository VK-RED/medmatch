import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { UserReplyCardProps } from "@/lib/types";

export const UserReplyCard = ({transcription,session}:UserReplyCardProps) => {

    const userImg = session.user?.image || "";

    return (
        <div className="flex items-end space-x-2 p-4 max-w-[350px] sm:max-w-[500px] lg:max-w-[700px] lg:min-w-[700px]">
            <Avatar className="w-8 h-8 order-1 mr-2">
                <AvatarImage src={userImg} />
                <AvatarFallback>{session?.user?.name?.substring(0,1) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="p-3 rounded-lg bg-gray-200 dark:bg-zinc-800 order-2 mx-4 min-h-[50px] flex-col">
                <Badge className="tracking-tighter mt-1 mb-2">{session?.user?.name || "User"}</Badge>
                <p className="mx-1">{transcription}</p>
            </div>
        </div>
    )
}