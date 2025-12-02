import { UserModel } from "../models/user.model.js";

export const allUserController = async (req, res) => {
  try {
    const user = await UserModel.find();
    return res.status(200).json({ message: "All users fetched", users: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
