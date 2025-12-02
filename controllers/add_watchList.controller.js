import { UserModel } from "../models/user.model.js";

export const addWatchListController = async (req, res) => {
  try {
    const { symbol } = req.body;

    const user = await UserModel.findById(req.userId);

    if (user.watchlist.includes(symbol)) {
      return res.status(400).json({ message: "Symbol already in watchlist" });
    }

    user.watchlist.push(symbol);
    await user.save();

    return res
      .status(200)
      .json({
        message: "Symbol added to watchlist",
        watchlist: user.watchlist,
      });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}