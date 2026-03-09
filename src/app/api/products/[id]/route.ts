import { NextResponse } from "next/server"
import { del } from "@vercel/blob"
import { put } from "@vercel/blob"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export const runtime = "nodejs"

// GET - Fetch single product by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    await connectDB()

    const product = await Product.findById(id).lean()

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        product,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[PRODUCT_FETCH_ERROR]", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch product" }, { status: 500 })
  }
}

// DELETE - Delete product by ID
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    console.log("[v0] DELETE request received for product:", id)

    await connectDB()

    const product = await Product.findById(id)

    if (!product) {
      console.log("[v0] Product not found:", id)
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    // Delete associated images from Vercel Blob
    console.log(`[v0] Deleting ${product.imageUrls.length} images from Vercel Blob...`)
    for (const imageUrl of product.imageUrls) {
      try {
        await del(imageUrl)
        console.log(`[v0] Deleted image: ${imageUrl}`)
      } catch (deleteError) {
        console.error(`[v0] Error deleting image ${imageUrl}:`, deleteError)
        // Continue deletion even if individual images fail
      }
    }

    // Delete product from database
    await Product.findByIdAndDelete(id)

    console.log("[v0] Product deleted successfully:", id)

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[PRODUCT_DELETE_ERROR]", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to delete product" }, { status: 500 })
  }
}

// PATCH - Update product status
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const { status } = await request.json()

    if (!status || !["visible", "hidden"].includes(status)) {
      return NextResponse.json({ success: false, message: "Valid status is required" }, { status: 400 })
    }

    await connectDB()

    const product = await Product.findByIdAndUpdate(id, { status }, { new: true, runValidators: true })

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    console.log("[v0] Product status updated:", { id, status })

    return NextResponse.json(
      {
        success: true,
        message: "Product status updated successfully",
        product,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[PRODUCT_UPDATE_ERROR]", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to update product" }, { status: 500 })
  }
}

