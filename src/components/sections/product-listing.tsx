"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  ChevronDown,
  SlidersHorizontal,
  IndianRupee,
} from "lucide-react"
import { products, type Product } from "@/data/products"

interface ProductListingProps {
  category?: string
}

export function ProductListing({ category }: ProductListingProps) {
  const router = useRouter()
  const [filterOpen, setFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const [selectedFirmness, setSelectedFirmness] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000])

  const firmnesses = ["Plush", "Medium", "Medium-Firm", "Firm"]

  // Filter products by category if provided
  let filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products

  // Apply filters
  filteredProducts = filteredProducts.filter((product) => {
    if (
      selectedFirmness.length > 0 &&
      !selectedFirmness.includes(product.firmness)
    ) {
      return false
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }
    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    return 0
  })

  const toggleFirmness = (firmness: string) => {
    if (selectedFirmness.includes(firmness)) {
      setSelectedFirmness(selectedFirmness.filter((f) => f !== firmness))
    } else {
      setSelectedFirmness([...selectedFirmness, firmness])
    }
  }

  const clearFilters = () => {
    setSelectedFirmness([])
    setPriceRange([0, 3000])
  }

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  const getCategoryTitle = () => {
    if (category === "mattress") return "Premium Mattresses"
    if (category === "baby") return "Baby Mattresses"
    return "All Products"
  }

  const getCategoryDescription = () => {
    if (category === "mattress")
      return "Discover the perfect mattress for your best sleep"
    if (category === "baby")
      return "Safe and comfortable mattresses for your little ones"
    return "Browse our complete collection of premium sleep products"
  }

  return (
    <main className="pt-16">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="mb-2 text-4xl text-center text-black">
            {getCategoryTitle()}
          </h1>
          <p className="text-black text-center text-xl">
            {getCategoryDescription()}
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter & Sort Bar */}
        <div className="flex items-center justify-between mb-8 pb-4">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 border text-black hover:bg-stone-50 transition-colors"
            style={{ borderColor: '#D9CFC7' }}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {(selectedFirmness.length > 0 ||
              priceRange[0] > 0 ||
              priceRange[1] < 3000) && (
              <span className="w-2 h-2 bg-amber-900 rounded-full"></span>
            )}
          </button>
          <div className="flex items-center gap-2">
            <span className="text-black">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border text-black bg-white cursor-pointer hover:bg-stone-50 transition-colors"
                style={{ borderColor: '#D9CFC7' }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {filterOpen && (
            <aside className="w-64 shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-black">Filters</h3>
                  {(selectedFirmness.length > 0 ||
                    priceRange[0] > 0 ||
                    priceRange[1] < 3000) && (
                    <button
                      onClick={clearFilters}
                      className="text-black hover:opacity-70 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Firmness Filter */}
                <div className="mb-8 pb-8">
                  <h4 className="mb-4 text-black">Firmness Level</h4>
                  <div className="space-y-3">
                    {firmnesses.map((firmness) => (
                      <label
                        key={firmness}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFirmness.includes(firmness)}
                          onChange={() => toggleFirmness(firmness)}
                          className="w-4 h-4 text-amber-900 focus:ring-amber-900"
                        />
                        <span className="text-black group-hover:opacity-70 transition-colors">
                          {firmness}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-8">
                  <h4 className="mb-4 text-black">Price Range</h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full accent-amber-900"
                    />
                    <div className="flex items-center justify-between text-black">
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        <span>{priceRange[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        <span>{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <p className="mb-6 text-black">
              {sortedProducts.length}{" "}
              {sortedProducts.length === 1 ? "product" : "products"}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square mb-4 overflow-hidden bg-stone-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="mb-2 text-black group-hover:opacity-70 transition-colors">
                    {product.name}
                  </h3>
                  <p className="mb-1 text-black">{product.firmness} Firmness</p>
                  <div className="flex items-center gap-1 text-black">
                    <IndianRupee className="w-4 h-4" />
                    <span>{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              ))}
            </div>
            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-black mb-4">
                  No products match your filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-amber-900 text-white hover:bg-amber-950 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

