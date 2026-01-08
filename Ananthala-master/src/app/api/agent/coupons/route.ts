import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { verifyToken } from "@/lib/jwt"
import Coupon from "@/models/Coupons"

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get("agent_token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "agent") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await connectDB()

    // Get all coupons
    const coupons = await Coupon.find().sort({ createdAt: -1 }).lean()

    // Update statuses based on expiry date
    const updatedCoupons = coupons.map((coupon: any) => ({
      ...coupon,
      _id: coupon._id.toString(),
      status: new Date(coupon.expiryDate) < new Date() ? "expired" : coupon.status,
    }))

    return NextResponse.json({ success: true, coupons: updatedCoupons })
  } catch (error) {
    console.error("Error fetching coupons:", error)
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token = request.cookies.get("agent_token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "agent") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { code, discount, type, minPurchase, maxDiscount, usageLimit, expiryDate } = body

    // Validation
    if (!code || !discount || !type || minPurchase === undefined || !usageLimit || !expiryDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (discount <= 0) {
      return NextResponse.json({ error: "Discount must be greater than 0" }, { status: 400 })
    }

    if (type !== "percentage" && type !== "fixed") {
      return NextResponse.json({ error: "Invalid discount type" }, { status: 400 })
    }

    if (type === "percentage" && discount > 100) {
      return NextResponse.json({ error: "Percentage discount cannot exceed 100%" }, { status: 400 })
    }

    if (minPurchase < 0) {
      return NextResponse.json({ error: "Minimum purchase cannot be negative" }, { status: 400 })
    }

    if (usageLimit < 1) {
      return NextResponse.json({ error: "Usage limit must be at least 1" }, { status: 400 })
    }

    const expiryDateTime = new Date(expiryDate)
    if (expiryDateTime < new Date()) {
      return NextResponse.json({ error: "Expiry date must be in the future" }, { status: 400 })
    }

    await connectDB()

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() })
    if (existingCoupon) {
      return NextResponse.json({ error: "Coupon code already exists" }, { status: 409 })
    }

    // Create new coupon
    const newCoupon = new Coupon({
      code: code.toUpperCase(),
      discount,
      type,
      minPurchase,
      maxDiscount: type === "percentage" ? maxDiscount : undefined,
      usageLimit,
      usedCount: 0,
      expiryDate: expiryDateTime,
      status: "active",
      createdBy: decoded.userId, // Fixed: use decoded.userId instead of decoded.id from JWT payload
    })

    const savedCoupon = await newCoupon.save()

    return NextResponse.json(
      {
        success: true,
        message: "Coupon created successfully",
        coupon: {
          id: savedCoupon._id.toString(),
          code: savedCoupon.code,
          discount: savedCoupon.discount,
          type: savedCoupon.type,
          minPurchase: savedCoupon.minPurchase,
          maxDiscount: savedCoupon.maxDiscount,
          usageLimit: savedCoupon.usageLimit,
          usedCount: savedCoupon.usedCount,
          expiryDate: savedCoupon.expiryDate.toISOString().split("T")[0],
          status: savedCoupon.status,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating coupon:", error)
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 })
  }
}
