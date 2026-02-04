import mongoose, { Schema, models } from "mongoose"

export interface IProductVariant {
  variantId: string
  weight: number // in kg
  length: number // in inch
  width: number // in inch
  height: number // in inch
  color: string
  price: number
  stock: number
}

export interface IProduct {
  productTitle: string
  description: string
  units: string
  sellerName: string
  sellerEmail: string
  location: string
  category: string
  subCategory: string
  imageUrls: string[] // Array of Vercel Blob URLs
  variants: IProductVariant[]
  status: "visible" | "hidden"
  createdAt: Date
  updatedAt: Date
}

const ProductVariantSchema = new Schema<IProductVariant>(
  {
    variantId: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
      min: [0, "Weight must be positive"],
    },
    length: {
      type: Number,
      required: [true, "Length is required"],
      min: [0, "Length must be positive"],
    },
    width: {
      type: Number,
      required: [true, "Width is required"],
      min: [0, "Width must be positive"],
    },
    height: {
      type: Number,
      required: [true, "Height is required"],
      min: [0, "Height must be positive"],
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      trim: true,
      maxlength: [50, "Color cannot exceed 50 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
  },
  { _id: false },
)

const ProductSchema = new Schema<IProduct>(
  {
    productTitle: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [200, "Product title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    units: {
      type: String,
      required: [true, "Units are required"],
      trim: true,
    },
    sellerName: {
      type: String,
      required: [true, "Seller name is required"],
      trim: true,
    },
    sellerEmail: {
      type: String,
      required: [true, "Seller email is required"],
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid seller email"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["joy","bliss","grace", "mattress", "pillow", "bedding", "bedsheet"],
        message: "Category must be either joy,bliss,grace ,mattress, pillow, bedding, or bedsheet",
      },
      trim: true,
    },
    subCategory: {
      type: String,
      required: false,
      trim: true,
    },
    imageUrls: {
      type: [String],
      required: [true, "At least one product image is required"],
      validate: {
        validator: (v: string[]) => v && v.length > 0 && v.length <= 6,
        message: "Must have between 1 and 6 product images",
      },
    },
    variants: {
      type: [ProductVariantSchema],
      required: [true, "At least one variant is required"],
      validate: {
        validator: (v: IProductVariant[]) => v && v.length > 0,
        message: "At least one product variant is required",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["visible", "hidden"],
        message: "{VALUE} is not a valid status",
      },
      default: "visible",
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
ProductSchema.index({ sellerEmail: 1, createdAt: -1 })
ProductSchema.index({ category: 1, status: 1 })
ProductSchema.index({ status: 1 })

// Clean up existing model if it exists
if (models.Product) {
  delete models.Product
}

const Product = mongoose.model<IProduct>("Product", ProductSchema)

export default Product
