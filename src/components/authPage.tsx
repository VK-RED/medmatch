import Link from "next/link"
import { cn } from "@/lib/utils"
import { UserAuthForm } from "@/components/user-auth-form"
import { buttonVariants } from "@/components/ui/button"
import { AuthPageProps, AuthStatus } from "@/lib/types"
import { MountainIcon } from "lucide-react"

export default function AuthPage({title, description, authstatus}: AuthPageProps) {

  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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
          <Link href="/">
            <div className="relative z-20 flex items-center text-lg font-medium">
              <MountainIcon className="h-6 w-6 dark:animate-pulse mx-2" />
              <div>
                Medmatch
              </div>
            </div>
          </Link>
          
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;The roots of education are bitter, but the fruit is sweet !&rdquo;
              </p>
              <footer className="text-sm">Aristotle</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
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