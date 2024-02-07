import { Navbar } from "@/components/navbar";
import React from "react";

export default function HomeLayout({children}:{children:React.ReactNode}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}