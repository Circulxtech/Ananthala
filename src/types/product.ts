export interface ProductVariant {
  id: string
  weight: string // in kg
  length: string // in cm
  width: string // in cm
  height: string // in cm
  color: string // added color field to ProductVariant interface
  fabric: string // fabric type/id
  price: string
  stock: string
}

export interface ProductFormData {
  productTitle: string
  description: string
  units: string
  sellerName: string
  sellerEmail: string
  location: string
  category: string
  subCategory: string
  variants: ProductVariant[]
}

export interface ProductWithVariants {
  id: number
  name: string
  category: string
  status: "visible" | "hidden"
  image: string
  description: string
  units: string
  sellerName: string
  sellerEmail: string
  location: string
  subCategory?: string
  variants: ProductVariant[]
}
