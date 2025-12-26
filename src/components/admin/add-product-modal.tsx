"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Plus, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    productTitle: "",
    skuCode: "",
    model: "",
    description: "",
    price: "",
    discount: "",
    stock: "",
    units: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    sellerName: "",
    sellerEmail: "",
    location: "",
    category: "",
    subCategory: "",
  })

  const [productImage, setProductImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        alert("File size exceeds 25 MB")
        return
      }
      setProductImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Submitting product:", formData)
    // Add API call here
    onClose()
  }

  const handleCancel = () => {
    setFormData({
      productTitle: "",
      skuCode: "",
      model: "",
      description: "",
      price: "",
      discount: "",
      stock: "",
      units: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      sellerName: "",
      sellerEmail: "",
      location: "",
      category: "",
      subCategory: "",
    })
    setProductImage(null)
    setImagePreview("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#6D4530]">Add New Product</DialogTitle>
          <p className="text-sm text-[#8B5A3C]/70">Fill in the product details below</p>
        </DialogHeader>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <strong>Important!</strong> Please verify the seller detail address that you used in your profile
            management. (Products are linked to your seller account through the email)
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#6D4530] border-b border-[#D9CFC7] pb-2">Basic Information</h3>

              <div className="space-y-2">
                <Label htmlFor="productTitle" className="text-[#6D4530]">
                  Product Title*
                </Label>
                <Input
                  id="productTitle"
                  placeholder="Enter product title"
                  value={formData.productTitle}
                  onChange={(e) => handleInputChange("productTitle", e.target.value)}
                  className="border-[#D9CFC7]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skuCode" className="text-[#6D4530]">
                  SKU Code*
                </Label>
                <Input
                  id="skuCode"
                  placeholder="e.g., ABC-123-X-Y-Z"
                  value={formData.skuCode}
                  onChange={(e) => handleInputChange("skuCode", e.target.value)}
                  className="border-[#D9CFC7]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model" className="text-[#6D4530]">
                  Model
                </Label>
                <Input
                  id="model"
                  placeholder="e.g., X-15-B"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  className="border-[#D9CFC7]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-[#6D4530]">
                  Product Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="border-[#D9CFC7] min-h-[100px]"
                  rows={4}
                />
              </div>
            </div>

            {/* Product Image */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#6D4530] border-b border-[#D9CFC7] pb-2">Product Image</h3>

              <div className="border-2 border-dashed border-[#D9CFC7] rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="max-h-48 mx-auto rounded" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setProductImage(null)
                        setImagePreview("")
                      }}
                      className="border-[#D9CFC7]"
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="imageUpload" className="cursor-pointer block">
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-10 w-10 text-[#8B5A3C]/50" />
                      <p className="text-sm font-medium text-[#8B5A3C]">Click to Upload</p>
                      <p className="text-xs text-[#8B5A3C]/70">(Max file size: 25 Mb)</p>
                    </div>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#6D4530] border-b border-[#D9CFC7] pb-2">Pricing</h3>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-[#6D4530]">
                  Price*
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="border-[#D9CFC7]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount" className="text-[#6D4530]">
                  Discount (%)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  placeholder="Enter discount percentage"
                  value={formData.discount}
                  onChange={(e) => handleInputChange("discount", e.target.value)}
                  className="border-[#D9CFC7]"
                />
              </div>
            </div>

            {/* Inventory & Units */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#6D4530] border-b border-[#D9CFC7] pb-2">Inventory & Units</h3>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-[#6D4530]">
                  Stock*
                </Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="Enter available quantity"
                  value={formData.stock}
                  onChange={(e) => handleInputChange("stock", e.target.value)}
                  className="border-[#D9CFC7]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="units" className="text-[#6D4530]">
                  Units
                </Label>
                <Input
                  id="units"
                  placeholder="e.g., Kg, box, etc."
                  value={formData.units}
                  onChange={(e) => handleInputChange("units", e.target.value)}
                  className="border-[#D9CFC7]"
                />
              </div>
            </div>
          </div>

          {/* Dimensions & Weight */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#6D4530] border-b border-[#D9CFC7] pb-2">Dimensions & Weight</h3>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-[#6D4530]">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.01"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="border-[#D9CFC7]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="length" className="text-[#6D4530]">
                  Length (cm)
                </Label>
                <Input
                  id="length"
                  type="number"
                  placeholder="Length"
                  value={formData.length}
                  onChange={(e) => handleInputChange("length", e.target.value)}
                  className="border-[#D9CFC7]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="width" className="text-[#6D4530]">
                  Width (cm)
                </Label>
                <Input
                  id="width"
                  type="number"
                  placeholder="Width"
                  value={formData.width}
                  onChange={(e) => handleInputChange("width", e.target.value)}
                  className="border-[#D9CFC7]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="text-[#6D4530]">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Height"
                  value={formData.height}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="border-[#D9CFC7]"
                />
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#6D4530] border-b border-[#D9CFC7] pb-2">Seller Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sellerName" className="text-[#6D4530]">
                  Seller Name*
                </Label>
                <Input
                  id="sellerName"
                  placeholder="Enter seller name"
                  value={formData.sellerName}
                  onChange={(e) => handleInputChange("sellerName", e.target.value)}
                  className="border-[#D9CFC7]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sellerEmail" className="text-[#6D4530]">
                  Seller Email*
                </Label>
                <Input
                  id="sellerEmail"
                  type="email"
                  placeholder="Enter seller email"
                  value={formData.sellerEmail}
                  onChange={(e) => handleInputChange("sellerEmail", e.target.value)}
                  className="border-[#D9CFC7]"
                  required
                />
                <p className="text-xs text-[#8B5A3C]/70">
                  * Please use the same email address that you provided during profile management
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-[#6D4530]">
                Location*
              </Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="border-[#D9CFC7]"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#6D4530] border-b border-[#D9CFC7] pb-2">Category</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-[#6D4530]">
                  Category*
                </Label>
                <div className="flex gap-2">
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="border-[#D9CFC7]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welding">Welding & Soldering</SelectItem>
                      <SelectItem value="solar">Solar</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="border-[#D9CFC7] flex-shrink-0 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subCategory" className="text-[#6D4530]">
                  Sub Category
                </Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.subCategory}
                    onValueChange={(value) => handleInputChange("subCategory", value)}
                  >
                    <SelectTrigger className="border-[#D9CFC7]">
                      <SelectValue placeholder="Select a category first" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sub1">Sub Category 1</SelectItem>
                      <SelectItem value="sub2">Sub Category 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="border-[#D9CFC7] flex-shrink-0 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[#D9CFC7]">
            <Button type="button" variant="outline" onClick={handleCancel} className="border-[#D9CFC7] bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="bg-[#10B981] hover:bg-[#059669] text-white">
              Submit Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
