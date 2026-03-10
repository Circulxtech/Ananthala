import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")
    const limit = parseInt(searchParams.get("limit") || "5", 10)

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        {
          success: true,
          data: [],
          message: "No search query provided",
        },
        { status: 200 }
      )
    }

    await dbConnect()

    // Search products by name, description, or category
    const searchLower = query.toLowerCase()

    const products = await Product.find({
      $or: [
        { name: { $regex: searchLower, $options: "i" } },
        { description: { $regex: searchLower, $options: "i" } },
        { category: { $regex: searchLower, $options: "i" } },
        { subCategory: { $regex: searchLower, $options: "i" } },
      ],
    })
      .select("_id name description category subCategory images variants rating")
      .limit(limit)
      .lean()

    // Transform results to match frontend expectations
    const formattedResults = products.map((product: any) => ({
      id: product._id,
      name: product.name,
      description: product.description?.substring(0, 100) || "",
      category: product.category,
      subCategory: product.subCategory,
      image: product.images?.[0] || "/placeholder.png",
      rating: product.rating || 4.5,
      price: product.variants?.[0]?.price || 0,
    }))

    return NextResponse.json(
      {
        success: true,
        data: formattedResults,
        total: formattedResults.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[Search API] Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to search products",
      },
      { status: 500 }
    )
  }
}
