export interface Product {
  id: string
  name: string
  category: string
  price: number
  features: string[]
  image: string
}

export interface Review {
  id: string
  name: string
  rating: number
  text: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}
