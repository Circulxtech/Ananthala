import mongoose, { Schema, models } from "mongoose"

export interface IPendingUser {
  fullname: string
  email: string
  password: string // Already hashed
  phone: string
  emailOtp?: string
  emailOtpExpiry?: Date
  isEmailVerified: boolean
  createdAt: Date
  expiresAt: Date // Auto-delete after 24 hours
}

const PendingUserSchema = new Schema<IPendingUser>(
  {
    fullname: {
      type: String,
      required: [true, "Please provide a full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
      trim: true,
    },
    emailOtp: {
      type: String,
      default: "",
    },
    emailOtpExpiry: {
      type: Date,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      index: { expires: 0 }, // TTL index - auto-delete when expired
    },
  },
  {
    timestamps: true,
  },
)

// Compound index for email and phone lookups
PendingUserSchema.index({ email: 1 })
PendingUserSchema.index({ phone: 1 })

if (models.PendingUser) {
  delete models.PendingUser
}

const PendingUser = mongoose.model<IPendingUser>("PendingUser", PendingUserSchema)

export default PendingUser
