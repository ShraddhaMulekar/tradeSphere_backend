import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt"

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const regexPass =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|]).{8,}$/;

  if (!regexPass.test(password)) {
    return res.json({
      message: "Password must contain at least one letter, one number, one special character, and be at most 8 characters long.",
    });
  }

  if(!name || !email || !password){
    return res.json({
        message: "All fields are required!"
    })
  }

  try {
    const matchEmail = await UserModel.findOne({ email });

    if (matchEmail) {
        // console.log("already register", matchEmail)
      return res.json({
        message: "You are already register with same email Id. please Log in now!",
        matchEmail,
      });
    }

    bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS),
      async (err, hash) => {
        if (err) {
            // console.log("pass not valid", err)
          return res.json({ message: "password invalid!", err });
        } else {
          let newUser = UserModel({ email, name, password: hash });
          await newUser.save();
        //   console.log("regi", newUser)
          return res.json({ message: "register successful!", newUser });
        }
      }
    );
  } catch (error) {
    // console.log(error);
    return res.json({
      message: "Error in backend user register post router",
      error,
    });
  }
};
