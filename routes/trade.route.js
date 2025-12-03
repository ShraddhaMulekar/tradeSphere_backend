import express from "express"
import { buyController } from "../controllers/buyTrade.controller.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

export const tradeRouter = express.Router()

tradeRouter.post("/buy",authMiddleware, buyController)