import { OrderModel } from "../models/order.model.js";
import { PortfolioModel } from "../models/portfolio.model.js";

export const completeOrderAfterDelay = (orderId) => {
  setTimeout(async () => {
    const order = await OrderModel.findById(orderId);

    if (!order || order.status !== "pending") return;

    // Mark order completed
    order.status = "completed";
    await order.save();

    // BUY → add to portfolio
    if (order.type === "BUY") {
      const holding = await PortfolioModel.findOne({
        userId: order.userId,
        symbol: order.symbol,
      });

      if (holding) {
        // update quantity + avg price
        const totalQty = holding.quantity + order.quantity;
        const totalValue =
          holding.avgPrice * holding.quantity +
          order.price * order.quantity;

        holding.quantity = totalQty;
        holding.avgPrice = totalValue / totalQty;

        await holding.save();
      } else {
        // new stock entry
        await PortfolioModel.create({
          userId: order.userId,
          symbol: order.symbol,
          quantity: order.quantity,
          avgPrice: order.price,
        });
      }
    }
  }, 10000); // 🕒 10 seconds
};