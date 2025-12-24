"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IndianRupee } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { products } from "@/data/products"

// Filter mattress products for carousel
const mattressProducts = products.filter(product => product.category === "mattress").slice(0, 4)

export default function GracePage() {
  const router = useRouter()
  const [pillowSize, setPillowSize] = useState("")
  const [bedSpreadColor, setBedSpreadColor] = useState("")

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* 1. Hero Section - Mattress Image */}
        <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/mattress.jpg"
              alt="Premium Mattress"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(238, 217, 196, 0.3)" }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                  Ananthala Difference
                </h1>
                <p className="text-xl md:text-2xl text-foreground/90 font-medium">
                  Crafted for Your Needs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Prime Product - Mattress (Hero Product) */}
        <section className="py-24 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                   Ananthala Difference
                 </h1>
                 <p className="text-xl md:text-2xl text-foreground/90 font-medium">
                   Crafted for Your Needs
                 </p>
              </div>
            
            <div className="relative">
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {mattressProducts.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/4"
                    >
                      <div 
                        onClick={() => handleProductClick(product.id)}
                        className="group cursor-pointer p-4 hover:shadow-lg transition-shadow"
                      >
                        <div className="relative aspect-square mb-4 overflow-hidden bg-stone-50">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                        <h3 className="mb-1 text-base md:text-lg text-foreground group-hover:opacity-70 transition-colors line-clamp-2 min-h-10">
                          {product.name}
                        </h3>
                        <p className="mb-2 text-sm md:text-base text-foreground/70">{product.firmness} Firmness</p>
                        <div className="flex items-center gap-1 text-foreground">
                          <IndianRupee className="w-4 h-4" />
                          <span className="text-base md:text-lg font-medium">
                            {product.price.toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#EED9C4" }} />
                <CarouselNext className="right-0 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#EED9C4" }} />
              </Carousel>
            </div>
          </div>
        </section>

        {/* 3. Complimentary Add-ons (Auto-included but Customizable) */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                Complimentary Add-ons
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                These items are automatically included with your mattress purchase. Customize them to match your preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pillows - Complimentary */}
              <div className="bg-[#F5F1ED] p-6 rounded-lg border border-[#EED9C4]/30">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                  Pillows <span className="text-base font-normal text-foreground/70">(Complimentary)</span>
                </h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 h-48 overflow-hidden rounded-lg shrink-0">
                    <Image
                      src="/luxury-plush-mattress-with-pillows-on-bed.jpg"
                      alt="Complimentary Pillows"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <label className="text-lg font-medium text-foreground mb-2 block">Pillow Size</label>
                      <Select value={pillowSize} onValueChange={setPillowSize}>
                        <SelectTrigger className="w-full h-12 text-base">
                          <SelectValue placeholder="Select pillow size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard (50cm x 75cm)</SelectItem>
                          <SelectItem value="queen">Queen (50cm x 90cm)</SelectItem>
                          <SelectItem value="king">King (50cm x 100cm)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="bg-[#EED9C4]/30 p-3 rounded border border-[#EED9C4]/50">
                      <p className="text-foreground/70 text-sm flex items-center gap-2">
                        <span className="text-foreground font-semibold">✓</span>
                        Included at no additional cost
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bed Spread - Complimentary */}
              <div className="bg-[#F5F1ED] p-6 rounded-lg border border-[#EED9C4]/30">
                <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                  Bed Spread <span className="text-base font-normal text-foreground/70">(Complimentary)</span>
                </h3>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-48 h-48 overflow-hidden rounded-lg shrink-0">
                    <Image
                      src="/luxury-plush-mattress-with-pillows-on-bed.jpg"
                      alt="Complimentary Bed Spread"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4 flex-1">
                    <div>
                      <label className="text-lg font-medium text-foreground mb-2 block">Color</label>
                      <Select value={bedSpreadColor} onValueChange={setBedSpreadColor}>
                        <SelectTrigger className="w-full h-12 text-base">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cream">Cream</SelectItem>
                          <SelectItem value="beige">Beige</SelectItem>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="gray">Gray</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="bg-[#EED9C4]/30 p-3 rounded border border-[#EED9C4]/50">
                      <p className="text-foreground/70 text-sm flex items-center gap-2">
                        <span className="text-foreground font-semibold">✓</span>
                        Included at no additional cost
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Customer Testimonials - Video */}
        <section className="py-24 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              Customer Testimonials
            </h2>
            <p className="text-center text-foreground/80 mb-8 max-w-2xl mx-auto">
              Hear from our satisfied customers about their experience with Ananthala mattresses
            </p>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
              <video
                className="w-full h-full object-cover"
                controls
                controlsList="nodownload nofullscreen noremoteplayback"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
                poster="/luxury-plush-mattress-with-pillows-on-bed.jpg"
              >
                <source src="/ananthala hero section video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* 5. About Us - Reused from Landing Page */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              About Us
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/mattress.jpg"
                  alt="About Ananthala"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <p className="text-lg text-foreground/90 leading-relaxed">
                  Founded in 2015, Ananthala was born from a simple yet profound realization: quality sleep is the foundation of a quality life. Our founder, after years of struggling with poor sleep and back pain, discovered that the right mattress could transform not just nights, but entire days. This personal journey sparked a mission to create mattresses that truly serve the needs of every sleeper.
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  What began in a small workshop with a passion for craftsmanship has grown into a trusted name in the sleep industry. We started by handcrafting mattresses for friends and family, carefully listening to their feedback and refining our designs. Word spread about the exceptional comfort and support our mattresses provided, and demand grew organically.
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  Every mattress we create is the result of extensive research, countless prototypes, and feedback from real sleepers. We work with sleep scientists, orthopedic specialists, and materials experts to ensure each design meets the highest standards of comfort, support, and durability.
                </p>
                <Link href="/about">
                  <Button variant="outline" className="mt-6 border-foreground text-foreground hover:bg-foreground hover:text-white">
                    Learn More 
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
