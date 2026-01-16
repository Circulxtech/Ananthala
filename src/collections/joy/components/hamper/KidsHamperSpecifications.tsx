"use client"

import type { ProductDetail } from "@/data/product-details"

interface KidsHamperSpecificationsProps {
  product: ProductDetail
}

/**
 * Kids Hamper Specifications Component
 * Displays specifications in a format optimized for kids hamper products
 * Shows bundle items (mattress, pillows, bed sheets) and their specifications
 */
export function KidsHamperSpecifications({ product }: KidsHamperSpecificationsProps) {
  // Kids Hamper includes: Mattress, Pillows, Bed Sheets
  const hamperItems = [
    { name: "Mattress", specs: product.specifications },
    { name: "Pillows", specs: {} },
    { name: "Bed Sheets", specs: {} },
  ]

  return (
    <div className="space-y-8">
      {/* Overall Hamper Specifications */}
      <div className="bg-[#FAF7F3] p-6 rounded-lg">
        <h3 className="text-xl font-medium text-black mb-4">Hamper Contents</h3>
        <p className="text-black/80">{product.specifications["Hamper Includes"] || "Complete kids sleep solution"}</p>
      </div>

      {/* Individual Item Specifications */}
      <div className="space-y-6">
        <h3 className="text-2xl font-light text-black">Item Specifications</h3>
        
        {/* Main Product Specifications */}
        <div className="border rounded-lg p-6" style={{ borderColor: "#DCC5B2" }}>
          <h4 className="text-lg font-medium text-black mb-4">Overall Specifications</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications)
              .filter(([key]) => key !== "Hamper Includes")
              .map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b last:border-0" style={{ borderColor: "#DCC5B2" }}>
                  <span className="text-black/70">{key}</span>
                  <span className="text-black font-medium">{value as string}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Bundle Items List */}
        <div className="border rounded-lg p-6" style={{ borderColor: "#DCC5B2" }}>
          <h4 className="text-lg font-medium text-black mb-4">What's Included</h4>
          <ul className="space-y-3">
            {hamperItems.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#D9A299" }}></div>
                <span className="text-black">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Customization Options */}
        <div className="border rounded-lg p-6 bg-[#FAF7F3]" style={{ borderColor: "#DCC5B2" }}>
          <h4 className="text-lg font-medium text-black mb-4">Customization Available</h4>
          <p className="text-black/80">
            All items in this hamper can be customized with different dimensions and fabric options to match your preferences.
          </p>
        </div>
      </div>
    </div>
  )
}
