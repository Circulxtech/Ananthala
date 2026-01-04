import mongoose, { Schema, models } from "mongoose"

export interface ICoupon {
  code: string
  discount: number
  type: "percentage" | "fixed"
  minPurchase: number
  maxDiscount?: number
  usageLimit: number
  usedCount: number
  expiryDate: Date
  status: "active" | "expired" | "inactive"
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      uppercase: true,
      trim: true,
      minlength: [3, "Coupon code must be at least 3 characters"],
      maxlength: [20, "Coupon code must not exceed 20 characters"],
    },
    discount: {
      type: Number,
      required: [true, "Discount value is required"],
      min: [0, "Discount must be greater than 0"],
    },
    type: {
      type: String,
      enum: {
        values: ["percentage", "fixed"],
        message: "{VALUE} is not a valid discount type",
      },
      required: true,
    },
    minPurchase: {
      type: Number,
      required: [true, "Minimum purchase amount is required"],
      min: [0, "Minimum purchase must be non-negative"],
    },
    maxDiscount: {
      type: Number,
      min: [0, "Max discount must be non-negative"],
    },
    usageLimit: {
      type: Number,
      required: [true, "Usage limit is required"],
      min: [1, "Usage limit must be at least 1"],
    },
    usedCount: {
      type: Number,
      default: 0,
      min: [0, "Used count cannot be negative"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "expired", "inactive"],
        message: "{VALUE} is not a valid status",
      },
      default: "active",
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
CouponSchema.index({ code: 1 })
CouponSchema.index({ status: 1 })
CouponSchema.index({ expiryDate: 1 })

if (models.Coupon) {
  delete models.Coupon
}

const Coupon = mongoose.model<ICoupon>("Coupon", CouponSchema)

export default Coupon
