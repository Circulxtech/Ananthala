// Wrapper for indian-states-cities package to handle CommonJS in ES module environment
let statesCitiesData: any = null

async function loadData() {
  if (!statesCitiesData) {
    try {
      // Use dynamic import for CommonJS module
      const module = await import("indian-states-cities")
      // Handle both default and named exports
      statesCitiesData = module.default || module
      // If it's a function, call it
      if (typeof statesCitiesData === "function") {
        statesCitiesData = statesCitiesData()
      }
    } catch (error) {
      console.error("Error loading indian-states-cities:", error)
      return null
    }
  }
  return statesCitiesData
}

export async function getAllStates(): Promise<string[]> {
  const data = await loadData()
  if (!data || typeof data.allStates !== "function") return []
  return data.allStates() || []
}

export async function getCitiesForState(state: string): Promise<string[]> {
  const data = await loadData()
  if (!data || typeof data.citiesForState !== "function") return []
  return data.citiesForState(state) || []
}

