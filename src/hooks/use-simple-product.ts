import { useState } from "react"
import { calculateSimpleProductPrice } from "@/utils/pricing"
import type { ProductDetail } from "@/data/product-details"

export interface SimpleProductState {
  selectedSize: string
  setSelectedSize: (size: string) => void
  quantity: number
  setQuantity: (quantity: number | ((prev: number) => number)) => void
  selectedImage: number
  setSelectedImage: (index: number) => void
  price: number
}

export function useSimpleProduct(product: ProductDetail) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0].name)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  
  const selectedSizeData = product.sizes.find((s) => s.name === selectedSize)
  const price = calculateSimpleProductPrice(product.price, selectedSizeData?.price)
  
  return {
    selectedSize,
    setSelectedSize,
    quantity,
    setQuantity,
    selectedImage,
    setSelectedImage,
    price,
  }
}
