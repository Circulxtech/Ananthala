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
  const [bedsheetColor, setBedsheetColor] = useState("")
  const [bedsheetDimension, setBedsheetDimension] = useState("")
  const [swaddleSelected, setSwaddleSelected] = useState(false)
  const [selectedHamperImage, setSelectedHamperImage] = useState(0)
  const [mattressVariant, setMattressVariant] = useState("")
  const [mattressDimension, setMattressDimension] = useState("")
  const [mattressFabric, setMattressFabric] = useState("")
  const [mattressApplicator, setMattressApplicator] = useState("")
  const [isAddingHamper, setIsAddingHamper] = useState(false)
  const [addingProductId, setAddingProductId] = useState<string | null>(null)
  const [addingSwaddleType, setAddingSwaddleType] = useState<string | null>(null)
  
  const hamperImages = [
    { src: "/productmattress.jpg", item: "Mattress" },
    { src: "/topper.jpg", item: "Topper" },
    { src: "/lounger.jpg", item: "Lounger" },
    { src: "/pillow.jpg", item: "Head Pillow" },
    { src: "/bumpers.jpg", item: "Pillow Bumpers" },
  ]

  const babyProducts = [
    { id: "mattress", name: "Mattress", price: 299, image: "/productmattress.jpg" },
    { id: "topper", name: "Topper", price: 149, image: "/topper.jpg" },
    { id: "lounger", name: "Lounger", price: 199, image: "/lounger.jpg" },
    { id: "head-pillow", name: "Head Pillow", price: 79, image: "/pillow.jpg" },
    { id: "pillow-bumpers", name: "Pillow Bumpers", price: 89, image: "/bumpers.jpg" },
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
      
      const cartItem: CartItem = {
        id: `joy-hamper-${product.id}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: `JOY ${product.name}`,
        image: product.image,
        size: sizeInfo,
        quantity: 1,
        price: product.price,
      }
      addToCart(cartItem)
    })
    
    // Add complimentary bedsheet if color and dimension are selected
    if (bedsheetColor && bedsheetDimension) {
      const dimensionLabel = bedsheetDimension.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
      const colorLabel = bedsheetColor.charAt(0).toUpperCase() + bedsheetColor.slice(1)
      const bedsheetItem: CartItem = {
        id: `joy-bedsheet-${bedsheetDimension}-${bedsheetColor}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: "JOY Bedsheet (Complimentary)",
        image: "/bedsheet.jpg",
        size: `${dimensionLabel} - ${colorLabel}`,
        quantity: 1,
        price: 0,
      }
      addToCart(bedsheetItem)
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
          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium font-cormorant text-foreground text-center mb-8">
            Baby Hamper
          </h1>
            
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden ">
                  <Image
                    src={hamperImages[selectedHamperImage].src}
                    alt={hamperImages[selectedHamperImage].item}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Thumbnail Images */}
                <div className="grid grid-cols-5 gap-2">
                  {hamperImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedHamperImage(index)}
                      className={`relative aspect-square overflow-hidden  border-2 transition-all ${
                        selectedHamperImage === index
                          ? "border-foreground"
                          : "border-transparent hover:border-foreground/50"
                      }`}
                    >
                      <Image
                        src={image.src}
                        alt={image.item}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                {/* Mattress Customization */}
                <div className="p-6 bg-white border-2 border-[#EED9C4]">
                  <h3 className="text-xl font-medium text-foreground mb-4">Mattress Customization</h3>
                  <div className="space-y-4">
                    {/* Variant Selection */}
                    <div>
                      <label className="text-lg font-medium text-foreground mb-2 block">Variant</label>
                      <Select value={mattressVariant} onValueChange={setMattressVariant}>
                        <SelectTrigger className="w-full text-foreground">
                          <SelectValue placeholder="Select variant" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modular" className="text-foreground">Modular</SelectItem>
                          <SelectItem value="plush" className="text-foreground">Plush</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Dimension Selection */}
                    <div>
                      <label className="text-lg font-medium text-foreground mb-2 block">Dimension</label>
                      <Select value={mattressDimension} onValueChange={setMattressDimension}>
                        <SelectTrigger className="w-full text-foreground">
                          <SelectValue placeholder="Select dimension" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small" className="text-foreground">Small (60cm x 120cm)</SelectItem>
                          <SelectItem value="medium" className="text-foreground">Medium (70cm x 140cm)</SelectItem>
                          <SelectItem value="large" className="text-foreground">Large (80cm x 160cm)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                   
                    
                    {/* Applicator */}
                    <div>
                      <label className="text-lg font-medium text-foreground mb-2 block">Applicator</label>
                      <Select value={mattressApplicator} onValueChange={setMattressApplicator}>
                        <SelectTrigger className="w-full text-foreground">
                          <SelectValue placeholder="Select applicator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard" className="text-foreground">Standard</SelectItem>
                          <SelectItem value="premium" className="text-foreground">Premium</SelectItem>
                          <SelectItem value="deluxe" className="text-foreground">Deluxe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-white border-2 border-[#EED9C4]">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Hamper Includes:</h3>
                  <div className="space-y-3">
                    {babyProducts.map((product) => (
                      <label key={product.id} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hamperSelected || selectedItems.includes(product.id)}
                          onChange={() => !hamperSelected && toggleItem(product.id)}
                          disabled={hamperSelected}
                          className="w-5 h-5 text-[#EED9C4] border-foreground/30 rounded focus:ring-[#EED9C4]"
                        />
                        <span className="text-foreground font-medium">{product.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <Button 
                  className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground px-8 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddHamperToCart}
                  disabled={isAddingHamper}
                >
                  {isAddingHamper ? (
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
        </section>

        {/* Buy Individually Section */}
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
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {babyProducts.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <div className="border border-[#EED9C4] p-4 hover:shadow-lg transition-shadow h-full flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden  mb-3">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3 grow">{product.name}</h3>
                        <Button 
                          className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground disabled:opacity-50 disabled:cursor-not-allowed py-2 text-sm"
                          onClick={() => handleAddProductToCart(product.id)}
                          disabled={addingProductId === product.id}
                        >
                          {addingProductId === product.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin mr-2" />
                              Adding...
                            </>
                          ) : (
                            "Add to Cart"
                          )}
                        </Button>
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

        {/* Bedsheet Section - Complimentary */}
        <section className="py-16 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center font-medium text-foreground mb-4 font-cormorant">
              Bedsheet <span className="text-lg font-normal text-foreground">(Complimentary with purchase)</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-8">
              <div className="relative aspect-[4/3] overflow-hidden  w-full">
                <Image
                  src="/bedsheet.jpg"
                  alt="Bedsheet"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 w-full p-6 bg-white border-2 border-[#EED9C4]">
                <div>
                  <label className="text-lg font-medium text-foreground mb-2 block">Dimension</label>
                  <Select value={bedsheetDimension} onValueChange={setBedsheetDimension}>
                    <SelectTrigger className="w-full text-foreground">
                      <SelectValue placeholder="Select dimension" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twin" className="text-foreground">Twin</SelectItem>
                      <SelectItem value="full" className="text-foreground">Full</SelectItem>
                      <SelectItem value="queen" className="text-foreground">Queen</SelectItem>
                      <SelectItem value="king" className="text-foreground">King</SelectItem>
                      <SelectItem value="california-king" className="text-foreground">California King</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-lg font-medium text-foreground mb-2 block">Color</label>
                  <Select value={bedsheetColor} onValueChange={setBedsheetColor}>
                    <SelectTrigger className="w-full text-foreground">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cream" className="text-foreground">Cream</SelectItem>
                      <SelectItem value="pink" className="text-foreground">Pink</SelectItem>
                      <SelectItem value="blue" className="text-foreground">Blue</SelectItem>
                      <SelectItem value="white" className="text-foreground">White</SelectItem>
                      <SelectItem value="yellow" className="text-foreground">Yellow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-foreground">Complimentary bedsheet included with your purchase.</p>
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
                      "Add to Cart"
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
                    },
                    {
                      id: 2,
                      video: "/ananthala hero section video.mp4",
                      poster: "/productmattress.jpg",
                    },
                    {
                      id: 3,
                      video: "/ananthala hero section video.mp4",
                      poster: "/productmattress.jpg",
                    },
                    {
                      id: 4,
                      video: "/ananthala hero section video.mp4",
                      poster: "/productmattress.jpg",
                    },
                    {
                      id: 5,
                      video: "/ananthala hero section video.mp4",
                      poster: "/productmattress.jpg",
                    },
                    {
                      id: 6,
                      video: "/ananthala hero section video.mp4",
                      poster: "/productmattress.jpg",
                    },
                  ].map((testimonial) => (
                    <CarouselItem
                      key={testimonial.id}
                      className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                    >
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

