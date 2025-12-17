"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { IndianRupee } from "lucide-react"
import { products, type Product } from "@/data/products"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface PopularProductsCarouselProps {
  excludeProductId?: number
}

export function PopularProductsCarousel({ excludeProductId }: PopularProductsCarouselProps) {
  const router = useRouter()
  
  // Get popular products (filter out current product if provided)
  const popularProducts = products
    .filter(product => product.id !== excludeProductId)
    .slice(0, 8) // Show top 8 popular products

  if (popularProducts.length === 0) return null

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  return (
    <section className="py-12 px-4 bg-white border-t" style={{ borderColor: "#D9CFC7" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-serif text-black mb-8">Popular Products</h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {popularProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div
                    onClick={() => handleProductClick(product.id)}
                    className="group cursor-pointer p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="relative aspect-square mb-4 overflow-hidden bg-stone-50">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    <h3 className="mb-1 text-sm text-black group-hover:opacity-70 transition-colors line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <p className="mb-2 text-xs text-gray-600">{product.firmness} Firmness</p>
                    <div className="flex items-center gap-1 text-black">
                      <IndianRupee className="w-3 h-3" />
                      <span className="text-sm font-medium">
                        {product.price.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#D9CFC7" }} />
            <CarouselNext className="right-0 bg-white border-2 shadow-md hover:bg-gray-50" style={{ borderColor: "#D9CFC7" }} />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

