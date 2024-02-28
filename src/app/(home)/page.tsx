import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { Herocard } from "@/components/heroCard"

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
