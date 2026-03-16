"use client"

import { useState, useEffect, useCallback } from "react"
import { applyColorTransform, applyRegionColorTransform } from "@/lib/color-transform"
import { applyPatternTransform } from "@/lib/pattern-transform"
import { getFabricColor } from "@/data/fabric-colors"
import { getFabricRegions } from "@/data/fabric-regions"
import { getFabricPattern } from "@/data/fabric-patterns"
import { MagnifyImage } from "@/components/product/MagnifyImage"

interface ColorAwareMagnifyImageProps {
  src: string
  alt: string
  fabricId?: string
  patternId?: string
  productId?: string | number
  className?: string
  imgClassName?: string
  zoomScale?: number
  onColorApplied?: (isApplied: boolean) => void
  onPatternApplied?: (isApplied: boolean) => void
  useRegionColoring?: boolean
}

export function ColorAwareMagnifyImage({
  src,
  alt,
  fabricId,
  patternId,
  productId,
  className = "",
  imgClassName = "",
  zoomScale,
  onColorApplied,
  onPatternApplied,
  useRegionColoring = true,
}: ColorAwareMagnifyImageProps) {
  const [transformedSrc, setTransformedSrc] = useState<string>(src)
  const [isTransforming, setIsTransforming] = useState(false)

  const applyFabricTransform = useCallback(async () => {
    try {
      setIsTransforming(true)
      let transformed = src
      let colorApplied = false
      let patternApplied = false

      const fabricColor = fabricId ? getFabricColor(fabricId) : null
      const pattern = patternId ? getFabricPattern(patternId) : null

      if (fabricColor) {
        if (useRegionColoring && productId) {
          const regions = getFabricRegions(productId)
          if (regions.length > 0) {
            transformed = await applyRegionColorTransform(src, {
              hex: fabricColor.hex,
              intensity: fabricColor.colorIntensity,
              blendMode: fabricColor.blendMode,
              regions,
            })
          } else {
            transformed = await applyColorTransform(src, {
              hex: fabricColor.hex,
              intensity: fabricColor.colorIntensity,
              blendMode: fabricColor.blendMode,
            })
          }
        } else {
          transformed = await applyColorTransform(src, {
            hex: fabricColor.hex,
            intensity: fabricColor.colorIntensity,
            blendMode: fabricColor.blendMode,
          })
        }
        colorApplied = true
      }

      if (pattern && pattern.type !== "solid") {
        transformed = await applyPatternTransform(transformed, { pattern })
        patternApplied = true
      }

      setTransformedSrc(transformed)
      onColorApplied?.(colorApplied)
      onPatternApplied?.(patternApplied)
    } catch (error) {
      console.error("[v0] Transform failed:", error)
      setTransformedSrc(src)
      onColorApplied?.(false)
      onPatternApplied?.(false)
    } finally {
      setIsTransforming(false)
    }
  }, [src, fabricId, patternId, productId, useRegionColoring, onColorApplied, onPatternApplied])

  useEffect(() => {
    applyFabricTransform()
  }, [applyFabricTransform])

  const containerClassName = `${className} transition-opacity ${isTransforming ? "opacity-70" : "opacity-100"}`.trim()

  return (
    <MagnifyImage
      src={transformedSrc}
      alt={alt}
      zoomSrc={transformedSrc}
      zoomScale={zoomScale}
      className={containerClassName}
      imgClassName={imgClassName}
    />
  )
}
