"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
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
      "https://images.unsplash.com/photo-1691703028663-c5ff8cbb07c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xkYWJsZSUyMG1hdHRyZXNzJTIwY29tcGFjdHxlbnwxfHx8fDE3NjU0NDM3NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    title: "100% ORGANIC MATTRESSES",
    subtitle: "FREE FROM TOXIC FOAM",
    image:
      "https://images.unsplash.com/photo-1718262722567-9f414d4cf98d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwbWF0dHJlc3MlMjBuYXR1cmFsfGVufDF8fHx8MTc2NTQ0Mzc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    title: "BABY'S MATTRESSES",
    subtitle: "GENTLE SUPPORT FOR YOUR LITTLE ONE",
    image:
      "https://images.unsplash.com/photo-1619490742661-8949b7d3a612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY3JpYiUyMG1hdHRyZXNzfGVufDF8fHx8MTc2NTQ0Mzc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    title: "MEMORY FOAM LUXURY",
    subtitle: "ADAPTIVE COMFORT FOR PERFECT REST",
    image:
      "https://images.unsplash.com/photo-1691703028663-c5ff8cbb07c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtZW1vcnklMjBmb2FtJTIwbWF0dHJlc3N8ZW58MXx8fHwxNzY1NDQzNzUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
]

// Products data
const products = [
  {
    id: 1,
    name: "BED SHEETS",
    image: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
    position: "center",
  },
  {
    id: 2,
    name: "BATH TOWELS",
    image: "/hybrid-mattress-with-blue-accent-pillows-bedroom.jpg",
    position: "center",
  },
  {
    id: 3,
    name: "BLANKETS",
    image: "/firm-mattress-with-beige-bedding-modern-bedroom.jpg",
    position: "center",
  },
  {
    id: 4,
    name: "PILLOWS",
    image: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
    position: "center",
  },
]

// Reviews data
interface Review {
  text: string
  author: string
}

const reviews: Review[] = [
  {
    text: "Best sleep I've had in years! The Cloud mattress is incredibly comfortable and I wake up without any back pain.",
    author: "Sarah Johnson",
  },
  {
    text: "The Harmony hybrid is perfect. Great support with just the right amount of softness. Worth every penny!",
    author: "Michael Chen",
  },
  {
    text: "Amazing customer service and the delivery was seamless. The mattress exceeded my expectations.",
    author: "Emily Davis",
  },
]

