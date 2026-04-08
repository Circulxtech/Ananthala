import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import { generateToken } from "@/lib/jwt"
import { normalizePhoneNumber } from "@/lib/msz91"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const { email, phone, otp, rememberMe } = await request.json()

    // Validate input
    if (!otp) {
      return NextResponse.json({ success: false, message: "OTP is required" }, { status: 400 })
    }

    if (!email && !phone) {
      return NextResponse.json({ success: false, message: "Email or phone is required" }, { status: 400 })
    }

    // Connect to database
    await connectDB()

// Find user
    let user
    if (email) {
      user = await User.findOne({ email: email.toLowerCase() })
      console.log(`[v0] Looking up user by email: ${email}`)
    } else if (phone) {
      // Normalize phone number before lookup
      const normalizedPhone = normalizePhoneNumber(phone)
      console.log(`[v0] Looking up user by phone. Original: ${phone}, Normalized: ${normalizedPhone}`)
      
      // Check both with and without country code prefix
      const phoneWithPrefix = normalizedPhone
      const phoneWithoutPrefix = normalizedPhone.startsWith("91") ? normalizedPhone.slice(2) : normalizedPhone
      
      user = await User.findOne({ 
        $or: [
          { phone: phoneWithPrefix },
          { phone: phoneWithoutPrefix }
        ]
      })
    }

    if (!user) {
      console.error(`[v0] No user found for verification`)
      return NextResponse.json({ success: false, message: "No account found. Please request OTP first." }, { status: 404 })
    }

    console.log(`[v0] User found: ${user._id}, Email: ${user.email}, Phone: ${user.phone}`)


    // Check OTP
    if (!user.otpCode || user.otpCode !== otp) {
      return NextResponse.json({ success: false, message: "Invalid OTP" }, { status: 401 })
    }

// Check OTP expiry
    if (!user.otpExpiry || new Date() > user.otpExpiry) {
      return NextResponse.json(
        { success: false, message: "OTP has expired. Please request a new one." },
        { status: 401 },
      )
    }

    // Clear OTP after successful verification
    user.otpCode = ""
    user.otpExpiry = null
    await user.save()

    // Check if profile is complete
    // Profile is incomplete if:
    // - For email login: phone is missing or empty
    // - For phone login: email is missing, empty, or is a temp email
    const isTempEmail = user.email?.includes("@temp.ananthala.com")
    const needsProfileCompletion = email 
      ? (!user.phone || user.phone === "") // Email login - needs phone
      : (!user.email || user.email === "" || isTempEmail) // Phone login - needs real email

    // Also check if fullname is a placeholder
    const needsName = user.fullname === "Phone User" || user.fullname === "OTP User"

    // Generate authentication token
    const token = generateToken(
      {
        userId: user._id.toString(),
        email: user.email,
        fullname: user.fullname,
        id: undefined
      },
      rememberMe,
    )

    const response = NextResponse.json(
      {
        success: true,
        message: needsProfileCompletion || needsName ? "OTP verified. Please complete your profile." : "Login successful",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          phone: user.phone,
        },
        requiresProfileCompletion: needsProfileCompletion || needsName,
        profileCompletionNeeds: {
          name: needsName,
          phone: email ? (!user.phone || user.phone === "") : false,
          email: phone ? (!user.email || user.email === "" || isTempEmail) : false,
        }
      },
      { status: 200 },
    )

    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 2 // 30 days or 2 hours
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    })

    return response
  } catch (error: any) {
    console.error("[VERIFY_OTP_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
