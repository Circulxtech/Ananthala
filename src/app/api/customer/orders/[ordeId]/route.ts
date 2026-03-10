import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { jwtVerify } from "@/lib/jwt"
import connectDB from "@/lib/mongodb"
import Order from "@/models/order"

export async function PUT(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    // Get authentication token
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
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    await connectDB()

    // Convert userId to ObjectId
    let customerObjectId: mongoose.Types.ObjectId
    try {
      customerObjectId = new mongoose.Types.ObjectId(decoded.userId)
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid customer ID" },
        { status: 400 }
      )
    }

    // Convert orderId to ObjectId
    let orderObjectId: mongoose.Types.ObjectId
    try {
      orderObjectId = new mongoose.Types.ObjectId(params.orderId)
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 }
      )
    }

    // Find the order
    const order = await Order.findById(orderObjectId)

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      )
    }

    // Verify that the order belongs to the customer
    if (order.customerId.toString() !== customerObjectId.toString()) {
      return NextResponse.json(
        { error: "Unauthorized: Order does not belong to this customer" },
        { status: 403 }
      )
    }

    // Check if order can be cancelled
    const cancellableStatuses = ["pending", "processing"]
    if (!cancellableStatuses.includes(order.orderStatus)) {
      return NextResponse.json(
        { error: `Cannot cancel order with status: ${order.orderStatus}` },
        { status: 400 }
      )
    }

    // If payment is completed, only allow cancellation if order hasn't shipped yet
    if (order.paymentStatus === "completed" && order.orderStatus !== "pending" && order.orderStatus !== "processing") {
      return NextResponse.json(
        { error: "Cannot cancel order that has already shipped or been delivered" },
        { status: 400 }
      )
    }

    // Update order status to cancelled
    order.orderStatus = "cancelled"
    order.updatedAt = new Date()

    // Add timeline entry for cancellation
    if (!order.orderTimeline) {
      order.orderTimeline = []
    }

    order.orderTimeline.push({
      status: "cancelled",
      timestamp: new Date(),
      description: "Order cancelled by customer",
    })

    // Save the updated order
    await order.save()

    return NextResponse.json(
      {
        message: "Order cancelled successfully",
        order: {
          _id: order._id,
          orderId: order.orderId,
          orderStatus: order.orderStatus,
          updatedAt: order.updatedAt,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Cancel order API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
