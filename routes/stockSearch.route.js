import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { searchStockController } from '../controllers/searchStockController.js';
import { stockController } from '../controllers/stock.Controller.js';

export const stockSearchRouter = express.Router();

stockSearchRouter.get('/search/:symbol', searchStockController);
stockSearchRouter.get("/quote/:symbol", authMiddleware, stockController);