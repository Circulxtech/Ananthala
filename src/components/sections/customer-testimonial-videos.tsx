'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ReviewVideoModal from '@/components/review-video-modal'

interface ReviewVideo {
  _id: string
  title: string
  description: string
  blobUrl: string
  customerName: string
  isActive: boolean
}

export function CustomerTestimonialVideos() {
  const [videos, setVideos] = useState<ReviewVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<ReviewVideo | null>(null)
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const canShowFour = videos.length > 4

  // Fetch videos from database
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/admin/review-videos')
        const data = await response.json()

        if (data.success) {
          const activeVideos = data.data.filter((v: ReviewVideo) => v.isActive)
          setVideos(activeVideos)
        }
      } catch (error) {
        console.error('[v0] Error fetching review videos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  // Auto-scroll carousel every 5 seconds if more than 4 videos
  useEffect(() => {
    if (videos.length > 4 && !isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % videos.length)
      }, 5000)
      setAutoPlayInterval(interval)

      return () => clearInterval(interval)
    }
  }, [videos.length, isPaused])

  const handlePrev = () => {
    setIsPaused(true)
    setCurrentIndex((prev) => {
      const newIndex = prev - 1
      return newIndex < 0 ? videos.length - 1 : newIndex
    })
  }

  const handleNext = () => {
    setIsPaused(true)
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  // Show all videos if <= 4, otherwise show 4 in circular manner
  const getVisibleVideos = () => {
    if (videos.length === 0) return []
    if (videos.length <= 4) {
      return videos
    }
    // Show 4 videos in a circular manner for 5+ videos
    return [
      videos[currentIndex % videos.length],
      videos[(currentIndex + 1) % videos.length],
      videos[(currentIndex + 2) % videos.length],
      videos[(currentIndex + 3) % videos.length],
    ]
  }

  const visibleVideos = getVisibleVideos()
  const showNavigation = videos.length > 4

  if (loading) {
    return (
      <section className="py-16 px-4 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-foreground">Loading customer testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  if (videos.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 bg-stone-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-4">What Our Divas Say</h2>
          <p className="text-center text-foreground/80 max-w-2xl mx-auto">
            Hear from our satisfied customers about their experience with Ananthala products
          </p>
        </div>

        {/* Videos Grid - Show all available videos */}
        <div className="relative">
          <div
            className={`grid ${
              visibleVideos.length === 1
                ? 'md:grid-cols-1'
                : visibleVideos.length === 2
                  ? 'md:grid-cols-2'
                  : visibleVideos.length === 3
                    ? 'md:grid-cols-3'
                    : 'md:grid-cols-4'
            } gap-6 mb-8`}
          >
            {visibleVideos.map((video) => (
              <div
                key={video._id}
                className="group relative bg-white  overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-[#EED9C4]"
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
                      <Play className="h-6 w-6 text-foreground fill-foreground" />
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{video.title}</h3>
                  {video.customerName && (
                    <p className="text-sm text-foreground mb-2">— {video.customerName}</p>
                  )}
                  {video.description && (
                    <p className="text-sm text-foreground line-clamp-2">{video.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls - Only show if more than 4 videos */}
          {showNavigation && (
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

          {/* Auto-scroll indicator for more than 4 videos */}
          {showNavigation && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-sm text-[#8B5A3C]/60">
                {isPaused ? 'Auto-scroll paused' : 'Auto-scrolling'}
              </span>
              {videos.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex % videos.length ? 'bg-[#8B5A3C] w-4' : 'bg-[#8B5A3C]/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video Modal */}
      <ReviewVideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  )
}
