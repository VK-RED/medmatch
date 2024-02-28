'use client';

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export const Herocard = () => {

    const router = useRouter();

    return (
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="container space-y-10 px-4 md:px-6 py-4  ">
            <div className="grid max-w-[1300px] mx-auto items-start gap-4 px-4 sm:grid-cols-2 sm:gap-6 md:gap-10">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-3xl md:text-4xl leading-6">
                    Ace your Obstetrics and Gynecology Interviews with AI.
                  </h1>
                  <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 pt-10">
                    Experience the platform that prepares you for success. Our AI-powered interview simulations,
                    give you the confidence to shine.
                  </p>
                </div>
                <div className="hidden md:flex flex-col gap-2 min-[400px]:flex-row justify-center pt-10">
                  <Button
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 cursor-pointer"
                    onClick={()=>{router.push("/signup")}}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
              <div className="mx-auto mb-5 mt-4">
                <img
                  alt="Interview Image"
                  className="aspect-[2/1] overflow-hidden rounded-xl object-cover object-center dark:bg-white dark:text-black md:relative md:top-[-15px]"
                  height="400"
                  src="interview.jpg"
                  width="700"
                />
                <div className="flex justify-center mt-10 md:hidden">
                    <Button onClick={()=>{router.push("/signup")}}>Sign Up</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}