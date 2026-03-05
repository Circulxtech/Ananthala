/**
 * Color Transform Utilities
 * Handles canvas-based image color transformation using masks and blending
 */

export interface ColorTransformOptions {
  hex: string
  intensity: number // 0-1
  blendMode: "multiply" | "overlay" | "screen" | "color-dodge" | "hue"
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
 * Apply color transformation to image using canvas
 * Uses mask and blending technique for realistic color shifting
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

        // Apply color transformation based on blend mode
        for (let i = 0; i < data.length; i += 4) {
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
              const hsl = rgbToHsl(r, g, b)
              const targetHsl = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b)
              
              // Shift hue while preserving saturation and lightness variations
              const newHue = targetHsl.h
              const hueShift = ((newHue - hsl.h + 180) % 360) - 180

              // Simple hue rotation
              const adjustedH = (hsl.h + hueShift + 360) % 360

              // Convert back to RGB (simplified version)
              const c = ((1 - Math.abs(2 * (hsl.l / 100) - 1)) * (hsl.s / 100)) * 255
              const x = c * (1 - Math.abs(((adjustedH / 60) % 2) - 1))
              const m = (hsl.l / 100) * 255 - c / 2

              if (adjustedH < 60) {
                newR = Math.round(c + m)
                newG = Math.round(x + m)
                newB = Math.round(m)
              } else if (adjustedH < 120) {
                newR = Math.round(x + m)
                newG = Math.round(c + m)
                newB = Math.round(m)
              } else if (adjustedH < 180) {
                newR = Math.round(m)
                newG = Math.round(c + m)
                newB = Math.round(x + m)
              } else if (adjustedH < 240) {
                newR = Math.round(m)
                newG = Math.round(x + m)
                newB = Math.round(c + m)
              } else if (adjustedH < 300) {
                newR = Math.round(x + m)
                newG = Math.round(m)
                newB = Math.round(c + m)
              } else {
                newR = Math.round(c + m)
                newG = Math.round(m)
                newB = Math.round(x + m)
              }
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
