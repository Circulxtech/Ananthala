"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, ChevronRight } from "lucide-react"
import Image from "next/image"

interface SearchDropdownProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (query: string) => void
}

interface SearchProduct {
  id: string
  name: string
  description?: string
  category?: string
  subCategory?: string
  image?: string
  price?: number
}

export function SearchDropdown({ isOpen, onClose, onSearch }: SearchDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<SearchProduct[]>([])
  const [allFilteredProducts, setAllFilteredProducts] = useState<SearchProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [showMore, setShowMore] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const resultsContainerRef = useRef<HTMLDivElement>(null)

  const toTitleCase = (value?: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : ""

  // Filter products based on search query with better relevance scoring
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts([])
      setAllFilteredProducts([])
      setSelectedIndex(-1)
      setShowMore(false)
      return
    }

    const controller = new AbortController()
    const timeout = window.setTimeout(async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery.trim())}&limit=20`,
          { signal: controller.signal },
        )
        const data = await response.json()
        const results: SearchProduct[] = Array.isArray(data?.data) ? data.data : []
        setAllFilteredProducts(results)
        setFilteredProducts(results.slice(0, 6))
        setSelectedIndex(-1)
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setAllFilteredProducts([])
          setFilteredProducts([])
          setSelectedIndex(-1)
        }
      } finally {
        setIsLoading(false)
      }
    }, 200)

    return () => {
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [searchQuery])

  // Handle search submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      onClose()
    }
  }

  // Handle product click - navigate to product detail page
  const handleProductClick = (productId: number | string) => {
    if (productId && productId.toString().trim()) {
      router.push(`/product/${productId}`)
      setSearchQuery("")
      onClose()
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const displayProducts = showMore ? allFilteredProducts : filteredProducts

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < displayProducts.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < displayProducts.length) {
          handleProductClick(displayProducts[selectedIndex].id)
        } else if (searchQuery.trim()) {
          handleSearch()
        }
        break
      case "Escape":
        e.preventDefault()
        onClose()
        break
      default:
        break
    }
  }

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsContainerRef.current) {
      const items = resultsContainerRef.current.querySelectorAll("button[data-product-item]")
      if (items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({ block: "nearest" })
      }
    }
  }, [selectedIndex])

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
      <div className="fixed top-0 left-0 right-0 pt-2 sm:pt-4 px-2 sm:px-4 z-50">
        <div className="max-w-4xl mx-auto" ref={dropdownRef}>
          <form onSubmit={handleSearch} className="relative">
            <div className="relative bg-white rounded-lg shadow-lg border" style={{ borderColor: "#D9CFC7" }}>
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                className="w-full px-3 sm:px-4 py-3 sm:py-4 pl-10 sm:pl-12 pr-10 sm:pr-12 bg-white text-foreground placeholder:text-foreground/60 focus:outline-none text-sm sm:text-lg rounded-lg"
                autoComplete="off"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#F5F1ED] rounded"
                >
                  <X className="w-4 sm:w-5 h-4 sm:h-5 text-foreground" />
                </button>
              )}
            </div>

            {/* Dropdown Results */}
            {searchQuery.trim() && (
              <div 
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border max-h-96 sm:max-h-[450px] overflow-hidden flex flex-col z-50" 
                style={{ borderColor: "#D9CFC7" }}
              >
                {isLoading ? (
                  <div className="px-3 sm:px-4 py-6 text-center text-[#8B5A3C]">
                    <div className="inline-block animate-spin">
                      <div className="w-6 h-6 border-2 border-[#D9CFC7] border-t-[#8B5A3C] rounded-full"></div>
                    </div>
                    <p className="text-xs sm:text-sm mt-2">Searching...</p>
                  </div>
                ) : (showMore ? allFilteredProducts : filteredProducts).length > 0 ? (
                  <>
                    {/* Products List */}
                    <div ref={resultsContainerRef} className="overflow-y-auto flex-1 divide-y" style={{ borderColor: "#D9CFC7" }}>
                      {(showMore ? allFilteredProducts : filteredProducts).map((product, index) => (
                        <button
                          key={product.id}
                          type="button"
                          data-product-item
                          onClick={() => handleProductClick(product.id)}
                          className={`w-full px-2 sm:px-3 py-2 sm:py-2.5 transition-all text-left flex gap-2 sm:gap-3 items-center group ${
                            selectedIndex === index
                              ? "bg-[#EED9C4] border-l-4 border-[#8B5A3C] pl-1 sm:pl-2"
                              : "hover:bg-[#F5F1ED] border-l-4 border-transparent"
                          }`}
                        >
                          {/* Product Image */}
                          <div className="relative w-10 sm:w-12 h-10 sm:h-12 flex-shrink-0 rounded overflow-hidden bg-stone-50">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                              unoptimized
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-semibold text-xs sm:text-sm line-clamp-1 ${
                              selectedIndex === index ? "text-[#8B5A3C]" : "text-[#6D4530]"
                            }`}>
                              {product.name}
                            </h4>
                          <div className="flex items-center justify-between gap-1 sm:gap-2">
                            <p className="text-xs text-[#A0826D] line-clamp-1">
                              {toTitleCase(product.category)}
                              {product.subCategory ? ` • ${toTitleCase(product.subCategory)}` : ""}
                            </p>
                            <p className="font-semibold text-[#8B5A3C] text-xs flex-shrink-0">
                              ₹
                              {Number.isFinite(product.price)
                                ? product.price.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
                                : "0"}
                            </p>
                          </div>
                          </div>

                          {/* Arrow Indicator */}
                          {selectedIndex === index && (
                            <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 text-[#8B5A3C] flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Show More Button */}
                    {allFilteredProducts.length > 6 && !showMore && (
                      <button
                        type="button"
                        onClick={() => setShowMore(true)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold text-[#8B5A3C] hover:bg-[#F5F1ED] transition-colors text-xs sm:text-sm border-t"
                        style={{ borderColor: "#D9CFC7" }}
                      >
                        Show {allFilteredProducts.length - 6} more
                      </button>
                    )}
                    
                    {/* View Full Search Results */}
                    {filteredProducts.length > 0 && (
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-center font-semibold text-white bg-gradient-to-r from-[#8B5A3C] to-[#6D4530] hover:from-[#9B6A4C] hover:to-[#7D5440] transition-colors text-xs sm:text-sm"
                      >
                        View all results
                      </button>
                    )}
                  </>
                ) : (
                  <div className="px-3 sm:px-4 py-6 sm:py-8 text-center text-[#8B5A3C]">
                    <Search className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-xs sm:text-sm font-semibold">No products found</p>
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
