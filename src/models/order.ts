import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    shippingAddress: {
      fullAddress: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    items: [
      {
        productId: mongoose.Schema.Types.ObjectId,
        productName: String,
        quantity: Number,
        price: Number,
        size: String,
      },
    ],
    subtotal: {
      type: Number,
      required: true,
    },
    shippingCost: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "cod"],
      default: "card",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "in-transit", "delivered", "cancelled"],
      default: "pending",
    },
    orderTimeline: [
      {
        status: String,
        timestamp: { type: Date, default: Date.now },
        description: String,
      },
    ],
    trackingNumber: String,
    notes: String,
  },
  { timestamps: true },
)

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)

export default Order
