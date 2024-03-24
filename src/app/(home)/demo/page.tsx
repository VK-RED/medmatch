"use client";

import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";
import { GlobeCard } from "@/components/globeCard";
import { Features } from "@/components/features";
import { Footer } from "@/components/footer";

export default function DemoPage(){

    return (

        <div className="flex flex-col items-center mt-16">
            <HeroDemo/>
            <GlobeCard />
            <Features />
            <Footer />
        </div>
    )
}

const HeroDemo = () => {

    const router = useRouter();
    const {status} = useSession();

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
                Ace your Obstetrics and Gynecology Interviews with our platform.
            </h1>

            <Button
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 cursor-pointer my-10"
                onClick={()=>{
                if(status === 'unauthenticated'){
                    router.push("/signup");
                    return;
                }
                router.push('/interview');
                return;
                }}
            >
                {status === 'authenticated' ? 'Get Started' : 'Sign up'}
            </Button>
        </>
    )
}