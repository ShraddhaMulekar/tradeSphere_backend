import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    symbol: { type: String, required: true },
    buyPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const PortfolioModel = mongoose.model("portfolio", PortfolioSchema);
