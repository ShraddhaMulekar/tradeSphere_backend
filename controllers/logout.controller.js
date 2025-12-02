import { LogoutModel } from "../models/logout.model.js";

export const logOutController = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(302).json({ msg: "token invalid!" });
    }

    const logOut = await LogoutModel.create({ token });
    return res.status(200).json({ msg: "Log out successful!", logOut });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error in log out backend route", error });
  }
};
