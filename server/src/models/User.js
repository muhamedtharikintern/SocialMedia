import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Full Name
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Email Address
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Password Hash
    passwordHash: {
      type: String,
      required: true,
    },
    // Mobile Number
    phoneNumber: {
      type: String,
      default: "",
    },
    // Profile Image
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } 
);

export default mongoose.model("user", userSchema);