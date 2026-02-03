"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "BED SHEETS",
    image: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
    position: "center",
  },
  {
    id: 2,
    name: "BATH TOWELS",
    image: "/hybrid-mattress-with-blue-accent-pillows-bedroom.jpg",
    position: "center",
  },
  {
    id: 3,
    name: "BLANKETS",
    image: "/firm-mattress-with-beige-bedding-modern-bedroom.jpg",
    position: "center",
  },
  {
    id: 4,
    name: "PILLOWS",
    image: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
    position: "center",
  },
]

export function ProductsSection() {
  const router = useRouter()

  const getCategoryPath = (productName: string) => {
    const name = productName.toLowerCase()
    if (name.includes("pillow")) return "/category/grace"
    if (name.includes("bed sheet") || name.includes("blanket")) return "/category/grace"
    if (name.includes("towel")) return "/category/grace"
    return "/category/grace"
  }

  const onNavigate = (productName: string) => {
    const path = getCategoryPath(productName)
    router.push(path)
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="mb-4 text-4xl font-semibold"
            style={{ color: "#000000" }}
          >
            Find Your Perfect Mattress
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{ color: "#000000" }}
          >
            Each mattress is expertly crafted with premium
            materials to ensure the perfect night's sleep,
            every night.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {products.map((product) => {
            const positionClasses = {
              center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "bottom-right": "bottom-6 left-1/2 -translate-x-1/2",
              "bottom-left": "bottom-6 left-1/2 -translate-x-1/2",
            }

            return (
              <button
                key={product.id}
                onClick={() => onNavigate(product.name)}
                className="relative group overflow-hidden aspect-3/4 cursor-pointer bg-gray-100"
              >
                {/* Image placeholder - replace with actual Image component when images are ready */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image Placeholder</span>
                </div>
                {/* Uncomment when images are ready:
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                */}
                <div className={`absolute ${positionClasses[product.position as keyof typeof positionClasses]}`}>
                  <div className="bg-white px-6 py-3 text-center">
                    <span
                      className="tracking-wider text-sm md:text-base font-normal uppercase"
                      style={{ color: "#000000", fontFamily: '"Playfair Display", serif' }}
                    >
                      {product.name}
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
