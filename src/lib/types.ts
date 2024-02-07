import { z } from "zod";

export const chatSchema = z.object({
    chatId: z.string(),
    message: z.string(),
})

export type chatType = z.infer<typeof chatSchema>

export const endChatSchema = z.object({
    chatId: z.string(),
})

export type EndChatType = z.infer<typeof endChatSchema>

export interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
    authstatus : AuthStatus,
}

export interface AuthPageProps{
    title: string,
    description? : string,
    authstatus : AuthStatus,
}

export enum AuthStatus{
    Signin,
    Signup,
}

export interface ChildrenProps{
    children : React.ReactNode
}
