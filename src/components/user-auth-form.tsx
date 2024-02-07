"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthStatus, UserAuthFormProps } from "@/lib/types"

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const authStatus = props.authStatus;
    // TODO : HANDLE THE AUTH FLOW HERE 

  async function onSubmit(event: React.SyntheticEvent) {

    // TODO: HANDLE THE SIGNIN / SIGNUP FLOW HERE 

    event.preventDefault()
    setIsLoading(true)
    window.alert("User Login Try !!!")
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          {
            authStatus === AuthStatus.Signup &&
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input
                autoComplete="name"
                autoCorrect="off"
                id="name"
                placeholder="David Willey"
                type="text"
                autoCapitalize="none"
                disabled={isLoading}
              />
            </div>
          }

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              autoComplete="email"
              autoCorrect="off"
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              disabled={isLoading}
            />
          </div>
          {
            authStatus === AuthStatus.Signin &&

            <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Example@123"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          }
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {authStatus === AuthStatus.Signin ? `Sign In with Email` : `Signup with Email`}
          </Button>
        </div>
      </form>
      {authStatus === AuthStatus.Signin &&
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
          </Button>
        </>
      }
    </div>
  )
}