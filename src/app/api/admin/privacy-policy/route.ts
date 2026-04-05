import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import PrivacyPolicy from "@/models/PrivacyPolicy"

// GET privacy policy
export async function GET() {
  try {
    await connectDB()

    const privacyPolicy = await PrivacyPolicy.findOne().sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      privacyPolicy: privacyPolicy || null,
      exists: !!privacyPolicy,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error fetching privacy policy:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch privacy policy", error: errorMessage },
      { status: 500 },
    )
  }
}

// CREATE new privacy policy
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // Check if a policy already exists
    const existingPolicy = await PrivacyPolicy.findOne()
    if (existingPolicy) {
      return NextResponse.json(
        { success: false, message: "A privacy policy already exists. Please delete it first before creating a new one." },
        { status: 400 },
      )
    }

    const body = await request.json()
    const { title, content, sections } = body

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 },
      )
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, message: "Content is required" },
        { status: 400 },
      )
    }

    const privacyPolicy = await PrivacyPolicy.create({
      title: title.trim(),
      content: content.trim(),
      sections: sections || [],
      lastUpdated: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: "Privacy policy created successfully",
      privacyPolicy,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error creating privacy policy:", error)
    return NextResponse.json(
      { success: false, message: "Failed to create privacy policy", error: errorMessage },
      { status: 500 },
    )
  }
}

// UPDATE privacy policy
export async function PUT(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { id, title, content, sections } = body

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Policy ID is required" },
        { status: 400 },
      )
    }

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 },
      )
    }

    if (!content || !content.trim()) {
      return NextResponse.json(
        { success: false, message: "Content is required" },
        { status: 400 },
      )
    }

    const privacyPolicy = await PrivacyPolicy.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        content: content.trim(),
        sections: sections || [],
        lastUpdated: new Date(),
      },
      { new: true }
    )

    if (!privacyPolicy) {
      return NextResponse.json(
        { success: false, message: "Privacy policy not found" },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Privacy policy updated successfully",
      privacyPolicy,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error updating privacy policy:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update privacy policy", error: errorMessage },
      { status: 500 },
    )
  }
}

// DELETE privacy policy
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Policy ID is required" },
        { status: 400 },
      )
    }

    const privacyPolicy = await PrivacyPolicy.findByIdAndDelete(id)

    if (!privacyPolicy) {
      return NextResponse.json(
        { success: false, message: "Privacy policy not found" },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Privacy policy deleted successfully",
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    console.error("Error deleting privacy policy:", error)
    return NextResponse.json(
      { success: false, message: "Failed to delete privacy policy", error: errorMessage },
      { status: 500 },
    )
  }
}
