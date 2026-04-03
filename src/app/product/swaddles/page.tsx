"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChevronRight } from "lucide-react"
import { type ProductDetail } from "@/data/product-details"
import { type CartItem } from "@/components/cart/cart-drawer"
import { useCart } from "@/contexts/cart-context"
import { SwaddleProductTemplate } from "@/collections/joy/templates/SwaddleProductTemplate"

interface ApiProductVariant {
  weight: number
  length: number
  width: number
  height: number
  fabric: string
  price: number
  stock: number
}

interface ApiProduct {
  _id: string
  productTitle: string
  description: string
  units: string
  category: string
  subCategory?: string
  imageUrls: string[]
  variants: ApiProductVariant[]
  hamperPrice?: number
  status: "visible" | "hidden"
}

const formatVariantSize = (variant: ApiProductVariant) => {
  return `${variant.length}x${variant.width}x${variant.height} cm`
}

const mapApiProductToDetail = (product: ApiProduct): ProductDetail => {
  const variants = Array.isArray(product.variants) ? product.variants : []
  const minVariantPrice = variants.reduce((currentMin, variant) => Math.min(currentMin, variant.price), Number.POSITIVE_INFINITY)
  const startingPrice = Number.isFinite(minVariantPrice) ? minVariantPrice : 0
  const totalStock = variants.reduce((sum, variant) => sum + (variant.stock || 0), 0)

  return {
    id: product._id,
    name: product.productTitle,
    category: product.category,
    price: startingPrice,
    rating: 0,
    reviews: 0,
    description: product.description,
    images: product.imageUrls?.length ? product.imageUrls : ["/placeholder.svg"],
    firmness: "Standard",
    height: variants[0]?.height ? `${variants[0].height} cm` : "Standard",
    materials: [
      `Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`,
      ...(product.subCategory ? [`Collection: ${product.subCategory.charAt(0).toUpperCase() + product.subCategory.slice(1)}`] : []),
    ],
    features: [],
    specifications: {
      Units: product.units,
      Variants: `${variants.length}`,
      "Total Stock": `${totalStock}`,
    },
    sizes: variants.length
      ? variants.map((variant) => ({
          name: formatVariantSize(variant),
          price: variant.price,
        }))
      : [{ name: "Standard", price: startingPrice }],
  }
}

export default function SwaddlesProductPage() {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const { addToCart } = useCart()

  useEffect(() => {
    let isMounted = true

    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/products?category=joy&status=visible")
        const data = await response.json()
        const products: ApiProduct[] = Array.isArray(data?.products) ? data.products : []
        const match = products.find((item) => item.productTitle?.toLowerCase().includes("swaddle"))

        if (!match) {
          throw new Error("Product not found")
        }

        if (isMounted) {
          setProduct(mapApiProductToDetail(match))
          setLoadError(null)
        }
      } catch (error: any) {
        if (isMounted) {
          setProduct(null)
          setLoadError(error.message || "Product not found")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-foreground">Loading product...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-4">
              {loadError || "Product Not Found in database"}
            </h1>
            <Link
              href="/"
              className="px-6 py-2 border text-black hover:opacity-70 transition-opacity"
              style={{ borderColor: "#D9CFC7" }}
            >
              Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = async (item: CartItem) => {
    setIsAddingToCart(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    addToCart(item)
    setIsAddingToCart(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <div className="fixed top-20 left-0 right-0 z-40 bg-white border-b" style={{ borderColor: "#D9CFC7" }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="py-2">
              <ol className="flex items-center gap-2 text-base">
                <li>
                  <Link href="/" className="text-foreground hover:text-[#6D4530] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-foreground/50" />
                </li>
                <li>
                  <Link href="/category/joy" className="text-foreground hover:text-[#6D4530] transition-colors">
                    Joy
                  </Link>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4 text-foreground/50" />
                </li>
                <li className="text-foreground font-medium">
                  {product.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="h-[49px]"></div>

        <div className="max-w-7xl mx-auto px-4 pb-12 mt-8">
          <SwaddleProductTemplate
            product={product}
            productId={product.id}
            onAddToCart={handleAddToCart}
            isAddingToCart={isAddingToCart}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
