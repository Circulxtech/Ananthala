import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export const runtime = "nodejs"

// Helper function to normalize phone number with country code
function normalizePhoneForStorage(phone: string): string {
  const rawPhone = String(phone).trim()
  let digits = rawPhone.replace(/\D/g, "")
  
  // Remove leading 0 if present
  if (digits.startsWith("0")) {
    digits = digits.slice(1)
  }
  
  // If starts with 91, keep it
  if (digits.startsWith("91") && digits.length === 12) {
    return digits
  }
  
  // Take last 10 digits and add 91 prefix
  const last10 = digits.slice(-10)
  return "91" + last10
}

export async function POST(request: Request) {
  try {
    console.log("[v0] Signup request received")
    const { fullname, email, password, phone } = await request.json()

    // Validate input
    if (!fullname || !email || !password || !phone) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters" }, { status: 400 })
    }

    const rawPhone = String(phone).trim()
    let phoneDigits = rawPhone.replace(/\D/g, "")
    
    // Remove leading country code for validation
    if (phoneDigits.startsWith("91")) {
      phoneDigits = phoneDigits.slice(2)
    }
    if (phoneDigits.startsWith("0")) {
      phoneDigits = phoneDigits.slice(1)
    }
    
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit Indian mobile number" },
        { status: 400 },
      )
    }

    // Normalize phone with country code for consistent storage
    const normalizedPhone = normalizePhoneForStorage(phone)

    // Connect to database
    console.log("[v0] Connecting to database...")
    await connectDB()
    console.log("[v0] Database connected")

    // Check if user already exists
    const normalizedEmail = email.toLowerCase()
    const existingUser = await User.findOne({ email: normalizedEmail })
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists with this email" }, { status: 409 })
    }

    // Check for existing phone - check both formats (with and without 91 prefix)
    const phoneWithPrefix = normalizedPhone
    const phoneWithoutPrefix = normalizedPhone.startsWith("91") ? normalizedPhone.slice(2) : normalizedPhone
    
    const existingPhoneUser = await User.findOne({ 
      $or: [
        { phone: phoneWithPrefix },
        { phone: phoneWithoutPrefix }
      ]
    })
    if (existingPhoneUser) {
      return NextResponse.json(
        { success: false, message: "An account already exists with this phone number" },
        { status: 409 },
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

const userData = {
      fullname,
      email: normalizedEmail,
      password: hashedPassword,
      role: "customer",
      phone: normalizedPhone,
      isProfileComplete: true, // Users who sign up with full form have complete profiles
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
      { success: false, message: error.message || "Something went wrong ,Please try again." },
      { status: 500 },
    )
  }
}
