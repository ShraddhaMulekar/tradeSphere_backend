import { OrderModel } from "../models/order.model.js";
import { PortfolioModel } from "../models/portfolio.model.js";
import { UserModel } from "../models/user.model.js";

export const buyController = async (req, res) => {
  try {
    const { symbol, quantity, price } = req.body;
    const totalCost = quantity * price;

    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.wallet < totalCost) {
      return res.status(400).json({ message: "Insufficient funds in wallet" });
    }

    user.wallet -= totalCost;
    await user.save();

    let stock = await PortfolioModel.findOne({ userId: req.userId, symbol });

    if (!stock) {
      stock = await PortfolioModel.create({
        userId: req.userId,
        symbol,
        avgBuyPrice: price,
        quantity,
      });
    } else {
      const newQuantity = stock.quantity + quantity;
      const newAvgPrice =
        (stock.avgBuyPrice * stock.quantity + totalCost) / newQuantity;
      stock.quantity = newQuantity;
      stock.avgBuyPrice = newAvgPrice;
      await stock.save();
    }

    await OrderModel.create({
      userId: req.userId,
      symbol,
      type: "BUY",
      price,
      quantity,
    });

    return res
      .status(200)
      .json({
        message: "Stock purchased successfully",
        stock,
        wallet: user.wallet,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};