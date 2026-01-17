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
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { ChevronRight } from "lucide-react"

export default function BlissCollectionPage() {
  const shopSectionRef = useRef<HTMLElement>(null)
  const aboutUsSectionRef = useRef<HTMLElement>(null)

  const scrollToShop = () => {
    shopSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToAboutUs = () => {
    aboutUsSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

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
                  Bliss Collection
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
              alt="Bliss Collection"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 z-10 flex items-center">
              <div className="pl-4 sm:pl-6 lg:pl-8 xl:pl-12">
                <div className="max-w-md space-y-6">
                  <div className="bg-[#EED9C4] p-4 md:p-8 rounded-lg shadow-lg">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-foreground font-cormorant">
                      Bliss Collection
                    </h1>
                    <p className="text-foreground text-base md:text-lg mt-4 leading-relaxed font-medium">
                      Discover restorative sleep with our Bliss collection, crafted with premium materials
                      and balanced support for every stage of your day.
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
                      description:
                        "Our BLISS collection is designed for those in their prime years, offering the perfect balance of luxury and support. Each mattress is crafted with premium memory foam and natural latex layers that contour to your body.",
                    },
                    {
                      id: 2,
                      image: "/hybrid-mattress-with-blue-accent-pillows-bedroom.jpg",
                      title: "Temperature Regulation",
                      description:
                        "Experience cool, comfortable sleep all night long with our advanced cooling technology. Gel-infused foam and breathable covers regulate temperature through every season.",
                    },
                    {
                      id: 3,
                      image: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
                      title: "Complete Sleep System",
                      description:
                        "Pair your mattress with premium accessories to create a sleep environment designed for optimal rest and recovery.",
                    },
                  ].map((slide) => (
                    <CarouselItem key={slide.id} className="pl-2 md:pl-4 basis-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#EED9C4]">
                        {/* Left Side - Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                        </div>

                        {/* Right Side - Text Content with Card */}
                        <div className="space-y-6">
                          <h1 className="text-xl md:text-2xl lg:text-3xl font-medium font-cormorant text-foreground">
                            Ananthala Difference
                          </h1>
                          <div className="text-sm uppercase tracking-wider font-medium text-foreground">
                            BLISS COLLECTION
                          </div>
                          <p className="text-lg leading-relaxed text-foreground">
                            At Ananthala we specifically make products to take care of your sleep health.
                            Every product in our BLISS collection is crafted with premium materials and
                            innovative technology to balance comfort and support.
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
        <section ref={aboutUsSectionRef} className="py-16 px-4 bg-white">
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
                  At Ananthala, we are committed to crafting premium sleep solutions that take care of your
                  health. Our BLISS products are designed with comfort and durability in mind, using only
                  the finest materials and innovative technology.
                </p>
                <p className="text-lg text-foreground leading-relaxed">
                  Every product is expertly crafted to ensure you get the rest you deserve. We believe in
                  quality, support, and putting your well-being first.
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
