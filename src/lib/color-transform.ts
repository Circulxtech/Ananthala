/**
 * Color Transform Utilities
 * Handles canvas-based image color transformation using masks and blending
 * Supports region-based selective coloring with coordinate mapping
 */

import type { FabricRegion } from "@/data/fabric-regions"

export interface ColorTransformOptions {
  hex: string
  intensity: number // 0-1
  blendMode: "multiply" | "overlay" | "screen" | "color-dodge" | "hue"
}

export interface RegionColorTransformOptions extends ColorTransformOptions {
  regions?: FabricRegion[]
}

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

/**
 * Convert HSL back to RGB
 */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = h % 360
  if (h < 0) h += 360
  s = s / 100
  l = l / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0,
    g = 0,
    b = 0

  if (h < 60) {
    r = c
    g = x
    b = 0
  } else if (h < 120) {
    r = x
    g = c
    b = 0
  } else if (h < 180) {
    r = 0
    g = c
    b = x
  } else if (h < 240) {
    r = 0
    g = x
    b = c
  } else if (h < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  }
}

/**
 * Calculate luminosity (brightness) of a color
 * Used to identify which pixels are fabric vs background
 */
function getLuminosity(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b
}

/**
 * Create a mask canvas for fabric regions
 * Returns alpha values (0-255) indicating mask strength for each pixel
 */
function createRegionMask(
  width: number,
  height: number,
  regions: FabricRegion[]
): Uint8ClampedArray {
  const maskData = new Uint8ClampedArray(width * height)
  maskData.fill(0) // Start with all transparent

  const ctx = document.createElement("canvas").getContext("2d")
  if (!ctx) return maskData

  const maskCanvas = document.createElement("canvas")
  maskCanvas.width = width
  maskCanvas.height = height
  const maskCtx = maskCanvas.getContext("2d")
  if (!maskCtx) return maskData

  // Draw each region onto the mask
  regions.forEach((region) => {
    const pixelX = region.x * width
    const pixelY = region.y * height

    maskCtx.fillStyle = "white"

    switch (region.type) {
      case "rectangle": {
        const pixelWidth = (region.width || 0.5) * width
        const pixelHeight = (region.height || 0.5) * height
        maskCtx.fillRect(pixelX - pixelWidth / 2, pixelY - pixelHeight / 2, pixelWidth, pixelHeight)
        break
      }

      case "ellipse": {
        const radiusX = (region.rx || 0.2) * width
        const radiusY = (region.ry || 0.2) * height
        maskCtx.beginPath()
        maskCtx.ellipse(pixelX, pixelY, radiusX, radiusY, 0, 0, Math.PI * 2)
        maskCtx.fill()
        break
      }

      case "polygon": {
        if (region.points && region.points.length > 0) {
          maskCtx.beginPath()
          maskCtx.moveTo(region.points[0][0] * width, region.points[0][1] * height)
          for (let i = 1; i < region.points.length; i++) {
            maskCtx.lineTo(region.points[i][0] * width, region.points[i][1] * height)
          }
          maskCtx.closePath()
          maskCtx.fill()
        }
        break
      }
    }
  })

  // Apply feathering (edge softness) if specified
  regions.forEach((region) => {
    if (region.feather && region.feather > 0) {
      // Create a second pass with blur effect for feathering
      const featherCanvas = document.createElement("canvas")
      featherCanvas.width = width
      featherCanvas.height = height
      const featherCtx = featherCanvas.getContext("2d")
      if (!featherCtx) return

      featherCtx.filter = `blur(${region.feather * Math.min(width, height)}px)`
      featherCtx.drawImage(maskCanvas, 0, 0)
      maskCtx.drawImage(featherCanvas, 0, 0)
    }
  })

  // Convert mask canvas to alpha data
  const maskImageData = maskCtx.getImageData(0, 0, width, height)
  const maskPixels = maskImageData.data

  for (let i = 0; i < maskPixels.length; i += 4) {
    // Use red channel as mask strength (white = 255, black = 0)
    maskData[i / 4] = maskPixels[i]
  }

  return maskData
}

/**
 * Apply region-based color transformation
 * Uses defined fabric regions to color only those areas
 * Preserves background completely
 */
