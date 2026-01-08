import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/blog"

export async function GET() {
  try {
    await connectDB()

    const blogs = await Blog.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      blogs,
    })
  } catch (error: any) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch blogs", error: error.message },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, content, excerpt, image, author, category, tags, slug, published, featured } = body

    if (!title || !content || !excerpt || !image || !author || !category || !slug) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    const existingBlog = await Blog.findOne({ slug })
    if (existingBlog) {
      return NextResponse.json({ success: false, message: "Blog with this slug already exists" }, { status: 400 })
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      image,
      author,
      category,
      tags: tags || [],
      slug,
      published: published !== undefined ? published : true,
      featured: featured !== undefined ? featured : false,
    })

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      blog,
    })
  } catch (error: any) {
    console.error("Error creating blog:", error)
    return NextResponse.json(
      { success: false, message: "Failed to create blog", error: error.message },
      { status: 500 },
    )
  }
}
