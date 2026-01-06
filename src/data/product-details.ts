export interface ProductDetail {
  id: number
  name: string
  category: string
  price: number
  rating: number
  reviews: number
  description: string
  images: string[]
  firmness: string
  height: string
  materials: string[]
  features: string[]
  specifications: Record<string, string>
  sizes: { name: string; price: number }[]
}

export const productDetails: Record<number, ProductDetail> = {
  1: {
    id: 1,
    name: "Cloud Comfort Mattress",
    category: "mattress",
    price: 1299,
    rating: 4.8,
    reviews: 234,
    description:
      "Experience cloud-like comfort with our premium memory foam mattress. Designed with advanced pressure-relieving technology and temperature regulation for the perfect night's sleep.",
    images: [
      "https://images.unsplash.com/photo-1691703011149-5fc5a062319d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYXR0cmVzcyUyMGRldGFpbHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1676956969640-61991b9d208c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1759176170553-7c078c66c514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbWF0dHJlc3MlMjBiZWRyb29tfGVufDF8fHx8MTc2NDQwNTEwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1655728664483-1e3b0778e1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR0cmVzcyUyMGNvbWZvcnQlMjBsYXllcnN8ZW58MXx8fHwxNzY0NDA1MTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    firmness: "Medium",
    height: "12 inches",
    materials: [
      "Premium Memory Foam",
      "High-Density Support Foam",
      "Breathable Cover",
    ],
    features: [
      "Pressure-relieving memory foam",
      "Temperature regulation technology",
      "Motion isolation for undisturbed sleep",
      "CertiPUR-US certified foams",
      "Removable, washable cover",
    ],
    specifications: {
      "Firmness Level": "Medium (5/10)",
      "Mattress Height": "12 inches",
      "Top Layer": '3" Gel Memory Foam',
      "Support Layer": '7" High-Density Foam',
      Cover: "Premium Stretch Knit",
      "Weight Capacity": "Up to 500 lbs",
      Warranty: "15 Years",
      "Trial Period": "100 Nights",
    },
    sizes: [
      { name: "Twin", price: 899 },
      { name: "Full", price: 1099 },
      { name: "Queen", price: 1299 },
      { name: "King", price: 1499 },
    ],
  },
  2: {
    id: 2,
    name: "Premium Plush Mattress",
    category: "mattress",
    price: 1899,
    rating: 4.9,
    reviews: 567,
    description:
      "Our most luxurious mattress featuring premium materials and advanced comfort technology. The perfect blend of plush comfort and supportive design.",
    images: [
      "https://images.unsplash.com/photo-1676956969640-61991b9d208c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1691703011149-5fc5a062319d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYXR0cmVzcyUyMGRldGFpbHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1759176170553-7c078c66c514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbWF0dHJlc3MlMjBiZWRyb29tfGVufDF8fHx8MTc2NDQwNTEwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1655728664483-1e3b0778e1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR0cmVzcyUyMGNvbWZvcnQlMjBsYXllcnN8ZW58MXx8fHwxNzY0NDA1MTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    firmness: "Plush",
    height: "14 inches",
    materials: [
      "Luxury Latex Foam",
      "Memory Foam",
      "Pocketed Coils",
      "Organic Cotton Cover",
    ],
    features: [
      "Hybrid design with coils and foam",
      "Enhanced edge support",
      "Natural latex comfort layer",
      "Organic cotton cover",
      "Zero motion transfer",
    ],
    specifications: {
      "Firmness Level": "Plush (3/10)",
      "Mattress Height": "14 inches",
      "Top Layer": '2" Natural Latex',
      "Comfort Layer": '3" Memory Foam',
      "Support Layer": '8" Pocketed Coils',
      Cover: "Organic Cotton",
      "Weight Capacity": "Up to 700 lbs",
      Warranty: "15 Years",
      "Trial Period": "100 Nights",
    },
    sizes: [
      { name: "Queen", price: 1899 },
      { name: "King", price: 2199 },
      { name: "Cal King", price: 2199 },
    ],
  },
  3: {
    id: 3,
    name: "Essential Rest Mattress",
    category: "mattress",
    price: 899,
    rating: 4.6,
    reviews: 189,
    description:
      "Quality sleep at an accessible price. Our Essential Rest mattress delivers firm support and lasting comfort without compromise.",
    images: [
      "https://images.unsplash.com/photo-1759176170553-7c078c66c514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbWF0dHJlc3MlMjBiZWRyb29tfGVufDF8fHx8MTc2NDQwNTEwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1691703011149-5fc5a062319d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYXR0cmVzcyUyMGRldGFpbHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1676956969640-61991b9d208c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    firmness: "Firm",
    height: "10 inches",
    materials: [
      "High-Density Foam",
      "Support Foam Base",
      "Soft Knit Cover",
    ],
    features: [
      "Firm support for back sleepers",
      "Durable high-density foam",
      "Affordable quality",
      "Easy setup and care",
      "CertiPUR-US certified",
    ],
    specifications: {
      "Firmness Level": "Firm (8/10)",
      "Mattress Height": "10 inches",
      "Top Layer": '2" Comfort Foam',
      "Support Layer": '8" High-Density Base',
      Cover: "Soft Knit Fabric",
      "Weight Capacity": "Up to 450 lbs",
      Warranty: "10 Years",
      "Trial Period": "100 Nights",
    },
    sizes: [
      { name: "Twin", price: 699 },
      { name: "Full", price: 799 },
      { name: "Queen", price: 899 },
      { name: "King", price: 1099 },
    ],
  },
  4: {
    id: 4,
    name: "Dream Elite Hybrid",
    category: "mattress",
    price: 2299,
    rating: 5.0,
    reviews: 423,
    description:
      "The pinnacle of sleep technology. Our Dream Elite combines the best of memory foam and innerspring support for an unmatched sleep experience.",
    images: [
      "https://images.unsplash.com/photo-1655728664483-1e3b0778e1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXR0cmVzcyUyMGNvbWZvcnQlMjBsYXllcnN8ZW58MXx8fHwxNzY0NDA1MTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1691703011149-5fc5a062319d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtYXR0cmVzcyUyMGRldGFpbHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1676956969640-61991b9d208c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMG1hdHRyZXNzJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NjQ0MDUxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1759176170553-7c078c66c514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbWF0dHJlc3MlMjBiZWRyb29tfGVufDF8fHx8MTc2NDQwNTEwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    firmness: "Medium-Firm",
    height: "15 inches",
    materials: [
      "Gel Memory Foam",
      "Natural Latex",
      "Micro Coils",
      "Pocketed Support Coils",
      "Cashmere Blend Cover",
    ],
    features: [
      "5-layer advanced comfort system",
      "Dual coil technology",
      "Luxury cashmere blend cover",
      "Active cooling gel technology",
      "Reinforced edge support",
    ],
    specifications: {
      "Firmness Level": "Medium-Firm (6/10)",
      "Mattress Height": "15 inches",
      "Top Layer": '1.5" Gel Memory Foam',
      "Comfort Layer": '2" Natural Latex',
      "Transition Layer": '1.5" Micro Coils',
      "Support Layer": '9" Pocketed Coils',
      Cover: "Cashmere Blend",
      "Weight Capacity": "Up to 800 lbs",
      Warranty: "Lifetime",
      "Trial Period": "365 Nights",
    },
    sizes: [
      { name: "Full", price: 1999 },
      { name: "Queen", price: 2299 },
      { name: "King", price: 2699 },
      { name: "Cal King", price: 2699 },
    ],
  },
  7: {
    id: 7,
    name: "Little Dreams Baby Mattress",
    category: "baby",
    price: 299,
    rating: 4.9,
    reviews: 156,
    description:
      "Safe, comfortable, and certified organic. Our Little Dreams baby mattress provides the perfect sleep surface for your little one with breathable materials and firm support recommended by pediatricians.",
    images: [
      "https://images.unsplash.com/photo-1619490742661-8949b7d3a612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY3JpYiUyMG1hdHRyZXNzfGVufDF8fHx8MTc2NDc3MTk0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1542901689-8917f44e3541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZXJ5JTIwYmFieSUyMHJvb218ZW58MXx8fHwxNzY0NzcxOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1616843777706-c6954ffc764a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2xlZXBpbmclMjBjcmlifGVufDF8fHx8MTc2NDc1MTIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    firmness: "Firm",
    height: "5 inches",
    materials: [
      "Organic Cotton Cover",
      "Natural Coconut Fiber",
      "Breathable Foam Core",
      "Waterproof Layer",
    ],
    features: [
      "GREENGUARD Gold Certified",
      "Firm support recommended by pediatricians",
      "100% organic cotton cover",
      "Dual-sided design (infant/toddler)",
      "Waterproof and easy to clean",
      "Hypoallergenic materials",
    ],
    specifications: {
      "Firmness Level": "Firm (9/10)",
      "Mattress Height": "5 inches",
      Cover: "100% Organic Cotton",
      Warranty: "10 Years",
      "Trial Period": "100 Nights",
    },
    sizes: [
      { name: "Standard Crib", price: 299 },
    ],
  },
  8: {
    id: 8,
    name: "Sweet Sleep Organic Crib",
    category: "baby",
    price: 399,
    rating: 5.0,
    reviews: 203,
    description:
      "Premium organic materials meet superior safety standards. The Sweet Sleep Organic Crib mattress is made with 100% certified organic materials for the healthiest start to your baby's sleep journey.",
    images: [
      "https://images.unsplash.com/photo-1542901689-8917f44e3541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZXJ5JTIwYmFieSUyMHJvb218ZW58MXx8fHwxNzY0NzcxOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1619490742661-8949b7d3a612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY3JpYiUyMG1hdHRyZXNzfGVufDF8fHx8MTc2NDc3MTk0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1616843777706-c6954ffc764a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2xlZXBpbmclMjBjcmlifGVufDF8fHx8MTc2NDc1MTIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    firmness: "Firm",
    height: "6 inches",
    materials: [
      "GOTS Certified Organic Cotton",
      "Natural Latex Core",
      "Organic Wool Fire Barrier",
      "Breathable Edge Reinforcement",
    ],
    features: [
      "100% GOTS certified organic materials",
      "Natural latex provides perfect firmness",
      "Chemical-free fire barrier",
      "Dual firmness design",
      "Exceptional breathability",
      "Made in USA",
    ],
    specifications: {
      "Firmness Level": "Firm (9/10)",
      "Mattress Height": "6 inches",
      "Top Layer": "GOTS Organic Cotton",
      "Core Layer": '5" Natural Latex',
      "Fire Barrier": "Organic Wool",
      Cover: "GOTS Certified Organic Cotton",
      "Weight Capacity": "Up to 50 lbs",
      Warranty: "Lifetime",
      "Trial Period": "120 Nights",
      Certifications: "GOTS, GREENGUARD Gold, OEKO-TEX",
    },
    sizes: [
      { name: "Standard Crib", price: 399 },
    ],
  },
  9: {
    id: 9,
    name: "SafeRest Baby Comfort",
    category: "baby",
    price: 349,
    rating: 4.8,
    reviews: 187,
    description:
      "Trusted safety meets exceptional comfort. SafeRest Baby Comfort mattress combines premium materials with advanced safety features to give parents peace of mind.",
    images: [
      "https://images.unsplash.com/photo-1616843777706-c6954ffc764a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2xlZXBpbmclMjBjcmlifGVufDF8fHx8MTc2NDc1MTIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1619490742661-8949b7d3a612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY3JpYiUyMG1hdHRyZXNzfGVufDF8fHx8MTc2NDc3MTk0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1542901689-8917f44e3541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZXJ5JTIwYmFieSUyMHJvb218ZW58MXx8fHwxNzY0NzcxOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    firmness: "Firm",
    height: "5.5 inches",
    materials: [
      "Organic Cotton Blend Cover",
      "High-Density Support Foam",
      "Breathable Air Channels",
      "Waterproof Protection",
    ],
    features: [
      "GREENGUARD Gold certified",
      "Optimal firmness for safety",
      "Enhanced air circulation",
      "Medical-grade waterproof cover",
      "Hypoallergenic construction",
      "Easy to clean and maintain",
    ],
    specifications: {
      "Firmness Level": "Firm (8.5/10)",
      "Mattress Height": "5.5 inches",
      "Top Layer": "Organic Cotton Blend",
      "Core Layer": '4.5" High-Density Foam',
      "Protection": "Medical-Grade Waterproof Layer",
      Cover: "Organic Cotton Blend",
      "Weight Capacity": "Up to 50 lbs",
      Warranty: "15 Years",
      "Trial Period": "100 Nights",
      Certifications: "GREENGUARD Gold, CertiPUR-US",
    },
    sizes: [
      { name: "Standard Crib", price: 349 },
    ],
  },
  10: {
    id: 10,
    name: "JOY Head Pillow",
    category: "baby",
    price: 79,
    rating: 4.8,
    reviews: 142,
    description:
      "Comfortable and supportive head pillow designed for babies. Made with 100% organic materials, providing the perfect support for your little one's head and neck while ensuring breathability and safety.",
    images: [
      "/pillow.jpg",
      "https://images.unsplash.com/photo-1619490742661-8949b7d3a612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY3JpYiUyMG1hdHRyZXNzfGVufDF8fHx8MTc2NDc3MTk0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1542901689-8917f44e3541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudXJzZXJ5JTIwYmFieSUyMHJvb218ZW58MXx8fHwxNzY0NzcxOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    firmness: "Medium",
    height: "2 inches",
    materials: [
      "100% Organic Cotton Cover",
      "Natural Latex Fill",
      "Breathable Mesh Sides",
      "Hypoallergenic Materials",
    ],
    features: [
      "100% organic cotton cover",
      "Natural latex fill for support",
      "Breathable design prevents overheating",
      "Hypoallergenic and safe for sensitive skin",
      "Machine washable cover",
      "Pediatrician recommended",
    ],
    specifications: {
      "Pillow Height": "2 inches",
      "Cover Material": "100% Organic Cotton",
      "Fill Material": "Natural Latex",
      "Sizes Available": "Small, Medium, Large",
      "Firmness Options": "Soft, Medium, Firm",
      "Care Instructions": "Machine washable cover",
      Warranty: "2 Years",
      Certifications: "GOTS, GREENGUARD Gold",
    },
    sizes: [
      { name: "Small", price: 79 },
      { name: "Medium", price: 89 },
      { name: "Large", price: 99 },
    ],
  },
  11: {
    id: 11,
    name: "JOY Pillow Bumpers",
    category: "baby",
    price: 89,
    rating: 4.7,
    reviews: 128,
    description:
      "Safe and stylish pillow bumpers for your baby's crib. Made with organic materials and breathable mesh design, providing protection while ensuring proper air circulation for your little one's safety.",
    images: [
      "/bumpers.jpg",
      "https://images.unsplash.com/photo-1616843777706-c6954ffc764a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwc2xlZXBpbmclMjBjcmlifGVufDF8fHx8MTc2NDc1MTIxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1619490742661-8949b7d3a612?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5JTIwY3JpYiUyMG1hdHRyZXNzfGVufDF8fHx8MTc2NDc3MTk0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    firmness: "Soft",
    height: "1.5 inches",
    materials: [
      "Organic Cotton Fabric",
      "Breathable Mesh Panels",
      "Organic Cotton Fill",
      "Safe Ties and Fasteners",
    ],
    features: [
      "100% organic cotton construction",
      "Breathable mesh panels for air circulation",
      "Safe ties and fasteners",
      "Machine washable",
      "Hypoallergenic materials",
      "Meets safety standards",
    ],
    specifications: {
      "Bumper Height": "1.5 inches",
      "Material": "100% Organic Cotton",
      "Panel Design": "Breathable Mesh",
      "Fastening": "Safe Ties",
      "Care Instructions": "Machine washable",
      "Safety Standards": "CPSC Compliant",
      Warranty: "2 Years",
      Certifications: "GOTS, OEKO-TEX",
    },
    sizes: [
      { name: "Standard Crib", price: 89 },
    ],
  },
  12: {
    id: 12,
    name: "JOY Baby Hamper",
    category: "baby",
    price: 815,
    rating: 4.9,
    reviews: 234,
    description:
      "Complete baby sleep solution with mattress, topper, lounger, head pillow, and pillow bumpers. All items included in one convenient hamper.",
    images: [
      "/productmattress.jpg",
      "/topper.jpg",
      "/lounger.jpg",
      "/pillow.jpg",
      "/bumpers.jpg",
    ],
    firmness: "Firm",
    height: "5 inches",
    materials: [
      "Organic Cotton Cover",
      "Natural Coconut Fiber",
      "Breathable Foam Core",
      "Waterproof Layer",
    ],
    features: [
      "Complete baby sleep solution",
      "All essential items included",
      "100% organic materials",
      "GREENGUARD Gold Certified",
      "Customizable options available",
    ],
    specifications: {
      "Hamper Includes": "Mattress, Topper, Lounger, Head Pillow, Pillow Bumpers",
      "Firmness Level": "Firm (9/10)",
      "Mattress Height": "5 inches",
      Cover: "100% Organic Cotton",
      Warranty: "10 Years",
      "Trial Period": "100 Nights",
    },
    sizes: [
      { name: "Standard", price: 815 },
    ],
  },
}

export function getProductDetailById(id: number): ProductDetail | undefined {
  return productDetails[id]
}


