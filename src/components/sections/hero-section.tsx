import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/"
          alt="Premium bedroom with comfortable mattress"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-white text-5xl sm:text-6xl font-normal mb-4 text-balance">PREMIUM COMFORT</h1>
          <h2 className="text-white text-3xl sm:text-4xl font-light mb-6">Sleep Better, Live Better</h2>
          <p className="text-white text-lg mb-8 max-w-xl leading-relaxed">
            Experience the perfect blend of comfort and support with our handcrafted mattresses designed for your best
            sleep yet.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white px-8 py-6 text-base">
              <Link href="/shop">
                Shop Mattresses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#8B5A3C] px-8 py-6 text-base bg-transparent"
            >
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
