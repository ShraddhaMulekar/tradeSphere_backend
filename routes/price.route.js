import express from 'express';
import { priceController } from '../controllers/price.controller.js';

export const priceRouter = express.Router();

priceRouter.get('/:symbol', priceController);