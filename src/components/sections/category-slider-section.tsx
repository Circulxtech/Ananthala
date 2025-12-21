"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

export function CategorySliderSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

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

  return (
    <>
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
    </>
  )
}

