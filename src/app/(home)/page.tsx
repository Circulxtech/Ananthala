"use client"

import { CarouselNext } from "@/components/ui/carousel"
import { CarouselPrevious } from "@/components/ui/carousel"
import { CarouselItem } from "@/components/ui/carousel"
import { CarouselContent } from "@/components/ui/carousel"
import { Carousel } from "@/components/ui/carousel"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CustomerTestimonialVideos } from "@/components/sections/customer-testimonial-videos"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

// Categories data
const categories = [
  {
    id: 1,
    title: "FOLDABLE MATTRESS",
    subtitle: "COMFORT WHEN OPEN. COMPACT WHEN CLOSED.",
    image:
      "https://images.unsplash.com/photo-1619490742661-8949b7d3a612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY3JpYiUyMG1hdHRyZXNzfGVufDF8fHx8MTc2NTQ0Mzc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    title: "BABY'S MATTRESSES",
    subtitle: "GENTLE SUPPORT FOR YOUR LITTLE ONE",
    image:
      "https://images.unsplash.com/photo-1691703028663-c5ff8cbb07c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZW1vcnklMjBmb2FtJTIwbWF0dHJlc3N8ZW58MXx8fHwxNzY1NDQzNzUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    title: "100% ORGANIC MATTRESSES",
    subtitle: "FREE FROM TOXIC FOAM",
    image:
      "https://images.unsplash.com/photo-1718262722567-9f414d4cf98d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwbWF0dHJlc3MlMjBuYXR1cmFsfGVufDF8fHx8MTc2NTQ0Mzc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
]

interface HomepageCard {
  _id: string
  name: string
  backgroundUrl?: string
  position: "center" | "bottom-right" | "bottom-left"
  isActive?: boolean
  displayOrder?: number
}

// Testimonial Videos data
const testimonialVideos = [
  {
    id: 1,
    name: "Jane Doe",
    video: "/testimonial1.mp4",
    poster: "/testimonial1.jpg",
  },
  {
    id: 2,
    name: "John Smith",
    video: "/testimonial2.mp4",
    poster: "/testimonial2.jpg",
  },
  {
    id: 3,
    name: "Emily Johnson",
    video: "/testimonial3.mp4",
    poster: "/testimonial3.jpg",
  },
]

export default function Home() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [homepageCards, setHomepageCards] = useState<HomepageCard[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % categories.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchHomepageCards = async () => {
      try {
        const response = await fetch("/api/admin/homepage-cards")
        const data = await response.json()

        if (data.success) {
          const activeCards = data.data
            .filter((card: HomepageCard) => card.isActive)
            .sort((a: HomepageCard, b: HomepageCard) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))

          setHomepageCards(activeCards)
        }
      } catch (error) {
        console.error("[v0] Error fetching homepage cards:", error)
        setHomepageCards([])
      }
    }

    fetchHomepageCards()
  }, [])

  const getCategoryPath = (productName: string) => {
    const name = productName.toLowerCase()
    // Map product names to category pages (matching second section redirects)
    if (name === "joy") return "/category/joy#shop"
    if (name === "bliss") return "/category/bliss#shop"
    if (name === "grace") return "/category/grace#shop"
    if (name.includes("pillow") || name.includes("bedsheet")) return "/category/bliss#shop"
    return "/category/bliss#shop"
  }

  const onNavigate = (productName: string) => {
    const path = getCategoryPath(productName)
    router.push(path)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[680px] flex items-end">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/ananthala hero section video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Unmute Button - Bottom Right Corner */}
          <button
            onClick={toggleMute}
            className="absolute bottom-8 right-8 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX className="h-5 w-5 text-[#8B5A3C]" /> : <Volume2 className="h-5 w-5 text-[#8B5A3C]" />}
          </button>

          {/* Action Buttons - Lower Left Corner */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 pb-8 lg:pb-12 pl-4 sm:pl-6 lg:pl-8">
            <Button
              asChild
              className="bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground px-8 py-6 text-lg rounded-md shadow-lg transition-all duration-200 hover:scale-105 w-full sm:w-auto min-w-[160px]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              <Link href="/#find-your-perfect-mattress" className="flex items-center justify-center">
                Shop
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-white/90 text-white hover:bg-white/10 hover:border-white px-8 py-6 text-lg bg-transparent backdrop-blur-sm rounded-md shadow-lg transition-all duration-200 hover:scale-105 w-full sm:w-auto min-w-[160px]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              <Link href="/#comfort" className="flex items-center justify-center">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Experience The Difference Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto text-center px-4">
            <h2
              className="mb-4 font-semibold text-4xl text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              Experience The Difference
            </h2>
            <p
              className="max-w-2xl mx-auto text-xl font-semibold text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              See how our mattresses are crafted with precision and care to deliver unmatched comfort.
            </p>
          </div>
        </div>

        {/* Category Slider Section */}
        <section className="relative w-full overflow-hidden">
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: currentSlide === index ? 1 : 0,
                  pointerEvents: currentSlide === index ? "auto" : "none",
                }}
              >
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <p
                    className="text-sm md:text-base mb-2 tracking-wider"
                    style={{ color: "#F9F8F6", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                  >
                    {category.subtitle}
                  </p>
                  <h2
                    className="text-3xl md:text-5xl mb-6"
                    style={{ color: "#F9F8F6", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
                  >
                    {category.title}
                  </h2>
                  <button
                    className="px-6 py-3 bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground text-base shadow-lg transition-all duration-200 hover:scale-105 cursor-default"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                  >
                    SHOP
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: "#6B563F" }} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" style={{ color: "#6B563F" }} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: currentSlide === index ? "#F9F8F6" : "rgba(249, 248, 246, 0.5)",
                  width: currentSlide === index ? "24px" : "8px",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section id="find-your-perfect-mattress" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-4 text-4xl font-medium text-foreground">Find Your Perfect Mattress</h2>
              <p className="max-w-2xl mx-auto text-xl font-medium text-foreground">
                Each mattress is expertly crafted with premium materials to ensure the perfect night's sleep, every night.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {homepageCards.map((card) => {
                const positionClasses = {
                  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "bottom-right": "bottom-6 left-1/2 -translate-x-1/2",
                  "bottom-left": "bottom-6 left-1/2 -translate-x-1/2",
                }

                const cardKey = card._id || card.name
                const backgroundImage = card.backgroundUrl || ""
                const isGifBackground = /\.(gif)(\?|#|$)/i.test(backgroundImage)
                const positionKey = card.position || "center"

                return (
                  <button
                    key={cardKey}
                    onClick={() => onNavigate(card.name)}
                    className="relative group overflow-hidden aspect-3/4 cursor-pointer bg-gray-100"
                    style={{ overflow: "hidden" }}
                  >
                    {backgroundImage && isGifBackground ? (
                      <img
                        src={backgroundImage}
                        alt={card.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : null}
                    <div
                      className={`absolute ${positionClasses[positionKey as keyof typeof positionClasses]} z-10`}
                    >
                      <div className="bg-[#EED9C4] px-8 py-4 text-center relative min-w-[200px]">
                        <span
                          className="tracking-wider text-base md:text-lg font-semibold uppercase text-foreground relative z-10"
                          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                        >
                          {card.name}
                        </span>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Comfort Section */}
        <section id="comfort" className="py-24 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <p className="text-3xl font-medium mb-2 text-foreground">Our Crafted Heritage</p>

                <p className="mb-6 text-lg text-foreground/90 font-medium">
                  Our mattresses are engineered with cutting-edge sleep technology and premium materials to provide the
                  perfect balance of comfort and support. Every layer is thoughtfully designed to help you wake up
                  refreshed.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#EED9C4] rounded-full mt-2"></div>
                    <div>
                      <p className="mb-1 font-medium text-lg text-foreground">Pressure Relief Technology</p>
                      <p className="font-medium text-lg text-foreground">
                        Conforms to your body for optimal spinal alignment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#EED9C4] rounded-full mt-2"></div>
                    <div>
                      <p className="mb-1 font-medium text-lg text-foreground">Temperature Regulation</p>
                      <p className="font-medium text-lg text-foreground">
                        Advanced cooling system keeps you comfortable all night
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#EED9C4] rounded-full mt-2"></div>
                    <div>
                      <p className="mb-1 font-medium text-lg text-foreground">Motion Isolation</p>
                      <p className="font-medium text-lg text-foreground">
                        Undisturbed sleep even with a restless partner
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/about")}
                  className="bg-[#EED9C4] text-foreground font-medium text-lg px-8 py-3 hover:bg-[#D9BB9B] transition-colors"
                >
                  More
                </button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative aspect-square overflow-hidden">
                  <Image src="/mattress.jpg" alt="Comfort" fill className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Testimonials - Real Videos from Database */}
        <CustomerTestimonialVideos />
      </main>
      <Footer />
    </div>
  )
}
