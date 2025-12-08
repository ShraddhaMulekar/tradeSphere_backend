import { PortfolioModel } from "../models/portfolio.model.js";

export const addToPortfolioController = async (req, res) => {
  try {
    const { symbol, quantity, buyPrice } = req.body;

    if (!symbol || !quantity || !buyPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newHolding = await PortfolioModel.create({
      userId: req.userId,
      symbol,
      quantity,
      buyPrice,
    });

    return res
      .status(201)
      .json({ message: "Added to portfolio", holding: newHolding });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
