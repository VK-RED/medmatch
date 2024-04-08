import { Skeleton } from "./ui/skeleton"

export const TypePageLoader = () => {
    
    return (
        <div className="py-20 flex flex-col items-center">

            <div className="flex flex-col items-center space-y-6 mb-20 w-full">
                <Skeleton className="h-8 w-[600px] bg-slate-300 dark:bg-slate-700 rounded-full" />
                <Skeleton className="h-[250px] w-[700px] bg-slate-300 dark:bg-slate-700 rounded-lg" />
                <Skeleton className="mt-16 h-10 w-[100px] bg-slate-300 dark:bg-slate-700 rounded-md" />
            </div>

            <div className="border border-b border-dashed border-gray-400 max-w-7xl w-full" />

            <div className="flex flex-col items-center mt-20">

                <Skeleton className="h-8 w-[600px] bg-slate-300 dark:bg-slate-700 rounded-full my-6" />
                <Skeleton className="h-5 w-[400px] bg-slate-300 dark:bg-slate-700 rounded-full" />
                <Skeleton className="mt-16 h-10 w-[100px] bg-slate-300 dark:bg-slate-700 rounded-md" />
            </div>
        </div>
    )
}