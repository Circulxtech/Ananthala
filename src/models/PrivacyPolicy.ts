import mongoose, { type Document, type Model, Schema } from "mongoose"

export interface IPrivacyPolicy extends Document {
  title: string
  content: string
  sections: Array<{
    heading: string
    description: string
  }>
  lastUpdated: Date
  createdAt: Date
  updatedAt: Date
}

const PrivacyPolicySchema = new Schema<IPrivacyPolicy>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      default: "Privacy Policy",
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    sections: [
      {
        heading: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

// Index for faster queries
PrivacyPolicySchema.index({ createdAt: -1 })

const PrivacyPolicy: Model<IPrivacyPolicy> =
  mongoose.models.PrivacyPolicy || mongoose.model<IPrivacyPolicy>("PrivacyPolicy", PrivacyPolicySchema)

export default PrivacyPolicy
