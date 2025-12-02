import express from "express"
import { registerController } from "../controllers/register.controller.js"

const authRouter = express.Router()

authRouter.post("/register", registerController)

export { authRouter }