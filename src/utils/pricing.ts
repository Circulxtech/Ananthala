/**
 * Centralized pricing logic for all product types
 */

export const BABY_HAMPER_ITEM_PRICES: Record<string, number> = {
  mattress: 299,
  topper: 149,
  lounger: 199,
  "head-pillow": 79,
  "pillow-bumpers": 89,
}

export const KIDS_HAMPER_ITEM_PRICES: Record<string, number> = {
  mattress: 599,
  pillows: 199,
  "bed-sheets": 0, // Complimentary
}

/**
 * Calculate price for Baby Hamper based on selected items
 */
export function calculateBabyHamperPrice(items: string[]): number {
  return items.reduce((sum, itemId) => sum + (BABY_HAMPER_ITEM_PRICES[itemId] || 0), 0)
}

/**
 * Calculate price for Kids Hamper based on selected items
 */
export function calculateKidsHamperPrice(items: string[]): number {
  return items.reduce((sum, itemId) => sum + (KIDS_HAMPER_ITEM_PRICES[itemId] || 0), 0)
}

/**
 * Calculate price for simple product based on size
 */
export function calculateSimpleProductPrice(
  basePrice: number,
  selectedSizePrice?: number
): number {
  return selectedSizePrice ?? basePrice
}
