import mongoose, { type Document, type Model, Schema } from "mongoose"

export interface IBlog extends Document {
  title: string
  content: string
  excerpt: string
  image: string
  author: string
  category: string
  tags: string[]
  slug: string
  published: boolean
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      maxlength: 200,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      default: "Ananthala Team",
    },
    category: {
      type: String,
      required: true,
      enum: ["Sleep Tips", "Product News", "Health & Wellness", "Company News", "Guides"],
      default: "Sleep Tips",
    },
    tags: [
      {
        type: String,
      },
    ],
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

BlogSchema.index({ published: 1, featured: 1, createdAt: -1 })
BlogSchema.index({ slug: 1 }, { unique: true })

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema)

export default Blog
