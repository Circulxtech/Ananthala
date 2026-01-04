import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { verifyToken } from "@/lib/jwt"
import { cookies } from "next/headers"

export const runtime = "nodejs"

// PATCH - Update user role
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const { role } = body

    // Validate role
    if (!role || !["customer", "admin", "agent"].includes(role)) {
      return NextResponse.json({ success: false, message: "Invalid role" }, { status: 400 })
    }

    // Connect to database
    await connectDB()

    // Update user role
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password")

    if (!updatedUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    console.log("[v0] User role updated:", { id, newRole: role })

    return NextResponse.json({
      success: true,
      message: "User role updated successfully",
      user: {
        id: updatedUser._id.toString(),
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    })
  } catch (error: any) {
    console.error("[UPDATE_USER_ROLE_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update user role" },
      { status: 500 },
    )
  }
}
