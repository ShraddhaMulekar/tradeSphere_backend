import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { priceController } from '../controllers/price.controller.js';

export const priceRouter = express.Router();

priceRouter.get('/:symbol', authMiddleware, priceController);