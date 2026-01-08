import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/jwt"
import { cookies } from "next/headers"

export const runtime = "nodejs"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("admin_token")?.value

    if (!token) {
      return NextResponse.json({ authenticated: false, message: "No admin session found" }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ authenticated: false, message: "Invalid admin session" }, { status: 401 })
    }

    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: decoded.userId,
          email: decoded.email,
          fullname: decoded.fullname,
          role: decoded.role,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[ADMIN_VERIFY_ERROR]", error)
    return NextResponse.json({ authenticated: false, message: "Verification failed" }, { status: 500 })
  }
}
