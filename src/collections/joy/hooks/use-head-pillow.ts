import { useState } from "react"

export interface HeadPillowState {
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
  price: number
}

export function useHeadPillow() {
  const [pillowLength, setPillowLength] = useState("")
  const [pillowBreadth, setPillowBreadth] = useState("")
  const [pillowHeight, setPillowHeight] = useState("")
  const [pillowFabric, setPillowFabric] = useState("")
  const [standardPillowLength, setStandardPillowLength] = useState("")
  const [standardPillowBreadth, setStandardPillowBreadth] = useState("")
  const [standardPillowHeight, setStandardPillowHeight] = useState("")
  
  const price = 0
  
  return {
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
    price,
  }
}
