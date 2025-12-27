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
import { Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { type CartItem } from "@/components/cart/cart-drawer"

export default function GracePage() {
  const [mattressVariant, setMattressVariant] = useState("")
  const [mattressDimension, setMattressDimension] = useState("")
  const [mattressFabric, setMattressFabric] = useState("")
  const [mattressApplicator, setMattressApplicator] = useState("")
  const [pillowSize, setPillowSize] = useState("")
  const [bedSpreadColor, setBedSpreadColor] = useState("")
  const [isAddingMattress, setIsAddingMattress] = useState(false)
  
  const { addToCart, setIsCartOpen } = useCart()

  const handleAddMattressToCart = async () => {
    setIsAddingMattress(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const sizeInfo = `${mattressVariant || "Standard"} - ${mattressDimension || "Standard"}${mattressFabric ? ` - ${mattressFabric}` : ""}${mattressApplicator ? ` - ${mattressApplicator}` : ""}`
    
    const mattressItem: CartItem = {
      id: `grace-mattress-${mattressVariant}-${mattressDimension}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
      name: "GRACE Mattress",
      image: "/mattress.jpg",
      size: sizeInfo,
      quantity: 1,
      price: 29999, // Base price, can be adjusted based on selections
    }
    addToCart(mattressItem)
    
    // Add complimentary pillow if size is selected
    if (pillowSize) {
      const pillowItem: CartItem = {
        id: `grace-pillow-${pillowSize}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: "GRACE Pillow (Complimentary)",
        image: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
        size: pillowSize,
        quantity: 1,
        price: 0,
      }
      addToCart(pillowItem)
    }
    
    // Add complimentary bed spread if color is selected
    if (bedSpreadColor) {
      const bedSpreadItem: CartItem = {
        id: `grace-bedspread-${bedSpreadColor}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
        name: "GRACE Bed Spread (Complimentary)",
        image: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
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
        {/* 1. Hero Section - Mattress Image */}
        <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src="/mattress.jpg"
              alt="Premium Mattress"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" style={{ backgroundColor: "rgba(238, 217, 196, 0.3)" }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
               
              </div>
            </div>
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
                      image: "/mattress.jpg",
                      title: "Premium Comfort",
                      description: "Our GRACE collection is designed for those in their prime years, offering the perfect balance of luxury and support. Each mattress is crafted with premium memory foam and natural latex layers that contour to your body, providing exceptional pressure relief and spinal alignment for the best sleep of your life.",
                    },
                    {
                      id: 2,
                      image: "/hybrid-mattress-with-blue-accent-pillows-bedroom.jpg",
                      title: "Temperature Regulation",
                      description: "Experience cool, comfortable sleep all night long with our advanced cooling technology. Our mattresses feature gel-infused memory foam and breathable cover materials that wick away moisture and regulate temperature, ensuring you stay comfortable regardless of the season.",
                    },
                    {
                      id: 3,
                      image: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
                      title: "Complete Sleep System",
                      description: "Enhance your sleep experience with our complimentary pillows and bedspreads. Every mattress purchase includes premium accessories that complement your mattress perfectly, creating a complete sleep environment designed for optimal rest and recovery.",
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
                            GRACE COLLECTION
                          </div>
                          <p className="text-lg leading-relaxed text-foreground">
                            At Ananthala we specifically make products to take care of your sleep health. Every product in our GRACE collection is crafted with premium materials and innovative technology. We understand that quality sleep is essential for your well-being, and our mattresses are designed to provide the perfect balance of comfort and support.
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

        {/* 2. Prime Product - Mattress (Hero Product) */}
        <section className="py-24 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium font-cormorant text-foreground text-center mb-8">
              Mattress
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/mattress.jpg"
                    alt="GRACE Mattress"
                    fill
                    className="object-cover"
                  />
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
                          <SelectItem value="twin" className="text-foreground">Twin (96cm x 190cm)</SelectItem>
                          <SelectItem value="full" className="text-foreground">Full (135cm x 190cm)</SelectItem>
                          <SelectItem value="queen" className="text-foreground">Queen (152cm x 198cm)</SelectItem>
                          <SelectItem value="king" className="text-foreground">King (183cm x 198cm)</SelectItem>
                          <SelectItem value="california-king" className="text-foreground">California King (183cm x 213cm)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Fabric Selection */}
                    <div>
                      <label className="text-lg font-medium text-foreground mb-2 block">Fabric</label>
                      <Select value={mattressFabric} onValueChange={setMattressFabric}>
                        <SelectTrigger className="w-full text-foreground">
                          <SelectValue placeholder="Select fabric" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cotton" className="text-foreground">Cotton</SelectItem>
                          <SelectItem value="bamboo" className="text-foreground">Bamboo</SelectItem>
                          <SelectItem value="linen" className="text-foreground">Linen</SelectItem>
                          <SelectItem value="silk" className="text-foreground">Silk</SelectItem>
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
                
                <Button 
                  className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground px-8 py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddMattressToCart}
                  disabled={isAddingMattress}
                >
                  {isAddingMattress ? (
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

        {/* Pillows Section - Complimentary */}
        <section className="py-16 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center font-medium text-foreground mb-4 font-cormorant">
              Pillows <span className="text-lg font-normal text-foreground">(Complimentary with purchase)</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-8">
              <div className="relative aspect-[4/3] overflow-hidden w-full">
                <Image
                  src="/luxury-plush-mattress-with-pillows-on-bed.jpg"
                  alt="Pillows"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 w-full p-6 bg-white border-2 border-[#EED9C4]">
                <div>
                  <label className="text-lg font-medium text-foreground mb-2 block">Pillow Size</label>
                  <Select value={pillowSize} onValueChange={setPillowSize}>
                    <SelectTrigger className="w-full text-foreground">
                      <SelectValue placeholder="Select pillow size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard" className="text-foreground">Standard (50cm x 75cm)</SelectItem>
                      <SelectItem value="queen" className="text-foreground">Queen (50cm x 90cm)</SelectItem>
                      <SelectItem value="king" className="text-foreground">King (50cm x 100cm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-[#EED9C4]/30 p-3 rounded border border-[#EED9C4]/50">
                  <p className="text-foreground/70 text-sm flex items-center gap-2">
                    <span className="text-foreground font-semibold">✓</span>
                    Included at no additional cost
                  </p>
                </div>
                <p className="text-foreground">Complimentary pillows included with your mattress purchase.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Bed Spread Section - Complimentary */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center font-medium text-foreground mb-4 font-cormorant">
              Bed Spread <span className="text-lg font-normal text-foreground">(Complimentary with purchase)</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-8">
              <div className="relative aspect-[4/3] overflow-hidden w-full">
                <Image
                  src="/bedsheet.jpg"
                  alt="Bed Spread"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6 w-full p-6 bg-white border-2 border-[#EED9C4]">
                <div>
                  <label className="text-lg font-medium text-foreground mb-2 block">Color</label>
                  <Select value={bedSpreadColor} onValueChange={setBedSpreadColor}>
                    <SelectTrigger className="w-full text-foreground">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cream" className="text-foreground">Cream</SelectItem>
                      <SelectItem value="beige" className="text-foreground">Beige</SelectItem>
                      <SelectItem value="white" className="text-foreground">White</SelectItem>
                      <SelectItem value="gray" className="text-foreground">Gray</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-[#EED9C4]/30 p-3 rounded border border-[#EED9C4]/50">
                  <p className="text-foreground/70 text-sm flex items-center gap-2">
                    <span className="text-foreground font-semibold">✓</span>
                    Included at no additional cost
                  </p>
                </div>
                <p className="text-foreground">Complimentary bed spread included with your mattress purchase.</p>
              </div>
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
                      poster: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
                      name: "Sarah Johnson",
                    },
                    {
                      id: 2,
                      video: "/ananthala hero section video.mp4",
                      poster: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
                      name: "Michael Chen",
                    },
                    {
                      id: 3,
                      video: "/ananthala hero section video.mp4",
                      poster: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
                      name: "Emily Rodriguez",
                    },
                    {
                      id: 4,
                      video: "/ananthala hero section video.mp4",
                      poster: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
                      name: "David Thompson",
                    },
                    {
                      id: 5,
                      video: "/ananthala hero section video.mp4",
                      poster: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
                      name: "Priya Sharma",
                    },
                    {
                      id: 6,
                      video: "/ananthala hero section video.mp4",
                      poster: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
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
                  src="/mattress.jpg"
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
                  At Ananthala, we are committed to crafting premium products that take care of your sleep health. Our mattresses are designed with comfort and support in mind, using only the finest materials and innovative technology.
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  Every product is expertly crafted to ensure you get the best sleep. We believe in quality, comfort, and putting your well-being first.
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
