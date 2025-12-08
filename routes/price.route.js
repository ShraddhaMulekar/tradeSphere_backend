import express from 'express';
import { priceController } from '../controllers/price.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

export const priceRouter = express.Router();

priceRouter.get('/:symbol', authMiddleware, priceController);