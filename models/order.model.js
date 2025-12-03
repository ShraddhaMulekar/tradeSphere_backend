import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    symbol: String,
    type: String, // BUY or SELL
    price: Number,
    quantity: Number,
    time: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const OrderModel = mongoose.model("order", OrderSchema);
