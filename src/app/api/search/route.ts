import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"

interface SearchProduct {
  _id: string
  productTitle: string
  description: string
  category: string
  subCategory?: string
  imageUrls: string[]
  variants: Array<{ price: number }>
  hamperPrice?: number
  productType?: "single" | "hamper"
  status: string
}

/**
 * Calculate relevance score for a product based on search query
 * Higher scores = better match
 */
function calculateRelevanceScore(product: SearchProduct, query: string): number {
  const queryLower = query.toLowerCase()
  let score = 0

  // Exact title match - highest priority (100 points)
  if (product.productTitle.toLowerCase() === queryLower) {
    score += 100
  }
  // Title starts with query (80 points)
  else if (product.productTitle.toLowerCase().startsWith(queryLower)) {
    score += 80
  }
  // Title contains query (60 points)
  else if (product.productTitle.toLowerCase().includes(queryLower)) {
    score += 60
  }

  // Category match (40 points)
  if (product.category.toLowerCase().includes(queryLower)) {
    score += 40
  }

  // Subcategory match (30 points)
  if (product.subCategory?.toLowerCase().includes(queryLower)) {
    score += 30
  }

  // Description match (20 points)
  if (product.description.toLowerCase().includes(queryLower)) {
    score += 20
  }

  return score
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")
    const limit = parseInt(searchParams.get("limit") || "20", 10)
    const dropdownLimit = parseInt(searchParams.get("dropdownLimit") || "6", 10)
    const isDropdown = searchParams.get("dropdown") === "true"

    // Validate query
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

    // Build MongoDB query with OR conditions for flexible matching
    const searchRegex = query.trim()
    const mongoQuery = {
      status: "visible",
      $or: [
        { productTitle: { $regex: searchRegex, $options: "i" } },
        { description: { $regex: searchRegex, $options: "i" } },
        { category: { $regex: searchRegex, $options: "i" } },
        { subCategory: { $regex: searchRegex, $options: "i" } },
      ],
    }

    // Fetch products from database
    const products = await Product.find(mongoQuery)
      .select(
        "_id productTitle description category subCategory imageUrls variants hamperPrice productType status"
      )
      .lean()
      .exec() as unknown as SearchProduct[]

    // Calculate relevance score and sort
    const scoredProducts = products
      .map((product) => ({
        ...product,
        relevanceScore: calculateRelevanceScore(product, query),
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)

    // Apply limit based on context (dropdown vs full search)
    const actualLimit = isDropdown ? dropdownLimit : limit
    const limitedProducts = scoredProducts.slice(0, actualLimit)

    // Format results for frontend
    const formattedResults = limitedProducts.map((product) => {
      const price =
        product.productType === "hamper" && product.hamperPrice
          ? product.hamperPrice
          : product.variants?.[0]?.price || 0

      return {
        id: product._id.toString(),
        name: product.productTitle,
        description: product.description?.substring(0, 80) || "",
        category: product.category,
        subCategory: product.subCategory || "",
        image: product.imageUrls?.[0] || "/placeholder.svg",
        price: price,
        productType: product.productType || "single",
      }
    })

    return NextResponse.json(
      {
        success: true,
        data: formattedResults,
        total: formattedResults.length,
        totalMatches: scoredProducts.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[Search API] Error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to search products",
        data: [],
      },
      { status: 500 }
    )
  }
}
