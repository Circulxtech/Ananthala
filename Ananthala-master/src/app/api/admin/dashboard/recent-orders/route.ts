import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwtVerify(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Since we don't have an Order model yet, we'll use recently updated products
    const recentOrders = await Product.find()
      .select("productTitle sellerName variants createdAt updatedAt status")
      .sort({ updatedAt: -1 })
      .limit(8)
      .lean()

    const formattedOrders = recentOrders.map((product, index) => ({
      id: product._id?.toString(),
      productTitle: product.productTitle,
      seller: product.sellerName,
      quantity: product.variants[0]?.stock || 0,
      amount: product.variants[0]?.price || 0,
      status: ["delivered", "processing", "pending", "shipped"][index % 4],
      date: new Date(product.updatedAt || product.createdAt).toLocaleDateString(),
    }))

    return NextResponse.json({ recentOrders: formattedOrders }, { status: 200 })
  } catch (error) {
    console.error("Recent orders error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
