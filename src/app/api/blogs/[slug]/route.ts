import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/blog"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB()

    const { slug } = await params

    const blog = await Blog.findOne({
      slug: slug,
      published: true,
    })
      .select("-__v")
      .lean()

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: blog,
    })
  } catch (error: any) {
    console.error("Error fetching blog:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
