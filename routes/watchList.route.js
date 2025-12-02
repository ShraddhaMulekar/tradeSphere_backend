import express from "express";
import { addWatchListController } from "../controllers/add_watchList.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { removeWatchlistController } from "../controllers/remove_watchlist.controller.js";
import { checkAllWatchlistController } from "../controllers/check_allWatchlist.controller.js";

export const watchListRouter = express.Router();

watchListRouter.post("/add", authMiddleware, addWatchListController );
watchListRouter.post("/remove", authMiddleware, removeWatchlistController)
watchListRouter.get("/all", authMiddleware, checkAllWatchlistController)