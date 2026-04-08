import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { verifyToken } from "@/lib/jwt"
import { normalizePhoneNumber } from "@/lib/msz91"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { fullname, email, phone } = await request.json()

    // Get auth token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { success: false, message: "Invalid authentication token" },
        { status: 401 }
      )
    }

    // Connect to database
    await connectDB()

    // Find user
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      )
    }

    // Validate and update fields
    const updates: Record<string, any> = {}

    // Update fullname if provided and currently a placeholder or empty
    if (fullname && fullname.trim()) {
      const isPlaceholderName = user.fullname === "Phone User" || user.fullname === "OTP User" || !user.fullname || user.fullname === ""
      if (isPlaceholderName) {
        updates.fullname = fullname.trim()
      }
    }

    // Update email if provided and currently missing or temp
    if (email && email.trim()) {
      const normalizedEmail = email.toLowerCase().trim()
      const isTempEmail = user.email?.includes("@temp.ananthala.com")
      
      if (!user.email || user.email === "" || isTempEmail) {
        // Check if email already exists for another user
        const existingUser = await User.findOne({ 
          email: normalizedEmail,
          _id: { $ne: user._id }
        })
        
        if (existingUser) {
          return NextResponse.json(
            { success: false, message: "This email is already registered with another account" },
            { status: 409 }
          )
        }
        
        updates.email = normalizedEmail
      }
    }

    // Update phone if provided and currently missing
    if (phone && phone.trim()) {
      const normalizedPhone = normalizePhoneNumber(phone)
      const phoneWithoutPrefix = normalizedPhone.startsWith("91") ? normalizedPhone.slice(2) : normalizedPhone
      
      if (!user.phone || user.phone === "") {
        // Check if phone already exists for another user (check both formats)
        const existingUser = await User.findOne({ 
          $or: [
            { phone: normalizedPhone },
            { phone: phoneWithoutPrefix }
          ],
          _id: { $ne: user._id }
        })
        
        if (existingUser) {
          return NextResponse.json(
            { success: false, message: "This phone number is already registered with another account" },
            { status: 409 }
          )
        }
        
        updates.phone = normalizedPhone
      }
    }

    // Mark profile as complete
    updates.isProfileComplete = true

    // Update user
    if (Object.keys(updates).length > 0) {
      await User.findByIdAndUpdate(user._id, updates)
    }

    // Fetch updated user
    const updatedUser = await User.findById(user._id)

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Failed to fetch updated user" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully",
        user: {
          id: updatedUser._id,
          fullname: updatedUser.fullname,
          email: updatedUser.email,
          phone: updatedUser.phone,
        },
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("[COMPLETE_PROFILE_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
