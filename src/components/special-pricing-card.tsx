'use client';
import { CheckIcon } from "lucide-react"
import { Button } from "./ui/button"
import { premium_product_id } from "@/lib/stripe"
import { useRouter } from "next/navigation"

export const SpecialPricingCard = () => {
    const router = useRouter();
    return (
        <div className="relative flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-800 justify-between border border-purple-500">

            <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Popular
            </div>

            <div>

              <h3 className="text-2xl font-bold text-center">Pro</h3>
              <div className="mt-4 text-center text-zinc-600 dark:text-white">
                <span className="text-4xl font-bold">{`$200`}</span>/ {`5 hours`}
              </div>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                  {`Get 5 hour length of Interview.`}
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  {`Get Extra 1 hour length of Interview.`}
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  {`Access to General OB-GYN Questions.`}
                </li>
                <li className="flex items-center">
                  <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                  {`Access to Personalised Interview.`}
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <Button onClick={()=>router.push(`/checkout/${premium_product_id}`)}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500">Get Started</Button>
            </div>
            
          </div>
    )
}