import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { verifyToken } from "@/lib/jwt"
import Coupon from "@/models/Coupons"
import mongoose from "mongoose"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Verify authentication
    const token = request.cookies.get("admin_token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await connectDB()

    // Await params to get the id
    const { id } = await params

    // Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid coupon ID" }, { status: 400 })
    }

    const coupon = await Coupon.findByIdAndDelete(id)

    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Coupon deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting coupon:", error)
    return NextResponse.json({ error: "Failed to delete coupon" }, { status: 500 })
  }
}
