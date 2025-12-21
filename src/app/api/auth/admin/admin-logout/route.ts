import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 })

    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[ADMIN_LOGOUT_ERROR]", error)
    return NextResponse.json({ success: false, message: "Logout failed" }, { status: 500 })
  }
}