// PUT - Update full product by ID
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        {
          success: false,
          message: "Image storage is not configured. Please add BLOB_READ_WRITE_TOKEN to your environment variables.",
        },
        { status: 500 },
      )
    }

    const formData = await request.formData()

    const productTitle = (formData.get("productTitle") as string)?.trim()
    const description = (formData.get("description") as string)?.trim()
    const units = (formData.get("units") as string)?.trim()
    const sellerName = (formData.get("sellerName") as string)?.trim()
    const sellerEmail = (formData.get("sellerEmail") as string)?.trim()
    const location = (formData.get("location") as string)?.trim()
    const category = (formData.get("category") as string)?.trim()
    const subCategory = (formData.get("subCategory") as string)?.trim()
    const variantsJson = formData.get("variants") as string
    const detailSectionsJson = formData.get("detailSections") as string
    const existingImageUrlsJson = formData.get("existingImageUrls") as string

    if (!productTitle || !description || !units || !sellerName || !sellerEmail || !location || !category || !variantsJson) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const categoryLower = category.toLowerCase()
    if (!["joy", "bliss", "grace", "mattress", "pillow", "bedding", "bedsheet"].includes(categoryLower)) {
      return NextResponse.json(
        { success: false, message: "Category must be joy, bliss, grace, mattress, pillow, bedding, or bedsheet" },
        { status: 400 },
      )
    }

    let variants
    try {
      variants = JSON.parse(variantsJson)
    } catch {
      return NextResponse.json({ success: false, message: "Invalid variants data format" }, { status: 400 })
    }

    if (!Array.isArray(variants) || variants.length === 0) {
      return NextResponse.json({ success: false, message: "At least one variant is required" }, { status: 400 })
    }

    const processedVariants = variants.map((variant, index) => {
      const weight = Number.parseFloat(variant.weight)
      const length = Number.parseFloat(variant.length)
      const width = Number.parseFloat(variant.width)
      const height = Number.parseFloat(variant.height)
      const fabric = variant.fabric?.trim()
      const price = Number.parseFloat(variant.price)
      const stock = Number.parseInt(variant.stock, 10)

      if (isNaN(weight) || isNaN(length) || isNaN(width) || isNaN(height) || isNaN(price) || isNaN(stock)) {
        throw new Error(`Variant ${index + 1} has invalid numeric values.`)
      }
      if (!fabric) {
        throw new Error(`Variant ${index + 1} requires a fabric selection.`)
      }
      if (weight <= 0 || length <= 0 || width <= 0 || height <= 0 || price <= 0 || stock < 0) {
        throw new Error(`Variant ${index + 1} has values that are too small or negative.`)
      }

      return {
        variantId: variant.id,
        weight,
        length,
        width,
        height,
        fabric,
        price,
        stock,
      }
    })

    let existingImageUrls: string[] = []
    if (existingImageUrlsJson) {
      try {
        const parsed = JSON.parse(existingImageUrlsJson)
        if (Array.isArray(parsed)) {
          existingImageUrls = parsed.filter((url): url is string => typeof url === "string" && !!url.trim())
        }
      } catch {
        return NextResponse.json({ success: false, message: "Invalid existing images data format" }, { status: 400 })
      }
    }

    const newImageFiles: File[] = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("image_") && value instanceof File) {
        newImageFiles.push(value)
      }
    }

    if (existingImageUrls.length + newImageFiles.length === 0) {
      return NextResponse.json({ success: false, message: "At least one product image is required" }, { status: 400 })
    }
    if (existingImageUrls.length + newImageFiles.length > 6) {
      return NextResponse.json({ success: false, message: "Maximum 6 images allowed" }, { status: 400 })
    }

    let detailSections: Array<{
      title: string
      body: string
      imageUrl?: string
      imageAlt?: string
      imagePosition?: "left" | "right"
      imageKey?: string
    }> = []

    if (detailSectionsJson) {
      try {
        const parsed = JSON.parse(detailSectionsJson)
        if (Array.isArray(parsed)) {
          detailSections = parsed
            .map((section) => ({
              title: typeof section.title === "string" ? section.title.trim() : "",
              body: typeof section.body === "string" ? section.body.trim() : "",
              imageUrl: typeof section.imageUrl === "string" ? section.imageUrl.trim() : "",
              imageAlt: typeof section.imageAlt === "string" ? section.imageAlt.trim() : "",
              imagePosition: section.imagePosition === "left" || section.imagePosition === "right" ? section.imagePosition : undefined,
              imageKey: typeof section.imageKey === "string" ? section.imageKey : undefined,
            }))
            .filter((section) => section.title || section.body || section.imageUrl || section.imageKey)
        }
      } catch {
        return NextResponse.json({ success: false, message: "Invalid detail sections data format" }, { status: 400 })
      }
    }

    await connectDB()

    const existingProduct = await Product.findById(id)
    if (!existingProduct) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    const uploadedImageUrls: string[] = []
    for (let i = 0; i < newImageFiles.length; i++) {
      const file = newImageFiles[i]
      const filename = `products/${sellerEmail.toLowerCase()}/${Date.now()}_${i}_${file.name}`
      const blob = await put(filename, file, {
        access: "public",
        addRandomSuffix: true,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
      uploadedImageUrls.push(blob.url)
    }

    for (const section of detailSections) {
      if (!section.imageKey) continue
      const file = formData.get(section.imageKey)
      if (!(file instanceof File)) continue

      const filename = `products/${sellerEmail.toLowerCase()}/detail-sections/${Date.now()}_${file.name}`
      const blob = await put(filename, file, {
        access: "public",
        addRandomSuffix: true,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
      section.imageUrl = blob.url
    }
    detailSections = detailSections.map(({ imageKey, ...rest }) => rest)

    const finalImageUrls = [...existingImageUrls, ...uploadedImageUrls]

    const removedImageUrls = (existingProduct.imageUrls || []).filter((url: string) => !finalImageUrls.includes(url))
    for (const imageUrl of removedImageUrls) {
      try {
        await del(imageUrl)
      } catch (error) {
        console.error("[v0] Failed deleting removed image:", imageUrl, error)
      }
    }

    const previousDetailImageUrls = (existingProduct.detailSections || [])
      .map((section: any) => section?.imageUrl)
      .filter((url: any): url is string => typeof url === "string" && !!url)
    const nextDetailImageUrls = detailSections
      .map((section) => section.imageUrl)
      .filter((url): url is string => typeof url === "string" && !!url)
    const removedDetailImageUrls = previousDetailImageUrls.filter((url: string) => !nextDetailImageUrls.includes(url))

    for (const imageUrl of removedDetailImageUrls) {
      try {
        await del(imageUrl)
      } catch (error) {
        console.error("[v0] Failed deleting removed detail section image:", imageUrl, error)
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        productTitle,
        description,
        units,
        sellerName,
        sellerEmail: sellerEmail.toLowerCase(),
        location,
        category: categoryLower,
        subCategory: subCategory || undefined,
        imageUrls: finalImageUrls,
        variants: processedVariants,
        detailSections,
      },
      { new: true, runValidators: true },
    )

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully",
        product: updatedProduct,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[PRODUCT_PUT_ERROR]", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to update product" }, { status: 500 })
  }
}
