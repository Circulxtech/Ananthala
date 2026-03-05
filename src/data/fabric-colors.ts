/**
 * Fabric Color Configuration
 * Maps fabric IDs to their respective color properties for dynamic image coloring
 */

export interface FabricColor {
  id: string
  name: string
  hex: string // Primary color hex
  hslBase: {
    h: number // Hue (0-360)
    s: number // Saturation (0-100)
    l: number // Lightness (0-100)
  }
  colorIntensity: number // 0-1, controls how strong the color overlay is
  blendMode: "multiply" | "overlay" | "screen" | "color-dodge" | "hue"
}

export const fabricColorMap: Record<string, FabricColor> = {
  "gingham-beige": {
    id: "gingham-beige",
    name: "Gingham Beige",
    hex: "#D4B8A1",
    hslBase: {
      h: 25,
      s: 35,
      l: 67,
    },
    colorIntensity: 0.6,
    blendMode: "multiply",
  },
  "gingham-blue": {
    id: "gingham-blue",
    name: "Gingham Blue",
    hex: "#4A7BA7",
    hslBase: {
      h: 207,
      s: 37,
      l: 48,
    },
    colorIntensity: 0.65,
    blendMode: "overlay",
  },
  "gingham-pink": {
    id: "gingham-pink",
    name: "Gingham Pink",
    hex: "#D9A299",
    hslBase: {
      h: 12,
      s: 51,
      l: 66,
    },
    colorIntensity: 0.6,
    blendMode: "overlay",
  },
}

export function getFabricColor(fabricId: string): FabricColor | undefined {
  return fabricColorMap[fabricId]
}

export function getAllFabricColors(): FabricColor[] {
  return Object.values(fabricColorMap)
}
