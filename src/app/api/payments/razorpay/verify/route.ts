import { NextResponse } from "next/server"
import crypto from "crypto"
import mongoose from "mongoose"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import connectDB from "@/lib/mongodb"
import Order from "@/models/order"

export const runtime = "nodejs"

interface CartItemPayload {
  name: string
  quantity: number
  price: number
  size?: string
  fabric?: string
  productColor?: string
  productColorHex?: string
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value
    const decoded = token ? verifyToken(token) : null
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, message: "Razorpay is not configured. Add RAZORPAY_KEY_SECRET." },
        { status: 500 },
      )
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      shippingAddress,
      items,
      subtotal,
      shippingCost,
      discount,
      totalAmount,
      paymentMethod,
    } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, message: "Missing payment details." }, { status: 400 })
    }

    const signaturePayload = `${razorpay_order_id}|${razorpay_payment_id}`
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(signaturePayload)
      .digest("hex")

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, message: "Invalid payment signature." }, { status: 400 })
    }

    await connectDB()

    // Convert userId string to MongoDB ObjectId
    const customerId = new mongoose.Types.ObjectId(decoded.userId)

    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    const orderItems = Array.isArray(items)
      ? (items as CartItemPayload[]).map((item) => ({
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          fabric: item.fabric,
          productColor: item.productColor,
          productColorHex: item.productColorHex,
        }))
      : []

    const order = await Order.create({
      orderId,
      customerId: customerId, // Store the authenticated user's ObjectId
      customerName: `${customer?.firstName || ""} ${customer?.lastName || ""}`.trim(),
      customerEmail: customer?.email || "",
      customerPhone: customer?.phone || "",
      shippingAddress: {
        fullAddress: shippingAddress?.address || "",
        city: shippingAddress?.city || "",
        state: shippingAddress?.state || "",
        zipCode: shippingAddress?.zipCode || "",
        country: shippingAddress?.country || "India",
      },
      items: orderItems,
      subtotal: Number(subtotal) || 0,
      shippingCost: Number(shippingCost) || 0,
      discount: Number(discount) || 0,
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: paymentMethod || "razorpay",
      paymentStatus: "completed",
      orderStatus: "processing",
      orderTimeline: [
        {
          status: "processing",
          description: "Payment confirmed via Razorpay.",
        },
      ],
      paymentGateway: "razorpay",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    })

    return NextResponse.json({ success: true, orderId: order.orderId }, { status: 200 })
  } catch (error: any) {
    console.error("[v0] RAZORPAY_VERIFY_ERROR:", error)
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to verify Razorpay payment." },
      { status: 500 },
    )
  }
}
