import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "./prisma";
import * as bcrypt from 'bcryptjs'
import { randomBytes, randomUUID } from "crypto";

export const authOptions : NextAuthOptions = {

    //Prisma Adapter
    adapter: PrismaAdapter(prisma),
  
    pages: {
      signIn: "/signin",
    },
  
    // Configure one or more authentication providers
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        httpOptions:{
          timeout:process.env.NODE_ENV === 'development' ? 15000 : 5000
        }
      }),
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: 'Credentials',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "email", placeholder: "adithiyan@gmail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          
  
          if(!credentials?.email || !credentials.password) return null;
  
          //Handle Signin here 
          
          const user = await prisma.user.findUnique({where:{
            email:credentials.email,
          }})
  
          if(!user) return null;
  
          const isPasswordValid = bcrypt.compareSync(credentials.password, user.password||"");
  
          if(!isPasswordValid) return null;
          
          return user;
          
        }
      })
      // ...add more providers here
    ],
  
    secret: process.env.NEXTAUTH_SECRET as string,
  
    session: {
      // Choose how you want to save the user session.
      // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
      // If you use an `adapter` however, we default it to `"database"` instead.
      // You can still force a JWT session by explicitly defining `"jwt"`.
      // When using `"database"`, the session cookie will only contain a `sessionToken` value,
      // which is used to look up the session in the database.
      strategy: "jwt" as SessionStrategy,
    
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 30 * 24 * 60 * 60, // 30 days
    
      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      updateAge: 24 * 60 * 60, // 24 hours
      
      // The session token is usually either a random UUID or string, however if you
      // need a more customized session token string, you can define your own generate function.
      generateSessionToken: () => {
        return randomUUID?.() ?? randomBytes(32).toString("hex")
      },
    },
    callbacks:{
      async redirect({baseUrl}:{baseUrl:string}){
        return Promise.resolve(baseUrl)
      },
    }
  }