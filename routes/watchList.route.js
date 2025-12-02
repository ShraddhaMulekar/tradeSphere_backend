import express from "express";
import { addWatchListController } from "../controllers/add_watchList.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const watchListRouter = express.Router();

watchListRouter.post("/add", authMiddleware, addWatchListController );
