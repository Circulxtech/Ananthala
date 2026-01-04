import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { verifyToken } from "@/lib/jwt"
import { cookies } from "next/headers"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    // Verify admin authentication
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized. Please login first." }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized access." }, { status: 403 })
    }

    const { currentPassword, newPassword, confirmPassword } = await request.json()

    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 })
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 6 characters long." },
        { status: 400 },
      )
    }

    // Check if new and confirm passwords match
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: "New password and confirm password do not match." },
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
