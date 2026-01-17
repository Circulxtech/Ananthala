"use client"

import { useState } from "react"
import type { ProductDetail } from "@/data/product-details"
import type { CartItem } from "@/components/cart/cart-drawer"
import { IndividualBabyProductConfigurator } from "@/components/product/individual-baby-product-configurator"
import { IndividualProductSpecifications } from "@/components/product/individual/IndividualProductSpecifications"

interface IndividualProductTemplateProps {
  product: ProductDetail
  productId: number
  onAddToCart: (item: CartItem) => void
  isAddingToCart: boolean
}

/**
 * Individual Product Template
 * Complete page structure for individual baby products with custom layout
 */
export function IndividualProductTemplate({
  product,
  productId,
  onAddToCart,
  isAddingToCart,
}: IndividualProductTemplateProps) {
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "details">("features")

  return (
    <div className="space-y-12">
      {/* Product Header Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-light text-black mb-4">{product.name}</h1>
          <p className="text-lg text-black/70 max-w-3xl">{product.description}</p>
        </div>
        
        {/* Rating and Reviews */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-medium text-black">{product.rating}</span>
            <span className="text-black/60">({product.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* Main Product Configuration Section */}
      <IndividualBabyProductConfigurator
        product={product}
        productId={productId}
        onAddToCart={onAddToCart}
        isAddingToCart={isAddingToCart}
      />

      {/* Product Details Tabs */}
      <div className="border-t pt-12" style={{ borderColor: "#DCC5B2" }}>
        <div className="flex gap-8 mb-8 border-b" style={{ borderColor: "#DCC5B2" }}>
          <button
            onClick={() => setActiveTab("features")}
            className="pb-4 transition-colors relative text-black text-lg font-medium"
          >
            Features & Materials
            {activeTab === "features" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#D9A299" }}
              ></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className="pb-4 transition-colors relative text-black text-lg font-medium"
          >
            Specifications
            {activeTab === "specs" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#D9A299" }}
              ></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className="pb-4 transition-colors relative text-black text-lg font-medium"
          >
            Product Details
            {activeTab === "details" && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: "#D9A299" }}
              ></div>
            )}
          </button>
        </div>

        {activeTab === "features" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light text-black mb-6">Key Features</h3>
              <ul className="space-y-4">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#D9A299" }}></div>
                    <span className="text-black">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-light text-black mb-6">Materials</h3>
              <ul className="space-y-4">
                {product.materials.map((material: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#D9A299" }}></div>
                    <span className="text-black">{material}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <IndividualProductSpecifications product={product} />
        )}

        {activeTab === "details" && (
          <div className="max-w-3xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-black leading-relaxed">{product.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
