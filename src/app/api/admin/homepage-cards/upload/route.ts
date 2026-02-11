import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file provided",
        },
        { status: 400 },
      )
    }

    if (file.type !== "image/gif") {
      return NextResponse.json(
        {
          success: false,
          message: "Please upload a valid GIF file",
        },
        { status: 400 },
      )
    }

    const filename = `homepage-cards/${Date.now()}-${file.name}`

    const blob = await put(filename, file, {
      access: "public",
    })

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        url: blob.url,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[v0] Error uploading homepage card image:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to upload image",
      },
      { status: 500 },
    )
  }
}
