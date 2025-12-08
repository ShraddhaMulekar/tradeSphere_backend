import { OrderModel } from "../models/order.model.js";

export const allOrderController = async (req, res) => {
  try {
    const orders = await OrderModel.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ orders });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};