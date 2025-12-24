"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function JoyPage() {
  const [hamperSelected, setHamperSelected] = useState(true)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [bedsheetColor, setBedsheetColor] = useState("")
  const [swaddleSelected, setSwaddleSelected] = useState(false)

  const babyProducts = [
    { id: "mattress", name: "Mattress" },
    { id: "topper", name: "Topper" },
    { id: "lounger", name: "Lounger" },
    { id: "head-pillow", name: "Head Pillow" },
    { id: "pillow-bumpers", name: "Pillow Bumpers" },
  ]

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Ananthala Difference Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-foreground mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              Ananthala Difference
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 font-medium max-w-3xl mx-auto">
              At Ananthala we specifically make products to take care of your babies health
            </p>
          </div>
        </section>

        {/* Baby Hamper Section */}
        <section className="py-16 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              Baby Hamper
            </h2>
            <p className="text-center text-foreground/80 mb-8 max-w-2xl mx-auto">
              Complete set includes: Mattress, Topper, Lounger, Head Pillow, and Pillow Bumpers
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/productmattress.jpg"
                  alt="Baby Hamper"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-lg border-2 border-[#EED9C4]">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Hamper Includes:</h3>
                  <div className="space-y-3">
                    {babyProducts.map((product) => (
                      <label key={product.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hamperSelected || selectedItems.includes(product.id)}
                          onChange={() => !hamperSelected && toggleItem(product.id)}
                          disabled={hamperSelected}
                          className="w-5 h-5 text-[#EED9C4] border-foreground/30 rounded focus:ring-[#EED9C4]"
                        />
                        <span className="text-foreground font-medium">{product.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground px-8 py-6 text-lg"
                  onClick={() => setHamperSelected(true)}
                >
                  Add Complete Hamper to Cart
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Buy Individually Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              Buy Individually
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {babyProducts.map((product) => (
                <div key={product.id} className="border border-[#EED9C4] rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                    <Image
                      src="/productmattress.jpg"
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{product.name}</h3>
                  <Button 
                    className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground"
                    onClick={() => {
                      setHamperSelected(false)
                      toggleItem(product.id)
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bedsheet Section - Complimentary */}
        <section className="py-16 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              Bedsheet <span className="text-lg font-normal">(Complimentary with purchase)</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-8">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/cotton.jpg"
                  alt="Bedsheet"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-lg font-medium text-foreground mb-2 block">Color</label>
                  <Select value={bedsheetColor} onValueChange={setBedsheetColor}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cream">Cream</SelectItem>
                      <SelectItem value="pink">Pink</SelectItem>
                      <SelectItem value="blue">Blue</SelectItem>
                      <SelectItem value="white">White</SelectItem>
                      <SelectItem value="yellow">Yellow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-foreground/80">Complimentary bedsheet included with your purchase.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Swaddles Section - Optional */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              Swaddles <span className="text-lg font-normal">(Optional)</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Organic Cotton", "Bamboo", "Muslin", "Linen"].map((type) => (
                <div key={type} className="border border-[#EED9C4] rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                    <Image
                      src="/cotton.jpg"
                      alt={`${type} Swaddle`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">{type} Swaddle</h3>
                  <Button 
                    className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground"
                    onClick={() => setSwaddleSelected(true)}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials - Video */}
        <section className="py-16 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              Customer Testimonials
            </h2>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                controls
                poster="/productmattress.jpg"
              >
                <source src="/ananthala hero section video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-8 text-center" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              About Us
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/productmattress.jpg"
                  alt="About Ananthala"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <p className="text-lg text-foreground/90 leading-relaxed">
                  At Ananthala, we are committed to crafting premium products that take care of your baby's health. Our baby products are designed with safety and comfort in mind, using only the finest materials and innovative technology.
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  Every product is expertly crafted to ensure your little one gets the best care. We believe in quality, safety, and putting your baby's well-being first.
                </p>
                <Link href="/about">
                  <Button variant="outline" className="mt-6 border-foreground text-foreground hover:bg-foreground hover:text-white">
                    Learn More About Us
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

