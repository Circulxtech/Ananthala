"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useBabyHamper } from "@/hooks/use-baby-hamper"
import type { ProductDetail } from "@/data/product-details"
import type { CartItem } from "@/components/cart/cart-drawer"
import { BABY_HAMPER_ITEM_PRICES } from "@/utils/pricing"

interface BabyHamperConfiguratorProps {
  product: ProductDetail
  onAddToCart: (items: CartItem[]) => void
  isAddingToCart: boolean
}

const babyProducts = [
  { id: "mattress", name: "Mattress", price: BABY_HAMPER_ITEM_PRICES.mattress, image: "/productmattress.jpg" },
  { id: "topper", name: "Topper", price: BABY_HAMPER_ITEM_PRICES.topper, image: "/topper.jpg" },
  { id: "lounger", name: "Lounger", price: BABY_HAMPER_ITEM_PRICES.lounger, image: "/lounger.jpg" },
  { id: "head-pillow", name: "Head Pillow", price: BABY_HAMPER_ITEM_PRICES["head-pillow"], image: "/pillow.jpg" },
  { id: "pillow-bumpers", name: "Pillow Bumpers", price: BABY_HAMPER_ITEM_PRICES["pillow-bumpers"], image: "/bumpers.jpg" },
]

// Standard sizes in inches (L x B x H) with price multipliers
const standardSizes = {
  mattress: [
    { label: "24\" x 30\" x 2\"", value: "24x30x2", dimensions: { length: "24\"", breadth: "30\"", height: "2\"" }, priceMultiplier: 1.0 },
    { label: "28\" x 35\" x 2.5\"", value: "28x35x2.5", dimensions: { length: "28\"", breadth: "35\"", height: "2.5\"" }, priceMultiplier: 1.2 },
    { label: "32\" x 40\" x 3\"", value: "32x40x3", dimensions: { length: "32\"", breadth: "40\"", height: "3\"" }, priceMultiplier: 1.5 },
  ],
  topper: [
    { label: "24\" x 30\" x 1\"", value: "24x30x1", dimensions: { length: "24\"", breadth: "30\"", height: "1\"" }, priceMultiplier: 1.0 },
    { label: "28\" x 35\" x 1.5\"", value: "28x35x1.5", dimensions: { length: "28\"", breadth: "35\"", height: "1.5\"" }, priceMultiplier: 1.2 },
    { label: "32\" x 40\" x 2\"", value: "32x40x2", dimensions: { length: "32\"", breadth: "40\"", height: "2\"" }, priceMultiplier: 1.5 },
  ],
  lounger: [
    { label: "24\" x 30\" x 4\"", value: "24x30x4", dimensions: { length: "24\"", breadth: "30\"", height: "4\"" }, priceMultiplier: 1.0 },
    { label: "28\" x 35\" x 5\"", value: "28x35x5", dimensions: { length: "28\"", breadth: "35\"", height: "5\"" }, priceMultiplier: 1.2 },
    { label: "32\" x 40\" x 6\"", value: "32x40x6", dimensions: { length: "32\"", breadth: "40\"", height: "6\"" }, priceMultiplier: 1.5 },
  ],
  "head-pillow": [
    { label: "12\" x 8\" x 1\"", value: "12x8x1", dimensions: { length: "12\"", breadth: "8\"", height: "1\"" }, priceMultiplier: 1.0 },
    { label: "14\" x 10\" x 1.5\"", value: "14x10x1.5", dimensions: { length: "14\"", breadth: "10\"", height: "1.5\"" }, priceMultiplier: 1.15 },
    { label: "16\" x 12\" x 2\"", value: "16x12x2", dimensions: { length: "16\"", breadth: "12\"", height: "2\"" }, priceMultiplier: 1.3 },
  ],
  "pillow-bumpers": [
    { label: "48\" x 8\" x 6\"", value: "48x8x6", dimensions: { length: "48\"", breadth: "8\"", height: "6\"" }, priceMultiplier: 1.0 },
    { label: "52\" x 10\" x 8\"", value: "52x10x8", dimensions: { length: "52\"", breadth: "10\"", height: "8\"" }, priceMultiplier: 1.2 },
    { label: "56\" x 12\" x 10\"", value: "56x12x10", dimensions: { length: "56\"", breadth: "12\"", height: "10\"" }, priceMultiplier: 1.4 },
  ],
}

