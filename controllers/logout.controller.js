import { LogoutModel } from "../models/logout.model.js";

export const logOutController = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "token invalid!" });
    }

    const logOut = await LogoutModel.create({ token });
    return res.status(200).json({ message: "Log out successful!", logOut });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error in log out backend route", error });
  }
};
