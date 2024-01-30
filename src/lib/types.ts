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

export type NavBarProps = {
    children : React.ReactNode,
}