import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { generateAgentToken } from "@/lib/jwt"

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

    // Check if user has agent role
    if (user.role !== "agent") {
      return NextResponse.json(
        { success: false, message: "Access denied. Agent privileges required." },
        { status: 403 },
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Generate agent token with 30-minute expiry
    const token = generateAgentToken({
      userId: user._id.toString(),
      email: user.email,
      fullname: user.fullname,
      role: user.role,
    })

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful as agent",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 },
    )

    // Set session cookie with 30-minute expiry
    response.cookies.set("agent_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 30, // 30 minutes in seconds
      path: "/",
    })

    return response
  } catch (error: any) {
    console.error("[AGENT_LOGIN_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
