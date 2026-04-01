"use client"

import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, IndianRupee } from "lucide-react"

interface ApiProductVariant {
  price: number
}

interface ApiProduct {
  _id: string
  productTitle: string
  category: string
  subCategory?: string
  imageUrls: string[]
  variants: ApiProductVariant[]
  hamperPrice?: number
  productType?: "single" | "hamper"
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [products, setProducts] = useState<ApiProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalMatches, setTotalMatches] = useState(0)

  useEffect(() => {
    let isMounted = true

    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        if (!query.trim()) {
          setProducts([])
          setTotalMatches(0)
          setIsLoading(false)
          return
        }

        // Use the search API for database-driven results
        const params = new URLSearchParams({
          q: query.trim(),
          limit: "100",
        })

        const response = await fetch(`/api/search?${params.toString()}`)
        const data = await response.json()

        if (!response.ok || !data?.success) {
          throw new Error(data?.message || "Failed to fetch products")
        }

        if (isMounted) {
          const searchResults = (data.data || []).map((product: any) => ({
            _id: product.id,
            productTitle: product.name,
            category: product.category,
            subCategory: product.subCategory,
            imageUrls: [product.image],
            variants: product.price ? [{ price: product.price }] : [],
            hamperPrice: product.productType === "hamper" ? product.price : undefined,
            productType: product.productType,
          }))
          setProducts(searchResults)
          setTotalMatches(data.totalMatches || searchResults.length)
        }
      } catch (fetchError: any) {
        if (isMounted) {
          setError(fetchError.message || "Failed to search products")
          setProducts([])
          setTotalMatches(0)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      isMounted = false
    }
  }, [query])

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
    <main className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Search Results
          </h1>
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-3 pl-12 pr-4 border rounded-md text-foreground placeholder:text-foreground/60 focus:outline-none focus:ring-2 focus:ring-foreground/30 transition-all"
                style={{ borderColor: '#D9CFC7' }}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground" />
            </div>
          </form>
          {query && (
            <p className="mt-4 text-foreground/80">
              {products.length} result{products.length !== 1 ? "s" : ""} for "{query}"
            </p>
          )}
        </div>

        {/* Search Results */}
        {query ? (
          isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin mb-4">
                <div className="w-8 h-8 border-4 border-[#D9CFC7] border-t-[#8B5A3C] rounded-full"></div>
              </div>
              <p className="text-foreground/80 text-lg">Searching database...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16 bg-red-50 rounded-lg p-4">
              <p className="text-red-700 font-semibold mb-2">Search Error</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <p className="mb-6 text-foreground/70 text-sm">
                Found {totalMatches} product{totalMatches !== 1 ? "s" : ""} matching "{query}"
              </p>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,300px))] gap-x-8 gap-y-10 justify-center">
                {products.map((product) => {
                  const startingPrice =
                    product.productType === "hamper" && typeof product.hamperPrice === "number"
                      ? product.hamperPrice
                      : product.variants?.[0]?.price || 0
                  return (
                    <div
                      key={product._id}
                      className="border border-[#EED9C4] p-4 hover:shadow-lg transition-shadow bg-white w-full"
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => router.push(`/product/${product._id}`)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            router.push(`/product/${product._id}`)
                          }
                        }}
                        className="block"
                      >
                        <div className="relative aspect-square overflow-hidden mb-3 cursor-pointer">
                          <Image
                            src={product.imageUrls?.[0] || "/placeholder.svg"}
                            alt={product.productTitle}
                            fill
                            className="object-cover hover:scale-105 transition-transform"
                            unoptimized
                          />
                        </div>
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-2 text-center line-clamp-2">{product.productTitle}</h3>
                      {product.subCategory && (
                        <p className="text-xs text-foreground/60 text-center mb-2">{product.subCategory}</p>
                      )}
                      <div className="text-sm font-medium text-foreground mb-3 text-center">
                        {startingPrice > 0 ? (
                          <>
                            Starting at {"\u20B9"}
                            {startingPrice.toLocaleString("en-IN")}
                          </>
                        ) : (
                          <span className="text-foreground/50">Price on request</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => router.push(`/product/${product._id}`)}
                        className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground py-2.5 text-sm rounded-md font-medium transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
              <p className="text-foreground/80 mb-2 text-lg font-semibold">
                No products found
              </p>
              <p className="text-foreground/60 mb-6">
                No products match "{query}". Try different keywords.
              </p>
              <button
                onClick={() => router.push("/")}
                className="inline-block bg-[#8B5A3C] text-white px-6 py-2.5 rounded-md hover:bg-[#6D4530] transition-colors"
              >
                Back to Home
              </button>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <p className="text-foreground/80 mb-4 text-lg">
              Enter a search query to find products
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Suspense fallback={
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center py-16">
              <p className="text-amber-800 mb-4 text-lg">Loading...</p>
            </div>
          </div>
        </main>
      }>
        <SearchContent />
      </Suspense>
      <Footer />
    </div>
  )
}

