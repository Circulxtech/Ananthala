"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { applyColorTransform } from "@/lib/color-transform"
import { getFabricColor } from "@/data/fabric-colors"

interface ColorAwareImageProps {
  src: string
  alt: string
  fabricId?: string // Fabric ID to determine color
  fill?: boolean
  className?: string
  priority?: boolean
  unoptimized?: boolean
  onColorApplied?: (isApplied: boolean) => void
}

/**
 * Color-Aware Image Component
 * Automatically applies color transformation based on selected fabric
 */
export function ColorAwareImage({
  src,
  alt,
  fabricId,
  fill,
  className,
  priority = false,
  unoptimized = false,
  onColorApplied,
}: ColorAwareImageProps) {
  const [transformedSrc, setTransformedSrc] = useState<string>(src)
  const [isTransforming, setIsTransforming] = useState(false)

  const applyFabricColor = useCallback(async () => {
    if (!fabricId) {
      setTransformedSrc(src)
      onColorApplied?.(false)
      return
    }

    const fabricColor = getFabricColor(fabricId)
    if (!fabricColor) {
      setTransformedSrc(src)
      onColorApplied?.(false)
      return
    }

    try {
      setIsTransforming(true)
      const transformed = await applyColorTransform(src, {
        hex: fabricColor.hex,
        intensity: fabricColor.colorIntensity,
        blendMode: fabricColor.blendMode,
      })
      setTransformedSrc(transformed)
      onColorApplied?.(true)
    } catch (error) {
      console.error("[v0] Color transform failed:", error)
      setTransformedSrc(src)
      onColorApplied?.(false)
    } finally {
      setIsTransforming(false)
    }
  }, [src, fabricId, onColorApplied])

  // Apply color transformation whenever fabric changes
  useEffect(() => {
    applyFabricColor()
  }, [applyFabricColor])

  return (
    <Image
      src={transformedSrc}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      unoptimized={unoptimized}
      style={{
        opacity: isTransforming ? 0.7 : 1,
        transition: "opacity 0.2s ease-in-out",
      }}
    />
  )
}

/**
 * Canvas-based color overlay component for performance optimization
 * Renders color overlays on top of original image
 */
interface ColorOverlayImageProps {
  src: string
  alt: string
  fabricId?: string
  fill?: boolean
  className?: string
  priority?: boolean
  useCanvas?: boolean // If true, uses canvas rendering instead of image transformation
}

export function ColorOverlayImage({
  src,
  alt,
  fabricId,
  fill,
  className,
  priority = false,
  useCanvas = false,
}: ColorOverlayImageProps) {
  if (useCanvas) {
    return <ColorAwareImage src={src} alt={alt} fabricId={fabricId} fill={fill} className={className} priority={priority} unoptimized />
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        priority={priority}
        unoptimized
      />
      {fabricId && (
        <ColorOverlay fabricId={fabricId} />
      )}
    </div>
  )
}

/**
 * Color overlay component that applies color blend without transforming the original image
 * Better for performance but less accurate color matching
 */
function ColorOverlay({ fabricId }: { fabricId: string }) {
  const fabricColor = getFabricColor(fabricId)

  if (!fabricColor) return null

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundColor: fabricColor.hex,
        opacity: fabricColor.colorIntensity * 0.3,
        mixBlendMode: fabricColor.blendMode === "multiply" ? "multiply" : "overlay",
      }}
    />
  )
}
