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

    // Fetch recently added products
    const recentProducts = await Product.find()
      .select("productTitle sellerName category variants createdAt")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    const formattedProducts = recentProducts.map((product) => ({
      id: product._id?.toString(),
      name: product.productTitle,
      seller: product.sellerName,
      category: product.category || "uncategorized",
      price: product.variants[0]?.price || 0,
      stock: product.variants[0]?.stock || 0,
      dateAdded: new Date(product.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }))

    return NextResponse.json({ recentProducts: formattedProducts }, { status: 200 })
  } catch (error) {
    console.error("Recent orders error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