// Fabric price multipliers
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

/**
 * Baby Hamper Product Configurator Component
 * Handles all baby hamper-specific customization and cart logic
 */
export function BabyHamperConfigurator({
  product,
  onAddToCart,
  isAddingToCart,
}: BabyHamperConfiguratorProps) {
  const hamperState = useBabyHamper()
  const [selectedImageIndices, setSelectedImageIndices] = useState<Record<string, number>>({
    mattress: 0,
    topper: 0,
    lounger: 0,
    "head-pillow": 0,
    "pillow-bumpers": 0,
  })
  
  // Get images for each product based on selected color
  const getProductImages = (itemId: string): string[] => {
    const colorImages = hamperState.colorImages[hamperState.selectedColor] || hamperState.colorImages["royal-blue"]
    // Map item IDs to image indices in the colorImages array
    const imageMap: Record<string, number> = {
      mattress: 0,
      topper: 1,
      lounger: 2,
      "head-pillow": 3,
      "pillow-bumpers": 4,
    }
    // Get the main image for this product
    const mainImageIndex = imageMap[itemId] || 0
    const mainImage = colorImages[mainImageIndex] || babyProducts.find(p => p.id === itemId)?.image || ""
    
    // Return array with the main product image (can be expanded with more images later)
    return [mainImage, ...colorImages.filter((_, idx) => idx !== mainImageIndex).slice(0, 4)]
  }
  
  const setImageIndex = (itemId: string, index: number) => {
    setSelectedImageIndices(prev => ({ ...prev, [itemId]: index }))
  }
  
  const handleAddToCart = async () => {
    // Build cart items for all selected hamper items with standard dimensions
    const items: CartItem[] = []
    
    hamperState.hamperItems.forEach((itemId) => {
      const productData = babyProducts.find(p => p.id === itemId)
      if (productData) {
        // Get dimensions based on item type
        let dimensions = ""
        let fabric = ""
        
        if (itemId === "mattress") {
          dimensions = `${hamperState.standardLength || ""} x ${hamperState.standardBreadth || ""} x ${hamperState.standardHeight || ""}`.trim()
        } else if (itemId === "topper") {
          dimensions = `${hamperState.standardTopperLength || ""} x ${hamperState.standardTopperBreadth || ""} x ${hamperState.standardTopperHeight || ""}`.trim()
          fabric = hamperState.topperFabric || ""
        } else if (itemId === "lounger") {
          dimensions = `${hamperState.standardLoungerLength || ""} x ${hamperState.standardLoungerBreadth || ""} x ${hamperState.standardLoungerHeight || ""}`.trim()
          fabric = hamperState.loungerFabric || ""
        } else if (itemId === "head-pillow") {
          dimensions = `${hamperState.standardPillowLength || ""} x ${hamperState.standardPillowBreadth || ""} x ${hamperState.standardPillowHeight || ""}`.trim()
          fabric = hamperState.pillowFabric || ""
        } else if (itemId === "pillow-bumpers") {
          dimensions = `${hamperState.standardBumperLength || ""} x ${hamperState.standardBumperBreadth || ""} x ${hamperState.standardBumperHeight || ""}`.trim()
          fabric = hamperState.bumperFabric || ""
        }
        
        const sizeInfo = dimensions ? `${dimensions}${fabric ? ` - ${fabricOptions.find(f => f.value === fabric)?.label || fabric}` : ""}` : "Standard"
        
        // Calculate price based on dimensions and fabric
        let basePrice = productData.price
        let dimensionMultiplier = 1.0
        let fabricMultiplier = 1.0
        
        // Get dimension multiplier
        const currentSizeValue = getCurrentStandardSize(itemId)
        if (currentSizeValue) {
          const size = standardSizes[itemId as keyof typeof standardSizes]?.find(s => s.value === currentSizeValue)
          if (size && size.priceMultiplier) {
            dimensionMultiplier = size.priceMultiplier
          }
        }
        
        // Get fabric multiplier
        if (fabric) {
          fabricMultiplier = fabricMultipliers[fabric] || 1.0
        }
        
        const finalPrice = Math.round(basePrice * dimensionMultiplier * fabricMultiplier)
        
        items.push({
          id: `joy-${itemId}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
          name: `JOY ${productData.name}`,
          image: productData.image,
          size: sizeInfo,
          quantity: 1,
          price: finalPrice,
        })
      }
    })
    
    // Add complimentary bed sheet if color is selected
    if (hamperState.bedSpreadColor) {
      const colorLabel = hamperState.bedSpreadColor.charAt(0).toUpperCase() + hamperState.bedSpreadColor.slice(1)
      const bedsheetDimensions = hamperState.standardLength && hamperState.standardBreadth
        ? `${hamperState.standardLength} x ${hamperState.standardBreadth}`
        : "Standard Size"
      
      items.push({
        id: `joy-bedsheet-${hamperState.bedSpreadColor}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: "JOY Bed Sheet (Complimentary)",
        image: "/bedsheet.jpg",
        size: `${bedsheetDimensions} - ${colorLabel}`,
        quantity: 1,
        price: 0,
      })
    }
    
    onAddToCart(items)
  }
  
  // Helper function to handle standard size selection
  const handleStandardSizeChange = (itemId: string, sizeValue: string) => {
    const size = standardSizes[itemId as keyof typeof standardSizes]?.find(s => s.value === sizeValue)
    if (size) {
      if (itemId === "mattress") {
        hamperState.setStandardLength(size.dimensions.length)
        hamperState.setStandardBreadth(size.dimensions.breadth)
        hamperState.setStandardHeight(size.dimensions.height)
      } else if (itemId === "topper") {
        hamperState.setStandardTopperLength(size.dimensions.length)
        hamperState.setStandardTopperBreadth(size.dimensions.breadth)
        hamperState.setStandardTopperHeight(size.dimensions.height)
      } else if (itemId === "lounger") {
        hamperState.setStandardLoungerLength(size.dimensions.length)
        hamperState.setStandardLoungerBreadth(size.dimensions.breadth)
        hamperState.setStandardLoungerHeight(size.dimensions.height)
      } else if (itemId === "head-pillow") {
        hamperState.setStandardPillowLength(size.dimensions.length)
        hamperState.setStandardPillowBreadth(size.dimensions.breadth)
        hamperState.setStandardPillowHeight(size.dimensions.height)
      } else if (itemId === "pillow-bumpers") {
        hamperState.setStandardBumperLength(size.dimensions.length)
        hamperState.setStandardBumperBreadth(size.dimensions.breadth)
        hamperState.setStandardBumperHeight(size.dimensions.height)
      }
    }
  }
  
  // Helper function to get current standard size value
  const getCurrentStandardSize = (itemId: string): string => {
    if (itemId === "mattress") {
      const sizes = standardSizes.mattress
      return sizes.find(s => 
        s.dimensions.length === hamperState.standardLength &&
        s.dimensions.breadth === hamperState.standardBreadth &&
        s.dimensions.height === hamperState.standardHeight
      )?.value || ""
    } else if (itemId === "topper") {
      const sizes = standardSizes.topper
      return sizes.find(s => 
        s.dimensions.length === hamperState.standardTopperLength &&
        s.dimensions.breadth === hamperState.standardTopperBreadth &&
        s.dimensions.height === hamperState.standardTopperHeight
      )?.value || ""
    } else if (itemId === "lounger") {
      const sizes = standardSizes.lounger
      return sizes.find(s => 
        s.dimensions.length === hamperState.standardLoungerLength &&
        s.dimensions.breadth === hamperState.standardLoungerBreadth &&
        s.dimensions.height === hamperState.standardLoungerHeight
      )?.value || ""
    } else if (itemId === "head-pillow") {
      const sizes = standardSizes["head-pillow"]
      return sizes.find(s => 
        s.dimensions.length === hamperState.standardPillowLength &&
        s.dimensions.breadth === hamperState.standardPillowBreadth &&
        s.dimensions.height === hamperState.standardPillowHeight
      )?.value || ""
    } else if (itemId === "pillow-bumpers") {
      const sizes = standardSizes["pillow-bumpers"]
      return sizes.find(s => 
        s.dimensions.length === hamperState.standardBumperLength &&
        s.dimensions.breadth === hamperState.standardBumperBreadth &&
        s.dimensions.height === hamperState.standardBumperHeight
      )?.value || ""
    }
    return ""
  }
  
  // Calculate total price based on selected items, dimensions, and fabrics
  const totalPrice = hamperState.hamperItems.reduce((sum, itemId) => {
    const productData = babyProducts.find(p => p.id === itemId)
    if (!productData) return sum
    
    let basePrice = productData.price
    
    // Get dimension multiplier
    let dimensionMultiplier = 1.0
    const currentSizeValue = getCurrentStandardSize(itemId)
    if (currentSizeValue) {
      const size = standardSizes[itemId as keyof typeof standardSizes]?.find(s => s.value === currentSizeValue)
      if (size && size.priceMultiplier) {
        dimensionMultiplier = size.priceMultiplier
      }
    }
    
    // Get fabric multiplier
    let fabricMultiplier = 1.0
    if (itemId === "mattress" && hamperState.mattressFabric) {
      fabricMultiplier = fabricMultipliers[hamperState.mattressFabric] || 1.0
    } else if (itemId === "topper" && hamperState.topperFabric) {
      fabricMultiplier = fabricMultipliers[hamperState.topperFabric] || 1.0
    } else if (itemId === "lounger" && hamperState.loungerFabric) {
      fabricMultiplier = fabricMultipliers[hamperState.loungerFabric] || 1.0
    } else if (itemId === "head-pillow" && hamperState.pillowFabric) {
      fabricMultiplier = fabricMultipliers[hamperState.pillowFabric] || 1.0
    } else if (itemId === "pillow-bumpers" && hamperState.bumperFabric) {
      fabricMultiplier = fabricMultipliers[hamperState.bumperFabric] || 1.0
    }
    
    // Calculate final price: base price * dimension multiplier * fabric multiplier
    const finalPrice = Math.round(basePrice * dimensionMultiplier * fabricMultiplier)
    
    return sum + finalPrice
  }, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Content - All Items Customization */}
      <div className="lg:col-span-9 space-y-8">
        {/* Mattress Customization */}
        {hamperState.hamperItems.includes("mattress") && (
          <div className="p-6 bg-white border-2 border-[#EED9C4]">
            <h3 className="text-xl font-medium text-foreground mb-6">Mattress</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={getProductImages("mattress")[selectedImageIndices.mattress] || "/productmattress.jpg"}
                    alt="JOY Mattress"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                {getProductImages("mattress").length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {getProductImages("mattress").map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setImageIndex("mattress", index)}
                        type="button"
                        className={`relative aspect-square overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80 ${
                          selectedImageIndices.mattress === index
                            ? "border-[#EED9C4] opacity-100"
                            : "border-transparent opacity-60"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Mattress view ${index + 1}`}
                          fill
                          className="object-cover pointer-events-none"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Right Side - Standard Dimensions */}
              <div>
                <h4 className="text-2xl font-medium text-foreground mb-4">Standard Dimensions</h4>
                <div className="space-y-4">
                  {/* Standard Size Dropdown */}
                  <div>
                    <label className="text-base font-medium text-foreground mb-2 block">Dimensions(in inches)</label>
                    <Select 
                      value={getCurrentStandardSize("mattress")} 
                      onValueChange={(value) => handleStandardSizeChange("mattress", value)}
                    >
                      <SelectTrigger className="w-full text-foreground">
                        <SelectValue placeholder="Select standard size" />
                      </SelectTrigger>
                      <SelectContent>
                        {standardSizes.mattress.map((size) => (
                          <SelectItem key={size.value} value={size.value} className="text-foreground">
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                   
                  </div>
                  
                  {/* Fabric Dropdown */}
                  <div>
                    <label className="text-base font-medium text-foreground mb-2 block">Fabric</label>
                    <Select value={hamperState.mattressFabric || ""} onValueChange={hamperState.setMattressFabric}>
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
        )}

        {/* Topper Customization */}
        {hamperState.hamperItems.includes("topper") && (
          <div className="p-6 bg-white border-2 border-[#EED9C4]">
            <h3 className="text-xl font-medium text-foreground mb-6">Topper</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={getProductImages("topper")[selectedImageIndices.topper] || "/topper.jpg"}
                    alt="JOY Topper"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                {getProductImages("topper").length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {getProductImages("topper").map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setImageIndex("topper", index)}
                        type="button"
                        className={`relative aspect-square overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80 ${
                          selectedImageIndices.topper === index
                            ? "border-[#EED9C4] opacity-100"
                            : "border-transparent opacity-60"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Topper view ${index + 1}`}
                          fill
                          className="object-cover pointer-events-none"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Right Side - Standard Dimensions */}
              <div>
                <h4 className="text-lg font-medium text-foreground mb-4">Standard Dimensions</h4>
                <div className="space-y-4">
                  {/* Standard Size Dropdown */}
                  <div>
                    <label className="text-base font-medium text-foreground mb-2 block">Dimensions(in inches)</label>
                    <Select 
                      value={getCurrentStandardSize("topper")} 
                      onValueChange={(value) => handleStandardSizeChange("topper", value)}
                    >
                      <SelectTrigger className="w-full text-foreground">
                        <SelectValue placeholder="Select standard size" />
                      </SelectTrigger>
                      <SelectContent>
                        {standardSizes.topper.map((size) => (
                          <SelectItem key={size.value} value={size.value} className="text-foreground">
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Fabric Dropdown */}
                  <div>
                    <label className="text-base font-medium text-foreground mb-2 block">Fabric</label>
                    <Select value={hamperState.topperFabric} onValueChange={hamperState.setTopperFabric}>
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
        )}

        {/* Lounger Customization */}
        {hamperState.hamperItems.includes("lounger") && (
          <div className="p-6 bg-white border-2 border-[#EED9C4]">
            <h3 className="text-xl font-medium text-foreground mb-6">Lounger</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={getProductImages("lounger")[selectedImageIndices.lounger] || "/lounger.jpg"}
                    alt="JOY Lounger"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                {getProductImages("lounger").length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {getProductImages("lounger").map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setImageIndex("lounger", index)}
                        type="button"
                        className={`relative aspect-square overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80 ${
                          selectedImageIndices.lounger === index
                            ? "border-[#EED9C4] opacity-100"
                            : "border-transparent opacity-60"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Lounger view ${index + 1}`}
                          fill
                          className="object-cover pointer-events-none"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Right Side - Standard Dimensions */}
              <div>
                <h4 className="text-lg font-medium text-foreground mb-4">Standard Dimensions</h4>
                <div className="space-y-4">
                  {/* Standard Size Dropdown */}
                  <div>
                    <label className="text-base font-medium text-foreground mb-2 block">Dimensions(in inches)</label>
                    <Select 
                      value={getCurrentStandardSize("lounger")} 
                      onValueChange={(value) => handleStandardSizeChange("lounger", value)}
                    >
                      <SelectTrigger className="w-full text-foreground">
                        <SelectValue placeholder="Select standard size" />
                      </SelectTrigger>
                      <SelectContent>
                        {standardSizes.lounger.map((size) => (
                          <SelectItem key={size.value} value={size.value} className="text-foreground">
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Fabric Dropdown */}
                  <div>
                    <label className="text-base font-medium text-foreground mb-2 block">Fabric</label>
                    <Select value={hamperState.loungerFabric} onValueChange={hamperState.setLoungerFabric}>
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
        )}

        {/* Head Pillow Customization */}
        {hamperState.hamperItems.includes("head-pillow") && (
          <div className="p-6 bg-white border-2 border-[#EED9C4]">
            <h3 className="text-xl font-medium text-foreground mb-6">Head Pillow</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={getProductImages("head-pillow")[selectedImageIndices["head-pillow"]] || "/pillow.jpg"}
                    alt="JOY Head Pillow"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                {getProductImages("head-pillow").length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {getProductImages("head-pillow").map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setImageIndex("head-pillow", index)}
                        type="button"
                        className={`relative aspect-square overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80 ${
                          selectedImageIndices["head-pillow"] === index
                            ? "border-[#EED9C4] opacity-100"
                            : "border-transparent opacity-60"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Head Pillow view ${index + 1}`}
                          fill
                          className="object-cover pointer-events-none"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Right Side - Standard Dimensions */}
              <div>
                <h4 className="text-lg font-medium text-foreground mb-4">Standard Dimensions</h4>
                <div className="space-y-4">
                  {/* Standard Size Dropdown */}
                  <div>
                    <label className="text-base font-medium text-foreground mb-2 block">Dimensions(in inches)</label>
                    <Select 
                      value={getCurrentStandardSize("head-pillow")} 
                      onValueChange={(value) => handleStandardSizeChange("head-pillow", value)}
                    >
                      <SelectTrigger className="w-full text-foreground">
                        <SelectValue placeholder="Select standard size" />
                      </SelectTrigger>
                      <SelectContent>
                        {standardSizes["head-pillow"].map((size) => (
                          <SelectItem key={size.value} value={size.value} className="text-foreground">
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Fabric Dropdown */}
                  <div>
                    <label className="text-base font-medium text-foreground mb-2 block">Fabric</label>
                    <Select value={hamperState.pillowFabric} onValueChange={hamperState.setPillowFabric}>
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
        )}

        {/* Pillow Bumpers Customization */}
        {hamperState.hamperItems.includes("pillow-bumpers") && (
          <div className="p-6 bg-white border-2 border-[#EED9C4]">
            <h3 className="text-xl font-medium text-foreground mb-6">Pillow Bumpers</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Side - Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={getProductImages("pillow-bumpers")[selectedImageIndices["pillow-bumpers"]] || "/bumpers.jpg"}
                    alt="JOY Pillow Bumpers"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Thumbnail Gallery */}
                {getProductImages("pillow-bumpers").length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {getProductImages("pillow-bumpers").map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setImageIndex("pillow-bumpers", index)}
                        type="button"
                        className={`relative aspect-square overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80 ${
                          selectedImageIndices["pillow-bumpers"] === index
                            ? "border-[#EED9C4] opacity-100"
                            : "border-transparent opacity-60"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Pillow Bumpers view ${index + 1}`}
                          fill
                          className="object-cover pointer-events-none"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Right Side - Standard Dimensions */}
              <div>
                <h4 className="text-lg font-medium text-foreground mb-4">Standard Dimensions</h4>
                <div className="space-y-4">
                  {/* Standard Size Dropdown */}
                  <div>
                    <label className="text-base font-medium text-foreground mb-2 block">Dimensions(in inches)</label>
                    <Select 
                      value={getCurrentStandardSize("pillow-bumpers")} 
                      onValueChange={(value) => handleStandardSizeChange("pillow-bumpers", value)}
                    >
                      <SelectTrigger className="w-full text-foreground">
                        <SelectValue placeholder="Select standard size" />
                      </SelectTrigger>
                      <SelectContent>
                        {standardSizes["pillow-bumpers"].map((size) => (
                          <SelectItem key={size.value} value={size.value} className="text-foreground">
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Fabric Dropdown */}
                  <div>
                    <label className="text-base font-medium text-foreground mb-2 block">Fabric</label>
                    <Select value={hamperState.bumperFabric} onValueChange={hamperState.setBumperFabric}>
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
        )}
      </div>

      {/* Right Sidebar - Hamper Includes */}
      <div className="lg:col-span-3">
        <div className="sticky top-24 p-6 bg-white border-2 border-[#EED9C4]">
          <h3 className="text-xl font-semibold text-foreground mb-4">Hamper Includes:</h3>
          <div className="space-y-3">
            {babyProducts.map((product) => (
              <label key={product.id} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hamperState.hamperItems.includes(product.id)}
                  onChange={() => hamperState.toggleHamperItem(product.id)}
                  className="w-5 h-5 text-[#EED9C4] border-foreground/30 rounded focus:ring-[#EED9C4]"
                />
                <span className="text-foreground font-medium">{product.name}</span>
              </label>
            ))}
          </div>
          
          {/* Price Section */}
          <div className="mt-6 pt-6 border-t border-[#EED9C4]">
            <h3 className="text-lg font-medium text-foreground mb-2">Total Price</h3>
            <div className="text-2xl font-semibold text-foreground">
              ₹{totalPrice.toLocaleString()} <span className="text-sm font-normal text-foreground/70">(inclusive of all taxes)</span>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            className="w-full mt-6 bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground px-8 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddToCart}
            disabled={isAddingToCart || hamperState.hamperItems.length === 0}
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
