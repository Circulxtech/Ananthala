import { useState } from "react"

export interface MattressState {
  // Mattress customization
  mattressLength: string
  setMattressLength: (length: string) => void
  mattressBreadth: string
  setMattressBreadth: (breadth: string) => void
  mattressHeight: string
  setMattressHeight: (height: string) => void
  mattressFabric: string
  setMattressFabric: (fabric: string) => void
  standardMattressLength: string
  setStandardMattressLength: (length: string) => void
  standardMattressBreadth: string
  setStandardMattressBreadth: (breadth: string) => void
  standardMattressHeight: string
  setStandardMattressHeight: (height: string) => void
  
  // Price
  price: number
}

export function useMattress() {
  // Mattress
  const [mattressLength, setMattressLength] = useState("")
  const [mattressBreadth, setMattressBreadth] = useState("")
  const [mattressHeight, setMattressHeight] = useState("")
  const [mattressFabric, setMattressFabric] = useState("")
  const [standardMattressLength, setStandardMattressLength] = useState("")
  const [standardMattressBreadth, setStandardMattressBreadth] = useState("")
  const [standardMattressHeight, setStandardMattressHeight] = useState("")
  
  // Base price - will be calculated based on product
  const price = 0
  
  return {
    mattressLength,
    setMattressLength,
    mattressBreadth,
    setMattressBreadth,
    mattressHeight,
    setMattressHeight,
    mattressFabric,
    setMattressFabric,
    standardMattressLength,
    setStandardMattressLength,
    standardMattressBreadth,
    setStandardMattressBreadth,
    standardMattressHeight,
    setStandardMattressHeight,
    price,
  }
}
