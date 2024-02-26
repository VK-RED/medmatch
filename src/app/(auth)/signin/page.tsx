import { Metadata } from "next"
import AuthPage from "@/components/authPage"
import { AuthStatus } from "@/lib/types"
import { SIGNIN_DESCRIPTION, SIGNIN_TITLE } from "@/lib/constants"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getProviders } from "next-auth/react"

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin to your account",
}

export default async function AuthenticationPage(){

  const session = await getServerSession(authOptions);
  const providers = await getProviders();
  
  return (
    <AuthPage authstatus={AuthStatus.Signin} title={SIGNIN_TITLE} description={SIGNIN_DESCRIPTION}/>
  )
}