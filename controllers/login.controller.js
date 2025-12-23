import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message: "All fields are required!"
        })
    }

    const matchEmail = await UserModel.findOne({ email });

    if (!matchEmail) {
      return res
        .status(404)
        .json({ message: "you are not register. please register!" });
    } else {
      bcrypt.compare(password, matchEmail.password, async (err, result)=>{
        if(result){
            const payload = {
                userId : matchEmail._id,
                userName : matchEmail.name
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET)
            return res.status(200).json({message: "log in successful!", token});
        } else{
            return res.status(404).json({message: "password doesn't match!", err});
        }
      });
    }
  } catch (error) {
    return res.status(404).json({ message: "Error in backend user log in post router", error });
  }
};
