import { useState, useCallback, useMemo } from "react"
import { getFabricColor } from "@/data/fabric-colors"

interface UseColorConfiguratorOptions {
  defaultFabricId?: string
  enabledFabrics?: string[]
}

/**
 * Hook for managing color configurator state
 * Handles fabric selection and color transformation
 */
export function useColorConfigurator({
  defaultFabricId,
  enabledFabrics,
}: UseColorConfiguratorOptions = {}) {
  const [selectedFabricId, setSelectedFabricId] = useState<string | undefined>(defaultFabricId)
  const [isColorApplied, setIsColorApplied] = useState(false)

  const selectedFabricColor = useMemo(() => {
    if (!selectedFabricId) return undefined
    return getFabricColor(selectedFabricId)
  }, [selectedFabricId])

  const handleFabricChange = useCallback((fabricId: string) => {
    setSelectedFabricId(fabricId)
  }, [])

  const resetColor = useCallback(() => {
    setSelectedFabricId(undefined)
    setIsColorApplied(false)
  }, [])

  return {
    selectedFabricId,
    selectedFabricColor,
    isColorApplied,
    setIsColorApplied,
    handleFabricChange,
    resetColor,
  }
}

/**
 * Hook for managing preview of multiple color variants
 */
export function useColorPreview(fabricIds: string[]) {
  const [previewFabricId, setPreviewFabricId] = useState<string | undefined>()

  const previewColors = useMemo(() => {
    return fabricIds.map((id) => ({
      id,
      color: getFabricColor(id),
    })).filter((item) => item.color !== undefined)
  }, [fabricIds])

  const handlePreview = useCallback((fabricId: string) => {
    setPreviewFabricId(fabricId)
  }, [])

  const clearPreview = useCallback(() => {
    setPreviewFabricId(undefined)
  }, [])

  const getPreviewColor = useCallback((fabricId: string) => {
    return getFabricColor(fabricId)
  }, [])

  return {
    previewFabricId,
    previewColors,
    handlePreview,
    clearPreview,
    getPreviewColor,
  }
}
