"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { products } from "@/data/products"
import Image from "next/image"

interface SearchDropdownProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
}

export function SearchDropdown({ isOpen, onClose, onSearch }: SearchDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<typeof products>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter products based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([])
      return
    }

    setIsLoading(true)
    const searchLower = searchQuery.toLowerCase()

    // Filter products by name, category, or firmness
    const filtered = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(searchLower)
      const matchesCategory = product.category.toLowerCase().includes(searchLower)
      const matchesFirmness = product.firmness.toLowerCase().includes(searchLower)
      const matchesSize = product.size.some((s) => s.toLowerCase().includes(searchLower))

      return matchesName || matchesCategory || matchesFirmness || matchesSize
    })

    // Limit to 5 results for dropdown and sort by relevance
    const sorted = filtered.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().startsWith(searchLower)
      const bNameMatch = b.name.toLowerCase().startsWith(searchLower)
      
      if (aNameMatch && !bNameMatch) return -1
      if (!aNameMatch && bNameMatch) return 1
      return 0
    })
    
    setFilteredProducts(sorted.slice(0, 5))
    setIsLoading(false)
  }, [searchQuery])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      onClose()
    }
  }

  // Handle product click - navigate to product detail page
  const handleProductClick = (productId: number | string) => {
    // Only navigate if ID is valid
    if (productId && productId.toString().trim()) {
      router.push(`/product/${productId}`)
      setSearchQuery("")
      onClose()
    }
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Focus input when opening
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-40">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20"
        onClick={onClose}
      />

      {/* Search Box */}
      <div className="fixed top-0 left-0 right-0 pt-4 px-4 z-50">
        <div className="max-w-4xl mx-auto" ref={dropdownRef}>
          <form onSubmit={handleSearch} className="relative">
            <div className="relative bg-white rounded-lg shadow-lg border" style={{ borderColor: "#D9CFC7" }}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name, type, size, or firmness..."
                className="w-full px-4 py-4 pl-12 pr-12 bg-white text-foreground placeholder:text-foreground/60 focus:outline-none text-lg rounded-lg"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#F5F1ED] rounded"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {searchQuery.trim() && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-96 overflow-y-auto" style={{ borderColor: "#D9CFC7" }}>
                {isLoading ? (
                  <div className="px-4 py-6 text-center text-[#8B5A3C]">
                    <div className="inline-block animate-spin">
                      <div className="w-6 h-6 border-2 border-[#D9CFC7] border-t-[#8B5A3C] rounded-full"></div>
                    </div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="divide-y" style={{ borderColor: "#D9CFC7" }}>
                    {/* Products List */}
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => handleProductClick(product.id)}
                        className="w-full px-4 py-3 hover:bg-[#F5F1ED] transition-colors text-left flex gap-3 items-center group"
                      >
                        {/* Product Image */}
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-stone-50">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            unoptimized
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-[#6D4530] group-hover:text-[#8B5A3C] text-sm line-clamp-1">
                            {product.name}
                          </h4>
                          <p className="text-xs text-[#A0826D] mb-1">
                            {product.category.charAt(0).toUpperCase() + product.category.slice(1)} • {product.firmness}
                          </p>
                          <p className="font-semibold text-[#8B5A3C] text-sm">
                            ₹{product.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                        </div>

                        {/* Rating */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-sm font-semibold text-[#8B5A3C]">
                            ⭐ {product.rating}
                          </div>
                        </div>
                      </button>
                    ))}

                    {/* View All Results Button */}
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="w-full px-4 py-3 text-center font-semibold text-[#8B5A3C] hover:bg-[#F5F1ED] transition-colors text-sm"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center text-[#8B5A3C]">
                    <p className="text-sm">No products found matching "{searchQuery}"</p>
                    <p className="text-xs text-[#A0826D] mt-1">Try different keywords</p>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
