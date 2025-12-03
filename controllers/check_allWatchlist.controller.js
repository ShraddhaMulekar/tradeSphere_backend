import { UserModel } from "../models/user.model.js"

export const checkAllWatchlistController = async(req, res) => {
    try {
        const userId = req.userId
        const user = await UserModel.findById(userId).select("watchlist")

        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        return res.status(200).json({message: "Check Watch list", watchlist: user.watchlist})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}