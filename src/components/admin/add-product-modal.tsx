"use client"

import type React from "react"
import { useState } from "react"
import { Upload, Plus, Trash2, AlertCircle, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { ProductFormData, ProductVariant } from "@/types/product"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onProductAdded?: () => void
}

interface ProductImage {
  id: string
  file: File
  preview: string
}

export default function AddProductModal({ isOpen, onClose, onProductAdded }: AddProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    productTitle: "",
    description: "",
    units: "",
    sellerName: "",
    sellerEmail: "",
    location: "",
    category: "",
    subCategory: "", // Will be removed from form, kept for backward compatibility
    variants: [
      {
        id: crypto.randomUUID(),
        weight: "",
        length: "",
        width: "",
        height: "",
        color: "",
        price: "",
        stock: "",
      },
    ],
  })

  const [productImages, setProductImages] = useState<ProductImage[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: ProductImage[] = []

    Array.from(files).forEach((file) => {
      // Check if we've reached the max limit
      if (productImages.length + newImages.length >= 6) {
        alert("Maximum 6 images allowed")
        return
      }

      if (file.size > 25 * 1024 * 1024) {
        alert(`File ${file.name} size exceeds 25 MB`)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage: ProductImage = {
          id: crypto.randomUUID(),
          file,
          preview: reader.result as string,
        }
        setProductImages((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    e.target.value = ""
  }

  const handleRemoveImage = (imageId: string) => {
    setProductImages((prev) => prev.filter((img) => img.id !== imageId))
  }

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleVariantChange = (variantId: string, field: keyof ProductVariant, value: string) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) => (variant.id === variantId ? { ...variant, [field]: value } : variant)),
    }))
  }

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          id: crypto.randomUUID(),
          weight: "",
          length: "",
          width: "",
          height: "",
          color: "",
          price: "",
          stock: "",
        },
      ],
    }))
  }

  const removeVariant = (variantId: string) => {
    if (formData.variants.length === 1) {
      alert("At least one variant is required")
      return
    }
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((variant) => variant.id !== variantId),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    if (productImages.length === 0) {
      setSubmitError("Please upload at least one product image")
      setIsSubmitting(false)
      return
    }

    try {
      const formDataToSend = new FormData()

      formDataToSend.append("productTitle", formData.productTitle)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("units", formData.units)
      formDataToSend.append("sellerName", formData.sellerName)
      formDataToSend.append("sellerEmail", formData.sellerEmail)
      formDataToSend.append("location", formData.location)
      formDataToSend.append("category", formData.category)
      formDataToSend.append("subCategory", formData.subCategory)

      formDataToSend.append("variants", JSON.stringify(formData.variants))

      productImages.forEach((image, index) => {
        formDataToSend.append(`image_${index}`, image.file)
      })

      console.log(
        "[v0] Submitting product with",
        productImages.length,
        "images and",
        formData.variants.length,
        "variants",
      )

      const response = await fetch("/api/products", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to create product")
      }

      console.log("[v0] Product created successfully:", data)

      if (onProductAdded) {
        onProductAdded()
      }

      handleCancel()
    } catch (error: any) {
      console.error("[v0] Error creating product:", error)
      setSubmitError(error.message || "Failed to create product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      productTitle: "",
      description: "",
      units: "",
      sellerName: "",
      sellerEmail: "",
      location: "",
      category: "",
      subCategory: "",
      variants: [
        {
          id: crypto.randomUUID(),
          weight: "",
          length: "",
          width: "",
          height: "",
          color: "",
          price: "",
          stock: "",
        },
      ],
    })
    setProductImages([])
    setSubmitError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-full lg:max-w-7xl max-h-[95vh] overflow-y-auto p-4 sm:p-6 md:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-[#6D4530]">
            Add New Product
          </DialogTitle>
          <p className="text-xs sm:text-sm text-[#8B5A3C]/70">
            Fill in the product details and add variants with different dimensions, weights, colors, and pricing
          </p>
        </DialogHeader>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3">
          <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-blue-900">
            <strong>Important!</strong> Please verify the seller detail address that you used in your profile
            management. (Products are linked to your seller account through the email)
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {submitError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex gap-2 sm:gap-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-red-900">{submitError}</div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Basic Information */}
            <div className="space-y-4 sm:space-y-5">
              <h3 className="text-base sm:text-lg font-semibold text-[#6D4530] border-b border-[#D9CFC7] pb-2">
                Basic Information
              </h3>

              <div className="space-y-2">
                <Label htmlFor="productTitle" className="text-sm sm:text-base text-[#6D4530]">
                  Product Title*
                </Label>
                <Input
                  id="productTitle"
                  placeholder="Enter product title"
                  value={formData.productTitle}
                  onChange={(e) => handleInputChange("productTitle", e.target.value)}
                  className="border-[#D9CFC7] h-10 sm:h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm sm:text-base text-[#6D4530]">
                  Product Description*
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="border-[#D9CFC7] min-h-[140px] sm:min-h-[160px]"
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="units" className="text-sm sm:text-base text-[#6D4530]">
                  Units*
                </Label>
                <Input
                  id="units"
                  placeholder="e.g., Kg, box, piece, meter"
                  value={formData.units}
                  onChange={(e) => handleInputChange("units", e.target.value)}
                  className="border-[#D9CFC7] h-10 sm:h-11"
                  required
                />
              </div>
            </div>

            {/* Product Images */}
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between border-b border-[#D9CFC7] pb-2">
                <h3 className="text-base sm:text-lg font-semibold text-[#6D4530]">Product Images</h3>
                <span className="text-xs sm:text-sm text-[#8B5A3C]/70">{productImages.length}/6 images</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {productImages.length < 6 && (
                  <label
                    htmlFor="imageUpload"
                    className="border-2 border-dashed border-[#D9CFC7] rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-[#8B5A3C] hover:bg-[#F5F1ED]/50 transition-colors"
                  >
                    <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-[#8B5A3C]/50 mb-2" />
                    <p className="text-[10px] sm:text-xs font-medium text-[#8B5A3C] text-center px-1">
                      Click to Upload
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-[#8B5A3C]/70 mt-1">(Max 25 Mb)</p>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}

                {productImages.map((image) => (
                  <div key={image.id} className="relative aspect-square group">
                    <img
                      src={image.preview || "/placeholder.svg"}
                      alt="Product preview"
                      className="w-full h-full object-cover rounded-lg border border-[#D9CFC7]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(image.id)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 sm:p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {productImages.length === 0 && (
                <p className="text-xs text-[#8B5A3C]/70 text-center mt-2">
                  Add up to 6 product images. Click the upload box above to select images.
                </p>
              )}
            </div>
          </div>

          {/* Product Variants */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9CFC7] pb-2">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#6D4530]">Product Variants</h3>
                <p className="text-xs sm:text-sm text-[#8B5A3C]/70">Add different sizes/weights with custom pricing</p>
              </div>
              <Button
                type="button"
                onClick={addVariant}
                className="bg-[#6D4530] hover:bg-[#8B5A3C] text-white w-full sm:w-auto"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Variant
              </Button>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {formData.variants.map((variant, index) => (
                <div
                  key={variant.id}
                  className="border border-[#D9CFC7] rounded-lg p-4 sm:p-5 space-y-4 bg-[#F5F1ED]/30"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm sm:text-base font-semibold text-[#6D4530]">Variant {index + 1}</h4>
                    {formData.variants.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVariant(variant.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        <span className="hidden sm:inline">Remove</span>
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`weight-${variant.id}`} className="text-sm text-[#6D4530]">
                        Weight (kg)*
                      </Label>
                      <Input
                        id={`weight-${variant.id}`}
                        type="number"
                        step="0.01"
                        placeholder="e.g., 2.5"
                        value={variant.weight}
                        onChange={(e) => handleVariantChange(variant.id, "weight", e.target.value)}
                        className="border-[#D9CFC7] h-10 sm:h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`length-${variant.id}`} className="text-sm text-[#6D4530]">
                        Length (inch)*
                      </Label>
                      <Input
                        id={`length-${variant.id}`}
                        type="number"
                        step="0.1"
                        placeholder="e.g., 30"
                        value={variant.length}
                        onChange={(e) => handleVariantChange(variant.id, "length", e.target.value)}
                        className="border-[#D9CFC7] h-10 sm:h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`width-${variant.id}`} className="text-sm text-[#6D4530]">
                        Width (inch)*
                      </Label>
                      <Input
                        id={`width-${variant.id}`}
                        type="number"
                        step="0.1"
                        placeholder="e.g., 20"
                        value={variant.width}
                        onChange={(e) => handleVariantChange(variant.id, "width", e.target.value)}
                        className="border-[#D9CFC7] h-10 sm:h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`height-${variant.id}`} className="text-sm text-[#6D4530]">
                        Height (inch)*
                      </Label>
                      <Input
                        id={`height-${variant.id}`}
                        type="number"
                        step="0.1"
                        placeholder="e.g., 15"
                        value={variant.height}
                        onChange={(e) => handleVariantChange(variant.id, "height", e.target.value)}
                        className="border-[#D9CFC7] h-10 sm:h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`color-${variant.id}`} className="text-sm text-[#6D4530]">
                        Color*
                      </Label>
                      <Input
                        id={`color-${variant.id}`}
                        type="text"
                        placeholder="e.g., Blue, White, Gray"
                        value={variant.color}
                        onChange={(e) => handleVariantChange(variant.id, "color", e.target.value)}
                        className="border-[#D9CFC7] h-10 sm:h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`price-${variant.id}`} className="text-sm text-[#6D4530]">
                        Price (₹)*
                      </Label>
                      <Input
                        id={`price-${variant.id}`}
                        type="number"
                        step="0.01"
                        placeholder="e.g., 1200"
                        value={variant.price}
                        onChange={(e) => handleVariantChange(variant.id, "price", e.target.value)}
                        className="border-[#D9CFC7] h-10 sm:h-11"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`stock-${variant.id}`} className="text-sm text-[#6D4530]">
                        Stock*
                      </Label>
                      <Input
                        id={`stock-${variant.id}`}
                        type="number"
                        placeholder="e.g., 50"
                        value={variant.stock}
                        onChange={(e) => handleVariantChange(variant.id, "stock", e.target.value)}
                        className="border-[#D9CFC7] h-10 sm:h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-white rounded p-3 text-xs sm:text-sm text-[#6D4530] border border-[#D9CFC7]">
                    <strong>Summary:</strong>{" "}
                    {variant.color && variant.weight && variant.length && variant.width && variant.height
                      ? `${variant.color} · ${variant.weight}kg · ${variant.length}×${variant.width}×${variant.height}cm`
                      : "Fill dimensions and color"}{" "}
                    {variant.price ? `· ₹${variant.price}` : ""}
                    {variant.stock ? ` · ${variant.stock} in stock` : ""}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seller Information */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-base sm:text-lg font-semibold text-[#6D4530] border-b border-[#D9CFC7] pb-2">
              Seller Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sellerName" className="text-sm sm:text-base text-[#6D4530]">
                  Seller Name*
                </Label>
                <Input
                  id="sellerName"
                  placeholder="Enter seller name"
                  value={formData.sellerName}
                  onChange={(e) => handleInputChange("sellerName", e.target.value)}
                  className="border-[#D9CFC7] h-10 sm:h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sellerEmail" className="text-sm sm:text-base text-[#6D4530]">
                  Seller Email*
                </Label>
                <Input
                  id="sellerEmail"
                  type="email"
                  placeholder="Enter seller email"
                  value={formData.sellerEmail}
                  onChange={(e) => handleInputChange("sellerEmail", e.target.value)}
                  className="border-[#D9CFC7] h-10 sm:h-11"
                  required
                />
                <p className="text-xs text-[#8B5A3C]/70">
                  * Please use the same email address that you provided during profile management
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm sm:text-base text-[#6D4530]">
                Location*
              </Label>
              <Input
                id="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="border-[#D9CFC7] h-10 sm:h-11"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-4 sm:space-y-5">
            <h3 className="text-base sm:text-lg font-semibold text-[#6D4530] border-b border-[#D9CFC7] pb-2">
              Category
            </h3>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm sm:text-base text-[#6D4530]">
                Product Category*
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="border-[#D9CFC7] h-10 sm:h-11 bg-white">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mattress">Mattress</SelectItem>
                  <SelectItem value="pillow">Pillow</SelectItem>
                  <SelectItem value="bedding">Bedding</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[#D9CFC7]">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="w-full sm:w-auto border-[#D9CFC7] text-[#6D4530] hover:bg-[#8B5A3C]/10 bg-transparent"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full sm:flex-1 bg-[#6D4530] hover:bg-[#8B5A3C] text-white font-semibold h-11 sm:h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                  Creating Product...
                </>
              ) : (
                "Add Product"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
