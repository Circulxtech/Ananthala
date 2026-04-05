import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import PrivacyPolicy from "@/models/PrivacyPolicy"

export async function GET() {
  try {
    await connectDB()

    let privacyPolicy = await PrivacyPolicy.findOne()

    // If no privacy policy exists, return default
    if (!privacyPolicy) {
      privacyPolicy = {
        title: "Privacy Policy",
        content: "",
        sections: [],
        lastUpdated: new Date(),
      }
    }

    return NextResponse.json({
      success: true,
      privacyPolicy,
    })
  } catch (error: any) {
    console.error("Error fetching privacy policy:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch privacy policy", error: error.message },
      { status: 500 },
    )
  }
}