export default function Home() {
  const router = useRouter()
  const [isMuted, setIsMuted] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
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

  const getCategoryPath = (productName: string) => {
    const name = productName.toLowerCase()
    if (name.includes("pillow")) return "/pillows"
    if (name.includes("bed sheet") || name.includes("blanket")) return "/bedding"
    if (name.includes("towel")) return "/bedding"
    return "/mattress"
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
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
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
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-[#8B5A3C]" />
            ) : (
              <Volume2 className="h-5 w-5 text-[#8B5A3C]" />
            )}
          </button>

          {/* Content Box - Left Bottom Corner */}
          <div className="w-full relative z-10 pb-4 lg:pb-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg bg-white rounded-xl p-4 lg:p-8 shadow-xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
              <h1 className="text-black text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 text-balance">Premium Comfort</h1>
              <h2 className="text-black text-xl sm:text-2xl lg:text-3xl font-medium mb-6">Sleep Better, Live Better</h2>

              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-[#EED9C4] hover:bg-[#D9BB9B] text-black px-6 py-5 text-lg rounded-md" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                  <Link href="/shop" className="flex items-center">
                    Shop
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border border-[#EED9C4] text-black hover:bg-[#EED9C4] hover:text-black px-6 py-5 text-lg bg-white rounded-md"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                >
                  <Link href="/#comfort">More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Experience The Difference Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto text-center px-4">
            <h2
              className="mb-4 font-semibold text-4xl "
              style={{ color: "#000000" }}
            >
              Experience The Difference
            </h2>
            <p
              className="max-w-2xl mx-auto text-xl font-semibold"
              style={{ color: "#000000" }}
            >
              See how our mattresses are crafted with precision
              and care to deliver unmatched comfort.
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
                  src={category.image}
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
                    style={{ color: "#F9F8F6" }}
                  >
                    {category.subtitle}
                  </p>
                  <h2
                    className="text-3xl md:text-5xl mb-6"
                    style={{ color: "#F9F8F6" }}
                  >
                    {category.title}
                  </h2>
                  <button
                    className="px-8 py-3 bg-white hover:bg-gray-100 transition-colors"
                    style={{ color: "#6B563F" }}
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
                  backgroundColor:
                    currentSlide === index ? "#F9F8F6" : "rgba(249, 248, 246, 0.5)",
                  width: currentSlide === index ? "24px" : "8px",
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="mb-4 text-4xl font-semibold"
                style={{ color: "#000000" }}
              >
                Find Your Perfect Mattress
              </h2>
              <p
                className="max-w-2xl mx-auto text-xl font-semibold"
                style={{ color: "#000000" }}
              >
                Each mattress is expertly crafted with premium
                materials to ensure the perfect night's sleep,
                every night.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {products.map((product) => {
                const positionClasses = {
                  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  "bottom-right": "bottom-6 left-1/2 -translate-x-1/2",
                  "bottom-left": "bottom-6 left-1/2 -translate-x-1/2",
                }

                return (
                  <button
                    key={product.id}
                    onClick={() => onNavigate(product.name)}
                    className="relative group overflow-hidden aspect-3/4 cursor-pointer bg-gray-100"
                  >
                    {/* Image placeholder - replace with actual Image component when images are ready */}
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Image Placeholder</span>
                    </div>
                    {/* Uncomment when images are ready:
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    */}
                    <div className={`absolute ${positionClasses[product.position as keyof typeof positionClasses]}`}>
                      <div className="bg-white px-6 py-3 text-center">
                        <span
                          className="tracking-wider text-sm md:text-base font-semibold uppercase"
                          style={{ color: "#000000", fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
                        >
                          {product.name}
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
                <p
                  className="text-3xl font-bold mb-2"
                  style={{ color: "#000000" }}
                >
                  Crafted for Comfort
                </p>
                <h2 className="mb-6 text-xl font-semibold" style={{ color: "#000000" }}>
                  The Science of Better Sleep
                </h2>
                <p className="mb-6 text-lg text-black/90 font-medium" style={{ color: "#000000" }}>
                  Our mattresses are engineered with cutting-edge sleep technology and premium materials to
                  provide the perfect balance of comfort and support. Every layer is thoughtfully designed to
                  help you wake up refreshed.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#EED9C4] rounded-full mt-2"></div>
                    <div>
                      <p className="mb-1 font-medium text-lg" style={{ color: "#000000" }}>
                        Pressure Relief Technology
                      </p>
                      <p className="font-medium text-lg" style={{ color: "#000000" }}>
                        Conforms to your body for optimal spinal alignment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#EED9C4] rounded-full mt-2"></div>
                    <div>
                      <p className="mb-1 font-medium text-lg" style={{ color: "#000000" }}>
                        Temperature Regulation
                      </p>
                      <p className="font-medium text-lg" style={{ color: "#000000" }}>
                        Advanced cooling system keeps you comfortable all night
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#EED9C4] rounded-full mt-2"></div>
                    <div>
                      <p className="mb-1 font-medium text-lg" style={{ color: "#000000" }}>
                        Motion Isolation
                      </p>
                      <p className="font-medium text-lg" style={{ color: "#000000" }}>
                        Undisturbed sleep even with a restless partner
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/about")}
                  className="bg-[#EED9C4] text-black font-medium text-lg px-8 py-3 hover:bg-[#D9BB9B]  transition-colors"
                >
                  More
                </button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1590924439021-85cdab4bca41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21mb3J0YWJsZSUyMGJlZCUyMHNsZWVwfGVufDF8fHx8MTc2NDE3NTUwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Comfort"
                    fill
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-4xl lg:text-4xl font-bold text-black mb-4 text-balance">
                What Our Customers Say
              </h2>
              <p className="text-xl sm:text-2xl text-black font-semibold">Join thousands of happy sleepers</p>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
              {reviews.map((review, index) => (
                <div key={index} className="bg-[#EED9C4] rounded-lg p-8 flex flex-col">
                  {/* Review Text */}
                  <p className="text-black text-base sm:text-lg mb-6 grow leading-relaxed font-semibold">{review.text}</p>

                  {/* Author */}
                  <p className="text-black font-semibold">— {review.author}</p>
                </div>
              ))}
            </div>

            {/* Rating Summary */}
            <div className="text-center">
              <p className="text-black text-lg font-semibold">Rated 4.9/5 from over 10,000 reviews</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
