'use client';

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { InterviewerCard } from "./interviewerCard";
import { useEffect, useState } from "react";
import { DemoInterviewCard } from "./demoInterviewCard";
import { isPaidUser } from "@/actions/user/isPaid";

export const Herocard = () => {

    const router = useRouter();
    const {status,data:session} = useSession();
    const [isDemoStarted,setIsDemoStarted] = useState(false);
    const [isPaid,setIsPaid] = useState(false);

    useEffect(()=>{
      if(status === 'authenticated'){
        (async ()=>{
          const res = await isPaidUser(session.user?.email);
          setIsPaid((p)=>res)
        })()
      }
      
    },[status])

    const words = [
      {
        text: "Welcome",
      },
      {
        text: "to",
      },
      {
        text: "Medmatch",
        className: "dark:text-blue-400 text-blue-500",
      },
    ];

  return (
      <>
          <TypewriterEffectSmooth words={words} />

          <h1 className="text-xl text-zinc-700 font-bold dark:text-zinc-400">
              {`Ace Your Obstetrics Oral Board Exam with AI Interviewers.`}
          </h1>

          <div className="flex items-center space-x-8">

            <Button
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 cursor-pointer my-10"
              onClick={()=>{
                if(status === 'unauthenticated'){
                    router.push("/signup");
                    return;
                }
                else{
                  if(!isPaid){
                    router.push("/pricing");
                    return;
                  }
                  else{
                    router.push("/interview/type");
                    return;
                  }
                }
              }}
              >
                {status === 'authenticated' ? 'Get Started' : 'Sign up'}
            </Button>
          </div>

          
          {
            (status==='unauthenticated' || status === 'authenticated'&& !isPaid ) && 

            <div className="mt-3">
              {
                !isDemoStarted
                ?(
                  <div className="flex flex-col items-center space-y-2">
                    <InterviewerCard text={`Ready? Talk to me like I'm a human administrator!`}/>
                    <Button onClick={()=>{
                      setIsDemoStarted((p)=>true)
                    }}>
                      {`Start my free 3-min Demo`}
                    </Button> 
                  </div>
                
                )
                :<DemoInterviewCard setIsDemoStarted={setIsDemoStarted} isDemoStarted={isDemoStarted}/>
              }
            </div>
          }
          
      </>
  )
}