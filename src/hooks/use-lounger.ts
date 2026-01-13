import { useState } from "react"

export interface LoungerState {
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
  price: number
}

export function useLounger() {
  const [loungerLength, setLoungerLength] = useState("")
  const [loungerBreadth, setLoungerBreadth] = useState("")
  const [loungerHeight, setLoungerHeight] = useState("")
  const [loungerFabric, setLoungerFabric] = useState("")
  const [standardLoungerLength, setStandardLoungerLength] = useState("")
  const [standardLoungerBreadth, setStandardLoungerBreadth] = useState("")
  const [standardLoungerHeight, setStandardLoungerHeight] = useState("")
  
  const price = 0
  
  return {
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
    price,
  }
}
