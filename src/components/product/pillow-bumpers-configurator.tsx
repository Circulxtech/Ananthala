"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { usePillowBumpers } from "@/hooks/use-pillow-bumpers"
import type { ProductDetail } from "@/data/product-details"
import type { CartItem } from "@/components/cart/cart-drawer"

interface PillowBumpersConfiguratorProps {
  product: ProductDetail
  onAddToCart: (items: CartItem[]) => void
  isAddingToCart: boolean
}

const standardSizes = [
  { label: "10\" x 12\" x 1.5\"", value: "10x12x1.5", dimensions: { length: "10\"", breadth: "12\"", height: "1.5\"" }, priceMultiplier: 1.0 },
  { label: "12\" x 14\" x 2\"", value: "12x14x2", dimensions: { length: "12\"", breadth: "14\"", height: "2\"" }, priceMultiplier: 1.15 },
  { label: "14\" x 16\" x 2.5\"", value: "14x16x2.5", dimensions: { length: "14\"", breadth: "16\"", height: "2.5\"" }, priceMultiplier: 1.3 },
]

const fabricMultipliers: Record<string, number> = {
  cotton: 1.0,
  "organic-cotton": 1.15,
  bamboo: 1.2,
}

const fabricOptions = [
  { value: "cotton", label: "Cotton" },
  { value: "organic-cotton", label: "Organic Cotton" },
  { value: "bamboo", label: "Bamboo" },
]

