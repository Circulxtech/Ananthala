"use client"

import type { ProductDetail } from "@/data/product-details"
import type { CartItem } from "@/components/cart/cart-drawer"
import { BabyHamperConfigurator } from "@/collections/joy/components/baby-hamper-configurator"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useBabyHamper } from "@/collections/joy/hooks/use-baby-hamper"
import { Sprout, Waves, SprayCan, XCircle, Layers, Grid } from "lucide-react"
import { CustomersAlsoBought } from "@/collections/joy/components/customers-also-bought"

// Testimonial videos data
interface TestimonialVideo {
  id: number
  video: string
  poster: string
  name: string
}

const testimonialVideos: TestimonialVideo[] = [
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
]

interface BabyHamperProductTemplateProps {
  product: ProductDetail
  productId: number
  onAddToCart: (items: CartItem[]) => void
  isAddingToCart: boolean
}

/**
 * Baby Hamper Product Template
 * Complete page structure for baby hamper products with custom layout
 */
export function BabyHamperProductTemplate({
  product,
  productId,
  onAddToCart,
  isAddingToCart,
}: BabyHamperProductTemplateProps) {
  const hamperState = useBabyHamper()
  
  // Get bedsheet dimensions based on mattress size
  const getBedsheetDimensions = () => {
    if (hamperState.standardLength && hamperState.standardBreadth) {
      return `${hamperState.standardLength} x ${hamperState.standardBreadth}`
    }
    return "Standard Size"
  }
  
  // Bedsheet color options
  const bedsheetColors = [
    { value: "cream", label: "Cream" },
    { value: "beige", label: "Beige" },
    { value: "white", label: "White" },
    { value: "gray", label: "Gray" },
  ]
  
  return (
    <div className="space-y-12">
      {/* Breadcrumb - Already handled in parent, but can be customized here if needed */}
      
      {/* Main Product Configuration Section */}
      <BabyHamperConfigurator
        product={product}
        onAddToCart={onAddToCart}
        isAddingToCart={isAddingToCart}
      />

      {/* Product Features & Information Section */}
      <section className="w-full bg-white py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-12 max-w-7xl mx-auto">
            {/* Feature 1: 100% Organic Cotton */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Sprout className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-base md:text-lg font-medium text-foreground">100% Organic Cotton</p>
            </div>

            {/* Feature 2: Maximum Absorbency */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Waves className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-base md:text-lg font-medium text-foreground">Maximum Absorbency</p>
            </div>

            {/* Feature 3: No Artificial Softeners */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <SprayCan className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-base md:text-lg font-medium text-foreground">No Artificial Softeners</p>
            </div>

            {/* Feature 4: Anti-Pill */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <XCircle className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-base md:text-lg font-medium text-foreground">Anti-Pill</p>
            </div>

            {/* Feature 5: Plush, 700 GSM */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Layers className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-base md:text-lg font-medium text-foreground">Plush, 700 GSM</p>
            </div>

            {/* Feature 6: Generously Sized */}
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <Grid className="w-6 h-6 text-foreground stroke-[1.5]" />
              </div>
              <p className="text-base md:text-lg font-medium text-foreground">Generously Sized</p>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="max-w-8xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {/* Description Accordion */}
              <AccordionItem value="description" className="border-2 border-[#EED9C4]  px-4">
                <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed">
                  <p className="mb-4">
                    Our premium baby hamper collection is designed with your little one's comfort and safety in mind. 
                    Each product is crafted using 100% organic cotton, ensuring the softest touch against delicate skin.
                  </p>
                  <p className="mb-4">
                    The hamper includes a carefully selected combination of essential items: a premium mattress, 
                    comfortable topper, cozy lounger, supportive head pillow, and protective pillow bumpers. 
                    All items are designed to work together, creating the perfect sleep environment for your baby.
                  </p>
                  <p>
                    With maximum absorbency and anti-pill technology, these products are built to last while 
                    maintaining their plush, 700 GSM quality. Generously sized to accommodate your growing baby, 
                    ensuring comfort from day one.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Shipping Information Accordion */}
              <AccordionItem value="shipping" className="border-2 border-[#EED9C4] !border-b-2 px-4">
                <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                  Shipping information
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 leading-relaxed">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Delivery Time</h4>
                      <p>
                        Standard delivery: 5-7 business days<br />
                        Express delivery: 2-3 business days (available at checkout)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Shipping Charges</h4>
                      <p>
                        Free shipping on orders above ₹5,000<br />
                        Standard shipping: ₹200<br />
                        Express shipping: ₹500
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Custom Orders</h4>
                      <p>
                        Customized products (with selected dimensions and fabrics) may take 7-10 business days 
                        for production before shipping. You will receive a tracking number once your order ships.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Returns & Exchanges</h4>
                      <p>
                        We offer a 30-day return policy for unused items in original packaging. 
                        Custom orders are non-returnable unless there is a manufacturing defect.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Complimentary Bed Sheet Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-center font-medium text-foreground mb-4 font-cormorant">
            Bed Sheet <span className="text-lg font-normal text-foreground">(Complimentary)</span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-8">
            <div className="relative aspect-[4/3] overflow-hidden w-full">
              <Image
                src="/bedsheet.jpg"
                alt="Bed Sheet"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6 w-full p-6 bg-white border-2 border-[#EED9C4]">
              <div>
                <label className="text-lg font-medium text-foreground mb-2 block">Color</label>
                <Select value={hamperState.bedSpreadColor} onValueChange={hamperState.setBedSpreadColor}>
                  <SelectTrigger className="w-full text-foreground">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    {bedsheetColors.map((color) => (
                      <SelectItem key={color.value} value={color.value} className="text-foreground">
                        {color.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-[#EED9C4]/30 p-3 rounded border border-[#EED9C4]/50">
                <p className="text-foreground/70 text-sm flex items-center gap-2">
                  <span className="font-semibold">Dimensions:</span>
                  <span>{getBedsheetDimensions()}</span>
                  <span className="text-xs">(Based on mattress size)</span>
                </p>
              </div>
              <div className="bg-[#EED9C4]/30 p-3 rounded border border-[#EED9C4]/50">
                <p className="text-foreground/70 text-sm">
                  This complimentary bed sheet will be automatically added to your cart. The dimensions will match your selected mattress size.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Feature 1: Softer, Smoother Slumber */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square overflow-hidden max-w-md mx-auto lg:mx-0">
              <Image
                src="/cotton.jpg"
                alt="Softer, Smoother Slumber"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-medium text-foreground mb-4 font-cormorant">
                SOFTER, SMOOTHER SLUMBER
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Woven using a 4 under 1 sateen weave that imparts a silky-smooth finish and a subtle sheen, while maintaining its strength, the resultant sheets are both elegant and long-lasting.
              </p>
            </div>
          </div>

          {/* Feature 2: 100% Organic Cotton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-medium text-foreground mb-4 font-cormorant">
                100% ORGANIC COTTON
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Crafted from the rarest 100% organic cotton, sourced directly from farms to ensure premium quality. The extra-long staple cotton enhances the smoothness and breathability, offering a luxurious feel and a healthier sleeping environment.
              </p>
            </div>
            <div className="relative aspect-square overflow-hidden max-w-md mx-auto lg:mx-0">
              <Image
                src="/cotton.jpg"
                alt="100% Organic Cotton"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Feature 3: Highly Breathable */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square overflow-hidden max-w-md mx-auto lg:mx-0">
              <Image
                src="/cotton.jpg"
                alt="Highly Breathable"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-medium text-foreground mb-4 font-cormorant">
                HIGHLY BREATHABLE
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Unlike synthetic options that can trap heat and block aeration, our organic bed sheets offer superior breathability. This natural airflow helps to regulate temperature and wick away moisture, ensuring a cooler, more comfortable sleep and reducing the need for restless tossing and turning.
              </p>
            </div>
          </div>

          {/* Feature 4: Say Good-bye to Fuzz Balls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-medium text-foreground mb-4 font-cormorant">
                SAY GOOD-BYE TO FUZZ BALLS
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Designed for durability, our bed sheets feature a single-ply yarn with a 300 thread count, which helps prevent pilling. This construction ensures that the sheets retain their pristine appearance and texture, even after frequent use and washing.
              </p>
            </div>
            <div className="relative aspect-square overflow-hidden max-w-md mx-auto lg:mx-0">
              <Image
                src="/cotton.jpg"
                alt="Say Good-bye to Fuzz Balls"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Also Bought Section */}
      <CustomersAlsoBought currentProductId={productId} />

      {/* Customer Testimonials Video Carousel Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-4xl lg:text-4xl font-medium text-foreground mb-4 text-balance">
              What Our Divas Say
            </h2>
            <p className="text-xl sm:text-2xl text-foreground font-medium">Join thousands of happy sleepers</p>
          </div>

          {/* Video Carousel */}
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonialVideos.map((testimonial) => (
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
                      <p className="text-left text-foreground font-semibold text-lg">
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

          {/* Rating Summary */}
          <div className="text-center mt-8">
            <p className="text-foreground text-lg font-semibold">Rated 4.9/5 from over 10,000 reviews</p>
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
    </div>
  )
}
