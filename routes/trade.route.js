import express from "express"
import { buyController } from "../controllers/buyTrade.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { sellTradeController } from "../controllers/sellTrade.controller.js"

export const tradeRouter = express.Router()

tradeRouter.post("/buy",authMiddleware, buyController)
tradeRouter.post("/sell",authMiddleware, sellTradeController)