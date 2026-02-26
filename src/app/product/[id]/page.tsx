"use client"

import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { getProductDetailById, type ProductDetail } from "@/data/product-details"
import { type CartItem } from "@/components/cart/cart-drawer"
import { useCart } from "@/contexts/cart-context"
import { getProductType, isBlissProduct, isGraceProduct, isJoyProduct } from "@/utils/product-type"
import { fabricOptions } from "@/data/fabric"
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
import { ProductConfigurator } from "@/components/product/product-configurator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ApiProductVariant {
  weight: number
  length: number
  width: number
  height: number
  fabric: string
  price: number
  stock: number
}

interface ApiProductDetailSection {
  title: string
  body: string
  imageUrl?: string
  imageAlt?: string
  imagePosition?: "left" | "right"
}

interface ApiProduct {
  _id: string
  productTitle: string
  description: string
  units: string
  sellerName: string
  sellerEmail: string
  location: string
  category: string
  subCategory?: string
  imageUrls: string[]
  variants: ApiProductVariant[]
  detailSections?: ApiProductDetailSection[]
  status: "visible" | "hidden"
}

const toTitleCase = (value: string) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : value)
const getFabricLabel = (fabricId: string) => fabricOptions.find((fabric) => fabric.id === fabricId)?.name || fabricId

const formatVariantSize = (variant: ApiProductVariant) => {
  return `${variant.length}x${variant.width}x${variant.height} cm`
}

