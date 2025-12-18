import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "9e00ca4a7a7f9dcd01cf6b8ae3de0d10"

export interface JWTPayload {
  userId: string
  email: string
  fullname: string
}

export function generateToken(payload: JWTPayload, rememberMe?: any): string {
  // Token expires in 2 hours
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}
