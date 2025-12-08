import { OrderModel } from "../models/order.model.js";

export const createOrderController = async (req, res) => {
  try {
    const { symbol, quantity, price, type } = req.body;

    if (!type || !["BUY", "SELL"].includes(type)) {
      return res.status(400).json({ message: "Invalid order type" });
    }

    const order = await OrderModel.create({
      userId: req.userId,
      symbol,
      quantity,
      price,
      type,
      total: price * quantity, // Calculate total
      status: "pending", // lowercase
    });

    // ✅ Auto-complete after 10 sec
    setTimeout(async () => {
      await OrderModel.findByIdAndUpdate(order._id, {
        status: "completed", // lowercase
      });
      // console.log("✅ Order completed:", order._id);
    }, 10000);

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
