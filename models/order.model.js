import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["BUY", "SELL"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending", // ✅ instant trade
    },
  },
  { timestamps: true, versionKey: false }
);

export const OrderModel = mongoose.model("Order", orderSchema);
