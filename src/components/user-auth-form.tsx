"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthStatus, UserAuthFormProps } from "@/lib/types"
import { signIn } from "next-auth/react"
import { useToast } from "./ui/use-toast"
import { useRouter, useSearchParams } from "next/navigation"

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const authStatus = props.authstatus;
  const [name,setName] = React.useState("");
  const [email,setEmail] = React.useState("");
  const [password,setPassword] = React.useState("");
  const router = useRouter();
  const {toast} = useToast();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl')||"/";
  

  async function handleSignin(){
      const res = await signIn('credentials',{
          redirect: false,
          email,
          password,
          callbackUrl,
      })

      setEmail(""),
      setPassword("");

      if(res?.error){
          toast({description:"Please enter valid email or password",variant:"destructive"})
          setTimeout(() => {
              router.push("/");
          }, 2000);
          
          return;
      }
      else{
          router.push(callbackUrl);
      }
  }

  async function handleSignup(){
    const body = {
      name,
      email,
      password,
    };

    const res = await fetch("/api/user/register",{
      method:"POST",
      body:JSON.stringify(body),
    });

    setName("");
    setEmail(""),
    setPassword("");

    const data = await res.json();
    const message = data.message;
    toast({description:message});

    setTimeout(()=>{
      router.push('/ready');
    },1000);

  }

  async function onSubmit(event: React.SyntheticEvent) {

    event.preventDefault()
    setIsLoading(true)

    if(authStatus === AuthStatus.Signup){
      handleSignup();
    }
    else{
      handleSignin();
    }
    setIsLoading(false);
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
                value={name}
                onChange={(e)=>setName((p)=>e.target.value)}
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
              placeholder="david@example.com"
              type="email"
              autoCapitalize="none"
              disabled={isLoading}
              value={email}
              onChange={(e)=>setEmail((p)=>e.target.value)}
            />
          </div>
          
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Kjb34r@134"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              value={password}
              onChange={(e)=>setPassword((p)=>e.target.value)}
            />
          </div>
          
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
          <Button onClick={()=>{
            signIn('google');
          }}
            variant="outline" type="button" disabled={isLoading}>
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