import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local\n" 
    )
  }

  if (cached.conn) {
    console.log("[v0] Using cached database connection")
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    }

    console.log("[v0] Creating new database connection...")
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("[v0] Database connection established successfully")
        return mongoose
      })
      .catch((e) => {
        console.error("[v0] Database connection failed:", e)
        throw e
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error("[v0] Database connection error:", e)
    throw e
  }

  return cached.conn
}

export default connectDB
