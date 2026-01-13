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
  if (productId === 8) return "topper"
  if (productId === 9) return "lounger"
  if (productId === 10) return "head-pillow"
  if (productId === 11) return "pillow-bumpers"
  if ([14].includes(productId)) return "individual-baby"
  if ([1, 2, 3, 4, 7].includes(productId)) return "mattress"
  return "simple"
}

/**
 * Check if product is a Joy product
 */
export function isJoyProduct(productId: number): boolean {
  return [7, 8, 9, 10, 11, 12, 13, 14].includes(productId)
}
