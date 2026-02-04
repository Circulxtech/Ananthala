import { NextResponse } from "next/server"
import { put } from "@vercel/blob"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export const runtime = "nodejs"

// POST - Create new product
export async function POST(request: Request) {
  try {
    console.log("[v0] Product creation request received")

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("[v0] BLOB_READ_WRITE_TOKEN is not configured")
      return NextResponse.json(
        {
          success: false,
          message: "Image storage is not configured. Please add BLOB_READ_WRITE_TOKEN to your environment variables.",
        },
        { status: 500 },
      )
    }

    const formData = await request.formData()

    // Extract product data
    const productTitle = formData.get("productTitle") as string
    const description = formData.get("description") as string
    const units = formData.get("units") as string
    const sellerName = formData.get("sellerName") as string
    const sellerEmail = formData.get("sellerEmail") as string
    const location = formData.get("location") as string
    const category = formData.get("category") as string
    const subCategory = formData.get("subCategory") as string
    const variantsJson = formData.get("variants") as string

    console.log("[v0] Received form data:", {
      productTitle,
      description: description?.substring(0, 50) + "...",
      units,
      sellerName,
      sellerEmail,
      location,
      category,
      subCategory,
      hasVariants: !!variantsJson,
    })

    if (
      !productTitle ||
      !description ||
      !units ||
      !sellerName ||
      !sellerEmail ||
      !location ||
      !category ||
      !variantsJson
    ) {
      const missingFields = []
      if (!productTitle) missingFields.push("productTitle")
      if (!description) missingFields.push("description")
      if (!units) missingFields.push("units")
      if (!sellerName) missingFields.push("sellerName")
      if (!sellerEmail) missingFields.push("sellerEmail")
      if (!location) missingFields.push("location")
      if (!category) missingFields.push("category")
      if (!variantsJson) missingFields.push("variants")

      console.error("[v0] Missing required fields:", missingFields)
      return NextResponse.json(
        {
          success: false,
          message: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    const categoryLower = category.toLowerCase()
    if (categoryLower !== "mattress" && categoryLower !== "pillow" && categoryLower !== "bedding" && categoryLower !== "joy" && categoryLower !== "bliss" && categoryLower !== "grace") {
      console.error("[v0] Invalid category:", category)
      return NextResponse.json(
        { success: false, message: "Category must be either joy,bliss,grace,Mattress, Pillow,Bedding or bedsheet" },
        { status: 400 },
      )
    }

    // Parse variants
    let variants
    try {
      variants = JSON.parse(variantsJson)
      console.log("[v0] Parsed variants:", variants)
    } catch (parseError) {
      console.error("[v0] Error parsing variants JSON:", parseError)
      return NextResponse.json({ success: false, message: "Invalid variants data format" }, { status: 400 })
    }

    if (!Array.isArray(variants) || variants.length === 0) {
      console.error("[v0] Invalid variants array:", variants)
      return NextResponse.json({ success: false, message: "At least one variant is required" }, { status: 400 })
    }

    // Process variants - convert string values to numbers and validate
    const processedVariants = variants.map((variant, index) => {
      const weight = Number.parseFloat(variant.weight)
      const length = Number.parseFloat(variant.length)
      const width = Number.parseFloat(variant.width)
      const height = Number.parseFloat(variant.height)
      const color = variant.color?.trim()
      const price = Number.parseFloat(variant.price)
      const stock = Number.parseInt(variant.stock, 10)

      if (isNaN(weight) || isNaN(length) || isNaN(width) || isNaN(height) || isNaN(price) || isNaN(stock)) {
        console.error(`[v0] Invalid numeric values in variant ${index + 1}:`, variant)
        throw new Error(`Variant ${index + 1} has invalid numeric values. Please check all fields.`)
      }

      if (!color) {
        console.error(`[v0] Missing color in variant ${index + 1}`)
        throw new Error(`Variant ${index + 1} requires a color.`)
      }

      if (weight <= 0 || length <= 0 || width <= 0 || height <= 0 || price <= 0 || stock < 0) {
        console.error(`[v0] Out of range values in variant ${index + 1}:`, variant)
        throw new Error(`Variant ${index + 1} has values that are too small or negative.`)
      }

      return {
        variantId: variant.id,
        weight,
        length,
        width,
        height,
        color,
        price,
        stock,
      }
    })

    console.log("[v0] Processed variants:", processedVariants)

    // Extract and upload images
    const imageFiles: File[] = []
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("image_") && value instanceof File) {
        imageFiles.push(value)
      }
    }

    console.log("[v0] Found", imageFiles.length, "images")

    if (imageFiles.length === 0) {
      return NextResponse.json({ success: false, message: "At least one product image is required" }, { status: 400 })
    }

    if (imageFiles.length > 6) {
      return NextResponse.json({ success: false, message: "Maximum 6 images allowed" }, { status: 400 })
    }

    console.log(`[v0] Uploading ${imageFiles.length} images to Vercel Blob...`)

    // Upload images to Vercel Blob
    const imageUrls: string[] = []
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i]
      const timestamp = Date.now()
      const filename = `products/${sellerEmail}/${timestamp}_${i}_${file.name}`

      try {
        const blob = await put(filename, file, {
          access: "public",
          addRandomSuffix: true,
          token: process.env.BLOB_READ_WRITE_TOKEN,
        })

        imageUrls.push(blob.url)
        console.log(`[v0] Image ${i + 1} uploaded successfully: ${blob.url}`)
      } catch (uploadError: any) {
        console.error(`[v0] Error uploading image ${i + 1}:`, uploadError)
        return NextResponse.json(
          {
            success: false,
            message: `Failed to upload image ${i + 1}: ${uploadError.message || "Unknown error"}`,
          },
          { status: 500 },
        )
      }
    }

    // Connect to database
    console.log("[v0] Connecting to database...")
    await connectDB()

    const productData = {
      productTitle,
      description,
      units,
      sellerName,
      sellerEmail: sellerEmail.toLowerCase(),
      location,
      category: categoryLower,
      subCategory: subCategory || undefined,
      imageUrls,
      variants: processedVariants,
      status: "visible",
    }

    console.log("[v0] Creating product in database with data:", {
      ...productData,
      description: productData.description.substring(0, 50) + "...",
      imageUrls: productData.imageUrls.length,
      variants: productData.variants.length,
    })

    const product = await Product.create(productData)

    console.log("[v0] Product created successfully:", {
      id: product._id,
      title: product.productTitle,
      variants: product.variants.length,
      images: product.imageUrls.length,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        product: {
          id: product._id,
          productTitle: product.productTitle,
          category: product.category,
          variantsCount: product.variants.length,
          imagesCount: product.imageUrls.length,
          status: product.status,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] PRODUCT_CREATE_ERROR:", error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create product. Please try again." },
      { status: 500 },
    )
  }
}

// GET - Fetch all products (with optional filters)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const sellerEmail = searchParams.get("sellerEmail")
    const status = searchParams.get("status")

    await connectDB()

    // Build query
    const query: any = {}
    if (category && category !== "all") {
      query.category = category.toLowerCase()
    }
    if (sellerEmail) {
      query.sellerEmail = sellerEmail.toLowerCase()
    }
    if (status) {
      query.status = status
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).lean()

    return NextResponse.json(
      {
        success: true,
        count: products.length,
        products,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[v0] PRODUCTS_FETCH_ERROR", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch products" }, { status: 500 })
  }
}
