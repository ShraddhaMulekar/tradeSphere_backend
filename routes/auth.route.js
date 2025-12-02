import express from "express"
import { registerController } from "../controllers/register.controller.js"
import { loginController } from "../controllers/login.controller.js"

const authRouter = express.Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)

export { authRouter }