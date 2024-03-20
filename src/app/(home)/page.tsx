import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { Herocard } from "@/components/heroCard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Medmatch",
  description: "Ace your Obstetrics and Gynecology Interviews with our personalized AI Experience",
}


export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <Herocard />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
