import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { allPortfolioController } from '../controllers/allPortfolio.controller.js'
import { addToPortfolioController } from '../controllers/addPortfolio.controller.js';

export const portFolioRouter = express.Router()

portFolioRouter.post("/add", authMiddleware, addToPortfolioController);
portFolioRouter.get("/all", authMiddleware, allPortfolioController)