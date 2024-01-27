import { z } from "zod";

export const chatSchema = z.object({
    chatId: z.string(),
    message: z.string(),
})

export type chatType = z.infer<typeof chatSchema>