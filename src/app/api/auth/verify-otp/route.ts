import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { generateToken } from "@/lib/jwt"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { email, phone, otp, rememberMe } = await request.json()

    // Validate input
    if (!otp) {
      return NextResponse.json({ success: false, message: "OTP is required" }, { status: 400 })
    }

    if (!email && !phone) {
      return NextResponse.json({ success: false, message: "Email or phone is required" }, { status: 400 })
    }

    // Connect to database
    await connectDB()

    // Find user
    let user
    if (email) {
      user = await User.findOne({ email: email.toLowerCase() })
    } else if (phone) {
      user = await User.findOne({ phone })
    }

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Check OTP
    if (!user.otpCode || user.otpCode !== otp) {
      return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 401 })
    }

    // Check OTP expiry
    if (!user.otpExpiry || new Date() > user.otpExpiry) {
      return NextResponse.json(
        { success: false, message: "OTP has expired. Please request a new one." },
        { status: 401 },
      )
    }

    // Clear OTP fields
    user.otpCode = ""
    user.otpExpiry = null
    user.otpMethod = null
    await user.save()

    // Generate authentication token
    const token = generateToken(
      {
        userId: user._id.toString(),
        email: user.email,
        fullname: user.fullname,
      },
      rememberMe,
    )

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          phone: user.phone,
        },
      },
      { status: 200 },
    )

    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 2 // 30 days or 2 hours
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    })

    return response
  } catch (error: any) {
    console.error("[VERIFY_OTP_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
