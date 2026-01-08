import { type NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "@/lib/jwt"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
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

    // Total Users Count
    const totalUsers = await User.countDocuments()

    // Total Products Count
    const totalProducts = await Product.countDocuments()

    // Total Inventory (Sum of all stock across all variants)
    const inventoryData = await Product.aggregate([
      {
        $unwind: "$variants",
      },
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$variants.stock" },
        },
      },
    ])

    const totalInventory = inventoryData[0]?.totalStock || 0

    // Recent Users (last 5 joined)
    const recentUsers = await User.find({ role: "customer" })
      .select("fullname email createdAt phone")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean()

    // Get all products with variants to calculate total orders value
    // Since there's no Order model yet, we'll calculate based on products
    const totalRevenue = await Product.aggregate([
      {
        $unwind: "$variants",
      },
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$variants.price", "$variants.stock"] } },
        },
      },
    ])

    // Category Distribution
    const categoryData = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ])

    // Product Status Distribution
    const statusData = await Product.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ])

    // Admin Users Count
    const adminCount = await User.countDocuments({ role: "admin" })

    // Agent Users Count
    const agentCount = await User.countDocuments({ role: "agent" })

    // Inventory by Category
    const inventoryByCategory = await Product.aggregate([
      {
        $unwind: "$variants",
      },
      {
        $group: {
          _id: "$category",
          totalStock: { $sum: "$variants.stock" },
          avgPrice: { $avg: "$variants.price" },
          productCount: { $sum: 1 },
        },
      },
      {
        $sort: { totalStock: -1 },
      },
    ])

    return NextResponse.json(
      {
        stats: {
          totalUsers,
          totalProducts,
          totalInventory,
          totalRevenue: totalRevenue[0]?.totalValue || 0,
          adminCount,
          agentCount,
        },
        recentUsers: recentUsers.map((user) => ({
          ...user,
          _id: user._id?.toString(),
          createdAt: new Date(user.createdAt).toLocaleDateString(),
        })),
        categoryData,
        statusData,
        inventoryByCategory,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
