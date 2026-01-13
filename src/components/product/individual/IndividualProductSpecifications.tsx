"use client"

import type { ProductDetail } from "@/data/product-details"

interface IndividualProductSpecificationsProps {
  product: ProductDetail
}

/**
 * Individual Product Specifications Component
 * Displays specifications in a format optimized for individual products
 * Shows detailed specifications in a clean, organized layout
 */
export function IndividualProductSpecifications({ product }: IndividualProductSpecificationsProps) {
  return (
    <div className="space-y-6">
      {/* Main Specifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(product.specifications).map(([key, value]) => (
          <div
            key={key}
            className="border rounded-lg p-4"
            style={{ borderColor: "#DCC5B2" }}
          >
            <div className="flex flex-col gap-2">
              <span className="text-sm text-black/60 uppercase tracking-wide">{key}</span>
              <span className="text-lg text-black font-medium">{value as string}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Details */}
      {product.firmness && (
        <div className="border-t pt-6" style={{ borderColor: "#DCC5B2" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <span className="text-sm text-black/60 uppercase tracking-wide">Firmness</span>
              <p className="text-lg text-black font-medium mt-1">{product.firmness}</p>
            </div>
            <div>
              <span className="text-sm text-black/60 uppercase tracking-wide">Height</span>
              <p className="text-lg text-black font-medium mt-1">{product.height}</p>
            </div>
            <div>
              <span className="text-sm text-black/60 uppercase tracking-wide">Category</span>
              <p className="text-lg text-black font-medium mt-1 capitalize">{product.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
