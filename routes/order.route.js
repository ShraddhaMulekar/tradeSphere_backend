import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { allOrderController } from "../controllers/allOrder.controller.js"
import { checkAllOrdersController } from "../controllers/checkAllOrders.controller.js"

export const orderRouter = express.Router()

orderRouter.get("/all", authMiddleware, allOrderController)
orderRouter.get("/check", checkAllOrdersController)