import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/blog"
import mongoose from "mongoose"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid blog ID" }, { status: 400 })
    }

    const blog = await Blog.findById(id)

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      blog,
    })
  } catch (error: any) {
    console.error("Error fetching blog:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch blog", error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params
    const body = await request.json()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid blog ID" }, { status: 400 })
    }

    const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true })

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog,
    })
  } catch (error: any) {
    console.error("Error updating blog:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update blog", error: error.message },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params
    const body = await request.json()

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid blog ID" }, { status: 400 })
    }

    const blog = await Blog.findByIdAndUpdate(id, body, { new: true })

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog,
    })
  } catch (error: any) {
    console.error("Error updating blog:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update blog", error: error.message },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid blog ID" }, { status: 400 })
    }

    const blog = await Blog.findByIdAndDelete(id)

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    })
  } catch (error: any) {
    console.error("Error deleting blog:", error)
    return NextResponse.json(
      { success: false, message: "Failed to delete blog", error: error.message },
      { status: 500 },
    )
  }
}
