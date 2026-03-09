/**
 * Fabric Region Segmentation Map
 * Defines the coordinates of fabric areas for each product image
 * Used for selective coloring - only the defined regions will be color-transformed
 * 
 * Coordinates are in normalized format (0-1) to work with any image size
 * This allows flexible application across different resolutions
 */

export interface FabricRegion {
  name: string
  type: "rectangle" | "ellipse" | "polygon"
  x: number // normalized 0-1
  y: number // normalized 0-1
  width?: number // normalized 0-1 (for rectangle/ellipse)
  height?: number // normalized 0-1 (for rectangle/ellipse)
  rx?: number // for ellipse, radius x
  ry?: number // for ellipse, radius y
  points?: Array<[number, number]> // for polygon
  feather?: number // edge softness, 0-1
}

export interface ProductRegionMap {
  productId: string | number
  productName: string
  regions: FabricRegion[]
}

/**
 * Fabric regions for each product
 * Normalized coordinates (0 = left/top, 1 = right/bottom)
 */
export const fabricRegions: ProductRegionMap[] = [
  {
    productId: "grace-lounger",
    productName: "Grace Lounger",
    regions: [
      {
        name: "Lounger Fabric Main",
        type: "rectangle",
        x: 0.15,
        y: 0.2,
        width: 0.7,
        height: 0.65,
        feather: 0.08,
      },
      {
        name: "Lounger Pillow",
        type: "ellipse",
        x: 0.45,
        y: 0.15,
        rx: 0.15,
        ry: 0.1,
        feather: 0.05,
      },
    ],
  },
  {
    productId: "bliss-mattress",
    productName: "Bliss Mattress",
    regions: [
      {
        name: "Mattress Top Surface",
        type: "rectangle",
        x: 0.1,
        y: 0.25,
        width: 0.8,
        height: 0.5,
        feather: 0.1,
      },
      {
        name: "Mattress Side Panel",
        type: "rectangle",
        x: 0.05,
        y: 0.75,
        width: 0.9,
        height: 0.2,
        feather: 0.08,
      },
    ],
  },
  {
    productId: "joy-pillow",
    productName: "Joy Pillow",
    regions: [
      {
        name: "Pillow Fabric",
        type: "ellipse",
        x: 0.5,
        y: 0.5,
        rx: 0.35,
        ry: 0.3,
        feather: 0.1,
      },
    ],
  },
  {
    productId: "premium-swaddle",
    productName: "Premium Swaddle",
    regions: [
      {
        name: "Swaddle Main",
        type: "rectangle",
        x: 0.1,
        y: 0.1,
        width: 0.8,
        height: 0.8,
        feather: 0.12,
      },
    ],
  },
  {
    productId: "grace-topper",
    productName: "Grace Topper",
    regions: [
      {
        name: "Topper Top Surface",
        type: "rectangle",
        x: 0.12,
        y: 0.3,
        width: 0.76,
        height: 0.4,
        feather: 0.1,
      },
    ],
  },
  {
    productId: "grace-head-pillow",
    productName: "Grace Head Pillow",
    regions: [
      {
        name: "Head Pillow",
        type: "ellipse",
        x: 0.5,
        y: 0.45,
        rx: 0.32,
        ry: 0.28,
        feather: 0.12,
      },
    ],
  },
  {
    productId: "bliss-head-pillow",
    productName: "Bliss Head Pillow",
    regions: [
      {
        name: "Bliss Pillow",
        type: "ellipse",
        x: 0.5,
        y: 0.45,
        rx: 0.32,
        ry: 0.28,
        feather: 0.12,
      },
    ],
  },
  {
    productId: "bliss-lounger",
    productName: "Bliss Lounger",
    regions: [
      {
        name: "Bliss Lounger Fabric Main",
        type: "rectangle",
        x: 0.15,
        y: 0.2,
        width: 0.7,
        height: 0.65,
        feather: 0.08,
      },
      {
        name: "Bliss Lounger Pillow",
        type: "ellipse",
        x: 0.45,
        y: 0.15,
        rx: 0.15,
        ry: 0.1,
        feather: 0.05,
      },
    ],
  },
  {
    productId: "bliss-topper",
    productName: "Bliss Topper",
    regions: [
      {
        name: "Bliss Topper Top Surface",
        type: "rectangle",
        x: 0.12,
        y: 0.3,
        width: 0.76,
        height: 0.4,
        feather: 0.1,
      },
    ],
  },
  {
    productId: "joy-mattress",
    productName: "Joy Mattress",
    regions: [
      {
        name: "Joy Mattress Top Surface",
        type: "rectangle",
        x: 0.1,
        y: 0.25,
        width: 0.8,
        height: 0.5,
        feather: 0.1,
      },
      {
        name: "Joy Mattress Side Panel",
        type: "rectangle",
        x: 0.05,
        y: 0.75,
        width: 0.9,
        height: 0.2,
        feather: 0.08,
      },
    ],
  },
]

/**
 * Get fabric regions for a product
 */
export function getFabricRegions(productId: string | number): FabricRegion[] {
  const mapping = fabricRegions.find(
    (item) => item.productId === productId || item.productId.toString() === productId.toString()
  )
  return mapping?.regions || []
}

/**
 * Get all product IDs that have fabric region mappings
 */
export function getSupportedProducts(): (string | number)[] {
  return fabricRegions.map((item) => item.productId)
}

/**
 * Check if a product has fabric region mapping
 */
export function hasFabricRegions(productId: string | number): boolean {
  return fabricRegions.some(
    (item) => item.productId === productId || item.productId.toString() === productId.toString()
  )
}
