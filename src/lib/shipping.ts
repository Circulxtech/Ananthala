/**
 * Calculate shipping charge based on total quantity of items
 * Formula:
 * - 1 product = ₹120
 * - 2 products = ₹140 (120 + 20×1)
 * - 3 products = ₹160 (120 + 20×2)
 * - n products = ₹(120 + 20×(n-1))
 */
export function calculateShippingCharge(totalQuantity: number): number {
  if (totalQuantity === 0) {
    return 0;
  }
  return 120 + Math.max(0, totalQuantity - 1) * 20;
}
