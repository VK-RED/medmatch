import { Navbar } from "@/components/navbar";
import { ChildrenProps } from "@/lib/types";
import React from "react";

export default function HomeLayout({children}:ChildrenProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}