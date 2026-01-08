import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import ContactUs from "@/models/ContactUs"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const contacts = await ContactUs.find({}).sort({ createdAt: -1 }).lean()

    return NextResponse.json({
      success: true,
      contacts,
    })
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch contact messages",
      },
      { status: 500 },
    )
  }
}
