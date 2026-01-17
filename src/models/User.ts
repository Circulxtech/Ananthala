import mongoose, { Schema, models } from "mongoose"

export interface IUser {
  fullname: string
  email: string
  password: string
  role: "customer" | "admin" | "agent"
  phone?: string
  address?: string
  otpCode?: string
  otpExpiry?: Date
  otpMethod?: "phone" | "email" // Type of OTP sent
  createdAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: [true, "Please provide a full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "admin", "agent"],
        message: "{VALUE} is not a valid role",
      },
      default: "customer",
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    otpCode: {
      type: String,
      default: "",
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    otpMethod: {
      type: String,
      enum: ["phone", "email"],
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

if (models.User) {
  delete models.User
}

const User = mongoose.model<IUser>("User", UserSchema)

export default User
