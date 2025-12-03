import { OrderModel } from "../models/order.model.js";
import { PortfolioModel } from "../models/portfolio.model.js";
import { UserModel } from "../models/user.model.js";

export const sellTradeController = async (req, res) => {
  try {
    const { symbol, price, quantity } = req.body;

    const stock = await PortfolioModel.findOne({ userId: req.userId, symbol });

    if (!stock || stock.quantity < quantity) {
      return res.status(400).json({ message: "You don't own enough stock" });
    }

    const totalSellValue = price * quantity;

    stock.quantity -= quantity;

    if (stock.quantity === 0) await stock.deleteOne();
    else await stock.save();

    const user = await UserModel.findById(req.userId);
    user.wallet += totalSellValue;
    await user.save();

    await OrderModel.create({
      userId: req.userId,
      symbol,
      type: "SELL",
      price,
      quantity,
    });

    return res.status(200).json({ message: "Stock sold successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
