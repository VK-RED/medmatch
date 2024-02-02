'use client'

import { NavBarProps } from "@/lib/types"
import { DarkModeToggler } from "./dark-mode-toggler"
import { AvatarToggler } from "./avatar-toggler"
import { useSession } from "next-auth/react"
export const Navbar = ({children}:NavBarProps) => {

    const {status} = useSession();

    return (
        <div className="flex justify-between pt-3 pb-2 px-5 min-w-[420px] sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight ">
                MedMatch
            </h1>

            <div  className="flex justify-center items-center space-x-4">
                <DarkModeToggler />
                    {/* TODO - YOU NEED TO SHOW AVATAR TOGGLER ONLY IF A USER IS SIGNED IN */}
                
                <AvatarToggler />
            </div>
            
        </div>
    )
}