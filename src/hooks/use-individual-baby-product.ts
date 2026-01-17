import { useState, useEffect } from "react"
import type { ProductDetail } from "@/data/product-details"

export interface IndividualBabyProductState {
  selectedColor: string
  setSelectedColor: (color: string) => void
  colorImages: Record<string, string[]>
  colorOptions: Array<{ name: string; label: string; hex: string }>
  currentImages: string[]
  selectedImage: number
  setSelectedImage: (index: number) => void
  quantity: number
  setQuantity: (quantity: number | ((prev: number) => number)) => void
  price: number
}

export function useIndividualBabyProduct(product: ProductDetail) {
  const [selectedColor, setSelectedColor] = useState("royal-blue")
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  
  const colorImages: Record<string, string[]> = {
    "royal-blue": ["/productmattress.jpg", "/topper.jpg", "/lounger.jpg", "/pillow.jpg", "/bumpers.jpg"],
    gray: ["/topper.jpg", "/productmattress.jpg", "/lounger.jpg", "/pillow.jpg", "/bumpers.jpg"],
    black: ["/lounger.jpg", "/productmattress.jpg", "/topper.jpg", "/pillow.jpg", "/bumpers.jpg"],
    "dark-brown": ["/bumpers.jpg", "/productmattress.jpg", "/topper.jpg", "/lounger.jpg", "/pillow.jpg"],
  }
  
  const colorOptions = [
    { name: "royal-blue", label: "Royal Blue", hex: "#4169E1" },
    { name: "gray", label: "Gray", hex: "#4A4A4A" },
    { name: "black", label: "Black", hex: "#000000" },
    { name: "dark-brown", label: "Dark Brown", hex: "#5C4033" },
  ]
  
  const currentImages = colorImages[selectedColor] || colorImages["royal-blue"]
  
  // Reset image when color changes
  useEffect(() => {
    setSelectedImage(0)
  }, [selectedColor])
  
  const selectedSizeData = product.sizes.find((s) => s.name === product.sizes[0].name)
  const price = selectedSizeData?.price || product.price
  
  return {
    selectedColor,
    setSelectedColor,
    colorImages,
    colorOptions,
    currentImages,
    selectedImage,
    setSelectedImage,
    quantity,
    setQuantity,
    price,
  }
}
