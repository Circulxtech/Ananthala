import mongoose, { Schema, models } from "mongoose"

export interface IDealerEnquiry {
  businessName: string
  ownerName: string
  email: string
  phone: string
  city: string
  state: string
  businessType: string
  retailSpace: string
  inventory: string
  message?: string
  createdAt: Date
}

const DealerEnquirySchema = new Schema<IDealerEnquiry>(
  {
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },
    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },
    businessType: {
      type: String,
      required: [true, "Business type is required"],
      enum: {
        values: ["furniture", "bedding", "home", "online", "other"],
        message: "{VALUE} is not a valid business type",
      },
    },
    retailSpace: {
      type: String,
      required: [true, "Retail space is required"],
      trim: true,
    },
    inventory: {
      type: String,
      required: [true, "Inventory interest is required"],
      enum: {
        values: ["5-10", "10-20", "20-50", "50+"],
        message: "{VALUE} is not a valid inventory range",
      },
    },
    message: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

if (models.DealerEnquiry) {
  delete models.DealerEnquiry
}

const DealerEnquiry = mongoose.model<IDealerEnquiry>("DealerEnquiry", DealerEnquirySchema)

export default DealerEnquiry
