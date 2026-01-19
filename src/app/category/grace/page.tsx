"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

export default function GracePage() {
  const shopSectionRef = useRef<HTMLElement>(null)
  const aboutUsSectionRef = useRef<HTMLElement>(null)

  const scrollToShop = () => {
    shopSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToAboutUs = () => {
    aboutUsSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const shopItems = [
    { name: "Mattress", price: "29,999", image: "/mattress.jpg", href: "/product/19" },
    { name: "Topper", price: "14,999", image: "/topper.jpg", href: "/product/20" },
    { name: "Lounger", price: "7,999", image: "/lounger.jpg", href: "/product/21" },
    { name: "Pillow", price: "4,999", image: "/pillow.jpg", href: "/product/22" },
  ]


  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Fixed Breadcrumb */}
        <div className="fixed top-20 left-0 right-0 z-40 bg-white">
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
                <li className="text-foreground font-medium">
                  Grace
                </li>
              </ol>
            </nav>
          </div>
        </div>
        {/* Spacer to prevent content from going under fixed breadcrumb */}
        <div className="h-[49px]"></div>
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
            {/* Overlay content on the left */}
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="pl-4 sm:pl-6 lg:pl-8 xl:pl-12">
                <div className="max-w-md space-y-6">
                  <div className="bg-[#EED9C4] p-4 md:p-8 rounded-lg shadow-lg">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-foreground font-cormorant">
                      Grace Collection
                    </h1>
                    <p className="text-foreground text-base md:text-lg mt-4 leading-relaxed font-medium">
                      Discover elegant sleep solutions in our Grace collection, crafted with premium materials and thoughtful design for everyday comfort.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={scrollToShop}
                      className="bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground px-8 py-6 text-lg rounded-md w-full sm:w-auto sm:min-w-[140px]"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      Shop
                    </Button>
                    <Button
                      onClick={scrollToAboutUs}
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-[#8B5A3C] px-8 py-6 text-lg bg-transparent rounded-md w-full sm:w-auto sm:min-w-[140px]"
                      style={{ fontFamily: '"Playfair Display", serif' }}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
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
                        <div className="relative aspect-4/3 overflow-hidden ">
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


        {/* Shop Section */}
        <section ref={shopSectionRef} className="py-16 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium text-foreground mb-8 text-center font-cormorant">
              Shop
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-8">
              {shopItems.map((item) => (
                <div
                  key={item.name}
                  className="border border-[#EED9C4] p-4 hover:shadow-lg transition-shadow bg-white"
                >
                  <Link href={item.href} className="block">
                    <div className="relative aspect-square overflow-hidden mb-3 cursor-pointer">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </Link>
                  <h3 className="text-base font-semibold text-foreground mb-2 text-center">{item.name}</h3>
                  <div className="text-sm font-medium text-foreground mb-3 text-center">
                    Starting at ₹{item.price}
                  </div>
                  <Link href={item.href}>
                    <Button className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground py-2.5 text-sm">
                      Customize
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        {/* Customer Testimonials */}
        <section className="py-16 px-4 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center font-cormorant">
              What our Divas Say
            </h2>
            <p className="text-center text-foreground mb-8 max-w-2xl mx-auto">
           Join thousands of happy sleepers
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
        <section ref={aboutUsSectionRef} className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              <div className="relative aspect-4/3 overflow-hidden max-w-lg mx-auto lg:mx-0">
                <Image
                  src="/mattress.jpg"
                  alt="About Ananthala"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-medium text-foreground font-cormorant">
                  Our Crafted Heritage
                </h2>
                <p className="text-lg text-foreground/90 font-medium">
                  Our mattresses are engineered with cutting-edge sleep technology and premium materials to
                  provide the perfect balance of comfort and support. Every layer is thoughtfully designed to
                  help you wake up refreshed.
                </p>
                <div className="space-y-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#EED9C4] rounded-full mt-2"></div>
                    <div>
                      <p className="mb-1 font-medium text-lg text-foreground">
                        Pressure Relief Technology
                      </p>
                      <p className="font-medium text-lg text-foreground">
                        Conforms to your body for optimal spinal alignment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#EED9C4] rounded-full mt-2"></div>
                    <div>
                      <p className="mb-1 font-medium text-lg text-foreground">
                        Temperature Regulation
                      </p>
                      <p className="font-medium text-lg text-foreground">
                        Advanced cooling system keeps you comfortable all night
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#EED9C4] rounded-full mt-2"></div>
                    <div>
                      <p className="mb-1 font-medium text-lg text-foreground">
                        Motion Isolation
                      </p>
                      <p className="font-medium text-lg text-foreground">
                        Undisturbed sleep even with a restless partner
                      </p>
                    </div>
                  </div>
                </div>
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
