import { useState, useEffect } from "react"
import { calculateBabyHamperPrice } from "@/utils/pricing"

export interface BabyHamperState {
  // Hamper items
  hamperItems: string[]
  toggleHamperItem: (itemId: string) => void
  
  // Color selection
  selectedColor: string
  setSelectedColor: (color: string) => void
  colorImages: Record<string, string[]>
  colorOptions: Array<{ name: string; label: string; hex: string }>
  currentImages: string[]
  
  // Mattress customization
  mattressVariant: string
  setMattressVariant: (variant: string) => void
  mattressLength: string
  setMattressLength: (length: string) => void
  mattressBreadth: string
  setMattressBreadth: (breadth: string) => void
  mattressHeight: string
  setMattressHeight: (height: string) => void
  standardLength: string
  setStandardLength: (length: string) => void
  standardBreadth: string
  setStandardBreadth: (breadth: string) => void
  standardHeight: string
  setStandardHeight: (height: string) => void
  mattressFabric: string
  setMattressFabric: (fabric: string) => void
  
  // Topper customization
  topperLength: string
  setTopperLength: (length: string) => void
  topperBreadth: string
  setTopperBreadth: (breadth: string) => void
  topperHeight: string
  setTopperHeight: (height: string) => void
  topperFabric: string
  setTopperFabric: (fabric: string) => void
  standardTopperLength: string
  setStandardTopperLength: (length: string) => void
  standardTopperBreadth: string
  setStandardTopperBreadth: (breadth: string) => void
  standardTopperHeight: string
  setStandardTopperHeight: (height: string) => void
  
  // Lounger customization
  loungerLength: string
  setLoungerLength: (length: string) => void
  loungerBreadth: string
  setLoungerBreadth: (breadth: string) => void
  loungerHeight: string
  setLoungerHeight: (height: string) => void
  loungerFabric: string
  setLoungerFabric: (fabric: string) => void
  standardLoungerLength: string
  setStandardLoungerLength: (length: string) => void
  standardLoungerBreadth: string
  setStandardLoungerBreadth: (breadth: string) => void
  standardLoungerHeight: string
  setStandardLoungerHeight: (height: string) => void
  
  // Pillow customization
  pillowLength: string
  setPillowLength: (length: string) => void
  pillowBreadth: string
  setPillowBreadth: (breadth: string) => void
  pillowHeight: string
  setPillowHeight: (height: string) => void
  pillowFabric: string
  setPillowFabric: (fabric: string) => void
  standardPillowLength: string
  setStandardPillowLength: (length: string) => void
  standardPillowBreadth: string
  setStandardPillowBreadth: (breadth: string) => void
  standardPillowHeight: string
  setStandardPillowHeight: (height: string) => void
  
  // Bumper customization
  bumperLength: string
  setBumperLength: (length: string) => void
  bumperBreadth: string
  setBumperBreadth: (breadth: string) => void
  bumperHeight: string
  setBumperHeight: (height: string) => void
  bumperFabric: string
  setBumperFabric: (fabric: string) => void
  standardBumperLength: string
  setStandardBumperLength: (length: string) => void
  standardBumperBreadth: string
  setStandardBumperBreadth: (breadth: string) => void
  standardBumperHeight: string
  setStandardBumperHeight: (height: string) => void
  
  // Bed spread
  bedSpreadColor: string
  setBedSpreadColor: (color: string) => void
  
  // Price
  price: number
}

