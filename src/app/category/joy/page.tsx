"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { type CartItem } from "@/components/cart/cart-drawer"

export default function JoyPage() {
  const [hamperSelected, setHamperSelected] = useState(true)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [bedSpreadColor, setBedSpreadColor] = useState("")
  const [pillowSize, setPillowSize] = useState("")
  const [swaddleSelected, setSwaddleSelected] = useState(false)
  const [selectedHamperImage, setSelectedHamperImage] = useState(0)
  const [mattressVariant, setMattressVariant] = useState("")
  const [mattressDimension, setMattressDimension] = useState("")
  const [mattressFabric, setMattressFabric] = useState("")
  const [mattressApplicator, setMattressApplicator] = useState("")
  const [selectedColor, setSelectedColor] = useState("royal-blue")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isAddingHamper, setIsAddingHamper] = useState(false)
  const [isAddingMattress, setIsAddingMattress] = useState(false)
  const [addingProductId, setAddingProductId] = useState<string | null>(null)
  const [addingSwaddleType, setAddingSwaddleType] = useState<string | null>(null)

  // Color to images mapping
  const colorImages: Record<string, string[]> = {
    "royal-blue": ["/productmattress.jpg", "/topper.jpg", "/lounger.jpg", "/pillow.jpg", "/bumpers.jpg"],
    gray: ["/topper.jpg", "/productmattress.jpg", "/lounger.jpg", "/pillow.jpg", "/bumpers.jpg"],
    black: ["/lounger.jpg", "/productmattress.jpg", "/topper.jpg", "/pillow.jpg", "/bumpers.jpg"],
    "dark-brown": ["/bumpers.jpg", "/productmattress.jpg", "/topper.jpg", "/lounger.jpg", "/pillow.jpg"],
  }

  const colors = [
    { name: "royal-blue", label: "Royal Blue", hex: "#4169E1", overlay: "rgba(65, 105, 225, 0.5)", blendMode: "overlay" },
    { name: "gray", label: "Gray", hex: "#4A4A4A", overlay: "rgba(74, 74, 74, 0.4)", blendMode: "multiply" },
    { name: "black", label: "Black", hex: "#000000", overlay: "rgba(0, 0, 0, 0.3)", blendMode: "multiply" },
    { name: "dark-brown", label: "Dark Brown", hex: "#5C4033", overlay: "rgba(92, 64, 51, 0.5)", blendMode: "overlay" },
  ]

  const selectedColorData = colors.find(c => c.name === selectedColor) || colors[0]

  const currentImages = colorImages[selectedColor] || colorImages["royal-blue"]

  const handleColorChange = (color: string) => {
    setSelectedColor(color)
    setSelectedImageIndex(0) // Reset to first image when color changes
  }
  
  const hamperImages = [
    { src: "/productmattress.jpg", item: "Mattress" },
    { src: "/topper.jpg", item: "Topper" },
    { src: "/lounger.jpg", item: "Lounger" },
    { src: "/pillow.jpg", item: "Head Pillow" },
    { src: "/bumpers.jpg", item: "Pillow Bumpers" },
  ]

  const babyProducts = [
    { id: "mattress", name: "Mattress", price: 299, image: "/productmattress.jpg", productDetailId: 7 },
    { id: "topper", name: "Topper", price: 149, image: "/topper.jpg", productDetailId: 8 },
    { id: "lounger", name: "Lounger", price: 199, image: "/lounger.jpg", productDetailId: 9 },
    { id: "head-pillow", name: "Head Pillow", price: 79, image: "/pillow.jpg", productDetailId: 10 },
    { id: "pillow-bumpers", name: "Pillow Bumpers", price: 89, image: "/bumpers.jpg", productDetailId: 11 },
  ]

  const { addToCart, setIsCartOpen } = useCart()

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }

  const handleAddHamperToCart = async () => {
    setIsAddingHamper(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Get items to add: if hamperSelected is true, add all products; otherwise add only selected items
    const itemsToAdd = hamperSelected 
      ? babyProducts 
      : babyProducts.filter(product => selectedItems.includes(product.id))
    
    itemsToAdd.forEach((product) => {
      const sizeInfo = product.id === "mattress" && mattressDimension 
        ? `${mattressVariant || "Standard"} - ${mattressDimension}${mattressApplicator ? ` - ${mattressApplicator}` : ""}`
        : "Standard"
      
      const colorInfo = selectedColor ? ` - ${colors.find(c => c.name === selectedColor)?.label || selectedColor}` : ""
      
      const cartItem: CartItem = {
        id: `joy-hamper-${product.id}-${selectedColor}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: `JOY ${product.name}`,
        image: product.id === "mattress" ? currentImages[0] : product.image,
        size: `${sizeInfo}${colorInfo}`,
        quantity: 1,
        price: product.price,
      }
      addToCart(cartItem)
    })
    
    // Add complimentary bed spread if color is selected
    if (bedSpreadColor) {
      const colorLabel = bedSpreadColor.charAt(0).toUpperCase() + bedSpreadColor.slice(1)
      const bedSpreadItem: CartItem = {
        id: `joy-bedspread-${bedSpreadColor}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: "JOY Bed Spread (Complimentary)",
        image: "/bedsheet.jpg",
        size: colorLabel,
        quantity: 1,
        price: 0,
      }
      addToCart(bedSpreadItem)
    }
    
    // Add complimentary pillow if size is selected
    if (pillowSize) {
      const pillowItem: CartItem = {
        id: `joy-pillow-${pillowSize}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: "JOY Pillow (Complimentary)",
        image: "/pillow.jpg",
        size: pillowSize,
        quantity: 1,
        price: 0,
      }
      addToCart(pillowItem)
    }
    
    setHamperSelected(true)
    setIsAddingHamper(false)
    setIsCartOpen(true)
  }

  const handleAddProductToCart = async (productId: string) => {
    setAddingProductId(productId)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const product = babyProducts.find(p => p.id === productId)
    if (product) {
      const sizeInfo = productId === "mattress" && mattressDimension 
        ? `${mattressVariant || "Standard"} - ${mattressDimension}${mattressApplicator ? ` - ${mattressApplicator}` : ""}`
        : "Standard"
      
      const cartItem: CartItem = {
        id: `joy-${productId}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: `JOY ${product.name}`,
        image: product.image,
        size: sizeInfo,
        quantity: 1,
        price: product.price,
      }
      addToCart(cartItem)
    }
    
    setHamperSelected(false)
    toggleItem(productId)
    setAddingProductId(null)
    setIsCartOpen(true)
  }

  const handleAddSwaddleToCart = async (swaddleType: string) => {
    setAddingSwaddleType(swaddleType)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const cartItem: CartItem = {
      id: `joy-swaddle-${swaddleType.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name: `JOY ${swaddleType} Swaddle`,
      image: "/cotton.jpg",
      size: "Standard",
      quantity: 1,
      price: 49,
    }
    addToCart(cartItem)
    
    setSwaddleSelected(true)
    setAddingSwaddleType(null)
    setIsCartOpen(true)
  }

  const handleAddMattressToCart = async () => {
    setIsAddingMattress(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const sizeInfo = `${mattressVariant || "Standard"} - ${mattressDimension || "Standard"}${mattressFabric ? ` - ${mattressFabric}` : ""}${mattressApplicator ? ` - ${mattressApplicator}` : ""}`
    
    const mattressItem: CartItem = {
      id: `joy-mattress-${mattressVariant}-${mattressDimension}-${selectedColor}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name: "JOY Mattress",
      image: currentImages[0],
      size: `${sizeInfo}${selectedColor ? ` - ${colors.find(c => c.name === selectedColor)?.label || selectedColor}` : ""}`,
      quantity: 1,
      price: 299,
    }
    addToCart(mattressItem)
    
    // Add complimentary pillow if size is selected
    if (pillowSize) {
      const pillowItem: CartItem = {
        id: `joy-pillow-${pillowSize}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: "JOY Pillow (Complimentary)",
        image: "/pillow.jpg",
        size: pillowSize,
        quantity: 1,
        price: 0,
      }
      addToCart(pillowItem)
    }
    
    // Add complimentary bed spread if color is selected
    if (bedSpreadColor) {
      const bedSpreadItem: CartItem = {
        id: `joy-bedspread-${bedSpreadColor}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: "JOY Bed Spread (Complimentary)",
        image: "/bedsheet.jpg",
        size: bedSpreadColor,
        quantity: 1,
        price: 0,
      }
      addToCart(bedSpreadItem)
    }
    
    setIsAddingMattress(false)
    setIsCartOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* 1. Hero Section - Baby Products Image */}
        <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/baby.jpg"
              alt="Baby Products"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Ananthala Difference Section - Carousel */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
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
                      image: "/productmattress.jpg",
                      title: "Organic Materials",
                      description: "Every product in our JOY collection is crafted from 100% organic, chemical-free materials. We understand that your baby's delicate skin requires the purest, most natural fabrics. Our mattresses, toppers, and accessories are made without harmful toxins, ensuring a safe sleeping environment for your little one.",
                    },
                    {
                      id: 2,
                      image: "/cotton.jpg",
                      title: "Breathable Design",
                      description: "Our innovative breathable design ensures optimal air circulation, preventing overheating and maintaining a comfortable temperature throughout the night. This feature is especially crucial for newborns and infants who are still developing their temperature regulation systems.",
                    },
                    {
                      id: 3,
                      image: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
                      title: "Pediatrician Approved",
                      description: "All our baby products are designed in consultation with pediatricians and child development experts. We prioritize spinal alignment, proper support, and safe sleep practices. Our products meet and exceed international safety standards for infant bedding and accessories.",
                    },
                  ].map((slide) => (
                    <CarouselItem
                      key={slide.id}
                      className="pl-2 md:pl-4 basis-full"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#EED9C4]">
                        {/* Left Side - Image */}
                        <div className="relative aspect-[4/3] overflow-hidden ">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        {/* Right Side - Text Content with Card */}
                        <div className="space-y-6">
                         
                          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium font-cormorant text-foreground">
                            Ananthala Difference
                          </h1>
                          <div className="text-sm uppercase tracking-wider font-medium text-foreground">
                            JOY COLLECTION
                          </div>
                          <p className="text-lg leading-relaxed text-foreground">
                            At Ananthala we specifically make products to take care of your babies health. Every product in our JOY collection is crafted from 100% organic, chemical-free materials. We understand that your baby's delicate skin requires the purest, most natural fabrics.
                          </p>
                          
                         
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#EED9C4" }} />
                <CarouselNext className="right-0 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#EED9C4" }} />
              </Carousel>
            </div>
          </div>
        </section>

       
        {/* Baby Hamper Section */}
        <section className="py-16 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
          
            
            
            <div className="flex flex-col lg:flex-row gap-40 items-start justify-center">
              {/* Left Column - Baby Hamper */}
              <div className="space-y-6 lg:w-[calc(41.67%-1.5rem)] max-w-md">
                <h2 className="text-2xl md:text-3xl font-medium text-center text-foreground font-cormorant">
                  Baby Hamper
                </h2>

                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={currentImages[0]}
                    alt="JOY Baby Hamper"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Price Section */}
                <div className="text-center">
                  <div className="text-3xl text-left font-semibold text-foreground">
                    ₹{babyProducts.reduce((sum, product) => sum + product.price, 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-left text-foreground/70 mt-1">(inclusive of all taxes)</p>
                </div>
                
               
                
                
                
                {/* View More Button */}
                <Link href="/product/12">
                  <Button 
                    className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground px-8 py-6 text-lg"
                  >
                    View More
                  </Button>
                </Link>
              </div>
              
              {/* Right Column - Individual Products */}
              <div className="space-y-6 lg:w-[calc(41.67%-1.5rem)] max-w-md">
              
                <div className="relative">
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="ml-0">
                      {babyProducts.map((product) => (
                        <CarouselItem
                          key={product.id}
                          className="pl-0 basis-full"
                        >
                          <Link href={`/product/${product.productDetailId}`} className="block">
                            <div className="space-y-6 cursor-pointer">
                              <h3 className="text-2xl md:text-3xl text-center font-medium text-foreground font-cormorant">
                                {product.name}
                              </h3>
                           
                              {/* Main Image */}
                              <div className="relative aspect-square overflow-hidden ">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              
                              
                              {/* Price Section */}
                              <div className="text-center">
                                <div className="text-3xl text-left font-semibold text-foreground">
                                  ₹{product.price.toLocaleString()}
                                </div>
                                <p className="text-sm text-left text-foreground/70 mt-1">(inclusive of all taxes)</p>
                              </div>
                              
                              {/* View More Button */}
                              <Button 
                                className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground px-8 py-6 text-lg"
                              >
                                View More
                              </Button>
                            </div>
                          </Link>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#EED9C4" }} />
                    <CarouselNext className="right-0 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#EED9C4" }} />
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </section>

       

        

        

        {/* Swaddles Section - Optional */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-8 text-center font-cormorant">
              Swaddles 
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Organic Cotton", "Bamboo", "Muslin", "Linen"].map((type) => (
                <div key={type} className="border border-[#EED9C4] p-6 hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square overflow-hidden mb-4">
                    <Image
                      src="/swaddle.jpg"
                      alt={`${type} Swaddle`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">{type} Swaddle</h3>
                  <Button 
                    className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleAddSwaddleToCart(type)}
                    disabled={addingSwaddleType === type}
                  >
                    {addingSwaddleType === type ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Adding to Cart...
                      </>
                    ) : (
                      "Choose Your Comfort"
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
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
                <CarouselPrevious className="left-0 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#EED9C4" }} />
                <CarouselNext className="right-0 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#EED9C4" }} />
              </Carousel>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              <div className="relative aspect-[4/3] overflow-hidden max-w-lg mx-auto lg:mx-0">
                <Image
                  src="/productmattress.jpg"
                  alt="About Ananthala"
                  fill
                  className="object-cover"
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
      </main>
      <Footer />
    </div>
  )
}

