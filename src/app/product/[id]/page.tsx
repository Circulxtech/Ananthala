"use client"

import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Truck,
  Shield,
  Moon,
  IndianRupee,
  ShoppingCart,
  Loader2,
  Maximize2,
  Leaf,
  Grid3x3,
  UserCheck,
  Feather,
  ShoppingBag,
  Package,
  Globe,
  ChevronDown,
  Star,
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
  const isKidsHamper = productId === 13
  const isIndividualBabyProduct = [7, 8, 9, 10, 11].includes(productId)
  const isJoyProduct = [7, 8, 9, 10, 11, 12, 13].includes(productId)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"features" | "specs">("features")
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const [isShippingOpen, setIsShippingOpen] = useState(false)
  const [isSoldOut, setIsSoldOut] = useState(false)
  const [notifyEmail, setNotifyEmail] = useState("")
  const [isNotifySubmitted, setIsNotifySubmitted] = useState(false)
  
  // Baby Hamper specific states
  const [mattressVariant, setMattressVariant] = useState("")
  const [mattressLength, setMattressLength] = useState("")
  const [mattressBreadth, setMattressBreadth] = useState("")
  const [mattressHeight, setMattressHeight] = useState("")
  const [standardLength, setStandardLength] = useState("")
  const [standardBreadth, setStandardBreadth] = useState("")
  const [standardHeight, setStandardHeight] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [bedSpreadColor, setBedSpreadColor] = useState("")
  const [hamperItems, setHamperItems] = useState<string[]>(["mattress", "topper", "lounger", "head-pillow", "pillow-bumpers"])
  
  // Individual product customization states
  const [topperLength, setTopperLength] = useState("")
  const [topperBreadth, setTopperBreadth] = useState("")
  const [topperHeight, setTopperHeight] = useState("")
  const [topperFabric, setTopperFabric] = useState("")
  const [standardTopperLength, setStandardTopperLength] = useState("")
  const [standardTopperBreadth, setStandardTopperBreadth] = useState("")
  const [standardTopperHeight, setStandardTopperHeight] = useState("")
  const [loungerLength, setLoungerLength] = useState("")
  const [loungerBreadth, setLoungerBreadth] = useState("")
  const [loungerHeight, setLoungerHeight] = useState("")
  const [loungerFabric, setLoungerFabric] = useState("")
  const [standardLoungerLength, setStandardLoungerLength] = useState("")
  const [standardLoungerBreadth, setStandardLoungerBreadth] = useState("")
  const [standardLoungerHeight, setStandardLoungerHeight] = useState("")
  const [pillowThickness, setPillowThickness] = useState("")
  const [pillowFabric, setPillowFabric] = useState("")
  const [pillowLength, setPillowLength] = useState("")
  const [pillowBreadth, setPillowBreadth] = useState("")
  const [pillowHeight, setPillowHeight] = useState("")
  const [standardPillowLength, setStandardPillowLength] = useState("")
  const [standardPillowBreadth, setStandardPillowBreadth] = useState("")
  const [standardPillowHeight, setStandardPillowHeight] = useState("")
  const [bumperStyle, setBumperStyle] = useState("")
  const [bumperFabric, setBumperFabric] = useState("")
  const [bumperLength, setBumperLength] = useState("")
  const [bumperBreadth, setBumperBreadth] = useState("")
  const [bumperHeight, setBumperHeight] = useState("")
  const [standardBumperLength, setStandardBumperLength] = useState("")
  const [standardBumperBreadth, setStandardBumperBreadth] = useState("")
  const [standardBumperHeight, setStandardBumperHeight] = useState("")
  // Kids Hamper specific states
  const [kidsHamperItems, setKidsHamperItems] = useState<string[]>(["mattress", "pillows", "bed-sheets"])
  // Mattress states
  const [kidsMattressLength, setKidsMattressLength] = useState("")
  const [kidsMattressBreadth, setKidsMattressBreadth] = useState("")
  const [kidsMattressHeight, setKidsMattressHeight] = useState("")
  const [kidsMattressFabric, setKidsMattressFabric] = useState("")
  const [standardKidsMattressLength, setStandardKidsMattressLength] = useState("")
  const [standardKidsMattressBreadth, setStandardKidsMattressBreadth] = useState("")
  const [standardKidsMattressHeight, setStandardKidsMattressHeight] = useState("")
  // Pillows states
  const [kidsPillowsLength, setKidsPillowsLength] = useState("")
  const [kidsPillowsBreadth, setKidsPillowsBreadth] = useState("")
  const [kidsPillowsHeight, setKidsPillowsHeight] = useState("")
  const [kidsPillowsFabric, setKidsPillowsFabric] = useState("")
  const [standardKidsPillowsLength, setStandardKidsPillowsLength] = useState("")
  const [standardKidsPillowsBreadth, setStandardKidsPillowsBreadth] = useState("")
  const [standardKidsPillowsHeight, setStandardKidsPillowsHeight] = useState("")
  // Bed Sheets states
  const [kidsBedSheetsLength, setKidsBedSheetsLength] = useState("")
  const [kidsBedSheetsBreadth, setKidsBedSheetsBreadth] = useState("")
  const [kidsBedSheetsHeight, setKidsBedSheetsHeight] = useState("")
  const [kidsBedSheetsFabric, setKidsBedSheetsFabric] = useState("")
  const [standardKidsBedSheetsLength, setStandardKidsBedSheetsLength] = useState("")
  const [standardKidsBedSheetsBreadth, setStandardKidsBedSheetsBreadth] = useState("")
  const [standardKidsBedSheetsHeight, setStandardKidsBedSheetsHeight] = useState("")
  
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
  
  const toggleKidsHamperItem = (itemId: string) => {
    setKidsHamperItems((prev) =>
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
    : isKidsHamper
    ? (() => {
        const itemPrices: Record<string, number> = {
          mattress: 599,
          pillows: 199,
          "bed-sheets": 0, // Complimentary
        }
        return kidsHamperItems.reduce((sum, itemId) => sum + (itemPrices[itemId] || 0), 0)
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
          const sizeInfo = itemId === "mattress" && mattressLength && mattressBreadth
            ? `${mattressVariant || "Standard"} - ${mattressLength}cm x ${mattressBreadth}cm`
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
    } else if (isKidsHamper) {
      // Add all selected kids hamper items
      const kidsProducts = [
        { id: "mattress", name: "Mattress", price: 599, image: product.images[0] },
        { id: "pillows", name: "Pillows", price: 199, image: product.images[1] },
        { id: "bed-sheets", name: "Bed Sheets", price: 0, image: product.images[2] }, // Complimentary
      ]
      
      // Always include bed sheets (complimentary)
      const itemsToAdd = [...kidsHamperItems, "bed-sheets"]
      
      itemsToAdd.forEach((itemId) => {
        const product = kidsProducts.find(p => p.id === itemId)
        if (product) {
          let sizeInfo = "Standard"
          let fabricInfo = ""
          
          if (itemId === "mattress") {
            sizeInfo = kidsMattressLength && kidsMattressBreadth
              ? `${kidsMattressLength}in x ${kidsMattressBreadth}in x ${kidsMattressHeight || "8"}in`
              : standardKidsMattressLength && standardKidsMattressBreadth
              ? `${standardKidsMattressLength}in x ${standardKidsMattressBreadth}in x ${standardKidsMattressHeight || "8"}in`
              : "Standard"
            fabricInfo = kidsMattressFabric ? ` - ${kidsMattressFabric}` : ""
          } else if (itemId === "pillows") {
            sizeInfo = kidsPillowsLength && kidsPillowsBreadth
              ? `${kidsPillowsLength}in x ${kidsPillowsBreadth}in x ${kidsPillowsHeight || "4"}in`
              : standardKidsPillowsLength && standardKidsPillowsBreadth
              ? `${standardKidsPillowsLength}in x ${standardKidsPillowsBreadth}in x ${standardKidsPillowsHeight || "4"}in`
              : "Standard"
            fabricInfo = kidsPillowsFabric ? ` - ${kidsPillowsFabric}` : ""
          } else if (itemId === "bed-sheets") {
            sizeInfo = kidsBedSheetsLength && kidsBedSheetsBreadth
              ? `${kidsBedSheetsLength}in x ${kidsBedSheetsBreadth}in`
              : standardKidsBedSheetsLength && standardKidsBedSheetsBreadth
              ? `${standardKidsBedSheetsLength}in x ${standardKidsBedSheetsBreadth}in`
              : "Standard"
            fabricInfo = kidsBedSheetsFabric ? ` - ${kidsBedSheetsFabric}` : ""
          }
          
          const cartItem: CartItem = {
            id: `joy-kids-hamper-${product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            name: `JOY Kids ${product.name}`,
            image: product.image,
            size: `${sizeInfo}${fabricInfo}`,
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
        quantity: quantity,
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
      <main>
        {/* Fixed Breadcrumb - Only for Joy Products */}
        {isJoyProduct ? (
          <>
            <div className="fixed top-20 left-0 right-0 z-40 bg-white border-b" style={{ borderColor: "#D9CFC7" }}>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="py-2">
                  <ol className="flex items-center gap-2 text-base">
                    <li>
                      <Link href="/" className="text-foreground hover:text-[#6D4530] transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>
                      <ChevronRight className="w-4 h-4 text-foreground/50" />
                    </li>
                    <li>
                      <Link href="/category/joy" className="text-foreground hover:text-[#6D4530] transition-colors">
                        Joy
                      </Link>
                    </li>
                    <li>
                      <ChevronRight className="w-4 h-4 text-foreground/50" />
                    </li>
                    <li className="text-foreground font-medium">
                      {product.name}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            {/* Spacer to prevent content from going under fixed breadcrumb */}
            <div className="h-[49px]"></div>
          </>
        ) : (
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
        )}

        <div className={`max-w-7xl mx-auto px-4 ${isJoyProduct ? "pb-12 mt-8" : "py-12"}`}>
          <div>
            {/* Product Info */}
            <div>
              {(isBabyHamper || isKidsHamper || isIndividualBabyProduct) ? (
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

                  {/* Baby Hamper Custom Layout */}
                  {isBabyHamper && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Left Side - All Hamper Items */}
                        <div className="lg:col-span-3 space-y-6">
                      {/* Mattress Customization - For Baby Hamper */}
                      {hamperItems.includes("mattress") && (
                        <div className="mb-6 p-4">
                          <h3 className="text-2xl font-medium text-black mb-4">Mattress </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Product Image */}
                                  <div style={{ backgroundColor: colors.bg50 }}>
                                    <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                                      <Image
                                        src="/productmattress.jpg"
                                        alt="Mattress"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                      />
                                    </div>
                                    {/* Thumbnail Images */}
                                    <div className="grid grid-cols-3 gap-2">
                                      <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                        <Image
                                          src="/productmattress.jpg"
                                          alt="Mattress thumbnail 1"
                                          fill
                                          className="object-cover"
                                          unoptimized
                                        />
                                      </div>
                                      <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                        <Image
                                          src="/productmattress.jpg"
                                          alt="Mattress thumbnail 2"
                                          fill
                                          className="object-cover"
                                          unoptimized
                                        />
                                      </div>
                                      <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                        <Image
                                          src="/productmattress.jpg"
                                          alt="Mattress thumbnail 3"
                                          fill
                                          className="object-cover"
                                          unoptimized
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  {/* Customization Options */}
                                  <div>
                                    {/* Standard Dimensions Row */}
                                    <div className="mb-4">
                                      <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                                      <div className="grid grid-cols-3 gap-3">
                                        <div>
                                          <label className="block text-base text-black mb-2">Length</label>
                                          <Select value={standardLength} onValueChange={setStandardLength}>
                                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                              <SelectValue placeholder="Select length" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="48">48 inches</SelectItem>
                                              <SelectItem value="54">54 inches</SelectItem>
                                              <SelectItem value="72">72 inches</SelectItem>
                                              <SelectItem value="78">78 inches</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <label className="block text-base text-black mb-2">Breadth</label>
                                          <Select value={standardBreadth} onValueChange={setStandardBreadth}>
                                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                              <SelectValue placeholder="Select breadth" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="24">24 inches</SelectItem>
                                              <SelectItem value="28">28 inches</SelectItem>
                                              <SelectItem value="36">36 inches</SelectItem>
                                              <SelectItem value="39">39 inches</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <label className="block text-base text-black mb-2">Height</label>
                                          <Select value={standardHeight} onValueChange={setStandardHeight}>
                                            <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                              <SelectValue placeholder="Select height" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="4">4 inches</SelectItem>
                                              <SelectItem value="5">5 inches</SelectItem>
                                              <SelectItem value="6">6 inches</SelectItem>
                                              <SelectItem value="7">7 inches</SelectItem>
                                              <SelectItem value="8">8 inches</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <h4 className="text-2xl font-medium text-black mb-4"> Customization</h4>
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
                                        <div className="grid grid-cols-3 gap-3">
                                          <div>
                                            <label className="block text-base text-black mb-2">Length</label>
                                            <input
                                              type="number"
                                              value={mattressLength}
                                              onChange={(e) => setMattressLength(e.target.value)}
                                              placeholder="Enter length"
                                              className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-base text-black mb-2">Breadth</label>
                                            <input
                                              type="number"
                                              value={mattressBreadth}
                                              onChange={(e) => setMattressBreadth(e.target.value)}
                                              placeholder="Enter breadth"
                                              className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                            />
                                          </div>
                                          <div>
                                            <label className="block text-base text-black mb-2">Height</label>
                                            <input
                                              type="number"
                                              value={mattressHeight}
                                              onChange={(e) => setMattressHeight(e.target.value)}
                                              placeholder="Enter height"
                                              className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                        </div>
                      )}

                      {/* Other Items */}

                      {/* Topper Customization - For Baby Hamper */}
                      {hamperItems.includes("topper") && (
                        <div className="mb-6 p-4">
                          <h3 className="text-2xl font-medium text-black mb-4">Topper </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Image */}
                            <div style={{ backgroundColor: colors.bg50 }}>
                              <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                                <Image
                                  src="/topper.jpg"
                                  alt="Topper"
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                              {/* Thumbnail Images */}
                              <div className="grid grid-cols-3 gap-2">
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/topper.jpg"
                                    alt="Topper thumbnail 1"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/topper.jpg"
                                    alt="Topper thumbnail 2"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/topper.jpg"
                                    alt="Topper thumbnail 3"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Customization Options */}
                            <div>
                              {/* Standard Dimensions Row */}
                              <div className="mb-4">
                                <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                                <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-base text-black mb-2">Length</label>
                                <Select value={standardTopperLength} onValueChange={setStandardTopperLength}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select length" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="39">39 inches</SelectItem>
                                    <SelectItem value="47">47 inches</SelectItem>
                                    <SelectItem value="59">59 inches</SelectItem>
                                    <SelectItem value="71">71 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Breadth</label>
                                <Select value={standardTopperBreadth} onValueChange={setStandardTopperBreadth}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select breadth" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="20">20 inches</SelectItem>
                                    <SelectItem value="24">24 inches</SelectItem>
                                    <SelectItem value="30">30 inches</SelectItem>
                                    <SelectItem value="35">35 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Height</label>
                                <Select value={standardTopperHeight} onValueChange={setStandardTopperHeight}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select height" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="2">2 inches</SelectItem>
                                    <SelectItem value="3">3 inches</SelectItem>
                                    <SelectItem value="4">4 inches</SelectItem>
                                    <SelectItem value="5">5 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-2xl font-medium text-black mb-4"> Customization</h4>
                          <div className="space-y-4">
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
                            <div>
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-base text-black mb-2">Length</label>
                                  <input
                                    type="number"
                                    value={topperLength}
                                    onChange={(e) => setTopperLength(e.target.value)}
                                    placeholder="Enter length"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Breadth</label>
                                  <input
                                    type="number"
                                    value={topperBreadth}
                                    onChange={(e) => setTopperBreadth(e.target.value)}
                                    placeholder="Enter breadth"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Height</label>
                                  <input
                                    type="number"
                                    value={topperHeight}
                                    onChange={(e) => setTopperHeight(e.target.value)}
                                    placeholder="Enter height"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Lounger Customization - For Baby Hamper */}
                      {hamperItems.includes("lounger") && (
                        <div className="mb-6 p-4">
                          <h3 className="text-2xl font-medium text-black mb-4">Lounger</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Image */}
                            <div style={{ backgroundColor: colors.bg50 }}>
                              <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                                <Image
                                  src="/lounger.jpg"
                                  alt="Lounger"
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                              {/* Thumbnail Images */}
                              <div className="grid grid-cols-3 gap-2">
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/lounger.jpg"
                                    alt="Lounger thumbnail 1"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/lounger.jpg"
                                    alt="Lounger thumbnail 2"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/lounger.jpg"
                                    alt="Lounger thumbnail 3"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Customization Options */}
                            <div>
                              {/* Standard Dimensions Row */}
                              <div className="mb-4">
                                <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                                <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-base text-black mb-2">Length</label>
                                <Select value={standardLoungerLength} onValueChange={setStandardLoungerLength}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select length" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="31">31 inches</SelectItem>
                                    <SelectItem value="39">39 inches</SelectItem>
                                    <SelectItem value="47">47 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Breadth</label>
                                <Select value={standardLoungerBreadth} onValueChange={setStandardLoungerBreadth}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select breadth" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="16">16 inches</SelectItem>
                                    <SelectItem value="20">20 inches</SelectItem>
                                    <SelectItem value="24">24 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Height</label>
                                <Select value={standardLoungerHeight} onValueChange={setStandardLoungerHeight}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select height" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="3">3 inches</SelectItem>
                                    <SelectItem value="4">4 inches</SelectItem>
                                    <SelectItem value="5">5 inches</SelectItem>
                                    <SelectItem value="6">6 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-2xl font-medium text-black mb-4"> Customization</h4>
                          <div className="space-y-4">
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
                            <div>
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-base text-black mb-2">Length</label>
                                  <input
                                    type="number"
                                    value={loungerLength}
                                    onChange={(e) => setLoungerLength(e.target.value)}
                                    placeholder="Enter length"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Breadth</label>
                                  <input
                                    type="number"
                                    value={loungerBreadth}
                                    onChange={(e) => setLoungerBreadth(e.target.value)}
                                    placeholder="Enter breadth"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Height</label>
                                  <input
                                    type="number"
                                    value={loungerHeight}
                                    onChange={(e) => setLoungerHeight(e.target.value)}
                                    placeholder="Enter height"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Head Pillow Customization - For Baby Hamper */}
                      {hamperItems.includes("head-pillow") && (
                        <div className="mb-6 p-4">
                          <h3 className="text-2xl font-medium text-black mb-4">Head Pillow </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Image */}
                            <div style={{ backgroundColor: colors.bg50 }}>
                              <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                                <Image
                                  src="/pillow.jpg"
                                  alt="Head Pillow"
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                              {/* Thumbnail Images */}
                              <div className="grid grid-cols-3 gap-2">
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/pillow.jpg"
                                    alt="Head Pillow thumbnail 1"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/pillow.jpg"
                                    alt="Head Pillow thumbnail 2"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/pillow.jpg"
                                    alt="Head Pillow thumbnail 3"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Customization Options */}
                            <div>
                              {/* Standard Dimensions Row */}
                              <div className="mb-4">
                                <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                                <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-base text-black mb-2">Length</label>
                                <Select value={standardPillowLength} onValueChange={setStandardPillowLength}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select length" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="12">12 inches</SelectItem>
                                    <SelectItem value="14">14 inches</SelectItem>
                                    <SelectItem value="16">16 inches</SelectItem>
                                    <SelectItem value="18">18 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Breadth</label>
                                <Select value={standardPillowBreadth} onValueChange={setStandardPillowBreadth}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select breadth" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="8">8 inches</SelectItem>
                                    <SelectItem value="10">10 inches</SelectItem>
                                    <SelectItem value="12">12 inches</SelectItem>
                                    <SelectItem value="14">14 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Height</label>
                                <Select value={standardPillowHeight} onValueChange={setStandardPillowHeight}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select height" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="2">2 inches</SelectItem>
                                    <SelectItem value="3">3 inches</SelectItem>
                                    <SelectItem value="4">4 inches</SelectItem>
                                    <SelectItem value="5">5 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-2xl font-medium text-black mb-4"> Customization</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-lg text-black mb-2">Fabric</label>
                              <Select value={pillowFabric} onValueChange={setPillowFabric}>
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
                            <div>
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-base text-black mb-2">Length</label>
                                  <input
                                    type="number"
                                    value={pillowLength}
                                    onChange={(e) => setPillowLength(e.target.value)}
                                    placeholder="Enter length"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Breadth</label>
                                  <input
                                    type="number"
                                    value={pillowBreadth}
                                    onChange={(e) => setPillowBreadth(e.target.value)}
                                    placeholder="Enter breadth"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Height</label>
                                  <input
                                    type="number"
                                    value={pillowHeight}
                                    onChange={(e) => setPillowHeight(e.target.value)}
                                    placeholder="Enter height"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Pillow Bumpers Customization - For Baby Hamper */}
                      {hamperItems.includes("pillow-bumpers") && (
                        <div className="mb-6 p-4">
                          <h3 className="text-2xl font-medium text-black mb-4">Pillow Bumpers</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Image */}
                            <div style={{ backgroundColor: colors.bg50 }}>
                              <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                                <Image
                                  src="/bumpers.jpg"
                                  alt="Pillow Bumpers"
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                              {/* Thumbnail Images */}
                              <div className="grid grid-cols-3 gap-2">
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/bumpers.jpg"
                                    alt="Pillow Bumpers thumbnail 1"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/bumpers.jpg"
                                    alt="Pillow Bumpers thumbnail 2"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                                <div className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                  <Image
                                    src="/bumpers.jpg"
                                    alt="Pillow Bumpers thumbnail 3"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Customization Options */}
                            <div>
                              {/* Standard Dimensions Row */}
                              <div className="mb-4">
                                <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                                <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-base text-black mb-2">Length</label>
                                <Select value={standardBumperLength} onValueChange={setStandardBumperLength}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select length" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="48">48 inches</SelectItem>
                                    <SelectItem value="54">54 inches</SelectItem>
                                    <SelectItem value="60">60 inches</SelectItem>
                                    <SelectItem value="72">72 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Breadth</label>
                                <Select value={standardBumperBreadth} onValueChange={setStandardBumperBreadth}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select breadth" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="6">6 inches</SelectItem>
                                    <SelectItem value="8">8 inches</SelectItem>
                                    <SelectItem value="10">10 inches</SelectItem>
                                    <SelectItem value="12">12 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Height</label>
                                <Select value={standardBumperHeight} onValueChange={setStandardBumperHeight}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select height" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="4">4 inches</SelectItem>
                                    <SelectItem value="5">5 inches</SelectItem>
                                    <SelectItem value="6">6 inches</SelectItem>
                                    <SelectItem value="8">8 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-2xl font-medium text-black mb-4"> Customization</h4>
                          <div className="space-y-4">
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
                            <div>
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-base text-black mb-2">Length</label>
                                  <input
                                    type="number"
                                    value={bumperLength}
                                    onChange={(e) => setBumperLength(e.target.value)}
                                    placeholder="Enter length"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Breadth</label>
                                  <input
                                    type="number"
                                    value={bumperBreadth}
                                    onChange={(e) => setBumperBreadth(e.target.value)}
                                    placeholder="Enter breadth"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Height</label>
                                  <input
                                    type="number"
                                    value={bumperHeight}
                                    onChange={(e) => setBumperHeight(e.target.value)}
                                    placeholder="Enter height"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                            </div>
                          </div>
                        </div>
                      )}

                        </div>

                        {/* Right Side - Hamper Includes Sidebar (Fixed until Pillow Bumpers) */}
                        <div className="lg:col-span-1">
                          <div className="sticky top-32 border border-[#EED9C4] p-5 rounded-lg bg-[#EED9C4]/10">
                            <h3 className="text-xl font-semibold text-black mb-4">Hamper Includes:</h3>
                            <div className="flex flex-col gap-3 mb-5">
                              {[
                                { id: "mattress", label: "Mattress" },
                                { id: "topper", label: "Topper" },
                                { id: "lounger", label: "Lounger" },
                                { id: "head-pillow", label: "Head Pillow" },
                                { id: "pillow-bumpers", label: "Pillow Bumpers" },
                              ].map((item) => (
                                <div key={item.id} className="flex items-center gap-2 py-1.5">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      id={item.id}
                                      checked={hamperItems.includes(item.id)}
                                      onChange={() => toggleHamperItem(item.id)}
                                      className="w-4 h-4 border-gray-300 rounded bg-gray-100 appearance-none checked:bg-gray-500 checked:border-gray-500 cursor-pointer"
                                    />
                                    {hamperItems.includes(item.id) && (
                                      <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white pointer-events-none" />
                                    )}
                                  </div>
                                  <label htmlFor={item.id} className="text-sm font-medium text-black cursor-pointer flex-1">
                                    {item.label}
                                  </label>
                                </div>
                              ))}
                            </div>

                            {/* Price */}
                            <div className="mb-4 pb-4 border-b" style={{ borderColor: colors.border }}>
                              <div className="flex items-center gap-1 text-black">
                                <IndianRupee className="w-5 h-5 text-black" />
                                <span className="text-xl font-normal">
                                  {currentPrice.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-4">
                              <label className="block mb-2 text-sm text-black font-cormorant font-normal">
                                Quantity
                              </label>
                              <div className="inline-flex items-center border rounded" style={{ borderColor: colors.border }}>
                                <button
                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                  className="px-3 py-2 hover:opacity-70 transition-opacity text-black text-base font-cormorant font-normal"
                                  style={{
                                    borderRight: `1px solid ${colors.border}`,
                                  }}
                                >
                                  -
                                </button>
                                <span className="px-5 py-2 text-black text-base min-w-[55px] text-center font-cormorant font-normal">{quantity}</span>
                                <button
                                  onClick={() => setQuantity(quantity + 1)}
                                  className="px-3 py-2 hover:opacity-70 transition-opacity text-black text-base font-cormorant font-normal"
                                  style={{
                                    borderLeft: `1px solid ${colors.border}`,
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Add to Cart */}
                            <button
                              onClick={handleAddToCart}
                              disabled={isAddingToCart}
                              className="w-full py-3 text-black text-base font-medium hover:opacity-90 transition-opacity mb-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                              style={{ backgroundColor: "#EED9C4" }}
                            >
                              {isAddingToCart ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Adding to Cart...
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-4 h-4" />
                                  Add to Cart -{" "}
                                  <div className="flex items-center gap-1">
                                    <IndianRupee className="w-3 h-3" />
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
                            <p className="text-center text-xs text-black">
                              Free shipping on all orders
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bed Spread Section - After All Items */}
                      <div className="mb-6 p-4 mt-6">
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
                    </>
                  )}

                  {/* Kids Hamper Custom Layout */}
                  {isKidsHamper && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Left Side - All Kids Hamper Items */}
                        <div className="lg:col-span-3 space-y-6">
                          {/* Mattress Customization - For Kids Hamper */}
                          {kidsHamperItems.includes("mattress") && (
                            <div className="mb-6 p-4">
                              <h3 className="text-2xl font-medium text-black mb-4">Mattress</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Image */}
                                <div style={{ backgroundColor: colors.bg50 }}>
                                  <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                                    <Image
                                      src={product.images[0]}
                                      alt="Mattress"
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  </div>
                                  {/* Thumbnail Images */}
                                  <div className="grid grid-cols-3 gap-2">
                                    {[0, 1, 2].map((index) => (
                                      <div key={index} className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                        <Image
                                          src={product.images[index] || product.images[0]}
                                          alt={`Mattress thumbnail ${index + 1}`}
                                          fill
                                          className="object-cover"
                                          unoptimized
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                {/* Customization Options */}
                                <div>
                                  {/* Standard Dimensions Row */}
                                  <div className="mb-4">
                                    <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                      <div>
                                        <label className="block text-base text-black mb-2">Length</label>
                                        <Select value={standardKidsMattressLength} onValueChange={setStandardKidsMattressLength}>
                                          <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                            <SelectValue placeholder="Select length" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="54">54 inches</SelectItem>
                                            <SelectItem value="60">60 inches</SelectItem>
                                            <SelectItem value="72">72 inches</SelectItem>
                                            <SelectItem value="78">78 inches</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <label className="block text-base text-black mb-2">Breadth</label>
                                        <Select value={standardKidsMattressBreadth} onValueChange={setStandardKidsMattressBreadth}>
                                          <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                            <SelectValue placeholder="Select breadth" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="30">30 inches</SelectItem>
                                            <SelectItem value="36">36 inches</SelectItem>
                                            <SelectItem value="39">39 inches</SelectItem>
                                            <SelectItem value="42">42 inches</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <label className="block text-base text-black mb-2">Height</label>
                                        <Select value={standardKidsMattressHeight} onValueChange={setStandardKidsMattressHeight}>
                                          <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                            <SelectValue placeholder="Select height" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="6">6 inches</SelectItem>
                                            <SelectItem value="8">8 inches</SelectItem>
                                            <SelectItem value="10">10 inches</SelectItem>
                                            <SelectItem value="12">12 inches</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <h4 className="text-2xl font-medium text-black mb-4">Customization</h4>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-lg text-black mb-2">Fabric</label>
                                      <Select value={kidsMattressFabric} onValueChange={setKidsMattressFabric}>
                                        <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                          <SelectValue placeholder="Select fabric" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="organic-cotton">Organic Cotton</SelectItem>
                                          <SelectItem value="bamboo">Bamboo</SelectItem>
                                          <SelectItem value="cotton-blend">Cotton Blend</SelectItem>
                                          <SelectItem value="linen">Linen</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <div className="grid grid-cols-3 gap-3">
                                        <div>
                                          <label className="block text-base text-black mb-2">Length</label>
                                          <input
                                            type="number"
                                            value={kidsMattressLength}
                                            onChange={(e) => setKidsMattressLength(e.target.value)}
                                            placeholder="Enter length"
                                            className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-base text-black mb-2">Breadth</label>
                                          <input
                                            type="number"
                                            value={kidsMattressBreadth}
                                            onChange={(e) => setKidsMattressBreadth(e.target.value)}
                                            placeholder="Enter breadth"
                                            className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-base text-black mb-2">Height</label>
                                          <input
                                            type="number"
                                            value={kidsMattressHeight}
                                            onChange={(e) => setKidsMattressHeight(e.target.value)}
                                            placeholder="Enter height"
                                            className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Pillows Customization - For Kids Hamper */}
                          {kidsHamperItems.includes("pillows") && (
                            <div className="mb-6 p-4">
                              <h3 className="text-2xl font-medium text-black mb-4">Pillows</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Image */}
                                <div style={{ backgroundColor: colors.bg50 }}>
                                  <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                                    <Image
                                      src={product.images[1] || product.images[0]}
                                      alt="Pillows"
                                      fill
                                      className="object-cover"
                                      unoptimized
                                    />
                                  </div>
                                  {/* Thumbnail Images */}
                                  <div className="grid grid-cols-3 gap-2">
                                    {[1, 2, 3].map((index) => (
                                      <div key={index} className="relative w-full aspect-square overflow-hidden border border-[#EED9C4]">
                                        <Image
                                          src={product.images[index] || product.images[1] || product.images[0]}
                                          alt={`Pillows thumbnail ${index}`}
                                          fill
                                          className="object-cover"
                                          unoptimized
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                {/* Customization Options */}
                                <div>
                                  {/* Standard Dimensions Row */}
                                  <div className="mb-4">
                                    <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                      <div>
                                        <label className="block text-base text-black mb-2">Length</label>
                                        <Select value={standardKidsPillowsLength} onValueChange={setStandardKidsPillowsLength}>
                                          <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                            <SelectValue placeholder="Select length" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="20">20 inches</SelectItem>
                                            <SelectItem value="24">24 inches</SelectItem>
                                            <SelectItem value="26">26 inches</SelectItem>
                                            <SelectItem value="30">30 inches</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <label className="block text-base text-black mb-2">Breadth</label>
                                        <Select value={standardKidsPillowsBreadth} onValueChange={setStandardKidsPillowsBreadth}>
                                          <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                            <SelectValue placeholder="Select breadth" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="16">16 inches</SelectItem>
                                            <SelectItem value="20">20 inches</SelectItem>
                                            <SelectItem value="22">22 inches</SelectItem>
                                            <SelectItem value="24">24 inches</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <label className="block text-base text-black mb-2">Height</label>
                                        <Select value={standardKidsPillowsHeight} onValueChange={setStandardKidsPillowsHeight}>
                                          <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                            <SelectValue placeholder="Select height" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="4">4 inches</SelectItem>
                                            <SelectItem value="5">5 inches</SelectItem>
                                            <SelectItem value="6">6 inches</SelectItem>
                                            <SelectItem value="8">8 inches</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <h4 className="text-2xl font-medium text-black mb-4">Customization</h4>
                                  <div className="space-y-4">
                                    <div>
                                      <label className="block text-lg text-black mb-2">Fabric</label>
                                      <Select value={kidsPillowsFabric} onValueChange={setKidsPillowsFabric}>
                                        <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                          <SelectValue placeholder="Select fabric" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="organic-cotton">Organic Cotton</SelectItem>
                                          <SelectItem value="bamboo">Bamboo</SelectItem>
                                          <SelectItem value="cotton-blend">Cotton Blend</SelectItem>
                                          <SelectItem value="silk">Silk</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <div className="grid grid-cols-3 gap-3">
                                        <div>
                                          <label className="block text-base text-black mb-2">Length</label>
                                          <input
                                            type="number"
                                            value={kidsPillowsLength}
                                            onChange={(e) => setKidsPillowsLength(e.target.value)}
                                            placeholder="Enter length"
                                            className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-base text-black mb-2">Breadth</label>
                                          <input
                                            type="number"
                                            value={kidsPillowsBreadth}
                                            onChange={(e) => setKidsPillowsBreadth(e.target.value)}
                                            placeholder="Enter breadth"
                                            className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                          />
                                        </div>
                                        <div>
                                          <label className="block text-base text-black mb-2">Height</label>
                                          <input
                                            type="number"
                                            value={kidsPillowsHeight}
                                            onChange={(e) => setKidsPillowsHeight(e.target.value)}
                                            placeholder="Enter height"
                                            className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                        </div>

                        {/* Right Side - Kids Hamper Includes Sidebar */}
                        <div className="lg:col-span-1">
                          <div className="sticky top-32 border border-[#EED9C4] p-5 rounded-lg bg-[#EED9C4]/10">
                            <h3 className="text-xl font-semibold text-black mb-4">Hamper Includes:</h3>
                            <div className="flex flex-col gap-3 mb-5">
                              {[
                                { id: "mattress", label: "Mattress" },
                                { id: "pillows", label: "Pillows" },
                              ].map((item) => (
                                <div key={item.id} className="flex items-center gap-2 py-1.5">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      id={`kids-${item.id}`}
                                      checked={kidsHamperItems.includes(item.id)}
                                      onChange={() => toggleKidsHamperItem(item.id)}
                                      className="w-4 h-4 border-gray-300 rounded bg-gray-100 appearance-none checked:bg-gray-500 checked:border-gray-500 cursor-pointer"
                                    />
                                    {kidsHamperItems.includes(item.id) && (
                                      <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white pointer-events-none" />
                                    )}
                                  </div>
                                  <label htmlFor={`kids-${item.id}`} className="text-sm font-medium text-black cursor-pointer flex-1">
                                    {item.label}
                                  </label>
                                </div>
                              ))}
                              {/* Bed Sheets - Always included, complimentary */}
                              <div className="flex items-center gap-2 py-1.5">
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    id="kids-bed-sheets"
                                    checked={true}
                                    disabled
                                    className="w-4 h-4 border-gray-300 rounded bg-gray-100 appearance-none checked:bg-gray-500 checked:border-gray-500 cursor-not-allowed opacity-60"
                                  />
                                  <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 text-white pointer-events-none" />
                                </div>
                                <label htmlFor="kids-bed-sheets" className="text-sm font-medium text-black flex-1">
                                  Bed Sheets <span className="text-xs text-green-600">(Complimentary)</span>
                                </label>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="mb-4 pb-4 border-b" style={{ borderColor: colors.border }}>
                              <div className="flex items-center gap-1 text-black">
                                <IndianRupee className="w-5 h-5 text-black" />
                                <span className="text-xl font-normal">
                                  {currentPrice.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              </div>
                            </div>

                            {/* Quantity */}
                            <div className="mb-4">
                              <label className="block mb-2 text-sm text-black font-cormorant font-normal">
                                Quantity
                              </label>
                              <div className="inline-flex items-center border rounded" style={{ borderColor: colors.border }}>
                                <button
                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                  className="px-3 py-2 hover:opacity-70 transition-opacity text-black text-base font-cormorant font-normal"
                                  style={{
                                    borderRight: `1px solid ${colors.border}`,
                                  }}
                                >
                                  -
                                </button>
                                <span className="px-5 py-2 text-black text-base min-w-[55px] text-center font-cormorant font-normal">{quantity}</span>
                                <button
                                  onClick={() => setQuantity(quantity + 1)}
                                  className="px-3 py-2 hover:opacity-70 transition-opacity text-black text-base font-cormorant font-normal"
                                  style={{
                                    borderLeft: `1px solid ${colors.border}`,
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Add to Cart */}
                            <button
                              onClick={handleAddToCart}
                              disabled={isAddingToCart}
                              className="w-full py-3 text-black text-base font-medium hover:opacity-90 transition-opacity mb-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                              style={{ backgroundColor: "#EED9C4" }}
                            >
                              {isAddingToCart ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  Adding to Cart...
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-4 h-4" />
                                  Add to Cart -{" "}
                                  <div className="flex items-center gap-1">
                                    <IndianRupee className="w-3 h-3" />
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
                            <p className="text-center text-xs text-black">
                              Free shipping on all orders
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bed Sheets Section - After All Items (Complimentary) */}
                      <div className="mb-6 p-4 mt-6">
                        <h3 className="text-2xl font-semibold text-black mb-2">
                          Bed Sheets <span className="text-lg font-normal text-foreground">(Complimentary with purchase)</span>
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-lg text-black mb-2">Fabric</label>
                            <Select value={kidsBedSheetsFabric} onValueChange={setKidsBedSheetsFabric}>
                              <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                <SelectValue placeholder="Select fabric" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="organic-cotton">Organic Cotton</SelectItem>
                                <SelectItem value="bamboo">Bamboo</SelectItem>
                                <SelectItem value="cotton-blend">Cotton Blend</SelectItem>
                                <SelectItem value="linen">Linen</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="bg-[#EED9C4]/30 p-3 rounded border border-[#EED9C4]/50">
                            <p className="text-foreground/70 text-sm flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-600" />
                              Included at no additional cost
                            </p>
                          </div>
                          <p className="text-foreground">Complimentary bed sheets included with your purchase.</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Mattress Customization - Individual Product */}
                  {productId === 7 && (
                    <div className="mb-6 p-4">
                      <h3 className="text-2xl font-medium text-black mb-4">Mattress</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Image */}
                        <div style={{ backgroundColor: colors.bg50 }}>
                          <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                            <Image
                              src={currentImages[selectedImage] || currentImages[0]}
                              alt="Mattress"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          {/* Thumbnail Images */}
                          {currentImages.length > 1 && (
                            <div className="grid grid-cols-3 gap-2">
                              {currentImages.slice(0, 3).map((image, index) => (
                                <div
                                  key={index}
                                  onClick={() => setSelectedImage(index)}
                                  className="relative w-full aspect-square overflow-hidden border border-[#EED9C4] cursor-pointer"
                                >
                                  <Image
                                    src={image}
                                    alt={`Mattress thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Customization Options */}
                        <div>
                          {/* Standard Dimensions Row */}
                          <div className="mb-4">
                            <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-base text-black mb-2">Length</label>
                                <Select value={standardLength} onValueChange={setStandardLength}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select length" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="48">48 inches</SelectItem>
                                    <SelectItem value="54">54 inches</SelectItem>
                                    <SelectItem value="72">72 inches</SelectItem>
                                    <SelectItem value="78">78 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Breadth</label>
                                <Select value={standardBreadth} onValueChange={setStandardBreadth}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select breadth" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="24">24 inches</SelectItem>
                                    <SelectItem value="28">28 inches</SelectItem>
                                    <SelectItem value="36">36 inches</SelectItem>
                                    <SelectItem value="39">39 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Height</label>
                                <Select value={standardHeight} onValueChange={setStandardHeight}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select height" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="4">4 inches</SelectItem>
                                    <SelectItem value="5">5 inches</SelectItem>
                                    <SelectItem value="6">6 inches</SelectItem>
                                    <SelectItem value="7">7 inches</SelectItem>
                                    <SelectItem value="8">8 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-2xl font-medium text-black mb-4"> Customization</h4>
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
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-base text-black mb-2">Length</label>
                                  <input
                                    type="number"
                                    value={mattressLength}
                                    onChange={(e) => setMattressLength(e.target.value)}
                                    placeholder="Enter length"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Breadth</label>
                                  <input
                                    type="number"
                                    value={mattressBreadth}
                                    onChange={(e) => setMattressBreadth(e.target.value)}
                                    placeholder="Enter breadth"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Height</label>
                                  <input
                                    type="number"
                                    value={mattressHeight}
                                    onChange={(e) => setMattressHeight(e.target.value)}
                                    placeholder="Enter height"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Price and Quantity */}
                            <div className="mt-6 pt-6 border-t" style={{ borderColor: "#EED9C4" }}>
                              <h3 className="text-2xl font-medium text-black mb-2">Price</h3>
                              <div className="flex items-center gap-1 text-black mb-4">
                                <IndianRupee className="w-6 h-6" />
                                <span className="text-3xl font-normal">
                                  {basePrice.toLocaleString("en-IN", {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </span>
                              </div>
                              <p className="text-base text-black/70 mb-4">(inclusive of all taxes)</p>
                              
                              {/* Quantity */}
                              <label className="block mb-3 text-lg text-black font-cormorant font-normal">
                                Quantity
                              </label>
                              <div className="inline-flex items-center border rounded mb-6" style={{ borderColor: "#EED9C4" }}>
                                <button
                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                  className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                                  style={{
                                    borderRight: "1px solid #EED9C4",
                                  }}
                                >
                                  -
                                </button>
                                <span className="px-6 py-2 text-black text-lg min-w-[60px] text-center font-cormorant font-normal">{quantity}</span>
                                <button
                                  onClick={() => setQuantity(quantity + 1)}
                                  className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                                  style={{
                                    borderLeft: "1px solid #EED9C4",
                                  }}
                                >
                                  +
                                </button>
                              </div>

                              {/* Color Selector */}
                              <div className="mb-6">
                                <label className="block text-lg font-medium text-black mb-3">
                                  Color
                                </label>
                                <div className="flex flex-wrap gap-3">
                                  {colorOptions.map((color) => (
                                    <button
                                      key={color.name}
                                      onClick={() => {
                                        setSelectedColor(color.name)
                                        setSelectedImage(0)
                                      }}
                                      className={`w-8 h-8 rounded border-2 transition-all duration-300 ${
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

                              {/* Add to Cart */}
                              {isSoldOut ? (
                                <div className="mb-6">
                                  <div className="text-center mb-4">
                                    <p className="text-lg font-medium text-black mb-2">Sold Out</p>
                                    <p className="text-sm text-black/70">We'll notify you when this product is back in stock</p>
                                  </div>
                                  {!isNotifySubmitted ? (
                                    <div className="space-y-3">
                                      <input
                                        type="email"
                                        value={notifyEmail}
                                        onChange={(e) => setNotifyEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 border rounded text-black"
                                        style={{ borderColor: "#EED9C4" }}
                                      />
                                      <button
                                        onClick={() => {
                                          if (notifyEmail) {
                                            setIsNotifySubmitted(true)
                                          }
                                        }}
                                        className="w-full py-2 text-black font-medium hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: "#EED9C4" }}
                                      >
                                        Notify Me
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <p className="text-sm text-green-600">We'll notify you when this product is available!</p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <button
                                  onClick={handleAddToCart}
                                  disabled={isAddingToCart}
                                  className="w-full py-3 text-black text-xl font-medium hover:opacity-90 transition-opacity mb-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                  style={{ backgroundColor: "#EED9C4" }}
                                >
                                  {isAddingToCart ? (
                                    <>
                                      <Loader2 className="w-6 h-6 animate-spin" />
                                      Customizing...
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="w-6 h-6" />
                                      Add to Cart
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Topper Customization */}
                  {productId === 8 && (
                    <div className="mb-6 p-4">
                      <h3 className="text-2xl font-medium text-black mb-4">Topper</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Image */}
                        <div style={{ backgroundColor: colors.bg50 }}>
                          <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                            <Image
                              src={currentImages[selectedImage] || currentImages[0]}
                              alt="Topper"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          {/* Thumbnail Images */}
                          {currentImages.length > 1 && (
                            <div className="grid grid-cols-3 gap-2">
                              {currentImages.slice(0, 3).map((image, index) => (
                                <div
                                  key={index}
                                  onClick={() => setSelectedImage(index)}
                                  className="relative w-full aspect-square overflow-hidden border border-[#EED9C4] cursor-pointer"
                                >
                                  <Image
                                    src={image}
                                    alt={`Topper thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Customization Options */}
                        <div>
                          {/* Standard Dimensions Row */}
                          <div className="mb-4">
                            <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-base text-black mb-2">Length</label>
                                <Select value={standardTopperLength} onValueChange={setStandardTopperLength}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select length" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="39">39 inches</SelectItem>
                                    <SelectItem value="47">47 inches</SelectItem>
                                    <SelectItem value="59">59 inches</SelectItem>
                                    <SelectItem value="71">71 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Breadth</label>
                                <Select value={standardTopperBreadth} onValueChange={setStandardTopperBreadth}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select breadth" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="20">20 inches</SelectItem>
                                    <SelectItem value="24">24 inches</SelectItem>
                                    <SelectItem value="30">30 inches</SelectItem>
                                    <SelectItem value="35">35 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Height</label>
                                <Select value={standardTopperHeight} onValueChange={setStandardTopperHeight}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select height" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="2">2 inches</SelectItem>
                                    <SelectItem value="3">3 inches</SelectItem>
                                    <SelectItem value="4">4 inches</SelectItem>
                                    <SelectItem value="5">5 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-2xl font-medium text-black mb-4"> Customization</h4>
                          <div className="space-y-4">
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
                            <div>
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-base text-black mb-2">Length</label>
                                  <input
                                    type="number"
                                    value={topperLength}
                                    onChange={(e) => setTopperLength(e.target.value)}
                                    placeholder="Enter length"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Breadth</label>
                                  <input
                                    type="number"
                                    value={topperBreadth}
                                    onChange={(e) => setTopperBreadth(e.target.value)}
                                    placeholder="Enter breadth"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Height</label>
                                  <input
                                    type="number"
                                    value={topperHeight}
                                    onChange={(e) => setTopperHeight(e.target.value)}
                                    placeholder="Enter height"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Price and Quantity */}
                          <div className="mt-6 pt-6 border-t" style={{ borderColor: "#EED9C4" }}>
                            <h3 className="text-2xl font-medium text-black mb-2">Price</h3>
                            <div className="flex items-center gap-1 text-black mb-4">
                              <IndianRupee className="w-6 h-6" />
                              <span className="text-3xl font-normal">
                                {basePrice.toLocaleString("en-IN", {
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0,
                                })}
                              </span>
                            </div>
                            <p className="text-base text-black/70 mb-4">(inclusive of all taxes)</p>
                            
                            {/* Quantity */}
                            <label className="block mb-3 text-lg text-black font-cormorant font-normal">
                              Quantity
                            </label>
                            <div className="inline-flex items-center border rounded mb-6" style={{ borderColor: "#EED9C4" }}>
                              <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                                style={{
                                  borderRight: "1px solid #EED9C4",
                                }}
                              >
                                -
                              </button>
                              <span className="px-6 py-2 text-black text-lg min-w-[60px] text-center font-cormorant font-normal">{quantity}</span>
                              <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                                style={{
                                  borderLeft: "1px solid #EED9C4",
                                }}
                              >
                                +
                              </button>
                            </div>

                            {/* Color Selector */}
                            <div className="mb-6">
                              <label className="block text-lg font-medium text-black mb-3">
                                Color
                              </label>
                              <div className="flex flex-wrap gap-3">
                                {colorOptions.map((color) => (
                                  <button
                                    key={color.name}
                                    onClick={() => {
                                      setSelectedColor(color.name)
                                      setSelectedImage(0)
                                    }}
                                    className={`w-8 h-8 rounded border-2 transition-all duration-300 ${
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

                            {/* Add to Cart */}
                            {isSoldOut ? (
                              <div className="mb-6">
                                <div className="text-center mb-4">
                                  <p className="text-lg font-medium text-black mb-2">Sold Out</p>
                                  <p className="text-sm text-black/70">We'll notify you when this product is back in stock</p>
                                </div>
                                {!isNotifySubmitted ? (
                                  <div className="space-y-3">
                                    <input
                                      type="email"
                                      value={notifyEmail}
                                      onChange={(e) => setNotifyEmail(e.target.value)}
                                      placeholder="Enter your email"
                                      className="w-full px-4 py-2 border rounded text-black"
                                      style={{ borderColor: "#EED9C4" }}
                                    />
                                    <button
                                      onClick={() => {
                                        if (notifyEmail) {
                                          setIsNotifySubmitted(true)
                                        }
                                      }}
                                      className="w-full py-2 text-black font-medium hover:opacity-90 transition-opacity"
                                      style={{ backgroundColor: "#EED9C4" }}
                                    >
                                      Notify Me
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <p className="text-sm text-green-600">We'll notify you when this product is available!</p>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className="w-full py-3 text-black text-xl font-medium hover:opacity-90 transition-opacity mb-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                style={{ backgroundColor: "#EED9C4" }}
                              >
                                {isAddingToCart ? (
                                  <>
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                    Customizing...
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart className="w-6 h-6" />
                                    Add to Cart
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Lounger Customization */}
                  {productId === 9 && (
                    <div className="mb-6 p-4">
                      <h3 className="text-2xl font-medium text-black mb-4">Lounger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Image */}
                        <div style={{ backgroundColor: colors.bg50 }}>
                          <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                            <Image
                              src={currentImages[selectedImage] || currentImages[0]}
                              alt="Lounger"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          {/* Thumbnail Images */}
                          {currentImages.length > 1 && (
                            <div className="grid grid-cols-3 gap-2">
                              {currentImages.slice(0, 3).map((image, index) => (
                                <div
                                  key={index}
                                  onClick={() => setSelectedImage(index)}
                                  className="relative w-full aspect-square overflow-hidden border border-[#EED9C4] cursor-pointer"
                                >
                                  <Image
                                    src={image}
                                    alt={`Lounger thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Customization Options */}
                        <div>
                          {/* Standard Dimensions Row */}
                          <div className="mb-4">
                            <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-base text-black mb-2">Length</label>
                                <Select value={standardLoungerLength} onValueChange={setStandardLoungerLength}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select length" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="31">31 inches</SelectItem>
                                    <SelectItem value="39">39 inches</SelectItem>
                                    <SelectItem value="47">47 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Breadth</label>
                                <Select value={standardLoungerBreadth} onValueChange={setStandardLoungerBreadth}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select breadth" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="16">16 inches</SelectItem>
                                    <SelectItem value="20">20 inches</SelectItem>
                                    <SelectItem value="24">24 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="block text-base text-black mb-2">Height</label>
                                <Select value={standardLoungerHeight} onValueChange={setStandardLoungerHeight}>
                                  <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                    <SelectValue placeholder="Select height" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="3">3 inches</SelectItem>
                                    <SelectItem value="4">4 inches</SelectItem>
                                    <SelectItem value="5">5 inches</SelectItem>
                                    <SelectItem value="6">6 inches</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-2xl font-medium text-black mb-4"> Customization</h4>
                          <div className="space-y-4">
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
                            <div>
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-base text-black mb-2">Length</label>
                                  <input
                                    type="number"
                                    value={loungerLength}
                                    onChange={(e) => setLoungerLength(e.target.value)}
                                    placeholder="Enter length"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Breadth</label>
                                  <input
                                    type="number"
                                    value={loungerBreadth}
                                    onChange={(e) => setLoungerBreadth(e.target.value)}
                                    placeholder="Enter breadth"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Height</label>
                                  <input
                                    type="number"
                                    value={loungerHeight}
                                    onChange={(e) => setLoungerHeight(e.target.value)}
                                    placeholder="Enter height"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Price and Quantity */}
                            <div className="mt-6 pt-6 border-t" style={{ borderColor: "#EED9C4" }}>
                              <h3 className="text-2xl font-medium text-black mb-2">Price</h3>
                              <div className="flex items-center gap-1 text-black mb-4">
                                <IndianRupee className="w-6 h-6" />
                                <span className="text-3xl font-normal">
                                  {basePrice.toLocaleString("en-IN", {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </span>
                              </div>
                              <p className="text-base text-black/70 mb-4">(inclusive of all taxes)</p>
                              
                              {/* Quantity */}
                              <label className="block mb-3 text-lg text-black font-cormorant font-normal">
                                Quantity
                              </label>
                              <div className="inline-flex items-center border rounded mb-6" style={{ borderColor: "#EED9C4" }}>
                                <button
                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                  className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                                  style={{
                                    borderRight: "1px solid #EED9C4",
                                  }}
                                >
                                  -
                                </button>
                                <span className="px-6 py-2 text-black text-lg min-w-[60px] text-center font-cormorant font-normal">{quantity}</span>
                                <button
                                  onClick={() => setQuantity(quantity + 1)}
                                  className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                                  style={{
                                    borderLeft: "1px solid #EED9C4",
                                  }}
                                >
                                  +
                                </button>
                              </div>

                              {/* Color Selector */}
                              <div className="mb-6">
                                <label className="block text-lg font-medium text-black mb-3">
                                  Color
                                </label>
                                <div className="flex flex-wrap gap-3">
                                  {colorOptions.map((color) => (
                                    <button
                                      key={color.name}
                                      onClick={() => {
                                        setSelectedColor(color.name)
                                        setSelectedImage(0)
                                      }}
                                      className={`w-8 h-8 rounded border-2 transition-all duration-300 ${
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

                              {/* Add to Cart */}
                              {isSoldOut ? (
                                <div className="mb-6">
                                  <div className="text-center mb-4">
                                    <p className="text-lg font-medium text-black mb-2">Sold Out</p>
                                    <p className="text-sm text-black/70">We'll notify you when this product is back in stock</p>
                                  </div>
                                  {!isNotifySubmitted ? (
                                    <div className="space-y-3">
                                      <input
                                        type="email"
                                        value={notifyEmail}
                                        onChange={(e) => setNotifyEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 border rounded text-black"
                                        style={{ borderColor: "#EED9C4" }}
                                      />
                                      <button
                                        onClick={() => {
                                          if (notifyEmail) {
                                            setIsNotifySubmitted(true)
                                          }
                                        }}
                                        className="w-full py-2 text-black font-medium hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: "#EED9C4" }}
                                      >
                                        Notify Me
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <p className="text-sm text-green-600">We'll notify you when this product is available!</p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <button
                                  onClick={handleAddToCart}
                                  disabled={isAddingToCart}
                                  className="w-full py-3 text-black text-xl font-medium hover:opacity-90 transition-opacity mb-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                  style={{ backgroundColor: "#EED9C4" }}
                                >
                                  {isAddingToCart ? (
                                    <>
                                      <Loader2 className="w-6 h-6 animate-spin" />
                                      Customizing...
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="w-6 h-6" />
                                      Add to Cart
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Head Pillow Customization */}
                  {productId === 10 && (
                    <div className="mb-6 p-4">
                      <h3 className="text-2xl font-medium text-black mb-4">Head Pillow</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Image */}
                        <div style={{ backgroundColor: colors.bg50 }}>
                          <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                            <Image
                              src={currentImages[selectedImage] || currentImages[0]}
                              alt="Head Pillow"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          {/* Thumbnail Images */}
                          {currentImages.length > 1 && (
                            <div className="grid grid-cols-3 gap-2">
                              {currentImages.slice(0, 3).map((image, index) => (
                                <div
                                  key={index}
                                  onClick={() => setSelectedImage(index)}
                                  className="relative w-full aspect-square overflow-hidden border border-[#EED9C4] cursor-pointer"
                                >
                                  <Image
                                    src={image}
                                    alt={`Head Pillow thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Customization Options */}
                        <div>
                          {/* Standard Dimensions Row */}
                          <div className="mb-4">
                            <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-base text-black mb-2">Length</label>
                            <Select value={standardPillowLength} onValueChange={setStandardPillowLength}>
                              <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                <SelectValue placeholder="Select length" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="12">12 inches</SelectItem>
                                <SelectItem value="14">14 inches</SelectItem>
                                <SelectItem value="16">16 inches</SelectItem>
                                <SelectItem value="18">18 inches</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-base text-black mb-2">Breadth</label>
                            <Select value={standardPillowBreadth} onValueChange={setStandardPillowBreadth}>
                              <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                <SelectValue placeholder="Select breadth" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="8">8 inches</SelectItem>
                                <SelectItem value="10">10 inches</SelectItem>
                                <SelectItem value="12">12 inches</SelectItem>
                                <SelectItem value="14">14 inches</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-base text-black mb-2">Height</label>
                            <Select value={standardPillowHeight} onValueChange={setStandardPillowHeight}>
                              <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                <SelectValue placeholder="Select height" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2">2 inches</SelectItem>
                                <SelectItem value="3">3 inches</SelectItem>
                                <SelectItem value="4">4 inches</SelectItem>
                                <SelectItem value="5">5 inches</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                          </div>
                          
                          <h4 className="text-2xl font-medium text-black mb-4"> Customization</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-lg text-black mb-2">Fabric</label>
                              <Select value={pillowFabric} onValueChange={setPillowFabric}>
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
                            <div>
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-base text-black mb-2">Length</label>
                                  <input
                                    type="number"
                                    value={pillowLength}
                                    onChange={(e) => setPillowLength(e.target.value)}
                                    placeholder="Enter length"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Breadth</label>
                                  <input
                                    type="number"
                                    value={pillowBreadth}
                                    onChange={(e) => setPillowBreadth(e.target.value)}
                                    placeholder="Enter breadth"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Height</label>
                                  <input
                                    type="number"
                                    value={pillowHeight}
                                    onChange={(e) => setPillowHeight(e.target.value)}
                                    placeholder="Enter height"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Price and Quantity */}
                            <div className="mt-6 pt-6 border-t" style={{ borderColor: "#EED9C4" }}>
                              <h3 className="text-2xl font-medium text-black mb-2">Price</h3>
                              <div className="flex items-center gap-1 text-black mb-4">
                                <IndianRupee className="w-6 h-6" />
                                <span className="text-3xl font-normal">
                                  {basePrice.toLocaleString("en-IN", {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </span>
                              </div>
                              <p className="text-base text-black/70 mb-4">(inclusive of all taxes)</p>
                              
                              {/* Quantity */}
                              <label className="block mb-3 text-lg text-black font-cormorant font-normal">
                                Quantity
                              </label>
                              <div className="inline-flex items-center border rounded mb-6" style={{ borderColor: "#EED9C4" }}>
                                <button
                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                  className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                                  style={{
                                    borderRight: "1px solid #EED9C4",
                                  }}
                                >
                                  -
                                </button>
                                <span className="px-6 py-2 text-black text-lg min-w-[60px] text-center font-cormorant font-normal">{quantity}</span>
                                <button
                                  onClick={() => setQuantity(quantity + 1)}
                                  className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                                  style={{
                                    borderLeft: "1px solid #EED9C4",
                                  }}
                                >
                                  +
                                </button>
                              </div>

                              {/* Color Selector */}
                              <div className="mb-6">
                                <label className="block text-lg font-medium text-black mb-3">
                                  Color
                                </label>
                                <div className="flex flex-wrap gap-3">
                                  {colorOptions.map((color) => (
                                    <button
                                      key={color.name}
                                      onClick={() => {
                                        setSelectedColor(color.name)
                                        setSelectedImage(0)
                                      }}
                                      className={`w-8 h-8 rounded border-2 transition-all duration-300 ${
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

                              {/* Add to Cart */}
                              {isSoldOut ? (
                                <div className="mb-6">
                                  <div className="text-center mb-4">
                                    <p className="text-lg font-medium text-black mb-2">Sold Out</p>
                                    <p className="text-sm text-black/70">We'll notify you when this product is back in stock</p>
                                  </div>
                                  {!isNotifySubmitted ? (
                                    <div className="space-y-3">
                                      <input
                                        type="email"
                                        value={notifyEmail}
                                        onChange={(e) => setNotifyEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 border rounded text-black"
                                        style={{ borderColor: "#EED9C4" }}
                                      />
                                      <button
                                        onClick={() => {
                                          if (notifyEmail) {
                                            setIsNotifySubmitted(true)
                                          }
                                        }}
                                        className="w-full py-2 text-black font-medium hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: "#EED9C4" }}
                                      >
                                        Notify Me
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <p className="text-sm text-green-600">We'll notify you when this product is available!</p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <button
                                  onClick={handleAddToCart}
                                  disabled={isAddingToCart}
                                  className="w-full py-3 text-black text-xl font-medium hover:opacity-90 transition-opacity mb-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                  style={{ backgroundColor: "#EED9C4" }}
                                >
                                  {isAddingToCart ? (
                                    <>
                                      <Loader2 className="w-6 h-6 animate-spin" />
                                      Customizing...
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="w-6 h-6" />
                                      Add to Cart
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pillow Bumpers Customization */}
                  {productId === 11 && (
                    <div className="mb-6 p-4">
                      <h3 className="text-2xl font-medium text-black mb-4">Pillow Bumpers</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Image */}
                        <div style={{ backgroundColor: colors.bg50 }}>
                          <div className="relative w-full aspect-4/3 overflow-hidden mb-2">
                            <Image
                              src={currentImages[selectedImage] || currentImages[0]}
                              alt="Pillow Bumpers"
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                          {/* Thumbnail Images */}
                          {currentImages.length > 1 && (
                            <div className="grid grid-cols-3 gap-2">
                              {currentImages.slice(0, 3).map((image, index) => (
                                <div
                                  key={index}
                                  onClick={() => setSelectedImage(index)}
                                  className="relative w-full aspect-square overflow-hidden border border-[#EED9C4] cursor-pointer"
                                >
                                  <Image
                                    src={image}
                                    alt={`Pillow Bumpers thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        {/* Customization Options */}
                        <div>
                          {/* Standard Dimensions Row */}
                          <div className="mb-4">
                            <h4 className="text-xl font-medium text-black mb-4">Standard Dimensions</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-base text-black mb-2">Length</label>
                            <Select value={standardBumperLength} onValueChange={setStandardBumperLength}>
                              <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                <SelectValue placeholder="Select length" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="48">48 inches</SelectItem>
                                <SelectItem value="54">54 inches</SelectItem>
                                <SelectItem value="60">60 inches</SelectItem>
                                <SelectItem value="72">72 inches</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-base text-black mb-2">Breadth</label>
                            <Select value={standardBumperBreadth} onValueChange={setStandardBumperBreadth}>
                              <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                <SelectValue placeholder="Select breadth" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="6">6 inches</SelectItem>
                                <SelectItem value="8">8 inches</SelectItem>
                                <SelectItem value="10">10 inches</SelectItem>
                                <SelectItem value="12">12 inches</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-base text-black mb-2">Height</label>
                            <Select value={standardBumperHeight} onValueChange={setStandardBumperHeight}>
                              <SelectTrigger className="w-full border-[#EED9C4] text-lg h-12">
                                <SelectValue placeholder="Select height" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="4">4 inches</SelectItem>
                                <SelectItem value="5">5 inches</SelectItem>
                                <SelectItem value="6">6 inches</SelectItem>
                                <SelectItem value="8">8 inches</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                          </div>
                          
                          <h4 className="text-2xl font-medium text-black mb-4"> Customization</h4>
                          <div className="space-y-4">
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
                            <div>
                              <div className="grid grid-cols-3 gap-3">
                                <div>
                                  <label className="block text-base text-black mb-2">Length</label>
                                  <input
                                    type="number"
                                    value={bumperLength}
                                    onChange={(e) => setBumperLength(e.target.value)}
                                    placeholder="Enter length"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Breadth</label>
                                  <input
                                    type="number"
                                    value={bumperBreadth}
                                    onChange={(e) => setBumperBreadth(e.target.value)}
                                    placeholder="Enter breadth"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                                <div>
                                  <label className="block text-base text-black mb-2">Height</label>
                                  <input
                                    type="number"
                                    value={bumperHeight}
                                    onChange={(e) => setBumperHeight(e.target.value)}
                                    placeholder="Enter height"
                                    className="w-full border border-[#EED9C4] text-lg h-12 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#EED9C4]"
                                  />
                                </div>
                              </div>
                            </div>
                            {/* Price and Quantity */}
                            <div className="mt-6 pt-6 border-t" style={{ borderColor: "#EED9C4" }}>
                              <h3 className="text-2xl font-medium text-black mb-2">Price</h3>
                              <div className="flex items-center gap-1 text-black mb-4">
                                <IndianRupee className="w-6 h-6" />
                                <span className="text-3xl font-normal">
                                  {basePrice.toLocaleString("en-IN", {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                  })}
                                </span>
                              </div>
                              <p className="text-base text-black/70 mb-4">(inclusive of all taxes)</p>
                              
                              {/* Quantity */}
                              <label className="block mb-3 text-lg text-black font-cormorant font-normal">
                                Quantity
                              </label>
                              <div className="inline-flex items-center border rounded mb-6" style={{ borderColor: "#EED9C4" }}>
                                <button
                                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                  className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                                  style={{
                                    borderRight: "1px solid #EED9C4",
                                  }}
                                >
                                  -
                                </button>
                                <span className="px-6 py-2 text-black text-lg min-w-[60px] text-center font-cormorant font-normal">{quantity}</span>
                                <button
                                  onClick={() => setQuantity(quantity + 1)}
                                  className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                                  style={{
                                    borderLeft: "1px solid #EED9C4",
                                  }}
                                >
                                  +
                                </button>
                              </div>

                              {/* Color Selector */}
                              <div className="mb-6">
                                <label className="block text-lg font-medium text-black mb-3">
                                  Color
                                </label>
                                <div className="flex flex-wrap gap-3">
                                  {colorOptions.map((color) => (
                                    <button
                                      key={color.name}
                                      onClick={() => {
                                        setSelectedColor(color.name)
                                        setSelectedImage(0)
                                      }}
                                      className={`w-8 h-8 rounded border-2 transition-all duration-300 ${
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

                              {/* Add to Cart */}
                              {isSoldOut ? (
                                <div className="mb-6">
                                  <div className="text-center mb-4">
                                    <p className="text-lg font-medium text-black mb-2">Sold Out</p>
                                    <p className="text-sm text-black/70">We'll notify you when this product is back in stock</p>
                                  </div>
                                  {!isNotifySubmitted ? (
                                    <div className="space-y-3">
                                      <input
                                        type="email"
                                        value={notifyEmail}
                                        onChange={(e) => setNotifyEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 border rounded text-black"
                                        style={{ borderColor: "#EED9C4" }}
                                      />
                                      <button
                                        onClick={() => {
                                          if (notifyEmail) {
                                            setIsNotifySubmitted(true)
                                          }
                                        }}
                                        className="w-full py-2 text-black font-medium hover:opacity-90 transition-opacity"
                                        style={{ backgroundColor: "#EED9C4" }}
                                      >
                                        Notify Me
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <p className="text-sm text-green-600">We'll notify you when this product is available!</p>
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <button
                                  onClick={handleAddToCart}
                                  disabled={isAddingToCart}
                                  className="w-full py-3 text-black text-xl font-medium hover:opacity-90 transition-opacity mb-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                  style={{ backgroundColor: "#EED9C4" }}
                                >
                                  {isAddingToCart ? (
                                    <>
                                      <Loader2 className="w-6 h-6 animate-spin" />
                                      Customizing...
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingCart className="w-6 h-6" />
                                      Add to Cart
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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
                    className="block mb-3 text-lg text-black font-cormorant font-normal"
                  >
                    Quantity
                  </label>
                  <div className="inline-flex items-center border rounded" style={{ borderColor: colors.border }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                      style={{
                        borderRight: `1px solid ${colors.border}`,
                      }}
                    >
                      -
                    </button>
                    <span className="px-6 py-2 text-black text-lg min-w-[60px] text-center font-cormorant font-normal">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:opacity-70 transition-opacity text-black text-lg font-cormorant font-normal"
                      style={{
                        borderLeft: `1px solid ${colors.border}`,
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

          {/* Product Features - Full Width for Joy Products */}
          {isJoyProduct && (
            <div className="mt-12">
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Generously Sized */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 flex items-center justify-center mb-2">
                      <Maximize2 className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-sm text-black font-medium">Generously Sized</span>
                  </div>
                  {/* 100% Organic Cotton */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 flex items-center justify-center mb-2">
                      <Leaf className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-sm text-black font-medium">100% Organic Cotton</span>
                  </div>
                  {/* Velour & Terry weave */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 flex items-center justify-center mb-2">
                      <Grid3x3 className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-sm text-black font-medium">Velour & Terry weave</span>
                  </div>
                  {/* Unisex */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 flex items-center justify-center mb-2">
                      <UserCheck className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-sm text-black font-medium">Unisex</span>
                  </div>
                  {/* Soft and Dense */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 flex items-center justify-center mb-2">
                      <Feather className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-sm text-black font-medium">Soft and Dense</span>
                  </div>
                  {/* Oversized Pockets */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 flex items-center justify-center mb-2">
                      <ShoppingBag className="w-5 h-5 text-black" />
                    </div>
                    <span className="text-sm text-black font-medium">Oversized Pockets</span>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-black" />
                    <span className="text-sm text-black">Delivery in 2-3 Days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-black" />
                    <span className="text-sm text-black">Worldwide shipping</span>
                  </div>
                </div>

                {/* Collapsible Sections */}
                <div className="space-y-2">
                  {/* Description */}
                  <div className="border rounded" style={{ borderColor: "#EED9C4" }}>
                    <button
                      onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="text-black font-medium">Description</span>
                      <ChevronDown
                        className={`w-5 h-5 text-black transition-transform ${
                          isDescriptionOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isDescriptionOpen && (
                      <div className="px-4 pb-4 text-black text-base">
                        <p>{product.description || "Product description will be displayed here."}</p>
                      </div>
                    )}
                  </div>

                  {/* Shipping Information */}
                  <div className="border rounded" style={{ borderColor: "#EED9C4" }}>
                    <button
                      onClick={() => setIsShippingOpen(!isShippingOpen)}
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="text-black font-medium">Shipping information</span>
                      <ChevronDown
                        className={`w-5 h-5 text-black transition-transform ${
                          isShippingOpen ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isShippingOpen && (
                      <div className="px-4 pb-4 text-black text-base">
                        <div className="space-y-3">
                          <p>
                            We offer fast and reliable shipping to ensure your products arrive safely and on time.
                          </p>
                          <div>
                            <p className="font-medium mb-1">Delivery Time:</p>
                            <p>Standard delivery: 2-3 business days</p>
                            <p>Express delivery: 1-2 business days (available at checkout)</p>
                          </div>
                          <div>
                            <p className="font-medium mb-1">Shipping Options:</p>
                            <p>• Free standard shipping on orders over ₹5,000</p>
                            <p>• Worldwide shipping available</p>
                            <p>• Track your order with real-time updates</p>
                          </div>
                          <div>
                            <p className="font-medium mb-1">Packaging:</p>
                            <p>All products are carefully packaged to ensure they arrive in perfect condition.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Details Tabs - Hidden for Baby Hamper and Individual Products */}
          {!isBabyHamper && !isKidsHamper && !isIndividualBabyProduct && (
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
        
        

        {/* Feature Sections - Only for Individual Joy Products */}
        {isIndividualBabyProduct && (
          <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto space-y-16">
              {/* Say Good-bye to Fuzz Balls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium text-black mb-6">
                    SAY GOOD-BYE TO FUZZ BALLS
                  </h2>
                  <p className="text-lg text-black leading-relaxed">
                    Designed for durability, our bed sheets feature a single-ply yarn with a 300 thread count, which helps prevent pilling. This construction ensures that the sheets retain their pristine appearance and texture, even after frequent use and washing.
                  </p>
                </div>
                <div className="relative w-full aspect-video border border-black">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <img src="/cotton.jpg" alt="cotton balls" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* 100% Organic Cotton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 relative w-full aspect-video border border-white">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <img src="/cotton fabric.jpg" alt="cotton fabric" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-2xl md:text-3xl font-medium text-black mb-6">
                    100% ORGANIC COTTON
                  </h2>
                  <p className="text-lg text-black leading-relaxed">
                    Crafted from the rarest 100% organic cotton, sourced directly from farms to ensure premium quality. The extra-long staple cotton enhances the smoothness and breathability, offering a luxurious feel and a healthier sleeping environment.
                  </p>
                </div>
              </div>

              {/* Softer, Smoother Slumber */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium text-black mb-6">
                    SOFTER, SMOOTHER SLUMBER
                  </h2>
                  <p className="text-lg text-black leading-relaxed mb-4">
                    Woven using a 4 under 1 sateen weave that imparts a silky-smooth finish and a subtle sheen, while maintaining its strength, the resultant sheets are both elegant and long-lasting.
                  </p>
                  
                </div>
                <div className="relative w-full aspect-video">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <img src = "/luxury-plush-mattress-with-pillows-on-bed.jpg" alt="softer smoother slumber" className="w-full h-full object-cover"/>
                  </div>
                </div>
              </div>

              {/* Highly Breathable */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                <div className="relative w-full aspect-video">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <img src="/cotton.jpg" alt="cotton balls" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium text-black mb-6">
                    HIGHLY BREATHABLE
                  </h2>
                  <p className="text-lg text-black leading-relaxed">
                    Unlike synthetic options that can trap heat and block aeration, our organic bed sheets offer superior breathability. This natural airflow helps to regulate temperature and wick away moisture, ensuring a cooler, more comfortable sleep and reducing the need for restless tossing and turning.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Popular Products Section - Only for Joy Products */}
        {isJoyProduct && (
          <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-8 text-center font-cormorant">
                What our Customers also bought
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
                    {/* Baby Hamper */}
                    {productId !== 12 && (() => {
                      const hamperProduct = getProductDetailById(12)
                      if (!hamperProduct) return null
                      return (
                        <CarouselItem key="hamper" className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                          <Link href={`/product/12`} className="block">
                            <div className="border border-[#EED9C4] p-4 hover:shadow-lg transition-shadow bg-white cursor-pointer">
                              <div className="relative aspect-square overflow-hidden mb-3">
                                <Image
                                  src={hamperProduct.images[0] || "/productmattress.jpg"}
                                  alt={hamperProduct.name}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>
                              <h3 className="text-base font-semibold text-foreground mb-3 text-center">{hamperProduct.name}</h3>
                              <Button 
                                className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground py-2.5 text-sm"
                                onClick={(e) => e.preventDefault()}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </Link>
                        </CarouselItem>
                      )
                    })()}
                    
                    {/* Individual Products */}
                    {[
                      { id: "mattress", name: "Mattress", image: "/productmattress.jpg", productDetailId: 7 },
                      { id: "topper", name: "Topper", image: "/topper.jpg", productDetailId: 8 },
                      { id: "lounger", name: "Lounger", image: "/lounger.jpg", productDetailId: 9 },
                      { id: "head-pillow", name: "Head Pillow", image: "/pillow.jpg", productDetailId: 10 },
                      { id: "pillow-bumpers", name: "Pillow Bumpers", image: "/bumpers.jpg", productDetailId: 11 },
                    ].filter((product) => product.productDetailId !== productId).map((product) => (
                      <CarouselItem
                        key={product.id}
                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
                        <Link href={`/product/${product.productDetailId}`} className="block">
                          <div className="border border-[#EED9C4] p-4 hover:shadow-lg transition-shadow bg-white cursor-pointer">
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
                            <Button 
                              className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground py-2.5 text-sm"
                              onClick={(e) => e.preventDefault()}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </Link>
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

        {/* Customer Testimonials - Only for Joy Products */}
        {isJoyProduct && (
          <section className="py-16 px-4 bg-stone-50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center font-cormorant">
                Customer Testimonials
              </h2>
              <p className="text-center text-foreground mb-8 max-w-2xl mx-auto">
                Hear from our satisfied customers about their experience with Ananthala products
              </p>
              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {[
                      {
                        id: 1,
                        video: "/ananthala hero section video.mp4",
                        poster: "/productmattress.jpg",
                        name: "Sarah Johnson",
                      },
                      {
                        id: 2,
                        video: "/ananthala hero section video.mp4",
                        poster: "/productmattress.jpg",
                        name: "Michael Chen",
                      },
                      {
                        id: 3,
                        video: "/ananthala hero section video.mp4",
                        poster: "/productmattress.jpg",
                        name: "Emily Rodriguez",
                      },
                      {
                        id: 4,
                        video: "/ananthala hero section video.mp4",
                        poster: "/productmattress.jpg",
                        name: "David Thompson",
                      },
                      {
                        id: 5,
                        video: "/ananthala hero section video.mp4",
                        poster: "/productmattress.jpg",
                        name: "Priya Sharma",
                      },
                      {
                        id: 6,
                        video: "/ananthala hero section video.mp4",
                        poster: "/productmattress.jpg",
                        name: "James Wilson",
                      },
                    ].map((testimonial) => (
                      <CarouselItem
                        key={testimonial.id}
                        className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="space-y-2">
                          <div className="relative aspect-video overflow-hidden border border-[#EED9C4]">
                            <video
                              className="w-full h-full object-cover"
                              controls
                              controlsList="nodownload nofullscreen noremoteplayback"
                              disablePictureInPicture
                              onContextMenu={(e) => e.preventDefault()}
                              poster={testimonial.poster}
                            >
                              <source src={testimonial.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                          <p className="text-left text-foreground font-medium">
                            {testimonial.name}
                          </p>
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

        {/* About Us Section - Only for Joy Products */}
        {isJoyProduct && (
          <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                <div className="relative aspect-video overflow-hidden max-w-lg mx-auto lg:mx-0">
                  <Image
                    src="/productmattress.jpg"
                    alt="About Ananthala"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-medium text-foreground font-cormorant">
                    About Us
                  </h2>
                  <p className="text-lg text-foreground leading-relaxed">
                    At Ananthala, we are committed to crafting premium products that take care of your baby's health. Our baby products are designed with safety and comfort in mind, using only the finest materials and innovative technology.
                  </p>
                  <p className="text-lg text-foreground leading-relaxed">
                    Every product is expertly crafted to ensure your little one gets the best care. We believe in quality, safety, and putting your baby's well-being first.
                  </p>
                  <Link href="/about">
                    <Button 
                      className="mt-4 bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground border-2 border-[#EED9C4] px-6 py-4 text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      More
                    </Button>
                  </Link>
                </div>
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
