import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { GlobeCard } from "@/components/globeCard"
import { Herocard } from "@/components/heroCard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Medmatch",
  description: "Ace your Obstetrics and Gynecology Interviews with our personalized AI Experience",
}


export default function Home() {
  return (
      <div className="flex flex-col items-center mt-16">
          <Herocard />
          <GlobeCard />
          <Features />
          <Footer />
      </div>
  )
}
