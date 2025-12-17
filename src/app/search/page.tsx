"use client"

import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductListing } from "@/components/sections/product-listing"
import { useState, useEffect } from "react"
import { products, type Product } from "@/data/products"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, IndianRupee } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    if (!query) return false
    const searchLower = query.toLowerCase()
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.firmness.toLowerCase().includes(searchLower)
    )
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-amber-950 mb-4">
              Search Results
            </h1>
            <form onSubmit={handleSearch} className="max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 pl-12 pr-4 border rounded-md text-amber-900 placeholder:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-900/30 transition-all"
                  style={{ borderColor: '#D9CFC7' }}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-600" />
              </div>
            </form>
            {query && (
              <p className="mt-4 text-amber-800">
                {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""} for "{query}"
              </p>
            )}
          </div>

          {/* Search Results */}
          {query ? (
            filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => router.push(`/product/${product.id}`)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-square mb-4 overflow-hidden bg-stone-50 rounded-lg">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="bg-white px-3 py-1 text-amber-950 rounded">
                          ⭐ {product.rating}
                        </div>
                      </div>
                    </div>
                    <h3 className="mb-2 text-amber-950 group-hover:text-amber-700 transition-colors font-semibold">
                      {product.name}
                    </h3>
                    <p className="mb-1 text-amber-800 text-sm">
                      {product.firmness} Firmness
                    </p>
                    <div className="flex items-center gap-1 text-amber-950 font-bold">
                      <IndianRupee className="w-4 h-4" />
                      <span>{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-amber-800 mb-4 text-lg">
                  No products found for "{query}"
                </p>
                <p className="text-amber-600">
                  Try searching with different keywords
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <p className="text-amber-800 mb-4 text-lg">
                Enter a search query to find products
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

