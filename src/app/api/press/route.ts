import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Press from "@/models/Press"

export async function GET() {
  try {
    console.log("[v0] Connecting to database...")
    await connectDB()
    console.log("[v0] Connected to database")

    console.log("[v0] Querying press releases with status: published")
    const pressReleases = await Press.find({ status: "published" }).sort({ createdAt: -1 })
    console.log(`[v0] Found ${pressReleases.length} press releases`)

    if (pressReleases.length > 0) {
      console.log("[v0] First press release:", JSON.stringify(pressReleases[0], null, 2))
    }

    return NextResponse.json({ success: true, pressReleases }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error fetching press releases:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch press releases",
      },
      { status: 500 }
    )
  }
}
