import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { verifyToken } from "@/lib/jwt"
import { cookies } from "next/headers"

export const runtime = "nodejs"

// GET - Fetch all users
export async function GET(request: Request) {
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

    // Connect to database
    await connectDB()

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const role = searchParams.get("role") || ""

    // Build query
    const query: any = {}

    // Add search filter
    if (search) {
      query.$or = [{ fullname: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
    }

    // Add role filter
    if (role && role !== "all") {
      query.role = role
    }

    // Fetch users sorted by most recent first
    const users = await User.find(query)
      .select("-password") // Exclude password from results
      .sort({ createdAt: -1 }) // Most recent first
      .lean()

    console.log("[v0] Fetched users:", users.length)

    return NextResponse.json({
      success: true,
      users: users.map((user) => ({
        id: user._id.toString(),
        fullname: user.fullname,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        createdAt: user.createdAt,
      })),
    })
  } catch (error: any) {
    console.error("[FETCH_USERS_ERROR]", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch users" }, { status: 500 })
  }
}
