import { connectDB } from "@/lib/mongodb"
import { ReviewVideo } from "@/models/reviewVideo"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const video = await ReviewVideo.findById(params.id)

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Review video not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: video,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[v0] Error fetching review video:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch review video",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const body = await request.json()
    const { title, description, blobUrl, customerName, thumbnail, isActive, displayOrder } = body

    const video = await ReviewVideo.findByIdAndUpdate(
      params.id,
      {
        title,
        description,
        blobUrl,
        videoUrl: blobUrl,
        customerName,
        thumbnail,
        isActive,
        displayOrder,
      },
      { new: true, runValidators: true },
    )

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Review video not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Review video updated successfully",
        data: video,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[v0] Error updating review video:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update review video",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const video = await ReviewVideo.findByIdAndDelete(params.id)

    if (!video) {
      return NextResponse.json(
        {
          success: false,
          message: "Review video not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Review video deleted successfully",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[v0] Error deleting review video:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete review video",
      },
      { status: 500 },
    )
  }
}
