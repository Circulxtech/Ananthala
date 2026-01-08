import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import Coupon from "@/models/Coupons"
import { verifyToken } from "@/lib/jwt"
import { cookies } from "next/headers"

export const runtime = "nodejs"

// GET - Fetch all agents with coupon stats
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 })
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""

    const agentQuery: any = { role: "agent" }

    if (search) {
      agentQuery.$or = [{ fullname: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }]
    }

    const agents = await User.find(agentQuery).select("-password").sort({ createdAt: -1 }).lean()

    const agentsWithStats = await Promise.all(
      agents.map(async (agent) => {
        const agentCoupons = await Coupon.find({ createdBy: agent._id.toString() }).lean()

        const activeCoupons = agentCoupons.filter((c) => c.status === "active").length
        const totalSavings = agentCoupons.reduce((sum, c) => {
          if (c.type === "fixed") {
            return sum + c.discount * (c.usageLimit - c.usedCount)
          } else {
            return sum + (c.discount / 100) * c.minPurchase * (c.usageLimit - c.usedCount)
          }
        }, 0)
        const expiringCount = agentCoupons.filter((c) => {
          const expiryDate = new Date(c.expiryDate)
          const now = new Date()
          const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          return daysUntilExpiry <= 7 && daysUntilExpiry > 0 && c.status === "active"
        }).length

        return {
          id: agent._id.toString(),
          fullname: agent.fullname,
          email: agent.email,
          phone: agent.phone || "N/A",
          address: agent.address || "N/A",
          createdAt: agent.createdAt,
          totalCoupons: agentCoupons.length,
          activeCoupons,
          totalSavings: Math.round(totalSavings),
          expiringCount,
          coupons: agentCoupons.map((c) => ({
            id: c._id.toString(),
            code: c.code,
            discount: c.discount,
            type: c.type,
            status: c.status,
            usedCount: c.usedCount,
            usageLimit: c.usageLimit,
            expiryDate: c.expiryDate,
          })),
        }
      }),
    )

    const totalAgents = agentsWithStats.length
    const totalCoupons = agentsWithStats.reduce((sum, a) => sum + a.totalCoupons, 0)
    const totalActiveCoupons = agentsWithStats.reduce((sum, a) => sum + a.activeCoupons, 0)
    const totalSavings = agentsWithStats.reduce((sum, a) => sum + a.totalSavings, 0)

    return NextResponse.json({
      success: true,
      stats: {
        totalAgents,
        totalCoupons,
        totalActiveCoupons,
        totalSavings,
      },
      agents: agentsWithStats,
    })
  } catch (error: any) {
    console.error("[FETCH_AGENTS_ERROR]", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch agents" }, { status: 500 })
  }
}
