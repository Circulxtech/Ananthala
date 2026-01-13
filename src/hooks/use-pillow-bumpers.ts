import { useState } from "react"

export interface PillowBumpersState {
  bumpersLength: string
  setBumpersLength: (length: string) => void
  bumpersBreadth: string
  setBumpersBreadth: (breadth: string) => void
  bumpersHeight: string
  setBumpersHeight: (height: string) => void
  bumpersFabric: string
  setBumpersFabric: (fabric: string) => void
  standardBumpersLength: string
  setStandardBumpersLength: (length: string) => void
  standardBumpersBreadth: string
  setStandardBumpersBreadth: (breadth: string) => void
  standardBumpersHeight: string
  setStandardBumpersHeight: (height: string) => void
  price: number
}

export function usePillowBumpers() {
  const [bumpersLength, setBumpersLength] = useState("")
  const [bumpersBreadth, setBumpersBreadth] = useState("")
  const [bumpersHeight, setBumpersHeight] = useState("")
  const [bumpersFabric, setBumpersFabric] = useState("")
  const [standardBumpersLength, setStandardBumpersLength] = useState("")
  const [standardBumpersBreadth, setStandardBumpersBreadth] = useState("")
  const [standardBumpersHeight, setStandardBumpersHeight] = useState("")
  
  const price = 0
  
  return {
    bumpersLength,
    setBumpersLength,
    bumpersBreadth,
    setBumpersBreadth,
    bumpersHeight,
    setBumpersHeight,
    bumpersFabric,
    setBumpersFabric,
    standardBumpersLength,
    setStandardBumpersLength,
    standardBumpersBreadth,
    setStandardBumpersBreadth,
    standardBumpersHeight,
    setStandardBumpersHeight,
    price,
  }
}
