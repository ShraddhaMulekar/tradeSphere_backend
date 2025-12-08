import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getPopularStocksController } from "../controllers/popularStock.controller.js";

export const popularStocksRouter = express.Router();

popularStocksRouter.get("/popular", authMiddleware, getPopularStocksController);
