import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import PendingUser from "@/models/PendingUser"
import nodemailer from "nodemailer"

export const runtime = "nodejs"

// Helper function to send welcome email
async function sendWelcomeEmail(email: string, fullname: string) {
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

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to Ananthala - Your Account is Ready!",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Ananthala</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #F5F1ED;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #6d4530 0%, #8b5a3c 100%); padding: 40px 32px; text-align: center;">
                <h1 style="color: white; font-size: 32px; margin: 0; letter-spacing: 3px; font-weight: 700;">ANANTHALA</h1>
                <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin-top: 8px; letter-spacing: 1px;">Premium Comfort for Your Little Ones</p>
              </div>
              
              <!-- Content -->
              <div style="padding: 40px 32px;">
                <h2 style="color: #6D4530; font-size: 24px; margin: 0 0 16px 0;">Welcome, ${fullname}!</h2>
                
                <p style="color: #8B5A3C; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                  Thank you for joining the Ananthala family! Your account has been successfully created and verified.
                </p>
                
                <div style="background-color: #F5F1ED; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                  <h3 style="color: #6D4530; font-size: 16px; margin: 0 0 16px 0;">What You Can Do Now:</h3>
                  <ul style="color: #8B5A3C; font-size: 14px; line-height: 2; margin: 0; padding-left: 20px;">
                    <li>Browse our premium collection of baby products</li>
                    <li>Customize products with your preferred colors and sizes</li>
                    <li>Track your orders in real-time</li>
                    <li>Save items to your wishlist</li>
                    <li>Enjoy exclusive member discounts</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 32px 0;">
                  <a href="${appUrl}" style="display: inline-block; background: linear-gradient(135deg, #6d4530 0%, #5a3a26 100%); color: white; padding: 14px 40px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; letter-spacing: 0.5px;">
                    Start Shopping
                  </a>
                </div>
                
                <div style="border-top: 1px solid #E5D5C5; padding-top: 24px; margin-top: 32px;">
                  <p style="color: #8B5A3C; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
                    At Ananthala, we are committed to providing the finest quality products for your precious little ones. Each product is crafted with love and care to ensure maximum comfort and safety.
                  </p>
                  <p style="color: #6D4530; font-size: 14px; font-weight: 600; margin: 0;">
                    Welcome to the family!
                  </p>
                  <p style="color: #8B5A3C; font-size: 14px; margin: 4px 0 0 0;">
                    The Ananthala Team
                  </p>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background-color: #F5F1ED; padding: 24px 32px; text-align: center; border-top: 1px solid #E5D5C5;">
                <p style="color: #8B5A3C; font-size: 13px; margin: 0 0 12px 0;">
                  Need help? We are here for you!
                </p>
                <p style="color: #6D4530; font-size: 13px; margin: 0 0 8px 0;">
                  <strong>Email:</strong> qualprodsllp@gmail.com | <strong>Phone:</strong> +91 9071799966
                </p>
                <div style="margin-top: 16px;">
                  <a href="${appUrl}/contact-us" style="color: #6D4530; text-decoration: none; font-size: 12px; margin: 0 10px;">Contact Us</a>
                  <a href="${appUrl}/policy-privacy" style="color: #6D4530; text-decoration: none; font-size: 12px; margin: 0 10px;">Privacy Policy</a>
                  <a href="${appUrl}/policy-terms" style="color: #6D4530; text-decoration: none; font-size: 12px; margin: 0 10px;">Terms of Service</a>
                </div>
                <p style="color: #B8A396; font-size: 11px; margin-top: 16px;">
                  © 2026 Ananthala. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to Ananthala, ${fullname}!

Thank you for joining the Ananthala family! Your account has been successfully created and verified.

What You Can Do Now:
- Browse our premium collection of baby products
- Customize products with your preferred colors and sizes
- Track your orders in real-time
- Save items to your wishlist
- Enjoy exclusive member discounts

Visit us at: ${appUrl}

At Ananthala, we are committed to providing the finest quality products for your precious little ones.

Welcome to the family!
The Ananthala Team

Need help?
Email: qualprodsllp@gmail.com
Phone: +91 9071799966

© 2026 Ananthala. All rights reserved.
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log(`[v0] Welcome email sent to ${email}`)
    return true
  } catch (error) {
    console.error("[WELCOME_EMAIL_ERROR]", error)
    // Don't throw - welcome email failure shouldn't block account creation
    return false
  }
}

export async function POST(request: Request) {
  try {
    const { email, emailOtp } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 })
    }

    if (!emailOtp) {
      return NextResponse.json({ success: false, message: "OTP is required" }, { status: 400 })
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

    // Verify email OTP
    if (!pendingUser.emailOtp || pendingUser.emailOtp !== emailOtp) {
      return NextResponse.json({ success: false, message: "Invalid OTP. Please try again." }, { status: 401 })
    }

    if (!pendingUser.emailOtpExpiry || new Date() > pendingUser.emailOtpExpiry) {
      return NextResponse.json(
        { success: false, message: "OTP has expired. Please request a new one." },
        { status: 401 },
      )
    }

    // Email verified, create the user account
    pendingUser.isEmailVerified = true
    await pendingUser.save()

    return await createUserAccount(pendingUser)
  } catch (error: any) {
    console.error("[VERIFY_SIGNUP_ERROR]", error)
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong. Please try again." },
      { status: 500 },
    )
  }
}

// Helper function to create user account after verification
async function createUserAccount(pendingUser: any) {
  try {
    // Double-check no user exists with this email/phone
    const existingUser = await User.findOne({
      $or: [{ email: pendingUser.email }, { phone: pendingUser.phone }],
    })

    if (existingUser) {
      // Clean up pending user
      await PendingUser.deleteOne({ _id: pendingUser._id })
      return NextResponse.json(
        { success: false, message: "An account already exists with this email or phone" },
        { status: 409 },
      )
    }

    // Create the actual user account
    const user = await User.create({
      fullname: pendingUser.fullname,
      email: pendingUser.email,
      password: pendingUser.password, // Already hashed
      role: "customer",
      phone: pendingUser.phone,
      isEmailVerified: true,
      isPhoneVerified: false, // Phone not verified during signup (only email)
    })

    console.log("[v0] User account created:", {
      id: user._id,
      email: user.email,
      phone: user.phone,
    })

    // Delete the pending registration
    await PendingUser.deleteOne({ _id: pendingUser._id })

    // Send welcome email (non-blocking)
    sendWelcomeEmail(user.email, user.fullname)

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully! Welcome to Ananthala.",
        accountCreated: true,
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          phone: user.phone,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[CREATE_USER_ERROR]", error)
    throw error
  }
}
