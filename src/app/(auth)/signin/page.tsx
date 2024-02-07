import { Metadata } from "next"
import AuthPage from "@/components/authPage"
import { AuthStatus } from "@/lib/types"
import { SIGNIN_DESCRIPTION, SIGNIN_TITLE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin to your account",
}

export default function AuthenticationPage(){
  
  return (
    <AuthPage authStatus={AuthStatus.Signin} title={SIGNIN_TITLE} description={SIGNIN_DESCRIPTION}/>
  )
}