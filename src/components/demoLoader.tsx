import { Skeleton } from "./ui/skeleton"

export const DemoLoader = () => {
    
    return (
        <div className="flex flex-col justify-center items-center min-h-[1024px]">

            <div className="flex flex-col items-center border border-1 p-10 rounded-xl shadow-xl w-[700px]">
                
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[600px] bg-slate-300 dark:bg-slate-700" />
                    <Skeleton className="h-4 w-[600px] bg-slate-300 dark:bg-slate-700" />                    
                </div>
                
                <Skeleton className="h-10 w-[100px] bg-slate-300 dark:bg-slate-700 mt-8" />   

            </div>
        </div>
        
    )
}