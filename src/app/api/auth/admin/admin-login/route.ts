import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { generateAdminToken } from "@/lib/jwt"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Connect to database
    await connectDB()

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Check if user has admin role
    if (user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Access denied. Admin privileges required." },
        { status: 403 },
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Generate admin token with 30-minute expiry
    const token = generateAdminToken({
      userId: user._id.toString(),
      email: user.email,
      fullname: user.fullname,
      role: user.role,
    })

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful as admin",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    )

    // Set session cookie with 30-minute expiry (matches JWT expiry)
    // Using sessionStorage behavior - cookie expires when browser closes
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 30, // 30 minutes in seconds
      path: "/", // Updated from "/admin" to "/" for broader access
    })

    return response
  } catch (error: any) {
    console.error("[ADMIN_LOGIN_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
