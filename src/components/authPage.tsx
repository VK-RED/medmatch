import Link from "next/link"
import { cn } from "@/lib/utils"
import { UserAuthForm } from "@/components/user-auth-form"
import { buttonVariants } from "@/components/ui/button"
import { AuthPageProps, AuthStatus } from "@/lib/types"

export default function AuthPage({title, description, authstatus}: AuthPageProps) {

  return (
    <>
    {/* TODO : FIX THE HIDDEN PROPERTY */}
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href={authstatus === AuthStatus.Signin ? "/signup" : "/signin"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {authstatus === AuthStatus.Signin ? "Signup" : "Login"}
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-800" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            {/* TODO: ADD A RELEVANT SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Medmatch
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Knowledge gives you the real power !.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </div>
            <UserAuthForm authstatus={authstatus}/>
          </div>
        </div>
      </div>
    </>
  )
}