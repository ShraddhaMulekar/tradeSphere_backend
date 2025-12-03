import { OrderModel } from "../models/order.model.js";

export const allOrderController = async (req, res) => {
  try {
    const order = await OrderModel.find({ userId: req.userId });
    return res.status(200).json({ message: "Your Orders", Orders: order });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error in fetching all orders", error: error.message });
  }
};