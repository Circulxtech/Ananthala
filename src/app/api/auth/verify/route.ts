import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth_token")?.value

    if (!token) {
      return NextResponse.json({ success: false, user: null }, { status: 401 })
    }

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, user: null }, { status: 401 })
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: decoded.userId,
          fullname: decoded.fullname,
          email: decoded.email,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, user: null }, { status: 401 })
  }
}
