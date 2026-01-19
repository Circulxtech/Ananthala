"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"

interface ReviewVideo {
  _id: string
  title: string
  description: string
  blobUrl: string
  customerName: string
}

interface ReviewVideoModalProps {
  video: ReviewVideo | null
  onClose: () => void
}

export default function ReviewVideoModal({ video, onClose }: ReviewVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.play().catch((err) => console.error("[v0] Autoplay failed:", err))
    }
  }, [video])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (video) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [video, onClose])

  if (!video) return null

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 p-2 rounded-full transition-colors"
        >
          <X className="h-6 w-6 text-white" />
        </button>

        {/* Video Container */}
        <div className="relative aspect-video bg-black">
          <video ref={videoRef} src={video.blobUrl} controls className="w-full h-full" controlsList="nodownload" />
        </div>

        {/* Video Info */}
        <div className="bg-[#6D4530] p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">{video.title}</h3>
          {video.customerName && <p className="text-sm text-white/80 mb-2">By {video.customerName}</p>}
          {video.description && <p className="text-sm text-white/70">{video.description}</p>}
        </div>
      </div>
    </div>
  )
}
