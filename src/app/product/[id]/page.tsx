"use client"

import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import Image from "next/image"
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
} from "lucide-react"
import { useState, useEffect } from "react"
import { getProductDetailById } from "@/data/product-details"
import { CartDrawer, type CartItem } from "@/components/cart/cart-drawer"
import { PopularProductsCarousel } from "@/components/sections/popular-products-carousel"
import { useCart } from "@/contexts/cart-context"

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
<<<<<<< HEAD
=======
  const isBabyHamper = productId === 12
  const isIndividualBabyProduct = [7, 8, 9, 10, 11].includes(productId)
  const isJoyProduct = [7, 8, 9, 10, 11, 12].includes(productId)
>>>>>>> 19d03249011ae9a847dc8de3a38788653eed5650
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<"features" | "specs">("features")
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const { cartItems, addToCart, isCartOpen, setIsCartOpen } = useCart()

  const selectedSizeData = product.sizes.find((s) => s.name === selectedSize)
  const currentPrice = selectedSizeData?.price || product.price

  
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
    
    const newCartItem: CartItem = {
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity,
      price: currentPrice,
    }
    
    addToCart(newCartItem)
    setIsAddingToCart(false)
    setIsCartOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className={isJoyProduct ? "" : "pt-16"}>
        {/* Breadcrumb - Only for Joy Products */}
        {isJoyProduct ? (
          <div className="sticky top-16 z-40 bg-white border-b" style={{ borderColor: "#D9CFC7" }}>
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

        <div className={`max-w-7xl mx-auto px-4 ${isJoyProduct ? "pt-16 pb-12" : "py-12"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="mb-4" style={{ backgroundColor: colors.bg50 }}>
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedImage(index)
                      }}
                      type="button"
                      className="relative w-full aspect-square border-2 transition-colors cursor-pointer hover:opacity-80"
                      style={{
                        borderColor:
                          selectedImage === index ? colors.accent : colors.border,
                      }}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        className="object-cover pointer-events-none"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
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

                {/* Add to Cart */}
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
                      Add to Cart -{" "}
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

              {/* Key Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Moon
                    className="w-5 h-5 mt-1 shrink-0 text-black"
                  />
                  <div>
                    <p className="mb-1 font-medium text-black">
                      {isBabyProduct ? "100 Night Trial" : "100 Night Trial"}
                    </p>
                    <p className="font-medium text-black">
                      Risk-free sleep trial period
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield
                    className="w-5 h-5 mt-1 shrink-0 text-black"
                  />
                  <div>
                    <p className="mb-1 font-medium text-black">
                      {isBabyProduct
                        ? "Safety Certified"
                        : "15 Year Warranty"}
                    </p>
                    <p className="font-medium text-black">
                      {isBabyProduct
                        ? "GREENGUARD Gold & CertiPUR-US"
                        : "Comprehensive coverage included"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck
                    className="w-5 h-5 mt-1 shrink-0 text-black"
                  />
                  <div>
                    <p className="mb-1 text-black font-medium">
                      Free Delivery
                    </p>
                    <p className="font-medium text-black">
                      {isBabyProduct
                        ? "Safe & secure packaging"
                        : "White glove delivery available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
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
        </div>
        
<<<<<<< HEAD
        {/* Popular Products Carousel */}
        <PopularProductsCarousel excludeProductId={productId} />
=======
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
                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
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

        {/* Popular Products Section - Only for Joy Products */}
        {isJoyProduct && (
          <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-8 text-center font-cormorant">
                Popular Products
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
>>>>>>> 19d03249011ae9a847dc8de3a38788653eed5650
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
