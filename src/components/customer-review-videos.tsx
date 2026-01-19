"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReviewVideoModal from "@/components/review-video-modal"

interface ReviewVideo {
  _id: string
  title: string
  description: string
  blobUrl: string
  customerName: string
  isActive: boolean
}

export function CustomerReviewVideos() {
  const [videos, setVideos] = useState<ReviewVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<ReviewVideo | null>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/admin/review-videos")
        const data = await response.json()

        if (data.success) {
          const activeVideos = data.data.filter((v: ReviewVideo) => v.isActive)
          setVideos(activeVideos)
        }
      } catch (error) {
        console.error("[v0] Error fetching review videos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  if (loading) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-[#8B5A3C]">Loading customer reviews...</p>
          </div>
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return null
  }

  const visibleVideos = videos.slice(currentIndex, currentIndex + 3)
  const totalPages = Math.ceil(videos.length / 3)
  const currentPage = Math.floor(currentIndex / 3)

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 3
      return newIndex < 0 ? Math.max(0, videos.length - 3) : newIndex
    })
  }

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 3
      return newIndex >= videos.length ? 0 : newIndex
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-medium text-foreground mb-4">What Our Divas Say</h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Join thousands of happy sleepers
          </p>
        </div>

        {/* Video Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleVideos.map((video) => (
              <div
                key={video._id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#E5D5C5]"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-[#E5D5C5] flex items-center justify-center overflow-hidden">
                  <video
                    src={video.blobUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all duration-300">
                    <div className="bg-white rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                      <Play className="h-6 w-6 text-[#8B5A3C] fill-[#8B5A3C]" />
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-[#6D4530] mb-1 line-clamp-1">{video.title}</h3>
                  {video.customerName && <p className="text-sm text-[#8B5A3C]/70 mb-2">— {video.customerName}</p>}
                  {video.description && <p className="text-sm text-[#8B5A3C]/60 line-clamp-2">{video.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
        {videos.length > 3 && (
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handlePrev}
              size="sm"
              variant="outline"
              className="border-[#8B5A3C] text-[#8B5A3C] hover:bg-[#8B5A3C]/5 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {/* Page Indicators */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx * 3)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentPage ? "bg-[#8B5A3C] w-6" : "bg-[#8B5A3C]/30"
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              size="sm"
              variant="outline"
              className="border-[#8B5A3C] text-[#8B5A3C] hover:bg-[#8B5A3C]/5 bg-transparent"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      <ReviewVideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  )
}
