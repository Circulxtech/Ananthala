import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { jwtVerify } from "@/lib/jwt"
import connectDB from "@/lib/mongodb"
import Order from "@/models/order"
import { sendOrderConfirmationEmail } from "@/lib/email-service"

export async function PUT(request: NextRequest) {
  try {
    // Get authentication token
    const token = request.cookies.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwtVerify(token)
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }

    // Get order ID from request body or query
    const body = await request.json().catch(() => ({}))
    const orderId = body.orderId

    if (!orderId) {
      return NextResponse.json({ success: false, error: "Order ID is required" }, { status: 400 })
    }

    await connectDB()

    // Convert userId string to MongoDB ObjectId
    let customerObjectId: mongoose.Types.ObjectId
    try {
      customerObjectId = new mongoose.Types.ObjectId(decoded.userId)
    } catch (e) {
      console.error("[v0] Invalid customer ID format:", decoded.userId)
      return NextResponse.json({ success: false, error: "Invalid user ID" }, { status: 400 })
    }

    // Find the order and verify it belongs to the customer
    const order = await Order.findOne({
      _id: new mongoose.Types.ObjectId(orderId),
      customerId: customerObjectId,
    })

    if (!order) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 })
    }

    // Check if order can be cancelled (only pending and processing orders can be cancelled)
    const cancellableStatuses = ["pending", "processing"]
    if (!cancellableStatuses.includes(order.orderStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot cancel order with status: ${order.orderStatus}`,
        },
        { status: 400 },
      )
    }

    // Update order status to cancelled
    order.orderStatus = "cancelled"

    // Add timeline entry for cancellation
    order.orderTimeline.push({
      status: "cancelled",
      timestamp: new Date(),
      description: "Order cancelled by customer",
    })

    // Save the updated order
    await order.save()

    // Send cancellation confirmation email
    try {
      const emailSent = await sendOrderConfirmationEmail({
        orderId: order.orderId,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        subtotal: order.subtotal,
        discount: order.discount,
        shippingCost: order.shippingCost,
        totalAmount: order.totalAmount,
        shippingAddress: order.shippingAddress,
      })
      console.log(`[v0] Order cancellation email ${emailSent ? "sent" : "failed to send"} for order ${order.orderId}`)
    } catch (emailError) {
      console.error(`[v0] Error sending order cancellation email: ${emailError}`)
      // Don't fail the cancellation if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Order cancelled successfully",
        order: {
          _id: order._id,
          orderId: order.orderId,
          orderStatus: order.orderStatus,
          updatedAt: order.updatedAt,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Cancel order API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to cancel order. Please try again.",
      },
      { status: 500 },
    )
  }
}
