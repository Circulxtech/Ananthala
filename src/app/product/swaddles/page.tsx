"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChevronRight } from "lucide-react"
import { getProductDetailById } from "@/data/product-details"
import { type CartItem } from "@/components/cart/cart-drawer"
import { useCart } from "@/contexts/cart-context"
import { SwaddleProductTemplate } from "@/collections/joy/templates/SwaddleProductTemplate"

export default function SwaddlesProductPage() {
  const productId = 14
  const product = getProductDetailById(productId)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-4">
              Product Not Found in database
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
            productId={productId}
            onAddToCart={handleAddToCart}
            isAddingToCart={isAddingToCart}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
