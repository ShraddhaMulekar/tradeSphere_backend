import { UserModel } from "../models/user.model.js";

export const removeWatchlistController = async (req, res) => {
  try {
    const { symbol } = req.body;

    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.watchlist = user.watchlist.filter((item) => item !== symbol);
    await user.save();
    return res.status(200).json({
      message: "share removed from watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
