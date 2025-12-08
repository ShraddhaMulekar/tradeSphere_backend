import { OrderModel } from "../models/order.model.js";

export const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findOne({
      _id: req.params.id,
      userId: req.userId,
      status: "pending", // ✅ lowercase
    });

    if (!order) {
      return res.status(400).json({
        message: "Only pending orders can be removed",
      });
    }

    await order.deleteOne();

    return res.status(200).json({ message: "Order removed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
