import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Press from "@/models/Press"

export async function GET() {
  try {
    await connectDB()
    const pressReleases = await Press.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, pressReleases }, { status: 200 })
  } catch (error) {
    console.error("Error fetching press releases:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch press releases" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const { title, subheading, content, image, externalLink, status } = await req.json()

    if (!title || !content || !image) {
      return NextResponse.json(
        { success: false, message: "Title, content, and image are required" },
        { status: 400 },
      )
    }

    const press = new Press({
      title,
      subheading,
      content,
      image,
      externalLink,
      status,
    })

    await press.save()
    return NextResponse.json({ success: true, press }, { status: 201 })
  } catch (error) {
    console.error("Error creating press release:", error)
    return NextResponse.json({ success: false, message: "Failed to create press release" }, { status: 500 })
  }
}
