import { useState, useCallback, useMemo } from "react"
import { getFabricPattern } from "@/data/fabric-patterns"
import type { FabricPattern } from "@/data/fabric-patterns"

interface UsePatternConfiguratorOptions {
  defaultPatternId?: string
  enabledPatterns?: string[]
}

/**
 * Hook for managing pattern configurator state
 * Handles pattern selection and transformation
 */
export function usePatternConfigurator({
  defaultPatternId = "pattern-solid",
  enabledPatterns,
}: UsePatternConfiguratorOptions = {}) {
  const [selectedPatternId, setSelectedPatternId] = useState<string>(defaultPatternId)
  const [isPatternApplied, setIsPatternApplied] = useState(false)

  const selectedPattern = useMemo(() => {
    if (!selectedPatternId) return undefined
    return getFabricPattern(selectedPatternId)
  }, [selectedPatternId])

  const handlePatternChange = useCallback((patternId: string) => {
    setSelectedPatternId(patternId)
  }, [])

  const resetPattern = useCallback(() => {
    setSelectedPatternId("pattern-solid")
    setIsPatternApplied(false)
  }, [])

  return {
    selectedPatternId,
    selectedPattern,
    isPatternApplied,
    setIsPatternApplied,
    handlePatternChange,
    resetPattern,
  }
}

/**
 * Hook for managing preview of multiple pattern variants
 */
export function usePatternPreview(patternIds: string[]) {
  const [previewPatternId, setPreviewPatternId] = useState<string | undefined>()

  const previewPatterns = useMemo(() => {
    return patternIds
      .map((id) => ({
        id,
        pattern: getFabricPattern(id),
      }))
      .filter((item) => item.pattern !== undefined)
  }, [patternIds])

  const handlePreview = useCallback((patternId: string) => {
    setPreviewPatternId(patternId)
  }, [])

  const clearPreview = useCallback(() => {
    setPreviewPatternId(undefined)
  }, [])

  const getPreviewPattern = useCallback((patternId: string) => {
    return getFabricPattern(patternId)
  }, [])

  return {
    previewPatternId,
    previewPatterns,
    handlePreview,
    clearPreview,
    getPreviewPattern,
  }
}
