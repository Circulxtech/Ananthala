import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Press from "@/models/Press"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    console.log("[v0] Fetching press release with ID:", id)

    await connectDB()
    const press = await Press.findById(id)
    console.log("[v0] Press release found:", press ? "yes" : "no")

    if (!press) {
      console.error("[v0] Press release not found for ID:", id)
      return NextResponse.json({ success: false, message: "Press release not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, press }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error fetching press release:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to fetch press release" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    console.log("[v0] Updating press release with ID:", id)

    await connectDB()
    const { title, subheading, content, image, externalLink, status } = await req.json()

    console.log("[v0] Update data:", { title, status })

    const press = await Press.findByIdAndUpdate(
      id,
      {
        title,
        subheading,
        content,
        image,
        externalLink,
        status,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    )

    if (!press) {
      console.error("[v0] Press release not found for update, ID:", id)
      return NextResponse.json({ success: false, message: "Press release not found" }, { status: 404 })
    }

    console.log("[v0] Press release updated successfully")
    return NextResponse.json({ success: true, press }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error updating press release:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update press release" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    console.log("[v0] Deleting press release with ID:", id)

    await connectDB()
    const press = await Press.findByIdAndDelete(id)

    if (!press) {
      console.error("[v0] Press release not found for delete, ID:", id)
      return NextResponse.json({ success: false, message: "Press release not found" }, { status: 404 })
    }

    console.log("[v0] Press release deleted successfully")
    return NextResponse.json({ success: true, message: "Press release deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error deleting press release:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete press release" },
      { status: 500 }
    )
  }
}
