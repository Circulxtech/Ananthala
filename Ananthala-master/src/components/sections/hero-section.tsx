"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Volume2, VolumeX } from "lucide-react"
import { useState, useRef } from "react"

export function HeroSection() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
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
        <div className="max-w-lg bg-white rounded-xl p-4 lg:p-8 shadow-xl" style={{ fontFamily: '"Playfair Display", serif' }}>
          <h1 className="text-black text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2 text-balance">Premium Comfort</h1>
          <h2 className="text-black text-lg sm:text-xl lg:text-2xl font-normal mb-6">Sleep Better, Live Better</h2>

          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-[#8B5A3C] hover:bg-[#6D4530] text-white px-6 py-5 text-lg rounded-md" style={{ fontFamily: '"Playfair Display", serif' }}>
              <Link href="/shop" className="flex items-center">
                Shop Mattresses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border border-[#8B5A3C] text-[#8B5A3C] hover:bg-[#8B5A3C] hover:text-white px-6 py-5 text-lg bg-white rounded-md"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              <Link href="/about">About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
