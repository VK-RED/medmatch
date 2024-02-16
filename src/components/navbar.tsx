'use client'
import { DarkModeToggler } from "./dark-mode-toggler"
import { AvatarToggler } from "./avatar-toggler"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
export const Navbar = () => {

    const {status} = useSession();
    const router = useRouter();

    return (
        <div className="flex justify-between pt-3 pb-2 px-5 min-w-[400px] sticky top-0 z-50 w-full border-b-2 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight ">
                MedMatch
            </h1>

            <div  className="flex justify-center items-center space-x-4">
                <DarkModeToggler />

                {
                    status === 'unauthenticated' ? (
                        <Button onClick={()=>{
                            router.push('/signin');
                        }}>
                            Login
                        </Button>
                    )

                    : <AvatarToggler/>
                }

            </div>
            
        </div>
    )
}