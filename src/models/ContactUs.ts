import mongoose, { Schema, models } from "mongoose"

export interface IContactUs {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: Date
}

const ContactUsSchema = new Schema<IContactUs>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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
      trim: true,
      default: "",
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

if (models.ContactUs) {
  delete models.ContactUs
}

const ContactUs = mongoose.model<IContactUs>("ContactUs", ContactUsSchema)

export default ContactUs
