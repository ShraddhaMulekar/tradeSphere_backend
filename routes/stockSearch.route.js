import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { searchStockController } from '../controllers/stockController.js';

export const stockSearchRouter = express.Router();

stockSearchRouter.get('/search/:symbol',authMiddleware, searchStockController);