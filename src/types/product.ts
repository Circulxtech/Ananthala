export interface ProductVariant {
  id: string
  weight: string // in kg
  length: string // in cm
  width: string // in cm
  height: string // in cm
  fabric: string // fabric type/id
  price: string
  stock: string
}

export interface ProductDetailSectionInput {
  id: string
  title: string
  body: string
  imageUrl: string
  imageAlt: string
  imagePosition: "left" | "right"
  imageFile?: File | null
  imagePreview?: string
  imageKey?: string
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
  detailSections: ProductDetailSectionInput[]
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
  detailSections?: Omit<ProductDetailSectionInput, "id">[]
}
