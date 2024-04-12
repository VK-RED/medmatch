'use client';

import { InterviewComponentProps } from "@/lib/types";
import { ILoader } from "./iloader";
import { InterviewerCard } from "./interviewerCard";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export const InterviewComponent = ({title, isIntStarted, agentResponse, loading, setLoading, endInterview}:InterviewComponentProps) => {

    
    return (
        <div className="h-[90vh] w-screen flex flex-col items-center justify-center relative">
                
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 absolute top-10">
                    {title}
                </h2>

                <div className="flex flex-col items-center py-14 space-y-10  justify-center">

                    {
                        !isIntStarted ? <ILoader />
                        :
                        <>
                            <InterviewerCard text={agentResponse}/>
                        </>
                    }

                    <div className="absolute bottom-10">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button disabled={loading} className="dark:bg-red-700" variant={"destructive"}>
                                    End Interview
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>End Interviewing?</DialogTitle>
                                    <DialogDescription>
                                        Click the Button below to end the interview.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button disabled={loading} onClick={async ()=>{
                                        setLoading((p)=>true);
                                        if(endInterview){
                                            await endInterview();
                                        }
                                        setLoading(false);
                                    }} type="submit">End</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                </div>

            </div>
    )
}