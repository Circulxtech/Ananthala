/**
 * Fabric Pattern Configuration
 * Maps pattern IDs to their respective pattern properties for dynamic image transformation
 */

export interface FabricPattern {
  id: string
  name: string
  type: "solid" | "striped" | "checkered" | "dotted" | "floral" | "geometric" | "custom"
  scale: number // 1-3, controls pattern size
  opacity: number // 0-1, controls pattern visibility
  blendMode: "multiply" | "overlay" | "screen" | "soft-light" | "hard-light"
  color?: string // Optional color overlay for pattern
}

export const fabricPatternMap: Record<string, FabricPattern> = {
  "pattern-solid": {
    id: "pattern-solid",
    name: "Solid",
    type: "solid",
    scale: 1,
    opacity: 1,
    blendMode: "multiply",
  },
  "pattern-striped-thin": {
    id: "pattern-striped-thin",
    name: "Thin Stripes",
    type: "striped",
    scale: 1,
    opacity: 0.6,
    blendMode: "overlay",
  },
  "pattern-striped-thick": {
    id: "pattern-striped-thick",
    name: "Thick Stripes",
    type: "striped",
    scale: 2,
    opacity: 0.7,
    blendMode: "overlay",
  },
  "pattern-checkered-small": {
    id: "pattern-checkered-small",
    name: "Small Checks",
    type: "checkered",
    scale: 1,
    opacity: 0.5,
    blendMode: "soft-light",
  },
  "pattern-checkered-large": {
    id: "pattern-checkered-large",
    name: "Large Checks",
    type: "checkered",
    scale: 2,
    opacity: 0.6,
    blendMode: "soft-light",
  },
  "pattern-dotted": {
    id: "pattern-dotted",
    name: "Dotted",
    type: "dotted",
    scale: 1.5,
    opacity: 0.55,
    blendMode: "overlay",
  },
  "pattern-floral-small": {
    id: "pattern-floral-small",
    name: "Small Floral",
    type: "floral",
    scale: 1,
    opacity: 0.5,
    blendMode: "overlay",
  },
  "pattern-floral-large": {
    id: "pattern-floral-large",
    name: "Large Floral",
    type: "floral",
    scale: 2,
    opacity: 0.6,
    blendMode: "overlay",
  },
  "pattern-geometric": {
    id: "pattern-geometric",
    name: "Geometric",
    type: "geometric",
    scale: 1.5,
    opacity: 0.55,
    blendMode: "soft-light",
  },
}

export function getFabricPattern(patternId: string): FabricPattern | undefined {
  return fabricPatternMap[patternId]
}

export function getAllFabricPatterns(): FabricPattern[] {
  return Object.values(fabricPatternMap)
}

export function getPatternsByType(type: FabricPattern["type"]): FabricPattern[] {
  return Object.values(fabricPatternMap).filter((pattern) => pattern.type === type)
}
