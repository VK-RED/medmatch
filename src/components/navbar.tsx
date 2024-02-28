'use client'
import { DarkModeToggler } from "./dark-mode-toggler"
import { AvatarToggler } from "./avatar-toggler"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { MountainIcon } from "lucide-react"

export const Navbar = () => {

    const {status} = useSession();
    
    return (
        <header className="px-4 lg:px-6 lg:py-6 h-14 flex items-center min-w-[400px] sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Link className="flex items-center justify-center" href="/">
                <MountainIcon className="h-6 w-6 dark:animate-pulse" />
                <span className="ml-3 font-bold"> Medmatch </span>
            </Link>

            <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                
                {status === 'authenticated' &&  <Link className="text-sm font-medium hover:underline underline-offset-4" href="/interview/all">
                    History
                </Link>}

                <div  className="flex justify-center items-center gap-5">
                    <DarkModeToggler />

                    {
                        status === 'unauthenticated' ? (
                            <Link className="text-sm font-medium hover:underline underline-offset-4" href="/signin">
                                Signin
                            </Link>
                        )
                        : <AvatarToggler/>
                    }

                </div>
                
            </nav>
        </header>
    )
}

