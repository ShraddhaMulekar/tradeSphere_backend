import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { allPortfolioController } from '../controllers/allPortfolio.controller.js'

export const portFolioRouter = express.Router()

portFolioRouter.get("/all", authMiddleware, allPortfolioController)