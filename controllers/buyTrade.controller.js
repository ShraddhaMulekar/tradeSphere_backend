import { PortfolioModel } from "../models/portfolio.model.js";
import { OrderModel } from "../models/order.model.js";
import { UserModel } from "../models/user.model.js";

export const buyController = async (req, res) => {
  try {
    const { symbol, price, quantity } = req.body;

    const totalCost = price * quantity;

    const user = await UserModel.findById(req.userId);

    if (user.wallet < totalCost) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // ✅ STEP 1: Create order with PENDING status (DON'T update wallet/portfolio yet)
    const order = await OrderModel.create({
      userId: req.userId,
      symbol,
      type: "BUY",
      quantity,
      price,
      total: totalCost,
      status: "pending",
    });

    // ✅ STEP 2: After 10 seconds → Complete order + Update wallet & portfolio
    setTimeout(async () => {
      try {
        // Update order status to completed
        await OrderModel.findByIdAndUpdate(order._id, {
          status: "completed",
        });

        // Deduct money from wallet
        user.wallet -= totalCost;
        await user.save();

        // Update or insert portfolio
        let stock = await PortfolioModel.findOne({
          userId: req.userId,
          symbol,
        });

        if (stock) {
          // If stock already exists, add to quantity
          stock.quantity += quantity;
          stock.buyPrice = price; // Update buy price to latest
          await stock.save();
        } else {
          // Create new portfolio entry
          await PortfolioModel.create({
            userId: req.userId,
            symbol,
            quantity,
            buyPrice: price,
          });
        }

        // console.log("✅ Order completed:", order._id);
      } catch (err) {
        console.error("❌ Error completing order:", err);
        // Mark order as failed
        await OrderModel.findByIdAndUpdate(order._id, {
          status: "failed",
        });
      }
    }, 10000);

    return res.status(201).json({
      message: "Order placed successfully. It will be completed in 10 seconds.",
      orderId: order._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};