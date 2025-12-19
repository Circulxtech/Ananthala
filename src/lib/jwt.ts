import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "9e00ca4a7a7f9dcd01cf6b8ae3de0d10"

export interface JWTPayload {
  userId: string
  email: string
  fullname: string
}

export function generateToken(payload: JWTPayload, rememberMe?: boolean): string {
  // Token expires in 30 days if remember me is checked, otherwise 2 hours
  const expiresIn = rememberMe ? "30d" : "2h"
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}
