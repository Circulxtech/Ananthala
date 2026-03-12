import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { jwtVerify } from "@/lib/jwt"
import connectDB from "@/lib/mongodb"
import Order from "@/models/order"

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const decoded = jwtVerify(token)
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

    await connectDB()

    const order = await Order.findOne({
      orderId: params.orderId,
    }).lean()

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    // Verify the order belongs to the authenticated user
    if (order.customerId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: "Unauthorized to view this order" },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { success: true, order },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Get order by ID error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
