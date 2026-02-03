/**
 * Product type determination utilities
 */

export type ProductType = "baby-hamper" | "kids-hamper" | "individual-baby" | "mattress" | "topper" | "lounger" | "head-pillow" | "pillow-bumpers" | "simple"

/**
 * Determine product type based on product ID
 */
export function getProductType(productId: number): ProductType {
  if (productId === 12) return "baby-hamper"
  if (productId === 13) return "kids-hamper"
  if ([8, 16, 20].includes(productId)) return "topper"
  if ([9, 17, 21].includes(productId)) return "lounger"
  if ([10, 18, 22].includes(productId)) return "head-pillow"
  if (productId === 11) return "pillow-bumpers"
  if ([14].includes(productId)) return "individual-baby"
  if ([1, 2, 3, 4, 7, 15, 19].includes(productId)) return "mattress"
  return "simple"
}

/**
 * Check if product is a Joy product
 */
export function isJoyProduct(productId: number): boolean {
  return [7, 8, 9, 10, 11, 12, 13, 14].includes(productId)
}

/**
 * Check if product is a Bliss product
 */
export function isBlissProduct(productId: number): boolean {
  return [15, 16, 17, 18].includes(productId)
}

/**
 * Check if product is a Grace product
 */
export function isGraceProduct(productId: number): boolean {
  return [19, 20, 21, 22].includes(productId)
}
