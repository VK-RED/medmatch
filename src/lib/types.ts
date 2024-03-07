import { Session } from "next-auth";
import { z } from "zod";

enum Role{
    user,
    agent,
}

const convoSchema = z.object({
    role: z.nativeEnum(Role),
    content:z.string()
})

export const endChatSchema = z.object({
    chatId: z.string(),
    conversations: z.array(convoSchema),
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


export interface InterviewerCardProps{
    text:string
}

export interface UserReplyCardProps{
    transcription: string,
    session : Session
}

export interface ControlCardProps {
    isRecording? : boolean
    startRecording : () => void,
    stopRecording : () => void,
    chat : () => void,
}

export interface CreateAudioOutput{
    message: string,
    audioPath? : string
}

export interface ChatResponse{
    message: string,
    audioUri?: string,
}

export interface GetInterviewByIdProps{
    params:{id:string},
    searchParams:{}
}

export interface AllInterviewsType{
    interviews?:{
        id:string,
        title:string,
    }[],
    message?:string,
}

export interface InterviewCardProps{
    title:string,
}

export type RetellConvoType = [{role:'user'|'agent', content:string}];

export interface RetellUpdateType{
    transcript : RetellConvoType
}