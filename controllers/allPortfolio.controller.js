import axios from "axios";
import { PortfolioModel } from "../models/portfolio.model.js";

export const allPortfolioController = async (req, res) => {
  try {
    const holdings = await PortfolioModel.find({
      userId: req.userId,
    });

    const updatedHoldings = await Promise.all(
      holdings.map(async (item) => {
        try {
          const { data } = await axios.get(
            "https://finnhub.io/api/v1/quote",
            {
              params: {
                symbol: item.symbol,
                token: process.env.FINNHUB_KEY,
              },
            }
          );

          const currentPrice = data?.c || 0;

          // ✅ FIX: use buyPrice (schema field)
          const profitLoss =
            (currentPrice - item.buyPrice) * item.quantity;

          return {
            ...item.toObject(),
            currentPrice,
            profitLoss,
          };
        } catch (err) {
          return {
            ...item.toObject(),
            currentPrice: 0,
            profitLoss: 0,
          };
        }
      })
    );

    return res.status(200).json({
      message: "Portfolio fetched",
      Holdings: updatedHoldings,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
