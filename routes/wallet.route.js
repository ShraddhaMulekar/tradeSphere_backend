import express from "express";
import { addWalletController } from "../controllers/add_wallet.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { withdrawalWalletController } from "../controllers/withdrawal_wallet.controller.js";

export const walletRouter = express.Router();

walletRouter.post("/add", authMiddleware, addWalletController);
walletRouter.post("/withdrawal", authMiddleware, withdrawalWalletController);