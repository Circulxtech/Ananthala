"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Product {
  _id: string
  productTitle: string
  image: string | null
  basePrice: number
}

interface ManageComplementaryProductsModalProps {
  isOpen: boolean
  productId: string
  productTitle: string
  onClose: () => void
  onSave: (selectedIds: string[]) => Promise<void>
  currentComplementaryIds?: string[]
}

export default function ManageComplementaryProductsModal({
  isOpen,
  productId,
  productTitle,
  onClose,
  onSave,
  currentComplementaryIds = [],
}: ManageComplementaryProductsModalProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set(currentComplementaryIds))
  const [isFetching, setIsFetching] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (isOpen) {
      fetchAvailableProducts()
      setSelectedProducts(new Set(currentComplementaryIds))
    }
  }, [isOpen, currentComplementaryIds])

  const fetchAvailableProducts = async () => {
    try {
      setIsFetching(true)
      setError(null)

      const response = await fetch(`/api/products/complementary?excludeId=${productId}`)
      const data = await response.json()

      if (data.success) {
        setAllProducts(data.products || [])
      } else {
        setError(data.message || "Failed to fetch products")
      }
    } catch (err) {
      console.error("[v0] Error fetching products:", err)
      setError("Failed to load products")
    } finally {
      setIsFetching(false)
    }
  }

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(productId)) {
        newSet.delete(productId)
      } else {
        newSet.add(productId)
      }
      return newSet
    })
  }

  const handleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set())
    } else {
      setSelectedProducts(new Set(filteredProducts.map((p) => p._id)))
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError(null)
      await onSave(Array.from(selectedProducts))
      onClose()
    } catch (err: any) {
      console.error("[v0] Error saving complementary products:", err)
      setError(err.message || "Failed to save complementary products")
    } finally {
      setIsSaving(false)
    }
  }

  const filteredProducts = allProducts.filter((p) =>
    p.productTitle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#4A2F1F]">
            Manage Complementary Products
          </DialogTitle>
          <p className="text-sm text-[#6D4530] mt-2">
            Select products that will be given FREE with "{productTitle}"
          </p>
        </DialogHeader>

        {isFetching ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5A3C]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[#6D4530]" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#D9CFC7]"
              />
            </div>

            {/* Select All */}
            <div className="border border-[#D9CFC7] rounded-lg p-4 flex items-center gap-3 hover:bg-[#F5F1ED]/50 transition">
              <Checkbox
                checked={selectedProducts.size === filteredProducts.length && filteredProducts.length > 0}
                onCheckedChange={handleSelectAll}
                className="w-5 h-5"
              />
              <span className="font-semibold text-[#4A2F1F]">
                Select All ({selectedProducts.size}/{filteredProducts.length})
              </span>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className={`border-2 rounded-lg p-3 transition cursor-pointer ${
                      selectedProducts.has(product._id)
                        ? "border-[#8B5A3C] bg-[#FFF8F4]"
                        : "border-[#D9CFC7] hover:border-[#8B5A3C]"
                    }`}
                    onClick={() => handleSelectProduct(product._id)}
                  >
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-[#F5F1ED]">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.productTitle}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[#E8E0D8]">
                            <span className="text-[#6D4530] text-xs">No image</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={selectedProducts.has(product._id)}
                            onCheckedChange={() => handleSelectProduct(product._id)}
                            className="w-4 h-4 mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-[#4A2F1F] truncate text-sm">{product.productTitle}</h3>
                            {product.basePrice > 0 && (
                              <p className="text-xs text-[#6D4530] mt-1">
                                Worth ₹{product.basePrice.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#6D4530] text-sm">No products found matching your search</p>
              </div>
            )}

            {/* Summary */}
            <div className="bg-[#F5F1ED] border border-[#D9CFC7] rounded-lg p-4">
              <p className="text-sm text-[#4A2F1F]">
                <span className="font-semibold">{selectedProducts.size}</span> product(s) selected to be given free
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-6 border-t border-[#D9CFC7]">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#D9CFC7] text-[#4A2F1F]"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#8B5A3C] text-white hover:bg-[#6D4530]"
            onClick={handleSave}
            disabled={isSaving || isFetching}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
