import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import PendingUser from "@/models/PendingUser"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

// Helper function to generate 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

// Helper function to send verification email
async function sendVerificationEmail(email: string, otp: string, fullname: string) {
  try {
    const emailProvider = process.env.EMAIL_PROVIDER || "gmail"
    let transporter

    if (emailProvider === "gmail") {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
        throw new Error("Gmail credentials not configured.")
      }
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      })
    } else if (emailProvider === "smtp") {
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        throw new Error("SMTP credentials not configured.")
      }
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number.parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      })
    } else {
      throw new Error(`Unsupported email provider: ${emailProvider}`)
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email - Ananthala",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: 0 auto; background-color: #F5F1ED;">
          <div style="background-color: #ffffff; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #8B5A3C; font-size: 28px; margin: 0; letter-spacing: 2px;">ANANTHALA</h1>
              <p style="color: #6D4530; font-size: 14px; margin-top: 8px;">Email Verification</p>
            </div>
            
            <p style="color: #6D4530; font-size: 16px; margin-bottom: 16px;">Hello ${fullname},</p>
            <p style="color: #8B5A3C; font-size: 14px; margin-bottom: 24px; line-height: 1.6;">
              Here is your new verification OTP. Please use it to verify your email address.
            </p>
            
            <div style="background-color: #F5F1ED; border: 2px solid #8B5A3C; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
              <p style="color: #6D4530; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Your Verification OTP</p>
              <h2 style="color: #8B5A3C; font-size: 36px; letter-spacing: 8px; margin: 0; font-weight: bold;">${otp}</h2>
            </div>
            
            <p style="color: #B8A396; font-size: 13px; text-align: center; margin-top: 24px;">
              This OTP will expire in <strong style="color: #8B5A3C;">10 minutes</strong>.
            </p>
            <p style="color: #B8A396; font-size: 12px; text-align: center; margin-top: 16px;">
              If you didn&apos;t request this verification, please ignore this email.
            </p>
            
            <div style="border-top: 1px solid #E5D5C5; margin-top: 32px; padding-top: 20px; text-align: center;">
              <p style="color: #B8A396; font-size: 11px; margin: 0;">
                © 2026 Ananthala. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error("[EMAIL_ERROR]", error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    // Connect to database
    await connectDB()

    // Find pending registration
    const pendingUser = await PendingUser.findOne({ email: email.toLowerCase() })

    if (!pendingUser) {
      return NextResponse.json(
        { success: false, message: "No pending registration found. Please sign up again." },
        { status: 404 },
      )
    }

    const newOtp = generateOTP()
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Update email OTP
    pendingUser.emailOtp = newOtp
    pendingUser.emailOtpExpiry = otpExpiry
    await pendingUser.save()

    // Send verification email
    try {
      await sendVerificationEmail(pendingUser.email, newOtp, pendingUser.fullname)
    } catch (emailError: any) {
      console.error("[v0] Failed to resend verification email:", emailError)
      return NextResponse.json(
        { success: false, message: "Failed to send verification email. Please try again." },
        { status: 500 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Verification email sent successfully",
        maskedEmail: pendingUser.email.replace(/(.{2})(.*)(@.*)/, "$1***$3"),
      },
      { status: 200 },
    )
  } catch (error: any) {
    console.error("[RESEND_SIGNUP_OTP_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}
