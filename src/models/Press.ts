import mongoose, { type Document, type Model, Schema } from "mongoose"

export interface IPress extends Document {
  title: string
  subheading?: string
  content: string
  image: string
  externalLink?: string
  status: "draft" | "published"
  createdAt: Date
  updatedAt: Date
}

const PressSchema = new Schema<IPress>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    subheading: {
      type: String,
      trim: true,
      maxlength: [300, "Subheading cannot exceed 300 characters"],
      default: "",
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    externalLink: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
)

PressSchema.index({ status: 1, createdAt: -1 })

const Press: Model<IPress> = mongoose.models.Press || mongoose.model<IPress>("Press", PressSchema)

export default Press
