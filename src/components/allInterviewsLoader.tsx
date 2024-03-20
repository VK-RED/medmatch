import { Skeleton } from "@/components/ui/skeleton"

export const AllInterviewsLoader = () => {

    return (
        <div className='pt-10 flex flex-col items-center'>

            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Hang on for a Moment !!
            </h2>

            <div className='grid gap-10 md:grid-cols-2 mt-20'>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>

        </div>
    )
}

export function SkeletonCard() {

    return (
        <div className="flex flex-col space-y-3">

                <Skeleton className="h-[125px] w-[250px] rounded-xl" />

                <div className="space-y-2">

                    <Skeleton className="h-4 w-[250px] bg-slate-300 rounded-xl dark:bg-slate-700" />
                    <Skeleton className="h-4 w-[250px] bg-slate-300 rounded-xl dark:bg-slate-700" />

                </div>
        </div>
    )
  }