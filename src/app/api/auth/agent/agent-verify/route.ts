import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"

export const runtime = "nodejs"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("agent_token")

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const decoded = verifyToken(token.value)

    if (!decoded || decoded.role !== "agent") {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        userId: decoded.userId,
        email: decoded.email,
        fullname: decoded.fullname,
        role: decoded.role,
      },
    })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
