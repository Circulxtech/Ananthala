"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import { useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

export default function Story() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Video Section */}
        <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/ananthala hero section video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="h-5 w-5 text-[#8B5A3C]" /> : <Volume2 className="h-5 w-5 text-[#8B5A3C]" />}
          </button>

          {/* Overlay Title */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1
              className="text-4xl md:text-6xl font-medium text-white text-center px-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: "0 4px 6px rgba(0,0,0,0.3)" }}
            >
              Our Story
            </h1>
          </div>
        </section>

        {/* Story Section 1 - Origin */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2
                  className="text-3xl md:text-4xl font-medium text-foreground mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  The Beginning
                </h2>
                <p className="text-lg text-foreground/80 font-medium mb-4">
                  Ananthala was founded with a simple yet profound belief: everyone deserves a good night's sleep. Our
                  journey began when our founder, frustrated with the lack of truly premium yet affordable mattresses,
                  decided to create one.
                </p>
                <p className="text-lg text-foreground/80 font-medium mb-4">
                  What started as a small workshop has grown into a leading mattress manufacturer, committed to blending
                  traditional craftsmanship with modern sleep science.
                </p>
                <p className="text-lg text-foreground/80 font-medium">
                  Today, thousands of families trust Ananthala for their sleep needs, and we continue our mission to
                  make quality rest accessible to everyone.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative aspect-square overflow-hidden">
                  <Image src="/mattress.jpg" alt="Our Story Beginning" fill className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section 2 - Our Values */}
        <section className="py-16 md:py-24 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-medium text-foreground mb-12 text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white p-8 border border-amber-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-medium text-[#8B5A3C] mb-4">Quality</h3>
                <p className="text-foreground/80 font-medium">
                  We never compromise on quality. Every mattress is made with the finest materials and undergoes
                  rigorous testing to ensure durability and comfort.
                </p>
              </div>
              <div className="bg-white p-8 border border-amber-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-medium text-[#8B5A3C] mb-4">Sustainability</h3>
                <p className="text-foreground/80 font-medium">
                  We're committed to environmental responsibility. Our 100% organic mattresses are made without toxic
                  chemicals and are fully recyclable.
                </p>
              </div>
              <div className="bg-white p-8 border border-amber-100 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-medium text-[#8B5A3C] mb-4">Customer Care</h3>
                <p className="text-foreground/80 font-medium">
                  Your satisfaction is our priority. We stand behind every product with our 100-night trial and 15-year
                  warranty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section 3 - Our Craftsmanship */}
        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="relative aspect-square overflow-hidden">
                  <Image src="/mattress.jpg" alt="Our Craftsmanship" fill className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h2
                  className="text-3xl md:text-4xl font-medium text-foreground mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Expert Craftsmanship
                </h2>
                <p className="text-lg text-foreground/80 font-medium mb-4">
                  Every Ananthala mattress is a masterpiece of engineering and artistry. Our skilled craftspeople
                  combine decades of experience with the latest sleep technology.
                </p>
                <p className="text-lg text-foreground/80 font-medium mb-4">
                  From the organic cotton outer layer to the individually wrapped coils within, every component is
                  selected and assembled with precision.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Hand-selected premium materials",
                    "Precision-engineered support systems",
                    "Advanced cooling technology",
                    "Sustainable production methods",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-[#8B5A3C] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-foreground/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section 4 - Testimonials */}
        <section className="py-16 md:py-24 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-medium text-foreground mb-12 text-center"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Stories From Our Customers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  text: "After years of bad sleep, the Joy mattress changed my life. I wake up refreshed and pain-free. Highly recommend!",
                },
                {
                  name: "Michael Chen",
                  text: "The quality is unmatched. It's clear that Ananthala cares about craftsmanship. Worth every penny.",
                },
                {
                  name: "Emily Rodriguez",
                  text: "Customer service was exceptional. They answered all my questions and helped me pick the perfect mattress.",
                },
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white p-8 border border-amber-100">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#8B5A3C] text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-foreground/80 font-medium mb-4">"{testimonial.text}"</p>
                  <p className="text-foreground font-semibold">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 bg-[#8B5A3C]">
          <div className="max-w-7xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-medium text-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Join Thousands of Happy Sleepers
            </h2>
            <p className="text-lg text-amber-50 font-medium mb-8 max-w-2xl mx-auto">
              Experience the Ananthala difference. 100 nights risk-free with 15-year warranty.
            </p>
            <a
              href="/category/joy"
              className="inline-block bg-[#EED9C4] text-[#8B5A3C] font-medium px-8 py-4 hover:bg-[#D9BB9B] transition-colors"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Shop Our Mattresses
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
