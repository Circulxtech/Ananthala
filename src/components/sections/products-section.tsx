import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"

const products = [
  {
    id: 1,
    name: "The Cloud",
    category: "Luxury Plush",
    image: "/luxury-plush-mattress-with-pillows-on-bed.jpg",
    features: ["Memory Foam", "Cooling Gel", "Medium-Soft"],
    price: "$899",
    link: "/products/the-cloud",
  },
  {
    id: 2,
    name: "The Harmony",
    category: "Hybrid Comfort",
    image: "/hybrid-mattress-with-blue-accent-pillows-bedroom.jpg",
    features: ["Pocket Springs", "Latex Layer", "Medium-Firm"],
    price: "$1,199",
    link: "/products/the-harmony",
  },
  {
    id: 3,
    name: "The Support",
    category: "Orthopedic Firm",
    image: "/firm-mattress-with-beige-bedding-modern-bedroom.jpg",
    features: ["Spinal Support", "High Density", "Extra Firm"],
    price: "$1,399",
    link: "/products/the-support",
  },
]

export function ProductsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4A2C1C] mb-4 text-balance">
            Find Your Perfect Mattress
          </h2>
          <p className="text-base md:text-lg text-[#8B5A3C] max-w-3xl mx-auto text-balance">
            Each mattress is expertly crafted with premium materials to ensure the perfect night's sleep, every night.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Image with zoom effect */}
              <div className="relative h-64 md:h-72 overflow-hidden bg-gray-50">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Category */}
                <p className="text-sm md:text-base text-[#8B5A3C] font-medium mb-2">{product.category}</p>

                {/* Product Name */}
                <h3 className="text-xl md:text-2xl font-bold text-[#4A2C1C] mb-4">{product.name}</h3>

                {/* Features List */}
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm md:text-base text-[#6D4530]">
                      <Check className="w-5 h-5 text-[#8B5A3C] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <span className="text-sm text-[#8B5A3C]">From</span>
                    <p className="text-xl md:text-2xl font-bold text-[#4A2C1C]">{product.price}</p>
                  </div>
                  <Link
                    href={product.link}
                    className="text-[#8B5A3C] font-semibold hover:text-[#6D4530] transition-colors inline-flex items-center text-sm md:text-base group"
                  >
                    Learn More
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compare Button */}
        <div className="text-center">
          <Link
            href="/compare"
            className="inline-block bg-[#6D4530] text-white px-8 py-3 md:px-10 md:py-4 rounded-md hover:bg-[#4A2C1C] transition-colors font-semibold text-sm md:text-base shadow-md hover:shadow-lg"
          >
            Compare All Mattresses
          </Link>
        </div>
      </div>
    </section>
  )
}