export async function applyRegionColorTransform(
  imageSrc: string,
  options: RegionColorTransformOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      try {
        if (!options.regions || options.regions.length === 0) {
          // Fallback to original image if no regions provided
          resolve(imageSrc)
          return
        }

        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        // Draw original image
        ctx.drawImage(img, 0, 0)

        // Create region mask
        const mask = createRegionMask(canvas.width, canvas.height, options.regions)

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        const rgbColor = hexToRgb(options.hex)
        if (!rgbColor) {
          reject(new Error("Invalid color hex"))
          return
        }

        // Get target color HSL
        const targetHsl = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b)

        // Apply color transformation only within masked regions
        for (let i = 0; i < data.length; i += 4) {
          const pixelIndex = i / 4
          const maskStrength = mask[pixelIndex] / 255 // 0-1

          // Skip pixels outside regions
          if (maskStrength < 0.01) continue

          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const a = data[i + 3]

          // Skip fully transparent pixels
          if (a === 0) continue

          let newR = r
          let newG = g
          let newB = b

          switch (options.blendMode) {
            case "multiply":
              newR = Math.round((r * rgbColor.r) / 255)
              newG = Math.round((g * rgbColor.g) / 255)
              newB = Math.round((b * rgbColor.b) / 255)
              break

            case "overlay":
              newR = r < 128 ? Math.round((2 * r * rgbColor.r) / 255) : Math.round(255 - (2 * (255 - r) * (255 - rgbColor.r)) / 255)
              newG = g < 128 ? Math.round((2 * g * rgbColor.g) / 255) : Math.round(255 - (2 * (255 - g) * (255 - rgbColor.g)) / 255)
              newB = b < 128 ? Math.round((2 * b * rgbColor.b) / 255) : Math.round(255 - (2 * (255 - b) * (255 - rgbColor.b)) / 255)
              break

            case "screen":
              newR = Math.round(255 - ((255 - r) * (255 - rgbColor.r)) / 255)
              newG = Math.round(255 - ((255 - g) * (255 - rgbColor.g)) / 255)
              newB = Math.round(255 - ((255 - b) * (255 - rgbColor.b)) / 255)
              break

            case "color-dodge":
              newR = rgbColor.r === 255 ? 255 : Math.min(255, Math.round((r * 255) / (255 - rgbColor.r)))
              newG = rgbColor.g === 255 ? 255 : Math.min(255, Math.round((g * 255) / (255 - rgbColor.g)))
              newB = rgbColor.b === 255 ? 255 : Math.min(255, Math.round((b * 255) / (255 - rgbColor.b)))
              break

            case "hue": {
              const originalHsl = rgbToHsl(r, g, b)
              const newHue = targetHsl.h
              const newSaturation = originalHsl.s
              const newLightness = originalHsl.l

              const rgbResult = hslToRgb(newHue, newSaturation, newLightness)
              newR = rgbResult.r
              newG = rgbResult.g
              newB = rgbResult.b
              break
            }
          }

          // Apply transformation with intensity and mask strength
          const finalIntensity = options.intensity * maskStrength
          data[i] = Math.round(newR * finalIntensity + r * (1 - finalIntensity))
          data[i + 1] = Math.round(newG * finalIntensity + g * (1 - finalIntensity))
          data[i + 2] = Math.round(newB * finalIntensity + b * (1 - finalIntensity))
        }

        ctx.putImageData(imageData, 0, 0)
        const dataUrl = canvas.toDataURL("image/png")
        resolve(dataUrl)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error("Failed to load image"))
    }

    img.src = imageSrc
  })
}

/**
 * Apply selective color transformation only to fabric areas
 * Preserves background by using luminosity-based selective coloring
 * Targets mid-tone colors (typical fabric) while preserving dark shadows and light backgrounds
 * Fallback method if region-based coloring is not applicable
 */