export function useBabyHamper() {
  const [hamperItems, setHamperItems] = useState<string[]>([
    "mattress",
    "topper",
    "lounger",
    "head-pillow",
    "pillow-bumpers",
  ])
  const [selectedColor, setSelectedColor] = useState("royal-blue")
  
  // Mattress
  const [mattressVariant, setMattressVariant] = useState("")
  const [mattressLength, setMattressLength] = useState("")
  const [mattressBreadth, setMattressBreadth] = useState("")
  const [mattressHeight, setMattressHeight] = useState("")
  const [standardLength, setStandardLength] = useState("")
  const [standardBreadth, setStandardBreadth] = useState("")
  const [standardHeight, setStandardHeight] = useState("")
  const [mattressFabric, setMattressFabric] = useState("")
  
  // Topper
  const [topperLength, setTopperLength] = useState("")
  const [topperBreadth, setTopperBreadth] = useState("")
  const [topperHeight, setTopperHeight] = useState("")
  const [topperFabric, setTopperFabric] = useState("")
  const [standardTopperLength, setStandardTopperLength] = useState("")
  const [standardTopperBreadth, setStandardTopperBreadth] = useState("")
  const [standardTopperHeight, setStandardTopperHeight] = useState("")
  
  // Lounger
  const [loungerLength, setLoungerLength] = useState("")
  const [loungerBreadth, setLoungerBreadth] = useState("")
  const [loungerHeight, setLoungerHeight] = useState("")
  const [loungerFabric, setLoungerFabric] = useState("")
  const [standardLoungerLength, setStandardLoungerLength] = useState("")
  const [standardLoungerBreadth, setStandardLoungerBreadth] = useState("")
  const [standardLoungerHeight, setStandardLoungerHeight] = useState("")
  
  // Pillow
  const [pillowLength, setPillowLength] = useState("")
  const [pillowBreadth, setPillowBreadth] = useState("")
  const [pillowHeight, setPillowHeight] = useState("")
  const [pillowFabric, setPillowFabric] = useState("")
  const [standardPillowLength, setStandardPillowLength] = useState("")
  const [standardPillowBreadth, setStandardPillowBreadth] = useState("")
  const [standardPillowHeight, setStandardPillowHeight] = useState("")
  
  // Bumper
  const [bumperLength, setBumperLength] = useState("")
  const [bumperBreadth, setBumperBreadth] = useState("")
  const [bumperHeight, setBumperHeight] = useState("")
  const [bumperFabric, setBumperFabric] = useState("")
  const [standardBumperLength, setStandardBumperLength] = useState("")
  const [standardBumperBreadth, setStandardBumperBreadth] = useState("")
  const [standardBumperHeight, setStandardBumperHeight] = useState("")
  
  // Bed spread
  const [bedSpreadColor, setBedSpreadColor] = useState("")
  
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
  
  const toggleHamperItem = (itemId: string) => {
    setHamperItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }
  
  const price = calculateBabyHamperPrice(hamperItems)
  
  return {
    hamperItems,
    toggleHamperItem,
    selectedColor,
    setSelectedColor,
    colorImages,
    colorOptions,
    currentImages,
    mattressVariant,
    setMattressVariant,
    mattressLength,
    setMattressLength,
    mattressBreadth,
    setMattressBreadth,
    mattressHeight,
    setMattressHeight,
    standardLength,
    setStandardLength,
    standardBreadth,
    setStandardBreadth,
    standardHeight,
    setStandardHeight,
    mattressFabric,
    setMattressFabric,
    topperLength,
    setTopperLength,
    topperBreadth,
    setTopperBreadth,
    topperHeight,
    setTopperHeight,
    topperFabric,
    setTopperFabric,
    standardTopperLength,
    setStandardTopperLength,
    standardTopperBreadth,
    setStandardTopperBreadth,
    standardTopperHeight,
    setStandardTopperHeight,
    loungerLength,
    setLoungerLength,
    loungerBreadth,
    setLoungerBreadth,
    loungerHeight,
    setLoungerHeight,
    loungerFabric,
    setLoungerFabric,
    standardLoungerLength,
    setStandardLoungerLength,
    standardLoungerBreadth,
    setStandardLoungerBreadth,
    standardLoungerHeight,
    setStandardLoungerHeight,
    pillowLength,
    setPillowLength,
    pillowBreadth,
    setPillowBreadth,
    pillowHeight,
    setPillowHeight,
    pillowFabric,
    setPillowFabric,
    standardPillowLength,
    setStandardPillowLength,
    standardPillowBreadth,
    setStandardPillowBreadth,
    standardPillowHeight,
    setStandardPillowHeight,
    bumperLength,
    setBumperLength,
    bumperBreadth,
    setBumperBreadth,
    bumperHeight,
    setBumperHeight,
    bumperFabric,
    setBumperFabric,
    standardBumperLength,
    setStandardBumperLength,
    standardBumperBreadth,
    setStandardBumperBreadth,
    standardBumperHeight,
    setStandardBumperHeight,
    bedSpreadColor,
    setBedSpreadColor,
    price,
  }
}
