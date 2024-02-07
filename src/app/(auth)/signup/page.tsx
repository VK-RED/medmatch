import { Metadata } from "next"
import AuthPage from "@/components/authPage"
import { AuthStatus } from "@/lib/types"
import { SIGNUP_DESCRIPTION, SIGNUP_TITLE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Signup",
  description: "Create a New Account",
}

export default function Signup(){

    return (
        <AuthPage authstatus={AuthStatus.Signup} title={SIGNUP_TITLE} description={SIGNUP_DESCRIPTION}/>
      )
}