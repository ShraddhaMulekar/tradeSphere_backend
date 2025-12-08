import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    wallet: { type: Number, default: 0 },
    watchlist: [{ type: String }],
  },
  {
    versionKey: false,
  }
);

export const UserModel = mongoose.model("user", UserSchema);
