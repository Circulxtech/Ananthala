export interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  firmness: string
  size: string[]
  rating: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "Cloud Comfort Mattress",
    category: "mattress",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1691703011149-5fc5a062319d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYXR0cmVzcyUyMGRldGFpbHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    firmness: "Medium",
    size: ["Twin", "Full", "Queen", "King"],
    rating: 4.8,
  },
  {
    id: 2,
    name: "Premium Plush Mattress",
    category: "mattress",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1676956969640-61991b9d208c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    firmness: "Plush",
    size: ["Queen", "King", "Cal King"],
    rating: 4.9,
  },
  {
    id: 3,
    name: "Essential Rest Mattress",
    category: "mattress",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1759176170553-7c078c66c514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbWF0dHJlc3MlMjBiZWRyb29tfGVufDF8fHx8MTc2NDQwNTEwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    firmness: "Firm",
    size: ["Twin", "Full", "Queen", "King"],
    rating: 4.6,
  },
  {
    id: 4,
    name: "Dream Elite Hybrid",
    category: "mattress",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1655728664483-1e3b0778e1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR0cmVzcyUyMGNvbWZvcnQlMjBsYXllcnN8ZW58MXx8fHwxNzY0NDA1MTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    firmness: "Medium-Firm",
    size: ["Full", "Queen", "King", "Cal King"],
    rating: 5.0,
  },
  {
    id: 5,
    name: "Peaceful Nights Memory",
    category: "mattress",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1691703011149-5fc5a062319d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYXR0cmVzcyUyMGRldGFpbHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    firmness: "Medium",
    size: ["Twin", "Full", "Queen", "King"],
    rating: 4.7,
  },
  {
    id: 6,
    name: "Ultimate Support Pro",
    category: "mattress",
    price: 1699,
    image:
      "https://images.unsplash.com/photo-1676956969640-61991b9d208c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    firmness: "Firm",
    size: ["Queen", "King", "Cal King"],
    rating: 4.8,
  },
  {
    id: 7,
    name: "Little Dreams Baby Mattress",
    category: "baby",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1619490742661-8949b7d3a612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY3JpYiUyMG1hdHRyZXNzfGVufDF8fHx8MTc2NDc3MTk0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    firmness: "Firm",
    size: ["Crib"],
    rating: 4.9,
  },
  {
    id: 8,
    name: "Sweet Sleep Organic Crib",
    category: "baby",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1542901689-8917f44e3541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZXJ5JTIwYmFieSUyMHJvb218ZW58MXx8fHwxNzY0NzcxOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    firmness: "Firm",
    size: ["Crib"],
    rating: 5.0,
  },
  {
    id: 9,
    name: "SafeRest Baby Comfort",
    category: "baby",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1616843777706-c6954ffc764a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2xlZXBpbmclMjBjcmlifGVufDF8fHx8MTc2NDc1MTIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    firmness: "Firm",
    size: ["Crib"],
    rating: 4.8,
  },
]

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id)
}


