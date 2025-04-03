import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    guarantorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guarantor",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
