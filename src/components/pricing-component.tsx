import { PricingCard } from "./pricing-card"
import { SpecialPricingCard } from "./special-pricing-card"

export function PricingComponent() {
  return (
    <section className="min-h-[1024px] w-full flex flex-col items-center justify-center relative">

      <div className="absolute top-20 flex flex-col items-center space-x-3">
        <h1 className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent scroll-m-20 pb-2 text-4xl lg:text-5xl font-bold ">
          {`Straightforward`}
        </h1>
        <h2 className="scroll-m-20 pb-2 text-4xl lg:text-5xl font-bold">
          {`affordable pricing`}
        </h2>

        <div className="text-muted-foreground text-lg mt-10 tracking-tight">
          {`Find a plan that fits your needs.`}
        </div>

      </div>

      <div className="grid grid-cols-2 gap-6 mt-8 md:gap-8">

        <PricingCard/>
        <SpecialPricingCard />

      </div>

      
    </section>
  )
}
