import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
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

    const agentsData = agents.map((agent) => ({
      id: agent._id.toString(),
      fullname: agent.fullname,
      email: agent.email,
      phone: agent.phone || "N/A",
      address: agent.address || "N/A",
      createdAt: agent.createdAt,
    }))

    return NextResponse.json({
      success: true,
      agents: agentsData,
    })
  } catch (error: any) {
    console.error("[FETCH_AGENTS_ERROR]", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to fetch agents" }, { status: 500 })
  }
}
