import { useState } from "react"
import { calculateKidsHamperPrice } from "@/utils/pricing"

export interface KidsHamperState {
  // Hamper items
  kidsHamperItems: string[]
  toggleKidsHamperItem: (itemId: string) => void
  
  // Mattress customization
  kidsMattressLength: string
  setKidsMattressLength: (length: string) => void
  kidsMattressBreadth: string
  setKidsMattressBreadth: (breadth: string) => void
  kidsMattressHeight: string
  setKidsMattressHeight: (height: string) => void
  kidsMattressFabric: string
  setKidsMattressFabric: (fabric: string) => void
  standardKidsMattressLength: string
  setStandardKidsMattressLength: (length: string) => void
  standardKidsMattressBreadth: string
  setStandardKidsMattressBreadth: (breadth: string) => void
  standardKidsMattressHeight: string
  setStandardKidsMattressHeight: (height: string) => void
  
  // Pillows customization
  kidsPillowsLength: string
  setKidsPillowsLength: (length: string) => void
  kidsPillowsBreadth: string
  setKidsPillowsBreadth: (breadth: string) => void
  kidsPillowsHeight: string
  setKidsPillowsHeight: (height: string) => void
  kidsPillowsFabric: string
  setKidsPillowsFabric: (fabric: string) => void
  standardKidsPillowsLength: string
  setStandardKidsPillowsLength: (length: string) => void
  standardKidsPillowsBreadth: string
  setStandardKidsPillowsBreadth: (breadth: string) => void
  standardKidsPillowsHeight: string
  setStandardKidsPillowsHeight: (height: string) => void
  
  // Bed Sheets customization
  kidsBedSheetsLength: string
  setKidsBedSheetsLength: (length: string) => void
  kidsBedSheetsBreadth: string
  setKidsBedSheetsBreadth: (breadth: string) => void
  kidsBedSheetsHeight: string
  setKidsBedSheetsHeight: (height: string) => void
  kidsBedSheetsFabric: string
  setKidsBedSheetsFabric: (fabric: string) => void
  standardKidsBedSheetsLength: string
  setStandardKidsBedSheetsLength: (length: string) => void
  standardKidsBedSheetsBreadth: string
  setStandardKidsBedSheetsBreadth: (breadth: string) => void
  standardKidsBedSheetsHeight: string
  setStandardKidsBedSheetsHeight: (height: string) => void
  
  // Price
  price: number
}

export function useKidsHamper() {
  const [kidsHamperItems, setKidsHamperItems] = useState<string[]>([
    "mattress",
    "pillows",
    "bed-sheets",
  ])
  
  // Mattress
  const [kidsMattressLength, setKidsMattressLength] = useState("")
  const [kidsMattressBreadth, setKidsMattressBreadth] = useState("")
  const [kidsMattressHeight, setKidsMattressHeight] = useState("")
  const [kidsMattressFabric, setKidsMattressFabric] = useState("")
  const [standardKidsMattressLength, setStandardKidsMattressLength] = useState("")
  const [standardKidsMattressBreadth, setStandardKidsMattressBreadth] = useState("")
  const [standardKidsMattressHeight, setStandardKidsMattressHeight] = useState("")
  
  // Pillows
  const [kidsPillowsLength, setKidsPillowsLength] = useState("")
  const [kidsPillowsBreadth, setKidsPillowsBreadth] = useState("")
  const [kidsPillowsHeight, setKidsPillowsHeight] = useState("")
  const [kidsPillowsFabric, setKidsPillowsFabric] = useState("")
  const [standardKidsPillowsLength, setStandardKidsPillowsLength] = useState("")
  const [standardKidsPillowsBreadth, setStandardKidsPillowsBreadth] = useState("")
  const [standardKidsPillowsHeight, setStandardKidsPillowsHeight] = useState("")
  
  // Bed Sheets
  const [kidsBedSheetsLength, setKidsBedSheetsLength] = useState("")
  const [kidsBedSheetsBreadth, setKidsBedSheetsBreadth] = useState("")
  const [kidsBedSheetsHeight, setKidsBedSheetsHeight] = useState("")
  const [kidsBedSheetsFabric, setKidsBedSheetsFabric] = useState("")
  const [standardKidsBedSheetsLength, setStandardKidsBedSheetsLength] = useState("")
  const [standardKidsBedSheetsBreadth, setStandardKidsBedSheetsBreadth] = useState("")
  const [standardKidsBedSheetsHeight, setStandardKidsBedSheetsHeight] = useState("")
  
  const toggleKidsHamperItem = (itemId: string) => {
    setKidsHamperItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    )
  }
  
  const price = calculateKidsHamperPrice(kidsHamperItems)
  
  return {
    kidsHamperItems,
    toggleKidsHamperItem,
    kidsMattressLength,
    setKidsMattressLength,
    kidsMattressBreadth,
    setKidsMattressBreadth,
    kidsMattressHeight,
    setKidsMattressHeight,
    kidsMattressFabric,
    setKidsMattressFabric,
    standardKidsMattressLength,
    setStandardKidsMattressLength,
    standardKidsMattressBreadth,
    setStandardKidsMattressBreadth,
    standardKidsMattressHeight,
    setStandardKidsMattressHeight,
    kidsPillowsLength,
    setKidsPillowsLength,
    kidsPillowsBreadth,
    setKidsPillowsBreadth,
    kidsPillowsHeight,
    setKidsPillowsHeight,
    kidsPillowsFabric,
    setKidsPillowsFabric,
    standardKidsPillowsLength,
    setStandardKidsPillowsLength,
    standardKidsPillowsBreadth,
    setStandardKidsPillowsBreadth,
    standardKidsPillowsHeight,
    setStandardKidsPillowsHeight,
    kidsBedSheetsLength,
    setKidsBedSheetsLength,
    kidsBedSheetsBreadth,
    setKidsBedSheetsBreadth,
    kidsBedSheetsHeight,
    setKidsBedSheetsHeight,
    kidsBedSheetsFabric,
    setKidsBedSheetsFabric,
    standardKidsBedSheetsLength,
    setStandardKidsBedSheetsLength,
    standardKidsBedSheetsBreadth,
    setStandardKidsBedSheetsBreadth,
    standardKidsBedSheetsHeight,
    setStandardKidsBedSheetsHeight,
    price,
  }
}
