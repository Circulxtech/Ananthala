import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { generateToken } from "@/lib/jwt"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    await connectDB()

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })

    // Always return success to prevent email enumeration attacks
    if (!user) {
      return NextResponse.json(
        {
          success: true,
          message: "If an account exists with this email, a password reset link has been sent.",
        },
        { status: 200 },
      )
    }

    // Generate reset token
    const resetToken = generateToken(user.email)

    // Save token and expiration to database
    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = new Date(Date.now() + 3600000) // 1 hour from now
    await user.save()

    // In a real application, you would send this token via email
    // For now, we'll return it in the response
    console.log("[RESET_TOKEN]", resetToken)

    return NextResponse.json(
      {
        success: true,
        message: "If an account exists with this email, a password reset link has been sent.",
        // In production, remove this line and send via email instead
        resetToken,
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[FORGOT_PASSWORD_ERROR]", error)
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 })
  }
}
