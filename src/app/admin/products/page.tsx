"use client"

import { useState } from "react"
import { Plus, RefreshCw, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import AddProductModal from "@/components/admin/add-product-modal"

interface Product {
  id: number
  name: string
  sku: string
  category: string
  stock: number
  price: number
  status: "visible" | "hidden"
  image: string
}

export default function ProductManagementPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 141,
      name: "EXAM",
      sku: "DKSDN",
      category: "Welding & Soldering",
      stock: 45,
      price: 1220,
      status: "hidden",
      image: "/welding-equipment.jpg",
    },
    {
      id: 139,
      name: "VIVO1729",
      sku: "Abc123",
      category: "Solar",
      stock: 20,
      price: 1200,
      status: "hidden",
      image: "/solar-panel.jpg",
    },
  ])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleRefresh = () => {
    // Add refresh logic here
    console.log("[v0] Refreshing product list...")
  }

  const handleStatusToggle = (productId: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: p.status === "visible" ? "hidden" : "visible" } : p)),
    )
  }

  const handleDelete = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== productId))
    }
  }

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#6D4530]">Product Management</h1>
      </div>

      {/* Product Stock Section */}
      <div className="bg-white rounded-lg shadow-sm border border-[#D9CFC7] p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#6D4530]">
            Product Stock ({filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""})
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px] border-[#D9CFC7]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Welding & Soldering">Welding & Soldering</SelectItem>
                <SelectItem value="Solar">Solar</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="border-[#D9CFC7] text-[#6D4530] hover:bg-[#8B5A3C]/10 bg-transparent"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>

            <Button
              className="bg-black text-white hover:bg-black/90 font-medium"
              onClick={() => setIsAddModalOpen(true)}
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
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6D4530]">Product Image</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6D4530]">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6D4530]">Product Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6D4530]">Stock</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6D4530]">Price (₹)</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6D4530]">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[#6D4530]">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-[#D9CFC7] hover:bg-[#F5F1ED]/50">
                  <td className="py-4 px-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-4 px-4 text-[#6D4530]">{product.category}</td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-[#6D4530]">{product.name}</div>
                      <div className="text-sm text-[#8B5A3C]/70">
                        ID: {product.id} | SKU: {product.sku}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#6D4530]">{product.stock}</td>
                  <td className="py-4 px-4 text-[#6D4530]">₹{product.price.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={product.status === "visible"}
                        onCheckedChange={() => handleStatusToggle(product.id)}
                      />
                      <span className="text-sm text-[#8B5A3C]/70 capitalize">{product.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#8B5A3C] hover:bg-[#8B5A3C]/10">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:bg-red-50"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border border-[#D9CFC7] rounded-lg p-4 space-y-3">
              <div className="flex gap-3">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#6D4530] truncate">{product.name}</h3>
                  <p className="text-sm text-[#8B5A3C]/70">
                    ID: {product.id} | SKU: {product.sku}
                  </p>
                  <p className="text-sm text-[#6D4530]">{product.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-[#8B5A3C]/70">Stock:</span>
                  <span className="ml-2 font-medium text-[#6D4530]">{product.stock}</span>
                </div>
                <div>
                  <span className="text-[#8B5A3C]/70">Price:</span>
                  <span className="ml-2 font-medium text-[#6D4530]">₹{product.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#D9CFC7]">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={product.status === "visible"}
                    onCheckedChange={() => handleStatusToggle(product.id)}
                  />
                  <span className="text-sm text-[#8B5A3C]/70 capitalize">{product.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-[#8B5A3C] hover:bg-[#8B5A3C]/10">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:bg-red-50"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D9CFC7]">
          <p className="text-sm text-[#8B5A3C]/70">
            Showing 1-{filteredProducts.length} of {filteredProducts.length}
          </p>
          <p className="text-sm text-[#8B5A3C]/70">1 of 1</p>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
