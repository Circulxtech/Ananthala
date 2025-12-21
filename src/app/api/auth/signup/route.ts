import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    console.log("[v0] Signup request received")
    const { fullname, email, password } = await request.json()

    // Validate input
    if (!fullname || !email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Connect to database
    console.log("[v0] Connecting to database...")
    await connectDB()
    console.log("[v0] Database connected")

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists with this email" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    const userData = {
      fullname,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "customer",
    }

    console.log("[v0] Creating user with data:", { ...userData, password: "[REDACTED]" })
    const user = await User.create(userData)

    console.log("[v0] User created successfully:", {
      id: user._id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Signup successful",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          role: user.role, // Include role in response to verify
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[SIGNUP_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
