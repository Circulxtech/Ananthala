"use client"

import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  Check,
  Truck,
  Shield,
  Moon,
  IndianRupee,
  ShoppingCart,
  Loader2,
} from "lucide-react"
import { useState, useEffect } from "react"
import { getProductDetailById } from "@/data/product-details"
import { CartDrawer, type CartItem } from "@/components/cart/cart-drawer"
import { useCart } from "@/contexts/cart-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  const product = getProductDetailById(productId)

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-4">
              Product Not Found
            </h1>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 border text-black hover:opacity-70 transition-opacity"
              style={{ borderColor: "#D9CFC7" }}
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isBabyProduct = product.category === "baby"
  const isBabyHamper = productId === 12
  const isIndividualBabyProduct = [7, 8, 9, 10, 11].includes(productId)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"features" | "specs">("features")
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  // Baby Hamper specific states
  const [mattressVariant, setMattressVariant] = useState("")
  const [mattressDimension, setMattressDimension] = useState("")
  const [mattressApplicator, setMattressApplicator] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [bedSpreadColor, setBedSpreadColor] = useState("")
  const [hamperItems, setHamperItems] = useState<string[]>(["mattress", "topper", "lounger", "head-pillow", "pillow-bumpers"])
  
  // Individual product customization states
  const [topperThickness, setTopperThickness] = useState("")
  const [topperFabric, setTopperFabric] = useState("")
  const [loungerSize, setLoungerSize] = useState("")
  const [loungerFabric, setLoungerFabric] = useState("")
  const [pillowSize, setPillowSize] = useState("")
  const [pillowFirmness, setPillowFirmness] = useState("")
  const [bumperStyle, setBumperStyle] = useState("")
  const [bumperFabric, setBumperFabric] = useState("")
  
  const { cartItems, addToCart, isCartOpen, setIsCartOpen } = useCart()
  
  // Color to images mapping for Baby Hamper
  const colorImages: Record<string, string[]> = {
    "royal-blue": ["/productmattress.jpg", "/topper.jpg", "/lounger.jpg", "/pillow.jpg", "/bumpers.jpg"],
    gray: ["/topper.jpg", "/productmattress.jpg", "/lounger.jpg", "/pillow.jpg", "/bumpers.jpg"],
    black: ["/lounger.jpg", "/productmattress.jpg", "/topper.jpg", "/pillow.jpg", "/bumpers.jpg"],
    "dark-brown": ["/bumpers.jpg", "/productmattress.jpg", "/topper.jpg", "/lounger.jpg", "/pillow.jpg"],
  }
  
  const colorOptions = [
    { name: "royal-blue", label: "Royal Blue", hex: "#4169E1" },
    { name: "gray", label: "Gray", hex: "#4A4A4A" },
    { name: "black", label: "Black", hex: "#000000" },
    { name: "dark-brown", label: "Dark Brown", hex: "#5C4033" },
  ]
  
  const currentImages = (isBabyHamper || isIndividualBabyProduct) ? (colorImages[selectedColor] || colorImages["royal-blue"]) : product.images
  const effectiveColor = (isBabyHamper || isIndividualBabyProduct) ? (selectedColor || "royal-blue") : ""
  
  // Update main image when color changes for Baby Hamper and Individual Products
  useEffect(() => {
    if (isBabyHamper || isIndividualBabyProduct) {
      setSelectedImage(0) // Reset to first image when color changes
    }
  }, [selectedColor, isBabyHamper, isIndividualBabyProduct])
  
  const toggleHamperItem = (itemId: string) => {
    setHamperItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  const selectedSizeData = product.sizes.find((s) => s.name === selectedSize)
  const basePrice = selectedSizeData?.price || product.price
  
  // Calculate price for Baby Hamper based on selected items
  const currentPrice = isBabyHamper
    ? (() => {
        const itemPrices: Record<string, number> = {
          mattress: 299,
          topper: 149,
          lounger: 199,
          "head-pillow": 79,
          "pillow-bumpers": 89,
        }
        return hamperItems.reduce((sum, itemId) => sum + (itemPrices[itemId] || 0), 0)
      })()
    : basePrice

  
  const colors = isBabyProduct
    ? {
        bg50: "#FAF7F3",
        bg100: "#F0E4D3",
        border: "#DCC5B2",
        accent: "#D9A299",
        accentHover: "#C9928A",
        text: "#8B6F5C",
        textDark: "#6B5647",
        textLight: "#A08876",
      }
    : {
        bg50: "#F9F8F6",
        bg100: "#EFE9E3",
        border: "#D9CFC7",
        accent: "#6B563F",
        accentHover: "#B09A7D",
        text: "#6B563F",
        textDark: "#5A4A3A",
        textLight: "#B09A7D",
      }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (isBabyHamper) {
      // Add all selected hamper items
      const babyProducts = [
        { id: "mattress", name: "Mattress", price: 299, image: currentImages[0] },
        { id: "topper", name: "Topper", price: 149, image: currentImages[1] },
        { id: "lounger", name: "Lounger", price: 199, image: currentImages[2] },
        { id: "head-pillow", name: "Head Pillow", price: 79, image: currentImages[3] },
        { id: "pillow-bumpers", name: "Pillow Bumpers", price: 89, image: currentImages[4] },
      ]
      
      hamperItems.forEach((itemId) => {
        const product = babyProducts.find(p => p.id === itemId)
        if (product) {
          const sizeInfo = itemId === "mattress" && mattressDimension 
            ? `${mattressVariant || "Standard"} - ${mattressDimension}${mattressApplicator ? ` - ${mattressApplicator}` : ""}`
            : "Standard"
          
          const colorInfo = selectedColor ? ` - ${colorOptions.find(c => c.name === selectedColor)?.label || selectedColor}` : ""
          
          const cartItem: CartItem = {
            id: `joy-hamper-${product.id}-${selectedColor}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            name: `JOY ${product.name}`,
            image: product.image,
            size: `${sizeInfo}${colorInfo}`,
            quantity: 1,
            price: product.price,
          }
          addToCart(cartItem)
        }
      })
    } else if (isIndividualBabyProduct) {
      // Add individual baby product to cart
      const colorInfo = selectedColor ? ` - ${colorOptions.find(c => c.name === selectedColor)?.label || selectedColor}` : ""
      const sizeInfo = product.sizes.length > 1 ? selectedSize : "Standard"
      
      const cartItem: CartItem = {
        id: `joy-${product.id}-${selectedColor}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: `JOY ${product.name}`,
        image: currentImages[0],
        size: `${sizeInfo}${colorInfo}`,
        quantity: 1,
        price: basePrice,
      }
      addToCart(cartItem)
    } else {
      const newCartItem: CartItem = {
        id: `${product.id}-${selectedSize}`,
        name: product.name,
        image: product.images[0],
        size: selectedSize,
        quantity: quantity,
        price: currentPrice,
      }
      
      addToCart(newCartItem)
    }
    
    setIsAddingToCart(false)
    setIsCartOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16">
        {/* Breadcrumb */}
        <div
          className="py-4 px-4 border-b"
          style={{ backgroundColor: "white", borderColor: colors.border }}
        >
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => router.back()}
              className="flex text-lg font-medium items-center gap-2 hover:opacity-70 transition-opacity"
              style={{ color: "#000000" }}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Products
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="mb-4" style={{ backgroundColor: colors.bg50 }}>
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    key={`main-${selectedColor}-${selectedImage}`}
                    src={(isBabyHamper || isIndividualBabyProduct) ? currentImages[selectedImage] : product.images[selectedImage]}
                    alt={`${product.name} - ${(isBabyHamper || isIndividualBabyProduct) ? colorOptions.find(c => c.name === selectedColor)?.label : ''}`}
                    fill
                    className="object-cover transition-opacity duration-300"
                    unoptimized
                    priority={selectedImage === 0}
                  />
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {((isBabyHamper || isIndividualBabyProduct) ? currentImages : product.images).length > 1 && (
                <div className={`grid gap-2 ${(isBabyHamper || isIndividualBabyProduct) ? 'grid-cols-5' : 'grid-cols-4'}`} key={`thumbnails-${selectedColor}`}>
                  {((isBabyHamper || isIndividualBabyProduct) ? currentImages : product.images).map((image: string, index: number) => (
                    <button
                      key={`thumb-${selectedColor}-${index}`}
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedImage(index)
                      }}
                      type="button"
                      className="relative w-full aspect-square border-2 transition-all duration-200 cursor-pointer hover:opacity-80 hover:scale-105"
                      style={{
                        borderColor:
                          selectedImage === index ? colors.accent : colors.border,
                        borderWidth: selectedImage === index ? '3px' : '2px',
                      }}
                    >
                      <Image
                        key={`thumb-img-${selectedColor}-${index}`}
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1} - ${(isBabyHamper || isIndividualBabyProduct) ? colorOptions.find(c => c.name === selectedColor)?.label : ''}`}
                        fill
                        className="object-cover pointer-events-none transition-opacity duration-200"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {(isBabyHamper || isIndividualBabyProduct) ? (
                <>
                  {isBabyHamper && (
                    <style dangerouslySetInnerHTML={{__html: `
                      input[type="checkbox"][id^="mattress"],
                      input[type="checkbox"][id^="topper"],
                      input[type="checkbox"][id^="lounger"],
                      input[type="checkbox"][id^="head-pillow"],
                      input[type="checkbox"][id^="pillow-bumpers"] {
                        accent-color: #6B7280;
                      }
                      input[type="checkbox"][id^="mattress"]:checked,
                      input[type="checkbox"][id^="topper"]:checked,
                      input[type="checkbox"][id^="lounger"]:checked,
                      input[type="checkbox"][id^="head-pillow"]:checked,
                      input[type="checkbox"][id^="pillow-bumpers"]:checked {
                        background-color: #6B7280;
                        border-color: #6B7280;
                      }
                    `}} />
                  )}
               

                  {/* Mattress Customization - For Baby Hamper and Individual Mattress */}
                  {(isBabyHamper || productId === 7) && (
                    <div className="mb-6 border border-[#EED9C4] p-4 rounded">
                      <h3 className="text-2xl font-semibold text-black mb-4">Mattress Customization</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-lg text-black mb-2">Variant</label>
                          <Select value={mattressVariant} onValueChange={setMattressVariant}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select variant" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="modular">Modular</SelectItem>
                              <SelectItem value="plush">Plush</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-lg text-black mb-2">Dimension</label>
                          <Select value={mattressDimension} onValueChange={setMattressDimension}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select dimension" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="crib">Crib</SelectItem>
                              <SelectItem value="toddler">Toddler</SelectItem>
                              <SelectItem value="full">Full</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-lg text-black mb-2">Applicator</label>
                          <Select value={mattressApplicator} onValueChange={setMattressApplicator}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select applicator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="organic">Organic</SelectItem>
                              <SelectItem value="cotton">Cotton</SelectItem>
                              <SelectItem value="bamboo">Bamboo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Baby Hamper Custom Layout */}
                  {isBabyHamper && (
                    <>

                      {/* Bed Spread Section */}
                      <div className="mb-6 border border-[#EED9C4] p-4 rounded">
                        <h3 className="text-2xl font-semibold text-black mb-2">
                          Bed Spread <span className="text-lg font-normal text-foreground">(Complimentary with purchase)</span>
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-lg text-black mb-2">Color</label>
                            <Select value={bedSpreadColor} onValueChange={setBedSpreadColor}>
                              <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                <SelectValue placeholder="Select color" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="beige">Beige</SelectItem>
                                <SelectItem value="white">White</SelectItem>
                                <SelectItem value="cream">Cream</SelectItem>
                                <SelectItem value="ivory">Ivory</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="bg-[#EED9C4]/30 p-3 rounded border border-[#EED9C4]/50">
                            <p className="text-foreground/70 text-sm flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-600" />
                              Included at no additional cost
                            </p>
                          </div>
                          <p className="text-foreground">Complimentary bed spread included with your mattress purchase.</p>
                        </div>
                      </div>

                      {/* Hamper Includes */}
                      <div className="mb-6 border border-[#EED9C4] p-4 rounded">
                        <h3 className="text-2xl font-semibold text-black mb-4">Hamper Includes:</h3>
                        <div className="flex flex-wrap gap-4 items-center">
                          {[
                            { id: "mattress", label: "Mattress" },
                            { id: "topper", label: "Topper" },
                            { id: "lounger", label: "Lounger" },
                            { id: "head-pillow", label: "Head Pillow" },
                            { id: "pillow-bumpers", label: "Pillow Bumpers" },
                          ].map((item) => (
                            <div key={item.id} className="flex items-center gap-2">
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id={item.id}
                                  checked={hamperItems.includes(item.id)}
                                  onChange={() => toggleHamperItem(item.id)}
                                  className="w-4 h-4 border-gray-300 rounded bg-gray-100 appearance-none checked:bg-gray-500 checked:border-gray-500 cursor-pointer"
                                />
                                {hamperItems.includes(item.id) && (
                                  <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white pointer-events-none" />
                                )}
                              </div>
                              <label htmlFor={item.id} className="text-base text-black cursor-pointer whitespace-nowrap">
                                {item.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Topper Customization */}
                  {productId === 8 && (
                    <div className="mb-6 border border-[#EED9C4] p-4 rounded">
                      <h3 className="text-2xl font-semibold text-black mb-4">Topper Customization</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-lg text-black mb-2">Thickness</label>
                          <Select value={topperThickness} onValueChange={setTopperThickness}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select thickness" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="thin">Thin (1 inch)</SelectItem>
                              <SelectItem value="medium">Medium (2 inches)</SelectItem>
                              <SelectItem value="thick">Thick (3 inches)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-lg text-black mb-2">Fabric</label>
                          <Select value={topperFabric} onValueChange={setTopperFabric}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select fabric" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="organic-cotton">Organic Cotton</SelectItem>
                              <SelectItem value="bamboo">Bamboo</SelectItem>
                              <SelectItem value="cotton-blend">Cotton Blend</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lounger Customization */}
                  {productId === 9 && (
                    <div className="mb-6 border border-[#EED9C4] p-4 rounded">
                      <h3 className="text-2xl font-semibold text-black mb-4">Lounger Customization</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-lg text-black mb-2">Size</label>
                          <Select value={loungerSize} onValueChange={setLoungerSize}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-lg text-black mb-2">Fabric</label>
                          <Select value={loungerFabric} onValueChange={setLoungerFabric}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select fabric" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="organic-cotton">Organic Cotton</SelectItem>
                              <SelectItem value="bamboo">Bamboo</SelectItem>
                              <SelectItem value="cotton-blend">Cotton Blend</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Head Pillow Customization */}
                  {productId === 10 && (
                    <div className="mb-6 border border-[#EED9C4] p-4 rounded">
                      <h3 className="text-2xl font-semibold text-black mb-4">Head Pillow Customization</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-lg text-black mb-2">Size</label>
                          <Select value={pillowSize} onValueChange={setPillowSize}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-lg text-black mb-2">Firmness</label>
                          <Select value={pillowFirmness} onValueChange={setPillowFirmness}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select firmness" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="soft">Soft</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="firm">Firm</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pillow Bumpers Customization */}
                  {productId === 11 && (
                    <div className="mb-6 border border-[#EED9C4] p-4 rounded">
                      <h3 className="text-2xl font-semibold text-black mb-4">Pillow Bumpers Customization</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-lg text-black mb-2">Style</label>
                          <Select value={bumperStyle} onValueChange={setBumperStyle}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="breathable">Breathable</SelectItem>
                              <SelectItem value="mesh">Mesh</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-lg text-black mb-2">Fabric</label>
                          <Select value={bumperFabric} onValueChange={setBumperFabric}>
                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                              <SelectValue placeholder="Select fabric" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="organic-cotton">Organic Cotton</SelectItem>
                              <SelectItem value="bamboo">Bamboo</SelectItem>
                              <SelectItem value="cotton-blend">Cotton Blend</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Size Selection for Individual Products */}
                  {isIndividualBabyProduct && product.sizes.length > 1 && (
                    <div className="mb-6 border border-[#EED9C4] p-4 rounded">
                      <h3 className="text-2xl font-semibold text-black mb-4">Select Size</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {product.sizes.map((size) => (
                          <button
                            key={size.name}
                            onClick={() => setSelectedSize(size.name)}
                            className={`py-3 px-4 border-2 transition-colors ${
                              selectedSize === size.name
                                ? "border-[#EED9C4] bg-[#EED9C4]/35"
                                : "border-[#EED9C4] bg-transparent"
                            }`}
                          >
                            <span className="text-black">{size.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* More Colors */}
                  <div className="mb-6 border border-[#EED9C4] p-4 rounded">
                    <h3 className="text-2xl font-semibold text-black mb-4">More Colors</h3>
                    <div className="flex gap-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                            selectedColor === color.name 
                              ? "border-[#EED9C4] scale-125" 
                              : "border-gray-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          aria-label={color.label}
                          title={color.label}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6 border border-[#EED9C4] p-4 rounded">
                    <h3 className="text-2xl font-semibold text-black mb-2">Price</h3>
                    <div className="flex items-center gap-1 text-black">
                      <IndianRupee className="w-6 h-6" />
                      <span className="text-3xl font-normal">
                        {(isIndividualBabyProduct ? basePrice : currentPrice).toLocaleString("en-IN", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                    <p className="text-base text-black/70 mt-1">(inclusive of all taxes)</p>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="w-full py-3 text-black text-xl font-medium hover:opacity-90 transition-opacity mb-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#EED9C4" }}
                  >
                    {isAddingToCart ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Adding to Cart...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-6 h-6" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
              <p className="text-2xl font-normal text-black mb-4 tracking-wider uppercase">
                {product.name}
              </p>

              <p className="mb-6 text-lg  text-black">
                {product.description}
              </p>

              <div
                className="mb-8 pb-8 border-b"
                style={{ borderColor: colors.border }}
              >
                <div className="mb-4">
                  <div className="flex items-center gap-1 text-black">
                    <IndianRupee className="w-5 h-5 text-black" />
                    <span className="text-2xl font-normal">
                      {currentPrice.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <label
                    className="block mb-3 text-black text-lg"
                  >
                    Select Size
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size.name}
                        onClick={() => setSelectedSize(size.name)}
                        className="py-3 px-4 border-2 transition-colors"
                        style={{
                          borderColor:
                          selectedSize === size.name
                            ? "#EED9C4"
                            : colors.border,
                        
                        backgroundColor:
                          selectedSize === size.name
                            ? "rgba(238, 217, 196, 0.35)" // soft tint
                            : "transparent",
                        
                        color: "black",
                        
                        }}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label
                    className="block mb-3 text-lg text-black"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center text-lg gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border hover:opacity-70 transition-opacity text-black"
                      style={{
                        borderColor: colors.border,
                      }}
                    >
                      -
                    </button>
                    <span className="text-black">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border hover:opacity-70 transition-opacity text-black"
                      style={{
                        borderColor: colors.border,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Choose Your Comfort */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full py-4 text-black text-lg font-medium hover:opacity-90 transition-opacity mb-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#EED9C4" }}
                >
                  {isAddingToCart ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Adding to Cart...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Choose Your Comfort -{" "}
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        <span>
                          {(currentPrice * quantity).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </>
                  )}
                </button>
                <p className="text-center text-base text-black">
                  Free shipping on all orders
                </p>
              </div>
                </>
              )}

             
            </div>
          </div>

          {/* Product Details Tabs - Hidden for Baby Hamper and Individual Products */}
          {!isBabyHamper && !isIndividualBabyProduct && (
          <div
            className="mt-16 border-t pt-12"
            style={{ borderColor: colors.border }}
          >
            <div
              className="flex gap-8 mb-8 border-b"
              style={{ borderColor: colors.border }}
            >
              <button
                onClick={() => setActiveTab("features")}
                className="pb-4 transition-colors relative text-black text-lg font-medium"
              >
                Features & Materials
                {activeTab === "features" && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: colors.accent }}
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
                    style={{ backgroundColor: colors.accent }}
                  ></div>
                )}
              </button>
            </div>

            {activeTab === "features" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="mb-4 text-black">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check
                          className="w-5 h-5 mt-0.5 shrink-0 text-black text-lg"
                        />
                        <span className="text-black">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-4 text-black">
                    Materials
                  </h3>
                  <ul className="space-y-3">
                    {product.materials.map(
                      (material: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2 shrink-0 bg-black text-lg"
                          ></div>
                          <span className="text-black">{material}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-3xl">
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-2 gap-4 py-4 border-b last:border-0"
                      style={{ borderColor: colors.border }}
                    >
                      <span className="text-black">{key}</span>
                      <span className="text-black">{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          )}
        </div>
        
        {/* Buy Individually Section - Only for Baby Hamper */}
        {isBabyHamper && (
          <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-8 text-center font-cormorant">
                Buy Individually
              </h2>
              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                    dragFree: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {[
                      { id: "mattress", name: "Mattress", image: "/productmattress.jpg", productDetailId: 7 },
                      { id: "topper", name: "Topper", image: "/topper.jpg", productDetailId: 8 },
                      { id: "lounger", name: "Lounger", image: "/lounger.jpg", productDetailId: 9 },
                      { id: "head-pillow", name: "Head Pillow", image: "/pillow.jpg", productDetailId: 10 },
                    ].map((product) => (
                      <CarouselItem
                        key={product.id}
                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3"
                      >
                        <div className="border border-[#EED9C4] p-4 hover:shadow-lg transition-shadow bg-white">
                          <div className="relative aspect-square overflow-hidden mb-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          <h3 className="text-base font-semibold text-foreground mb-3 text-center">{product.name}</h3>
                          <Link href={`/product/${product.productDetailId}`}>
                            <Button 
                              className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground py-2.5 text-sm"
                            >
                              Add to Cart
                            </Button>
                          </Link>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#EED9C4" }} />
                  <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#EED9C4" }} />
                </Carousel>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      
      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
      />
    </div>
  )
}
