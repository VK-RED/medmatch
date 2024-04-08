'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
Avatar,
AvatarImage,
} from "@/components/ui/avatar"
import { signIn, signOut, useSession } from "next-auth/react"
  

export const AvatarToggler = () => {

    const {data: session,status} = useSession();
    const imgUrl = session?.user?.image || "/shad.jpeg";
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={imgUrl} alt={!session?.user?.image ?"@shadcn":"User Image"} />
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer"
                        onClick={()=>{
                            if(status === 'authenticated'){
                                signOut();
                                return;
                            }
                            signIn();
                        }}>
                        {status==='authenticated' ?'Signout' : 'Login'}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}