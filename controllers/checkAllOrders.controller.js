import { OrderModel } from "../models/order.model.js";

export const checkAllOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    return res.status(200).json({msessage: "Orders fetched successfully", orders});
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