export async function applyColorTransform(
  imageSrc: string,
  options: ColorTransformOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          reject(new Error("Could not get canvas context"))
          return
        }

        // Draw original image
        ctx.drawImage(img, 0, 0)

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        const rgbColor = hexToRgb(options.hex)
        if (!rgbColor) {
          reject(new Error("Invalid color hex"))
          return
        }

        // Get target color HSL
        const targetHsl = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b)

        // Apply selective color transformation based on blend mode
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const a = data[i + 3]

          // Skip fully transparent pixels
          if (a === 0) continue

          // Calculate luminosity to determine if this is fabric or background
          const lum = getLuminosity(r, g, b)

          // Target fabric areas: mid-tones (luminosity 30-200)
          // Preserve very dark shadows (lum < 30) and very light backgrounds (lum > 200)
          const isFabricArea = lum >= 30 && lum <= 200

          // If not fabric area, keep original color
          if (!isFabricArea) continue

          let newR = r
          let newG = g
          let newB = b

          switch (options.blendMode) {
            case "multiply":
              // Darker blend - multiply color with fabric
              newR = Math.round((r * rgbColor.r) / 255)
              newG = Math.round((g * rgbColor.g) / 255)
              newB = Math.round((b * rgbColor.b) / 255)
              break

            case "overlay":
              // Medium blend - overlay for balanced color shift
              newR = r < 128 ? Math.round((2 * r * rgbColor.r) / 255) : Math.round(255 - (2 * (255 - r) * (255 - rgbColor.r)) / 255)
              newG = g < 128 ? Math.round((2 * g * rgbColor.g) / 255) : Math.round(255 - (2 * (255 - g) * (255 - rgbColor.g)) / 255)
              newB = b < 128 ? Math.round((2 * b * rgbColor.b) / 255) : Math.round(255 - (2 * (255 - b) * (255 - rgbColor.b)) / 255)
              break

            case "screen":
              // Lighter blend - screen for bright colors
              newR = Math.round(255 - ((255 - r) * (255 - rgbColor.r)) / 255)
              newG = Math.round(255 - ((255 - g) * (255 - rgbColor.g)) / 255)
              newB = Math.round(255 - ((255 - b) * (255 - rgbColor.b)) / 255)
              break

            case "color-dodge":
              // Intense blend
              newR = rgbColor.r === 255 ? 255 : Math.min(255, Math.round((r * 255) / (255 - rgbColor.r)))
              newG = rgbColor.g === 255 ? 255 : Math.min(255, Math.round((g * 255) / (255 - rgbColor.g)))
              newB = rgbColor.b === 255 ? 255 : Math.min(255, Math.round((b * 255) / (255 - rgbColor.b)))
              break

            case "hue": {
              // Hue shift - preserve lightness and saturation of original, apply target hue
              const originalHsl = rgbToHsl(r, g, b)

              // Replace hue while keeping saturation and lightness of original fabric
              const newHue = targetHsl.h
              const newSaturation = originalHsl.s // Keep original saturation for natural look
              const newLightness = originalHsl.l // Keep original lightness

              const rgbResult = hslToRgb(newHue, newSaturation, newLightness)
              newR = rgbResult.r
              newG = rgbResult.g
              newB = rgbResult.b
              break
            }
          }

          // Apply intensity blending with original colors
          data[i] = Math.round(newR * options.intensity + r * (1 - options.intensity))
          data[i + 1] = Math.round(newG * options.intensity + g * (1 - options.intensity))
          data[i + 2] = Math.round(newB * options.intensity + b * (1 - options.intensity))
        }

        ctx.putImageData(imageData, 0, 0)
        const dataUrl = canvas.toDataURL("image/png")
        resolve(dataUrl)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      reject(new Error("Failed to load image"))
    }

    img.src = imageSrc
  })
}

/**
 * Batch apply color transforms to multiple images
 */
export async function applyColorTransformBatch(
  imageSrcs: string[],
  options: ColorTransformOptions
): Promise<string[]> {
  return Promise.all(imageSrcs.map((src) => applyColorTransform(src, options)))
}

/**
 * Create a debounced color transform function
 */
export function createDebouncedColorTransform(delay: number = 300) {
  let timeoutId: NodeJS.Timeout

  return (imageSrc: string, options: ColorTransformOptions): Promise<string> => {
    return new Promise((resolve, reject) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        applyColorTransform(imageSrc, options).then(resolve).catch(reject)
      }, delay)
    })
  }
}
