import { PortfolioModel } from "../models/portfolio.model.js"

export const allPortfolioController = async(req, res) => {
    try {
        const holding = await PortfolioModel.find({userId:req.userId})
        return res.status(200).json({message:"Your Holding", Holdings: holding})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}