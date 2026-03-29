"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImageViewerModalProps {
  images: string[]
  initialIndex: number
  productName: string
  isOpen: boolean
  onClose: () => void
}

export function ProductImageViewerModal({
  images,
  initialIndex,
  productName,
  isOpen,
  onClose,
}: ProductImageViewerModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(initialIndex)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  if (!isOpen) return null

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length)
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
  }

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetZoom = () => {
    setZoomLevel(1)
    setPanPosition({ x: 0, y: 0 })
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index)
    resetZoom()
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex flex-col"
      onClick={onClose}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black border-b border-white/20">
        <h2 className="text-white text-lg font-semibold">{productName}</h2>
        <Button
          onClick={onClose}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Main Image Container */}
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className="relative cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            style={{
              transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
              transition: isDragging ? "none" : "transform 0.2s ease-out",
            }}
          >
            <Image
              src={images[selectedImageIndex]}
              alt={`${productName} - image ${selectedImageIndex + 1}`}
              width={800}
              height={800}
              className="max-w-4xl max-h-96 md:max-h-[600px] object-contain"
              priority
            />
          </div>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Controls and Thumbnails */}
      <div className="border-t border-white/20 bg-black p-4">
        {/* Zoom Controls */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ZoomOut className="w-5 h-5" />
          </Button>
          <span className="text-white text-sm min-w-[60px] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <Button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 4}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 disabled:opacity-50"
          >
            <ZoomIn className="w-5 h-5" />
          </Button>
          {zoomLevel > 1 && (
            <Button
              onClick={resetZoom}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 ml-2"
            >
              Reset
            </Button>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 relative w-16 h-16 overflow-hidden rounded-md border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-white opacity-100"
                    : "border-white/30 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Image Counter */}
        <div className="text-center text-white/70 text-sm mt-2">
          {selectedImageIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}
