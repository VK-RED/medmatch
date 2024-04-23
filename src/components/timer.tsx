'use client'

import { TimerProps } from "@/lib/types"

export const TimerComponent = ({minutes,seconds}:TimerProps) => {

    return (

        <div className="countdown font-mono text-2xl">
            {/* @ts-ignore */}
            <span style={{"--value":minutes}}></span>:
            {/* @ts-ignore */}
            <span style={{"--value":seconds}}></span>
        </div>

    )
}