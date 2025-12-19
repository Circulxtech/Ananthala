import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    await connectDB()

    // Check if user exists with this email
    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return NextResponse.json({ success: false, message: "No account found with this email address" }, { status: 404 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[VERIFY_EMAIL_ERROR]", error)
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 })
  }
}