export function PillowBumpersConfigurator({
  product,
  onAddToCart,
  isAddingToCart,
}: PillowBumpersConfiguratorProps) {
  const bumpersState = usePillowBumpers()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [useCustomDimensions, setUseCustomDimensions] = useState(false)
  
  const getProductImages = (): string[] => {
    return product.images && product.images.length > 0 ? product.images : ["/bumpers.jpg"]
  }
  
  const toggleCustomDimensions = () => {
    setUseCustomDimensions(prev => !prev)
  }
  
  const handleStandardSizeChange = (value: string) => {
    const size = standardSizes.find(s => s.value === value)
    if (size) {
      bumpersState.setStandardBumpersLength(size.dimensions.length)
      bumpersState.setStandardBumpersBreadth(size.dimensions.breadth)
      bumpersState.setStandardBumpersHeight(size.dimensions.height)
    }
  }
  
  const getCurrentStandardSize = (): string => {
    const size = standardSizes.find(s => 
      s.dimensions.length === bumpersState.standardBumpersLength &&
      s.dimensions.breadth === bumpersState.standardBumpersBreadth &&
      s.dimensions.height === bumpersState.standardBumpersHeight
    )
    return size?.value || ""
  }
  
  const handleAddToCart = async () => {
    let dimensions = ""
    const isCustom = useCustomDimensions
    
    if (isCustom) {
      dimensions = `${bumpersState.bumpersLength || ""} x ${bumpersState.bumpersBreadth || ""} x ${bumpersState.bumpersHeight || ""}`.trim()
    } else {
      dimensions = `${bumpersState.standardBumpersLength || ""} x ${bumpersState.standardBumpersBreadth || ""} x ${bumpersState.standardBumpersHeight || ""}`.trim()
    }
    
    const sizeInfo = dimensions ? `${dimensions}${bumpersState.bumpersFabric ? ` - ${fabricOptions.find(f => f.value === bumpersState.bumpersFabric)?.label || bumpersState.bumpersFabric}` : ""}${isCustom ? " (Custom)" : ""}` : "Standard"
    
    let basePrice = product.price
    let dimensionMultiplier = 1.0
    let fabricMultiplier = 1.0
    
    if (!isCustom) {
      const currentSizeValue = getCurrentStandardSize()
      if (currentSizeValue) {
        const size = standardSizes.find(s => s.value === currentSizeValue)
        if (size && size.priceMultiplier) {
          dimensionMultiplier = size.priceMultiplier
        }
      }
    } else {
      dimensionMultiplier = 1.2
    }
    
    if (bumpersState.bumpersFabric) {
      fabricMultiplier = fabricMultipliers[bumpersState.bumpersFabric] || 1.0
    }
    
    const finalPrice = Math.round(basePrice * dimensionMultiplier * fabricMultiplier)
    
    const items: CartItem[] = [{
      id: `pillow-bumpers-${product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name: product.name,
      image: product.images[0] || "/bumpers.jpg",
      size: sizeInfo,
      quantity: 1,
      price: finalPrice,
    }]
    
    onAddToCart(items)
  }
  
  let basePrice = product.price
  let dimensionMultiplier = 1.0
  let fabricMultiplier = 1.0
  
  if (!useCustomDimensions) {
    const currentSizeValue = getCurrentStandardSize()
    if (currentSizeValue) {
      const size = standardSizes.find(s => s.value === currentSizeValue)
      if (size && size.priceMultiplier) {
        dimensionMultiplier = size.priceMultiplier
      }
    }
  } else {
    dimensionMultiplier = 1.2
  }
  
  if (bumpersState.bumpersFabric) {
    fabricMultiplier = fabricMultipliers[bumpersState.bumpersFabric] || 1.0
  }
  
  const totalPrice = Math.round(basePrice * dimensionMultiplier * fabricMultiplier)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <div className="p-6 bg-white border-2 border-[#EED9C4]">
          <h3 className="text-xl font-medium text-foreground mb-6">{product.name}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={getProductImages()[selectedImageIndex] || "/bumpers.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {getProductImages().length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {getProductImages().map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      type="button"
                      className={`relative aspect-square overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80 ${
                        selectedImageIndex === index
                          ? "border-[#EED9C4] opacity-100"
                          : "border-transparent opacity-60"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover pointer-events-none"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-2xl font-medium text-foreground mb-4">Dimensions & Fabric</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    type="button"
                    onClick={toggleCustomDimensions}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      !useCustomDimensions
                        ? "bg-[#EED9C4] text-foreground"
                        : "bg-gray-200 text-foreground/70 hover:bg-gray-300"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={toggleCustomDimensions}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      useCustomDimensions
                        ? "bg-[#EED9C4] text-foreground"
                        : "bg-gray-200 text-foreground/70 hover:bg-gray-300"
                    }`}
                  >
                    Custom
                  </button>
                </div>
                
                {!useCustomDimensions ? (
                  <>
                    <div>
                      <label className="text-base font-medium text-foreground mb-2 block">Dimensions(in inches)</label>
                      <Select 
                        value={getCurrentStandardSize()} 
                        onValueChange={handleStandardSizeChange}
                      >
                        <SelectTrigger className="w-full text-foreground">
                          <SelectValue placeholder="Select standard size" />
                        </SelectTrigger>
                        <SelectContent>
                          {standardSizes.map((size) => (
                            <SelectItem key={size.value} value={size.value} className="text-foreground">
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {bumpersState.standardBumpersLength && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2 text-foreground text-lg">
                            <span>{bumpersState.standardBumpersLength || "L"}</span>
                            <span>×</span>
                            <span>{bumpersState.standardBumpersBreadth || "B"}</span>
                            <span>×</span>
                            <span>{bumpersState.standardBumpersHeight || "H"}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-base font-medium text-foreground mb-2 block">Length (inches)</label>
                      <Input
                        type="text"
                        value={bumpersState.bumpersLength}
                        onChange={(e) => bumpersState.setBumpersLength(e.target.value)}
                        placeholder="Enter length"
                        className="text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-base font-medium text-foreground mb-2 block">Breadth (inches)</label>
                      <Input
                        type="text"
                        value={bumpersState.bumpersBreadth}
                        onChange={(e) => bumpersState.setBumpersBreadth(e.target.value)}
                        placeholder="Enter breadth"
                        className="text-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-base font-medium text-foreground mb-2 block">Height (inches)</label>
                      <Input
                        type="text"
                        value={bumpersState.bumpersHeight}
                        onChange={(e) => bumpersState.setBumpersHeight(e.target.value)}
                        placeholder="Enter height"
                        className="text-foreground"
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="text-base font-medium text-foreground mb-2 block">Fabric</label>
                  <Select value={bumpersState.bumpersFabric || ""} onValueChange={bumpersState.setBumpersFabric}>
                    <SelectTrigger className="w-full text-foreground">
                      <SelectValue placeholder="Select fabric" />
                    </SelectTrigger>
                    <SelectContent>
                      {fabricOptions.map((fabric) => (
                        <SelectItem key={fabric.value} value={fabric.value} className="text-foreground">
                          {fabric.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <div className="sticky top-24 p-6 bg-white border-2 border-[#EED9C4]">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground mb-2">Total Price</h3>
            <div className="text-2xl font-semibold text-foreground">
              ₹{totalPrice.toLocaleString()} <span className="text-sm font-normal text-foreground/70">(inclusive of all taxes)</span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground px-8 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Adding to Cart...
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
