import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export const runtime = "nodejs"

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const category = typeof body.category === "string" ? body.category.trim().toLowerCase() : ""
    const orderedIds = Array.isArray(body.orderedIds) ? body.orderedIds.filter(Boolean) : []

    if (!category) {
      return NextResponse.json({ success: false, message: "Category is required" }, { status: 400 })
    }

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json({ success: false, message: "orderedIds is required" }, { status: 400 })
    }

    await connectDB()

    const bulkOps = orderedIds.map((id: string, index: number) => ({
      updateOne: {
        filter: { _id: id, category },
        update: { $set: { displayOrder: index + 1 } },
      },
    }))

    if (bulkOps.length > 0) {
      await Product.bulkWrite(bulkOps)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Product order updated",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[PRODUCT_ORDER_UPDATE_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update product order" },
      { status: 500 },
    )
  }
}
