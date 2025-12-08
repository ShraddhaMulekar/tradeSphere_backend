import { OrderModel } from "../models/order.model.js";
import { PortfolioModel } from "../models/portfolio.model.js";
import { UserModel } from "../models/user.model.js";

export const sellTradeController = async (req, res) => {
  try {
    const { symbol, price, quantity } = req.body;

    // find stock in portfolio
    const stock = await PortfolioModel.findOne({
      userId: req.userId,
      symbol,
    });

    if (!stock || stock.quantity < quantity) {
      return res.status(400).json({
        message: "You don't own enough stock",
      });
    }

    const totalSellValue = price * quantity;

    // STEP 1: Create order with PENDING status
    const order = await OrderModel.create({
      userId: req.userId,
      symbol,
      type: "SELL",
      quantity,
      price,
      total: totalSellValue,
      status: "pending",
    });

    // STEP 2: After 10 seconds → Complete order + Update portfolio & wallet
    setTimeout(async () => {
      try {
        // Update order status to completed
        await OrderModel.findByIdAndUpdate(order._id, {
          status: "completed",
        });

        // Reduce quantity from portfolio
        stock.quantity -= quantity;

        if (stock.quantity === 0) {
          await PortfolioModel.deleteOne({ _id: stock._id });
        } else {
          await stock.save();
        }

        // Add money to wallet
        const user = await UserModel.findById(req.userId);
        user.wallet += totalSellValue;
        await user.save();

        // console.log("✅ Sell order completed:", order._id);
      } catch (err) {
        console.error("❌ Error completing sell order:", err);
        // Mark order as failed
        await OrderModel.findByIdAndUpdate(order._id, {
          status: "failed",
        });
      }
    }, 10000);

    return res.status(200).json({
      message:
        "Sell order placed successfully. It will be completed in 10 seconds.",
      orderId: order._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};