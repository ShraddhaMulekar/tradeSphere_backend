import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allOrderController } from "../controllers/allOrder.controller.js";
import { checkAllOrdersController } from "../controllers/checkAllOrders.controller.js";
import { createOrderController } from "../controllers/order.controller.js";
import { deleteOrder } from "../controllers/delete.order.controller.js";

export const orderRouter = express.Router();

orderRouter.post("/create", authMiddleware, createOrderController);
orderRouter.get("/all", authMiddleware, allOrderController);
orderRouter.get("/check", checkAllOrdersController);
orderRouter.delete("/delete/:id", authMiddleware, deleteOrder);