const mapApiProductToDetail = (product: ApiProduct): ProductDetail => {
  const variants = Array.isArray(product.variants) ? product.variants : []
  const minPrice = variants.reduce((currentMin, variant) => Math.min(currentMin, variant.price), Number.POSITIVE_INFINITY)
  const startingPrice = Number.isFinite(minPrice) ? minPrice : 0
  const totalStock = variants.reduce((sum, variant) => sum + (variant.stock || 0), 0)
  const uniqueFabrics = Array.from(new Set(variants.map((variant) => variant.fabric).filter(Boolean)))
  const features = [
    product.sellerName ? `Seller: ${product.sellerName}` : null,
    product.location ? `Location: ${product.location}` : null,
    uniqueFabrics.length ? `Fabrics: ${uniqueFabrics.map(getFabricLabel).join(", ")}` : null,
  ].filter(Boolean) as string[]

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
      `Category: ${toTitleCase(product.category)}`,
      ...(product.subCategory ? [`Collection: ${toTitleCase(product.subCategory)}`] : []),
    ],
    features,
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

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const rawId = params.id as string
  const isNumericId = /^\d+$/.test(rawId)
  const numericId = isNumericId ? Number(rawId) : null
  const staticProduct = numericId !== null ? getProductDetailById(numericId) : undefined

  const [apiProduct, setApiProduct] = useState<ProductDetail | null>(null)
  const [rawApiProduct, setRawApiProduct] = useState<ApiProduct | null>(null)
  const [isLoading, setIsLoading] = useState(!staticProduct)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"features" | "specs">("features")
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    if (staticProduct) {
      setApiProduct(null)
      setRawApiProduct(null)
      setIsLoading(false)
      setLoadError(null)
      return
    }

    let isMounted = true

    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setLoadError(null)
        const response = await fetch(`/api/products/${rawId}`)
        const data = await response.json()

        if (!response.ok || !data?.success) {
          throw new Error(data?.message || "Product not found")
        }

        if (data.product?.status === "hidden") {
          throw new Error("This product is not currently available.")
        }

        if (isMounted) {
          const productData = data.product as ApiProduct
          setRawApiProduct(productData)
          setApiProduct(mapApiProductToDetail(productData))
        }
      } catch (error: any) {
        if (isMounted) {
          setLoadError(error.message || "Product not found")
          setApiProduct(null)
          setRawApiProduct(null)
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
  }, [rawId, staticProduct])

  const product = staticProduct ?? apiProduct
  const productId = staticProduct ? numericId : null

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-foreground">
            <Loader2 className="mx-auto mb-4 h-6 w-6 animate-spin" />
            Loading product details...
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

  const productType = productId !== null ? getProductType(productId) : "simple"
  const isBabyProduct = product.category === "baby"
  const categorySlug = (rawApiProduct?.subCategory || rawApiProduct?.category || product.category || "").toLowerCase()
  const isJoy = productId !== null ? isJoyProduct(productId) : false
  const isBliss = productId !== null ? isBlissProduct(productId) : false
  const isGrace = productId !== null ? isGraceProduct(productId) : false
  const isJoyCollection = isJoy || categorySlug === "joy"
  const isBlissCollection = isBliss || categorySlug === "bliss"
  const isGraceCollection = isGrace || categorySlug === "grace"
  const shippingInformation =
    (product as ProductDetail).shippingInformation ||
    product.specifications?.["Shipping information"] ||
    ""
  const detailSections =
    rawApiProduct?.detailSections?.filter((section) => section.title || section.body || section.imageUrl) || []

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
        {(isJoyCollection || isGraceCollection) && !isBlissCollection ? (
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
                        href={isGraceCollection ? "/category/grace" : "/category/joy"}
                        className="text-foreground hover:text-[#6D4530] transition-colors"
                      >
                        {isGraceCollection ? "Grace" : "Joy"}
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
                    {isBlissCollection ? (
                      <Link href="/category/bliss" className="text-foreground hover:text-[#6D4530] transition-colors">
                        Bliss
                      </Link>
                    ) : isGraceCollection ? (
                      <Link href="/category/grace" className="text-foreground hover:text-[#6D4530] transition-colors">
                        Grace
                      </Link>
                    ) : isJoyCollection ? (
                      <Link href="/category/joy" className="text-foreground hover:text-[#6D4530] transition-colors">
                        Joy
                      </Link>
                    ) : (
                      <span className="text-foreground">Products</span>
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

        <div className={`max-w-7xl mx-auto px-4 ${isJoyCollection || isBlissCollection || isGraceCollection ? "pb-12 mt-8" : "py-12"}`}>
          {/* Product Templates - Complete page structure for each product type */}
          {productType === "baby-hamper" && (
            <BabyHamperProductTemplate
              product={product}
              productId={productId!}
              onAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
            />
          )}
          
          {productType === "kids-hamper" && (
            <KidsHamperProductTemplate
              product={product}
              productId={productId!}
              onAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
            />
          )}
          
          {productType === "individual-baby" && (
            <IndividualProductTemplate
              product={product}
              productId={productId!}
              onAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
            />
          )}
          
          {productType === "mattress" && (
            isBlissCollection ? (
              <BlissMattressProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : isGraceCollection ? (
              <GraceMattressProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : (
              <MattressProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            )
          )}
          
          {productType === "topper" && (
            isBlissCollection ? (
              <BlissTopperProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : isGraceCollection ? (
              <GraceTopperProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : (
              <TopperProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            )
          )}
          
          {productType === "lounger" && (
            isBlissCollection ? (
              <BlissLoungerProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : isGraceCollection ? (
              <GraceLoungerProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : (
              <LoungerProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            )
          )}
          
          {productType === "head-pillow" && (
            isBlissCollection ? (
              <BlissHeadPillowProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : isGraceCollection ? (
              <GraceHeadPillowProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            ) : (
              <HeadPillowProductTemplate
                product={product}
                productId={productId!}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            )
          )}
          
          {productType === "pillow-bumpers" && (
            <PillowBumpersProductTemplate
              product={product}
              productId={productId!}
              onAddToCart={handleAddToCart}
              isAddingToCart={isAddingToCart}
            />
          )}
          
          {productType === "simple" && (
            <>
              {productId === null ? (
                <>
                  <ProductConfigurator
                    product={product}
                    variants={rawApiProduct?.variants || []}
                    onAddToCart={handleAddToCart}
                    isAddingToCart={isAddingToCart}
                  />
                  <section className="w-full bg-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <Accordion type="single" collapsible className="w-full space-y-4">
                        <AccordionItem value="description" className="border border-[#F3E7DA] px-4 rounded-lg shadow-sm">
                          <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                            Description
                          </AccordionTrigger>
                          <AccordionContent className="text-foreground/80 leading-relaxed">
                            {product.description}
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="shipping" className="border border-[#F3E7DA] px-4 last:border-b-2! rounded-lg shadow-sm">
                          <AccordionTrigger className="text-lg font-medium text-foreground hover:no-underline">
                            Shipping information
                          </AccordionTrigger>
                          <AccordionContent className="text-foreground/80 leading-relaxed">
                            {shippingInformation || "Shipping information will be shared after order confirmation."}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </section>
                  {detailSections.length > 0 && (
                    <section className="w-full bg-white py-12">
                      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
                        {detailSections.map((section, index) => {
                          const isImageLeft =
                            section.imagePosition ? section.imagePosition === "left" : index % 2 === 1
                          const image = section.imageUrl || "/placeholder.svg"
                          return (
                            <div
                              key={`${section.title}-${index}`}
                              className={`grid gap-y-32 gap-x-32 items-center ${
                                isImageLeft ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"
                              }`}
                              
                            >
                              <div
                                className={`order-2 ${
                                  isImageLeft ? "lg:order-1" : "lg:order-2"
                                }`}
                              >
                                <img
                                  src={image}
                                  alt={section.imageAlt || section.title || "Product detail"}
                                  className="w-full h-full max-h-[420px] object-cover border border-[#EED9C4]"
                                />
                              </div>
                              <div
                                className={`order-1 ${
                                  isImageLeft ? "lg:order-2" : "lg:order-1"
                                }`}
                              >
                                {section.title && (
                                  <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
                                    {section.title}
                                  </h3>
                                )}
                                {section.body && (
                                  <div className="space-y-20 text-base sm:text-lg text-foreground leading-relaxed max-w-none">
                                    {section.body
                                      .split(/\n\s*\n/)
                                      .map((paragraph, paragraphIndex) => (
                                        <p key={paragraphIndex}>{paragraph}</p>
                                      ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </section>
                  )}
                </>
              ) : (
                <SimpleProductConfigurator
                  product={product}
                  onAddToCart={handleAddToCart}
                  isAddingToCart={isAddingToCart}
                  colors={colors}
                />
              )}

             
            </>
          )}
        </div>
      </main>
      <Footer />
      
    </div>
  )
}
