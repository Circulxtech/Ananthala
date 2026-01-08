import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import Product from "@/models/Product"

export async function GET(request: Request) {
  try {
    console.log("[v0] Analytics API called")
    await connectDB()

    // Get period parameter from URL
    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "jul-dec" // default to current period

    // Get total users count
    const totalUsers = await User.countDocuments()
    console.log("[v0] Total users:", totalUsers)

    // Get total products count
    const totalProducts = await Product.countDocuments()
    console.log("[v0] Total products:", totalProducts)

    // Get users from last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const usersLastMonth = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    })

    // Get products from last 30 days
    const productsLastMonth = await Product.countDocuments({
      createdAt: { $gte: thirtyDaysAgo },
    })

    // Calculate growth percentages
    const userGrowthPercentage = totalUsers > 0 ? ((usersLastMonth / totalUsers) * 100).toFixed(1) : "0.0"
    const productGrowthPercentage = totalProducts > 0 ? ((productsLastMonth / totalProducts) * 100).toFixed(1) : "0.0"

    const userGrowthData = []
    const currentYear = new Date().getFullYear()

    // Determine which months to show based on period
    const months =
      period === "jan-jun"
        ? [0, 1, 2, 3, 4, 5] // January to June (0-indexed)
        : [6, 7, 8, 9, 10, 11] // July to December (0-indexed)

    for (const monthIndex of months) {
      // Start of the month
      const startDate = new Date(currentYear, monthIndex, 1, 0, 0, 0, 0)
      // End of the month (start of next month)
      const endDate = new Date(currentYear, monthIndex + 1, 1, 0, 0, 0, 0)

      // Count users registered in this month
      const count = await User.countDocuments({
        createdAt: { $gte: startDate, $lt: endDate },
      })

      console.log(`[v0] Users in ${startDate.toLocaleDateString("en-US", { month: "short" })}: ${count}`)

      userGrowthData.push({
        month: startDate.toLocaleDateString("en-US", { month: "short" }),
        users: count,
      })
    }

    // Get product distribution by category
    const categoryData = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ])

    const productsByCategory = categoryData.map((item) => ({
      category: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      count: item.count,
    }))

    // Get total stock across all products
    const totalStock = await Product.aggregate([
      { $unwind: "$variants" },
      {
        $group: {
          _id: null,
          total: { $sum: "$variants.stock" },
        },
      },
    ])

    const stockCount = totalStock.length > 0 ? totalStock[0].total : 0

    // Get user distribution by role
    const roleData = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ])

    const usersByRole = roleData.reduce(
      (acc, item) => {
        acc[item._id] = item.count
        return acc
      },
      { customer: 0, admin: 0, agent: 0 },
    )

    console.log("[v0] Analytics data compiled successfully")

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalProducts,
          totalStock: stockCount,
          userGrowthPercentage: `+${userGrowthPercentage}%`,
          productGrowthPercentage: `+${productGrowthPercentage}%`,
          usersByRole,
        },
        charts: {
          userGrowth: userGrowthData,
          productsByCategory,
        },
      },
    })
  } catch (error: any) {
    console.error("[v0] Analytics API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch analytics data",
        error: error.message,
      },
      { status: 500 },
    )
  }
}
