import { Skeleton } from "./ui/skeleton"

export const ConvosLoader = () => {
    return (
        <div className="flex flex-col items-center pt-10 pb-10">

            <div className="mt-5 space-y-5 w-full">
                <ConvoLoader />
                <ConvoLoader />
                <ConvoLoader />
                <ConvoLoader />
                <ConvoLoader />
                <ConvoLoader />
            </div>
            
        </div>
    )
}

const ConvoLoader = () => {
    return (
        <div className="space-x-2 p-4 max-w-[350px] sm:max-w-[500px] lg:max-w-[800px] m-auto">
            <div className="p-5 rounded-lg bg-gray-200 dark:bg-zinc-800 mx-4 min-h-[50px] flex-col space-y-3">
                <Skeleton className="h-4 w-full bg-slate-400 rounded-xl dark:bg-slate-700" />
                <Skeleton className="h-4 w-full bg-slate-400 rounded-xl dark:bg-slate-700" />
            </div>
        </div>
    )
}