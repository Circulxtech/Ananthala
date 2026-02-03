import mongoose from "mongoose"

const ReviewVideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a video title"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    videoUrl: {
      type: String,
      required: [true, "Please provide a video URL"],
    },
    blobUrl: {
      type: String,
      required: [true, "Please provide a blob storage URL"],
    },
    thumbnail: {
      type: String,
    },
    customerName: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

export const ReviewVideo = mongoose.models?.ReviewVideo || mongoose.model("ReviewVideo", ReviewVideoSchema)
