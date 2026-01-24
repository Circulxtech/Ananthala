"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useState } from "react"
import { getProductDetailById } from "@/data/product-details"
import { type CartItem } from "@/components/cart/cart-drawer"
import { useCart } from "@/contexts/cart-context"
import { getProductType, isBlissProduct, isGraceProduct, isJoyProduct } from "@/utils/product-type"
import { BabyHamperProductTemplate } from "@/collections/joy/templates/BabyHamperProductTemplate"
import { KidsHamperProductTemplate } from "@/collections/joy/templates/KidsHamperProductTemplate"
import { IndividualProductTemplate } from "./templates/IndividualProductTemplate"
import { MattressProductTemplate } from "@/collections/joy/templates/MattressProductTemplate"
import { TopperProductTemplate } from "@/collections/joy/templates/TopperProductTemplate"
import { LoungerProductTemplate } from "@/collections/joy/templates/LoungerProductTemplate"
import { HeadPillowProductTemplate } from "@/collections/joy/templates/HeadPillowProductTemplate"
import { PillowBumpersProductTemplate } from "@/collections/joy/templates/PillowBumpersProductTemplate"
import { BlissMattressProductTemplate } from "@/collections/bliss/templates/BlissMattressProductTemplate"
import { BlissTopperProductTemplate } from "@/collections/bliss/templates/BlissTopperProductTemplate"
import { BlissLoungerProductTemplate } from "@/collections/bliss/templates/BlissLoungerProductTemplate"
import { BlissHeadPillowProductTemplate } from "@/collections/bliss/templates/BlissHeadPillowProductTemplate"
import { GraceMattressProductTemplate } from "@/collections/grace/templates/GraceMattressProductTemplate"
import { GraceTopperProductTemplate } from "@/collections/grace/templates/GraceTopperProductTemplate"
import { GraceLoungerProductTemplate } from "@/collections/grace/templates/GraceLoungerProductTemplate"
import { GraceHeadPillowProductTemplate } from "@/collections/grace/templates/GraceHeadPillowProductTemplate"
import { SimpleProductConfigurator } from "@/components/product/simple-product-configurator"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  const product = getProductDetailById(productId)

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-4">
              Product Not Found in database
            </h1>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 border text-black hover:opacity-70 transition-opacity"
              style={{ borderColor: "#D9CFC7" }}
            >
              Back to Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const productType = getProductType(productId)
  const isBabyProduct = product.category === "baby"
  const isJoy = isJoyProduct(productId)
  const isBliss = isBlissProduct(productId)
  const isGrace = isGraceProduct(productId)
  
  // Shared state
  const [activeTab, setActiveTab] = useState<"features" | "specs">("features")
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const { addToCart } = useCart()

  // Color scheme
  const colors = isBabyProduct
    ? {
        bg50: "#FAF7F3",
        bg100: "#F0E4D3",
        border: "#DCC5B2",
        accent: "#D9A299",
        accentHover: "#C9928A",
        text: "#8B6F5C",
        textDark: "#6B5647",
        textLight: "#A08876",
      }
    : {
        bg50: "#F9F8F6",
        bg100: "#EFE9E3",
        border: "#D9CFC7",
        accent: "#6B563F",
        accentHover: "#B09A7D",
        text: "#6B563F",
        textDark: "#5A4A3A",
        textLight: "#B09A7D",
      }

  // Handle add to cart - delegates to appropriate configurator
  const handleAddToCart = async (items: CartItem | CartItem[]) => {
    setIsAddingToCart(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const itemsArray = Array.isArray(items) ? items : [items]
    itemsArray.forEach(item => addToCart(item))
    
    setIsAddingToCart(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Breadcrumb */}
        {(isJoy || isGrace) && !isBliss ? (
          <>
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
                      <Link
                        href={isGrace ? "/category/grace" : "/category/joy"}
                        className="text-foreground hover:text-[#6D4530] transition-colors"
                      >
                        {isGrace ? "Grace" : "Joy"}
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
          </>
        ) : (
          <div className="py-3 border-b" style={{ backgroundColor: "white", borderColor: colors.border }}>
            <div className="w-full px-4">
              <nav aria-label="Breadcrumb">
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
                    {isBliss ? (
                      <Link href="/category/bliss" className="text-foreground hover:text-[#6D4530] transition-colors">
                        Bliss
                      </Link>
                    ) : isGrace ? (
                      <Link href="/category/grace" className="text-foreground hover:text-[#6D4530] transition-colors">
                        Grace
                      </Link>
                    ) : (
                      <Link href="/category/grace" className="text-foreground hover:text-[#6D4530] transition-colors">
                        Products
                      </Link>
                    )}
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
        )}

        <div className={`max-w-7xl mx-auto px-4 ${isJoy || isBliss || isGrace ? "pb-12 mt-8" : "py-12"}`}>
          {/* Product Templates - Complete page structure for each product type */}
          {productType === "baby-hamper" && (
            <BabyHamperProductTemplate
              product={product}
              productId={productId}
              onAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
            />
          )}
          
          {productType === "kids-hamper" && (
            <KidsHamperProductTemplate
              product={product}
              productId={productId}
              onAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
            />
          )}
          
          {productType === "individual-baby" && (
            <IndividualProductTemplate
              product={product}
              productId={productId}
              onAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
            />
          )}
          
          {productType === "mattress" && (
            isBliss ? (
              <BlissMattressProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : isGrace ? (
              <GraceMattressProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : (
              <MattressProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            )
          )}
          
          {productType === "topper" && (
            isBliss ? (
              <BlissTopperProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : isGrace ? (
              <GraceTopperProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : (
              <TopperProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            )
          )}
          
          {productType === "lounger" && (
            isBliss ? (
              <BlissLoungerProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : isGrace ? (
              <GraceLoungerProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : (
              <LoungerProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            )
          )}
          
          {productType === "head-pillow" && (
            isBliss ? (
              <BlissHeadPillowProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : isGrace ? (
              <GraceHeadPillowProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : (
              <HeadPillowProductTemplate
                product={product}
                productId={productId}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            )
          )}
          
          {productType === "pillow-bumpers" && (
            <PillowBumpersProductTemplate
              product={product}
              productId={productId}
              onAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
            />
          )}
          
          {productType === "simple" && (
            <>
              <SimpleProductConfigurator
                product={product}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
                colors={colors}
              />

              {/* Product Details Tabs - Only for simple products */}
              <div
                className="mt-16 border-t pt-12"
                style={{ borderColor: colors.border }}
              >
                <div
                  className="flex gap-8 mb-8 border-b"
                  style={{ borderColor: colors.border }}
                >
                  <button
                    onClick={() => setActiveTab("features")}
                    className="pb-4 transition-colors relative text-black text-lg font-medium"
                  >
                    Features & Materials
                    {activeTab === "features" && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: colors.accent }}
                      ></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("specs")}
                    className="pb-4 transition-colors relative text-black text-lg font-medium"
                  >
                    Specifications
                    {activeTab === "specs" && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: colors.accent }}
                      ></div>
                    )}
                  </button>
                </div>

                {activeTab === "features" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="mb-4 text-black">Key Features</h3>
                      <ul className="space-y-3">
                        {product.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 mt-0.5 shrink-0 text-black text-lg" />
                            <span className="text-black">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-4 text-black">Materials</h3>
                      <ul className="space-y-3">
                        {product.materials.map((material: string, index: number) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full mt-2 shrink-0 bg-black text-lg"></div>
                            <span className="text-black">{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "specs" && (
                  <div className="max-w-3xl">
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div
                          key={key}
                          className="grid grid-cols-2 gap-4 py-4 border-b last:border-0"
                          style={{ borderColor: colors.border }}
                        >
                          <span className="text-black">{key}</span>
                          <span className="text-black">{value as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      
    </div>
  )
}
