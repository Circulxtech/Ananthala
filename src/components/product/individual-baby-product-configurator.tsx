"use client"

import Image from "next/image"
import { Loader2, IndianRupee, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSimpleProduct } from "@/hooks/use-simple-product"
import type { ProductDetail } from "@/data/product-details"
import type { CartItem } from "@/components/cart/cart-drawer"

interface IndividualBabyProductConfiguratorProps {
  product: ProductDetail
  productId: number
  onAddToCart: (item: CartItem) => void
  isAddingToCart: boolean
}

/**
 * Individual Baby Product Configurator Component
 * Handles individual baby product customization (swaddles, etc.)
 */
export function IndividualBabyProductConfigurator({
  product,
  onAddToCart,
  isAddingToCart,
}: IndividualBabyProductConfiguratorProps) {
  const {
    selectedSize,
    setSelectedSize,
    selectedImage,
    setSelectedImage,
    price,
  } = useSimpleProduct(product)

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      image: product.images[0],
      size: selectedSize,
      quantity: 1,
      price,
    }
    onAddToCart(cartItem)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <div className="p-6 bg-white border-2 border-[#EED9C4]">
          <h3 className="text-xl font-medium text-foreground mb-6">{product.name}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      type="button"
                      className={`relative aspect-square overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80 ${
                        selectedImage === index
                          ? "border-[#EED9C4] opacity-100"
                          : "border-transparent opacity-60"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover pointer-events-none"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-2xl font-medium text-foreground mb-4">Dimensions</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-base font-medium text-foreground mb-2 block">Dimensions (in inches)</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger className="w-full text-foreground">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size.name} value={size.name} className="text-foreground">
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4">
        <div className="sticky top-24 p-6 bg-white border-2 border-[#EED9C4]">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-foreground mb-2">Total Price</h3>
            <div className="text-2xl font-semibold text-foreground">
              ₹{price.toLocaleString()}{" "}
              <span className="text-sm font-normal text-foreground/70">(inclusive of all taxes)</span>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full bg-[#EED9C4] hover:bg-[#D9BB9B] text-foreground py-6 text-lg font-medium"
          >
            {isAddingToCart ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Adding to Cart...
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
         
        </div>
      </div>
    </div>
  )
}
