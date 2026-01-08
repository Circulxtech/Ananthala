import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/blog"

export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")

    // Build query
    const query: any = { published: true }
    if (category) query.category = category
    if (featured === "true") query.featured = true

    const blogs = await Blog.find(query).sort({ createdAt: -1 }).select("-__v").lean()

    return NextResponse.json({
      success: true,
      data: blogs,
      count: blogs.length,
    })
  } catch (error: any) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
