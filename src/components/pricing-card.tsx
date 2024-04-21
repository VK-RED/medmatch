import { Button } from "./ui/button"
import { CheckIcon } from "lucide-react"

export const PricingCard = () => {
    
    return (
        <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-800 justify-between border dark:border-zinc-600 border-gray-300">

            <div>

                <h3 className="text-2xl font-bold text-center">Basic</h3>

                <div className="mt-4 text-center text-zinc-600 dark:text-white">
                    <span className="text-4xl font-bold">{`$50`}</span>/ {`hour`}
                </div>

                <ul className="mt-8 space-y-2">

                    <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                        {`Get 1 hour length of Interview.`}
                    </li>

                    <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                        {`Access to General OB-GYN Questions.`}
                    </li>

                </ul>

                </div>

                <div className="mt-6">
                    <Button className="w-full">Get Started</Button>
                </div>

          </div>
    )
}