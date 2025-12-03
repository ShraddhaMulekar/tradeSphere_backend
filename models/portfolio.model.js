import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    symbol: String,
    avgBuyPrice: Number,
    quantity: Number,
  },
  {
    versionKey: false,
  }
);

export const PortfolioModel = mongoose.model("portfolio", PortfolioSchema);
