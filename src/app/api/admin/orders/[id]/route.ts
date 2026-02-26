import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import Order from "@/models/order"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.cookies.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwtVerify(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    const order = await Order.findById(id).lean()

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order }, { status: 200 })
  } catch (error) {
    console.error("Order details error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.cookies.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwtVerify(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    const { orderStatus, trackingNumber, notes, paymentStatus } = await request.json()

    const updateData: Record<string, unknown> = {}
    if (orderStatus) updateData.orderStatus = orderStatus
    if (trackingNumber) updateData.trackingNumber = trackingNumber
    if (notes) updateData.notes = notes
    if (paymentStatus) updateData.paymentStatus = paymentStatus

    const order = await Order.findByIdAndUpdate(
      params.id,
      {
        ...updateData,
        $push: {
          orderTimeline: {
            status: orderStatus,
            timestamp: new Date(),
            description: `Order status updated to ${orderStatus}`,
          },
        },
      },
      { new: true },
    )

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order }, { status: 200 })
  } catch (error) {
    console.error("Order update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
