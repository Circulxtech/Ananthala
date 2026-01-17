"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { IndianRupee } from "lucide-react"
import { getProductDetailById } from "@/data/product-details"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface CustomersAlsoBoughtProps {
  currentProductId: number
}

// Joy + Bliss product IDs
const relatedProductIds = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]

export function CustomersAlsoBought({ currentProductId }: CustomersAlsoBoughtProps) {
  const router = useRouter()
  
  // Get all joy + bliss products excluding the current one
  const relatedProducts = relatedProductIds
    .filter(id => id !== currentProductId)
    .map(id => getProductDetailById(id))
    .filter((product): product is NonNullable<typeof product> => product !== undefined)
    .slice(0, 8) // Show up to 8 products

  if (relatedProducts.length === 0) return null

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground mb-4 ">
            What Our Customers Also Bought
          </h2>
          <p className="text-xl sm:text-2xl text-foreground font-medium">
            Discover more from our Joy & Bliss collections
          </p>
        </div>
        
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {relatedProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/2 md:basis-1/4 lg:basis-1/4"
                >
                  <div
                    onClick={() => handleProductClick(product.id)}
                    className="group cursor-pointer p-4 hover:shadow-lg transition-shadow border"
                    style={{ borderColor: "#EED9C4" }}
                  >
                    <div className="relative aspect-square mb-4 overflow-hidden bg-stone-50">
                      <Image
                        src={product.images[0] || "/placeholder.jpg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <h3 className="mb-1 text-base md:text-lg text-foreground group-hover:opacity-70 transition-colors line-clamp-2 min-h-10 font-medium">
                      {product.name}
                    </h3>
                  
                    <div className="flex items-center gap-1 text-foreground">
                      <IndianRupee className="w-4 h-4" />
                      <span className="text-base md:text-lg font-medium">
                        {product.price.toLocaleString("en-IN", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleProductClick(product.id)
                      }}
                      className="mt-3 w-full bg-[#EED9C4] text-foreground text-sm md:text-base py-2 hover:bg-[#D9BB9B] transition-colors"
                    >
                      Customize
                    </button>
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
  )
}
