"use client"

import dynamic from "next/dynamic"
import type { InnerImageZoomProps } from "react-inner-image-zoom"

const InnerImageZoom = dynamic(() => import("react-inner-image-zoom"), { ssr: false })

interface MagnifyImageProps {
  src: string
  alt: string
  zoomSrc?: string
  zoomScale?: number
  className?: string
  imgClassName?: string
}

export function MagnifyImage({
  src,
  alt,
  zoomSrc,
  zoomScale = 1.8,
  className = "",
  imgClassName = "",
}: MagnifyImageProps) {
  const imageClassName = `object-cover w-full h-full ${imgClassName}`.trim()

  return (
    <div className={`relative aspect-square overflow-hidden ${className}`.trim()}>
      <InnerImageZoom
        src={src}
        zoomSrc={zoomSrc ?? src}
        zoomType="hover"
        zoomScale={zoomScale}
        hideHint
        zoomPreload
        className="h-full w-full"
        imgAttributes={{ alt, className: imageClassName }}
      />
    </div>
  )
}
