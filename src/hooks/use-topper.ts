import { useState } from "react"

export interface TopperState {
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
  price: number
}

export function useTopper() {
  const [topperLength, setTopperLength] = useState("")
  const [topperBreadth, setTopperBreadth] = useState("")
  const [topperHeight, setTopperHeight] = useState("")
  const [topperFabric, setTopperFabric] = useState("")
  const [standardTopperLength, setStandardTopperLength] = useState("")
  const [standardTopperBreadth, setStandardTopperBreadth] = useState("")
  const [standardTopperHeight, setStandardTopperHeight] = useState("")
  
  const price = 0
  
  return {
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
    price,
  }
}
