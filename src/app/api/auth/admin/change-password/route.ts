import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { verifyToken } from "@/lib/jwt"
import { cookies } from "next/headers"
import { validatePassword } from "@/lib/password-validation"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    // Verify authentication
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please login first." }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ success: false, message: "Invalid token. Please login again." }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 })
    }

    // Validate new password against requirements
    const passwordValidation = validatePassword(newPassword)
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Password does not meet requirements.",
          errors: passwordValidation.errors,
        },
        { status: 400 },
      )
    }

    // Check if new password is same as current password
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { success: false, message: "New password must be different from current password." },
        { status: 400 },
      )
    }

    // Connect to database
    await connectDB()

    // Find user by ID from token
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 })
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ success: false, message: "Current password is incorrect." }, { status: 401 })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update user password in database
    user.password = hashedPassword
    await user.save()

    return NextResponse.json(
      {
        success: true,
        message: "Password updated successfully. Please login again with your new password.",
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[CHANGE_PASSWORD_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
