import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { jwtVerify } from "@/lib/jwt"
import connectDB from "@/lib/mongodb"
import Order from "@/models/order"
import { sendOrderCancellationEmail } from "@/lib/email-service"

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
      console.log(`[v0] Preparing to send cancellation email for order ${order.orderId}`)
      
      // Prepare order data for email
      const cancellationEmailData = {
        orderId: order.orderId,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items.map((item: any) => ({
          productName: item.productName,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          fabric: item.fabric,
          productColor: item.productColor,
        })),
        subtotal: order.subtotal,
        discount: order.discount || 0,
        shippingCost: order.shippingCost,
        totalAmount: order.totalAmount,
        shippingAddress: order.shippingAddress || {},
      }
      
      console.log(`[v0] Cancellation email data prepared:`, {
        orderId: cancellationEmailData.orderId,
        customerEmail: cancellationEmailData.customerEmail,
        itemsCount: cancellationEmailData.items.length,
      })
      
      const emailSent = await sendOrderCancellationEmail(cancellationEmailData)
      
      if (emailSent) {
        console.log(`[v0] Order cancellation confirmation email sent successfully to ${order.customerEmail}`)
      } else {
        console.warn(`[v0] Order cancellation email failed to send for order ${order.orderId}`)
      }
    } catch (emailError) {
      console.error(`[v0] Error sending order cancellation email:`, emailError)
      // Don't fail the cancellation if email fails - order is already cancelled in database
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
