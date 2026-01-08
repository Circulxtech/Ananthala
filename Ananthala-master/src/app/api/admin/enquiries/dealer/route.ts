import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import DealerEnquiry from "@/models/DealerEnquiry"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const enquiries = await DealerEnquiry.find({}).sort({ createdAt: -1 }).lean()

    return NextResponse.json({
      success: true,
      enquiries,
    })
  } catch (error) {
    console.error("Error fetching dealer enquiries:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dealer enquiries",
      },
      { status: 500 },
    )
  }
}
