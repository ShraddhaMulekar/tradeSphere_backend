import { UserModel } from "../models/user.model.js";

export const addWalletController = async (req, res) => {
  try {
    const { amount } = req.body;

    const user = await UserModel.findById(req.userId);
    user.wallet += amount;

    await user.save();
    return res
      .status(200)
      .json({ message: "Wallet updated successfully", wallet: user.wallet });
  } catch (error) {
    // console.error("Error updating wallet:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};