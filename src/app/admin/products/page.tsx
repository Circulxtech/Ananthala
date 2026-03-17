"use client"

import { useState, useEffect } from "react"
import { Plus, RefreshCw, Trash2, Loader2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddProductModal from "@/components/admin/add-product-modal"

interface Product {
  _id: string
  productType?: "single" | "hamper"
  productTitle: string
  category: string
  subCategory: string
  hamperPrice?: number
  variants: Array<{
    variantId: string
    weight: number
    dimensions: {
      length: number
      width: number
      height: number
    }
    price: number
    stock: number
  }>
  hamperItems?: Array<{
    name?: string
    imageUrls?: string[]
    variants?: Array<{
      weight?: number
      length?: number
      width?: number
      height?: number
      stock?: number
    }>
  }>
  imageUrls: string[]
  detailSections?: Array<{
    title?: string
    body?: string
    imageUrl?: string
    imageAlt?: string
    imagePosition?: "left" | "right"
  }>
  status: "visible" | "hidden"
  sellerName: string
  sellerEmail: string
  location: string
  description: string
  units: string
}

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchProducts = async () => {
    try {
      setIsRefreshing(true)
      const response = await fetch("/api/products")
      const data = await response.json()

      if (data.success) {
        setProducts(data.products)
        console.log("[v0] Fetched", data.products.length, "products")
      }
    } catch (error) {
      console.error("[v0] Error fetching products:", error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleRefresh = () => {
    fetchProducts()
  }

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return
    }

    try {
      console.log("[v0] Deleting product:", productId)

      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      console.log("[v0] Delete response:", data)

      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== productId))
        console.log("[v0] Product deleted successfully from UI")
        alert("Product deleted successfully!")
      } else {
        console.error("[v0] Failed to delete product:", data.message)
        alert(data.message || "Failed to delete product")
      }
    } catch (error) {
      console.error("[v0] Error deleting product:", error)
      alert("Failed to delete product. Please try again.")
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsAddModalOpen(true)
  }

  const handleModalClose = () => {
    setIsAddModalOpen(false)
    setEditingProduct(null)
  }

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory.toLowerCase())

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const getProductStats = (product: Product) => {
    const isHamper = product.productType === "hamper"
    if (isHamper) {
      const hamperItems = Array.isArray(product.hamperItems) ? product.hamperItems : []
      const variantsCount = hamperItems.reduce((sum, item) => sum + ((item.variants || []).length || 0), 0)
      const totalStock = hamperItems.reduce(
        (sum, item) =>
          sum + (item.variants || []).reduce((innerSum, v) => innerSum + (Number(v.stock) || 0), 0),
        0,
      )
      const basePrice = Number(product.hamperPrice) || 0
      return { totalStock, basePrice, variantsCount }
    }

    const variantsCount = product.variants.length
    const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0)
    const basePrice = product.variants.length > 0 ? product.variants[0].price : 0
    return { totalStock, basePrice, variantsCount }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#8B5A3C]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#4A2F1F]">Product Management</h1>
      </div>

      {/* Product Stock Section */}
      <div className="bg-white rounded-lg shadow-sm border border-[#D9CFC7] p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#4A2F1F]">
            Product Stock ({filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""})
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px] border-[#D9CFC7]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="joy">JOY</SelectItem>
                 <SelectItem value="bliss">Bliss</SelectItem>
                <SelectItem value="grace">Grace</SelectItem>
                <SelectItem value="pillow">Pillow</SelectItem>
                <SelectItem value="bedding">Bedding</SelectItem>
                <SelectItem value="bedsheet">Bedsheet</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="border-[#D9CFC7] text-[#4A2F1F] hover:bg-[#8B5A3C]/10 bg-transparent font-medium"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>

            <Button
              className="bg-black text-white hover:bg-black/90 font-medium"
              onClick={() => {
                setEditingProduct(null)
                setIsAddModalOpen(true)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D9CFC7]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A2F1F]">Product Image</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A2F1F]">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A2F1F]">Product Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A2F1F]">Variants</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A2F1F]">Total Stock</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A2F1F]">Base Price (₹)</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#4A2F1F]">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((product) => {
                const { totalStock, basePrice, variantsCount } = getProductStats(product)
                return (
                  <tr key={product._id} className="border-b border-[#D9CFC7] hover:bg-[#F5F1ED]/50">
                    <td className="py-4 px-4">
                      <img
                        src={product.imageUrls[0] || "/placeholder.svg"}
                        alt={product.productTitle}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-4 px-4 text-[#6D4530] font-medium capitalize">{product.category}</td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-semibold text-[#4A2F1F]">{product.productTitle}</div>
                        {product.subCategory && (
                          <div className="text-sm text-[#6D4530] mt-0.5">{product.subCategory}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#4A2F1F] font-medium">{variantsCount}</td>
                    <td className="py-4 px-4 text-[#4A2F1F] font-medium">{totalStock}</td>
                    <td className="py-4 px-4 text-[#4A2F1F] font-semibold">₹{basePrice.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-[#4A2F1F] hover:bg-[#F5F1ED] mr-1"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {paginatedProducts.map((product) => {
            const { totalStock, basePrice, variantsCount } = getProductStats(product)
            return (
              <div key={product._id} className="border border-[#D9CFC7] rounded-lg p-4 space-y-3">
                <div className="flex gap-3">
                  <img
                    src={product.imageUrls[0] || "/placeholder.svg"}
                    alt={product.productTitle}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#4A2F1F] truncate">{product.productTitle}</h3>
                    <p className="text-sm text-[#6D4530] font-medium capitalize">{product.category}</p>
                    <p className="text-sm text-[#6D4530]">{variantsCount} variants</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-[#6D4530]">Total Stock:</span>
                    <span className="ml-2 font-semibold text-[#4A2F1F]">{totalStock}</span>
                  </div>
                  <div>
                    <span className="text-[#6D4530]">Base Price:</span>
                    <span className="ml-2 font-semibold text-[#4A2F1F]">₹{basePrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end pt-2 border-t border-[#D9CFC7]">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#4A2F1F] hover:bg-[#F5F1ED] mr-1"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(product._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#6D4530] font-medium">
              {selectedCategory === "all"
                ? "No products found. Add your first product to get started!"
                : `No ${selectedCategory} products found.`}
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D9CFC7]">
            <p className="text-sm text-[#4A2F1F] font-medium">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="border-[#D9CFC7] text-[#4A2F1F] disabled:opacity-50"
              >
                Previous
              </Button>
              <span className="text-sm text-[#4A2F1F] font-medium px-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="border-[#D9CFC7] text-[#4A2F1F] disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={handleModalClose}
        onProductAdded={fetchProducts}
        mode={editingProduct ? "edit" : "create"}
        productToEdit={editingProduct}
      />
    </div>
  )
}
