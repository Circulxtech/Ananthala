export interface Fabric {
  id: string
  name: string
  image: string
}

export const fabricOptions: Fabric[] = [
  {
    id: "gingham-beige",
    name: "Gingham Beige",
    image: "/gingham_small_beige.jpeg",
  },
  {
    id: "gingham-blue",
    name: "Gingham Blue",
    image: "/gingham_small_blue.jpeg",
  },
  {
    id: "gingham-pink",
    name: "Gingham Pink",
    image: "/gingham_small_pink.jpeg",
  },
]

export function getFabricById(id: string): Fabric | undefined {
  return fabricOptions.find((fabric) => fabric.id === id)
}
