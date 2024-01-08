'use client'

import { Button } from "@/components/ui/button";

export default function InterviewPage(){


    return(
        <div className="h-screen w-screen flex flex-col items-center py-14 space-y-10">

            <div>
                Welcome to the Interview page
            </div>

            <div className="flex flex-col items-center space-y-4">

                <div>
                    Tap the button to record the voice 
                </div>
                <div>
                    <Button>Start</Button>
                </div>

            </div>
        </div>
    )
}
