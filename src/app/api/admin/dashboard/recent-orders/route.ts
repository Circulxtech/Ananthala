import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import Order from "@/models/order"
import Product from "@/models/Product"

export async function GET(request: NextRequest) {
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

    // Get timeframe from query params (default: last 30 days)
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "30days"
    
    // Calculate date based on timeframe
    let startDate = new Date()
    switch (timeframe) {
      case "7days":
        startDate.setDate(startDate.getDate() - 7)
        break
      case "30days":
        startDate.setDate(startDate.getDate() - 30)
        break
      case "90days":
        startDate.setDate(startDate.getDate() - 90)
        break
      case "1year":
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
      case "all":
        startDate = new Date(0) // Beginning of time
        break
      default:
        startDate.setDate(startDate.getDate() - 30)
    }

    // Fetch recent orders within the timeframe
    const recentOrders = await Order.find({
      createdAt: { $gte: startDate }
    })
      .select("orderId customerName customerEmail totalAmount orderStatus paymentStatus createdAt items")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    const formattedOrders = recentOrders.map((order: any) => ({
      id: order._id?.toString(),
      orderId: order.orderId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      totalAmount: order.totalAmount,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus,
      itemCount: order.items?.length || 0,
      dateOrdered: new Date(order.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }))

    // Fetch recently added products (keeping existing functionality)
    const recentProducts = await Product.find()
      .select("productTitle sellerName category variants createdAt")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    const formattedProducts = recentProducts.map((product: any) => ({
      id: product._id?.toString(),
      name: product.productTitle,
      seller: product.sellerName,
      category: product.category || "uncategorized",
      price: product.variants[0]?.price || 0,
      stock: product.variants[0]?.stock || 0,
      dateAdded: new Date(product.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }))

    // Get order statistics for the timeframe
    const orderStats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$totalAmount" },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "pending"] }, 1, 0] }
          },
          completedOrders: {
            $sum: { $cond: [{ $eq: ["$orderStatus", "delivered"] }, 1, 0] }
          }
        }
      }
    ])

    return NextResponse.json({ 
      recentProducts: formattedProducts,
      recentOrders: formattedOrders,
      orderStats: orderStats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        completedOrders: 0
      },
      timeframe
    }, { status: 200 })
  } catch (error) {
    console.error("Recent orders error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
