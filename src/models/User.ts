import mongoose, { Schema, models } from "mongoose"

export interface IAddress {
  _id?: string
  label: string
  houseNumber: string
  crossStreet: string
  locality: string
  landmark?: string
  city: string
  state: string
  pincode: string
  country: string
  isDefault?: boolean
  latitude?: number
  longitude?: number
}

export interface IUser {
  fullname: string
  email: string
  password: string
  role: "customer" | "admin" | "agent"
  phone?: string
  addresses?: IAddress[]
  address?: string // kept for backward compatibility
  otpCode?: string
  otpExpiry?: Date
  otpMethod?: "phone" | "email" // Type of OTP sent
  isEmailVerified?: boolean
  isPhoneVerified?: boolean
  createdAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    fullname: {
      type: String,
      required: [true, "Please provide a full name"],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email"],
      sparse: true, // Allow null/missing values but unique when present
      default: null,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "admin", "agent"],
        message: "{VALUE} is not a valid role",
      },
      default: "customer",
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    addresses: [
      {
        _id: Schema.Types.ObjectId,
        label: {
          type: String,
          required: [true, "Please provide an address label"],
          trim: true,
          enum: {
            values: ["Home", "Office", "Other"],
            message: "{VALUE} is not a valid label",
          },
        },
        houseNumber: {
          type: String,
          required: [true, "Please provide house/apartment number"],
          trim: true,
        },
        crossStreet: {
          type: String,
          required: [true, "Please provide cross street"],
          trim: true,
        },
        locality: {
          type: String,
          required: [true, "Please provide locality/area"],
          trim: true,
        },
        landmark: {
          type: String,
          trim: true,
          default: "",
        },
        city: {
          type: String,
          required: [true, "Please provide a city"],
          trim: true,
        },
        state: {
          type: String,
          required: [true, "Please provide a state"],
          trim: true,
        },
        pincode: {
          type: String,
          required: [true, "Please provide a pincode"],
          trim: true,
          match: [/^\d{6}$/, "Pincode must be 6 digits"],
        },
        country: {
          type: String,
          required: [true, "Please provide a country"],
          trim: true,
          default: "India",
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
        latitude: {
          type: Number,
          default: null,
        },
        longitude: {
          type: Number,
          default: null,
        },
      },
    ],
    otpCode: {
      type: String,
      default: "",
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    otpMethod: {
      type: String,
      enum: ["phone", "email"],
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

if (models.User) {
  delete models.User
}

const User = mongoose.model<IUser>("User", UserSchema)

export default User
