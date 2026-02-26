import { NextResponse } from "next/server"
import Razorpay from "razorpay"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    const decoded = token ? verifyToken(token) : null
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, message: "Razorpay is not configured. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." },
        { status: 500 },
      )
    }

    const { amount, currency = "INR", receipt, notes } = await request.json()
    const parsedAmount = Number(amount)

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount." }, { status: 400 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: Math.round(parsedAmount),
      currency,
      receipt,
      notes,
    })

    return NextResponse.json({ success: true, order }, { status: 201 })
  } catch (error: any) {
    console.error("[v0] RAZORPAY_ORDER_CREATE_ERROR:", error)
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to create Razorpay order." },
      { status: 500 },
    )
  }
}
