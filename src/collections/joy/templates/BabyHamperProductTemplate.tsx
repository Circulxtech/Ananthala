"use client"

import { useEffect, useState } from "react"
import type { ProductDetail } from "@/data/product-details"
import type { CartItem } from "@/components/cart/cart-drawer"
import { BabyHamperConfigurator } from "@/collections/joy/components/baby-hamper-configurator"
import { DbHamperConfigurator, type DbHamperItem } from "@/collections/joy/components/db-hamper-configurator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useBabyHamper } from "@/collections/joy/hooks/use-baby-hamper"
import { CustomersAlsoBought } from "@/collections/joy/components/customers-also-bought"
import { Sprout, Waves, SprayCan, XCircle, Layers, Grid } from "lucide-react"

interface BackendDetailSection {
  title?: string
  body?: string
  imageUrl?: string
  imageAlt?: string
  imagePosition?: "left" | "right"
}

interface BabyHamperProductTemplateProps {
  product: ProductDetail
  productId?: number
  dbHamper?: {
    hamperItems: DbHamperItem[]
    hamperPrice: number
    hamperFabric: string
  }
  detailSections?: BackendDetailSection[]
  shippingInformation?: string
  onAddToCart: (items: CartItem[]) => void
  isAddingToCart: boolean
}

/**
 * Baby Hamper Product Template
 * Complete page structure for baby hamper products with custom layout
 */
export function BabyHamperProductTemplate({
  product,
  productId,
  dbHamper,
  detailSections = [],
  shippingInformation = "",
  onAddToCart,
  isAddingToCart,
}: BabyHamperProductTemplateProps) {
  const hamperState = useBabyHamper()
  // Get bedsheet dimensions based on mattress size
  const getBedsheetDimensions = () => {
    if (hamperState.standardLength && hamperState.standardBreadth) {
      return `${hamperState.standardLength} x ${hamperState.standardBreadth}`
    }
    return "Standard Size"
  }
  
  // Bedsheet color options
  const bedsheetColors = [
    { value: "cream", label: "Cream" },
    { value: "beige", label: "Beige" },
    { value: "white", label: "White" },
    { value: "gray", label: "Gray" },
  ]
  const handleAddToCartWithBedsheet = (items: CartItem[]) => {
    // Directly forward items to parent; complimentary bedsheet flow removed
    onAddToCart(items)
  }
  
  return (
    <div className="space-y-12">
      {/* Breadcrumb - Already handled in parent, but can be customized here if needed */}
      
      {/* Main Product Configuration Section */}
      {dbHamper ? (
        <DbHamperConfigurator
          product={product}
          hamperItems={dbHamper.hamperItems}
          hamperPrice={dbHamper.hamperPrice}
          hamperFabric={dbHamper.hamperFabric}
          onAddToCart={handleAddToCartWithBedsheet}
          isAddingToCart={isAddingToCart}
        />
      ) : (
        <BabyHamperConfigurator
          product={product}
          onAddToCart={handleAddToCartWithBedsheet}
          isAddingToCart={isAddingToCart}
        />
      )}

      {/* Description + Shipping + backend detail sections */}
      <section className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Feature Icons Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">
                <Sprout className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-sm md:text-base font-medium text-foreground">100% Organic Cotton</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">
                <Waves className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-sm md:text-base font-medium text-foreground">Maximum Absorbency</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">
                <SprayCan className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-sm md:text-base font-medium text-foreground">No Artificial Softeners</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">
                <XCircle className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-sm md:text-base font-medium text-foreground">Anti-Pill</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">
                <Layers className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-sm md:text-base font-medium text-foreground">Plush, 700 GSM</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">
                <Grid className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-sm md:text-base font-medium text-foreground">Generously Sized</p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="description" className="border border-[#F3E7DA] px-4 rounded-lg shadow-sm">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                Description
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">{product.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping" className="border border-[#F3E7DA] px-4 last:border-b-2! rounded-lg shadow-sm">
              <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                Shipping information
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                {shippingInformation || "Shipping information will be shared after order confirmation."}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {detailSections.length > 0 && (
        <section className="w-full bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
            {detailSections.map((section, index) => {
              const isImageLeft = section.imagePosition ? section.imagePosition === "left" : index % 2 === 1
              const image = section.imageUrl || "/placeholder.svg"
              const isPlaceholder = image === "/placeholder.svg"
              return (
                <div
                  key={`${section.title}-${index}`}
                  className={`grid gap-y-32 gap-x-32 items-center ${
                    isImageLeft ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"
                  }`}
                >
                  <div className={`order-2 ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}>
                    <img
                      src={image}
                      alt={section.imageAlt || section.title || "Product detail"}
                      className={`w-full h-full max-h-[520px] border border-[#EED9C4] ${
                        isPlaceholder ? "object-contain bg-white" : "object-cover"
                      }`}
                    />
                  </div>
                  <div className={`order-1 ${isImageLeft ? "lg:order-2" : "lg:order-1"}`}>
                    {section.title && (
                      <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">{section.title}</h3>
                    )}
                    {section.body && (
                      <div className="space-y-20 text-base sm:text-lg text-foreground leading-relaxed max-w-none">
                        {section.body.split(/\\n\\s*\\n/).map((paragraph, paragraphIndex) => (
                          <p key={paragraphIndex}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* What Our Customers Also Bought Section (static IDs only; hide for DB-only hampers) */}
      {typeof productId === "number" && <CustomersAlsoBought currentProductId={productId} />}
    </div>
  )
}
