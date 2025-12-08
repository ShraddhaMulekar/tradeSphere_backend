import { UserModel } from "../models/user.model.js";

export const withdrawalWalletController = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await UserModel.findById(req.userId);
    if (user.wallet < amount) {
      return res
        .status(400)
        .json({ message: "Insufficient funds in withdrawal wallet" });
    }
    user.wallet -= amount;
    await user.save();

    return res.status(200).json({
      message: "Withdrawal successful",
      withdrawal_wallet: amount,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
