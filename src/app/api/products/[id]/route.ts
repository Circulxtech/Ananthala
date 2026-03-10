import { NextResponse } from "next/server"
import { del } from "@vercel/blob"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"
import mongoose from "mongoose"

export const runtime = "nodejs"

// Helper function to validate MongoDB ObjectId
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id)
}

// GET - Fetch single product by ID
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Validate if the ID is a valid MongoDB ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID format" },
        { status: 400 }
      )
    }

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

    // Validate if the ID is a valid MongoDB ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID format" },
        { status: 400 }
      )
    }

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

    // Validate if the ID is a valid MongoDB ObjectId
    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid product ID format" },
        { status: 400 }
      )
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
