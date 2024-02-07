import { Navbar } from "@/components/navbar";
import React from "react";

export default function InterviewLayout({children}:{children:React.ReactNode}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}