import { connectDB } from "@/lib/mongodb"
import { HomepageCard } from "@/models/homepageCard"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()

    const { id } = await params
    const body = await request.json()
    const { backgroundUrl } = body

    if (!backgroundUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Background URL is required",
        },
        { status: 400 },
      )
    }

    const card = await HomepageCard.findByIdAndUpdate(
      id,
      {
        backgroundUrl,
      },
      { new: true, runValidators: true },
    )

    if (!card) {
      return NextResponse.json(
        {
          success: false,
          message: "Homepage card not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Homepage card updated successfully",
        data: card,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[v0] Error updating homepage card:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update homepage card",
      },
      { status: 500 },
    )
  }
}
