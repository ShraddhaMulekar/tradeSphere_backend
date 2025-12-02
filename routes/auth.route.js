import express from "express"
import { registerController } from "../controllers/register.controller.js"
import { loginController } from "../controllers/login.controller.js"
import { logOutController } from "../controllers/logout.controller.js"
import { allUserController } from "../controllers/all_user.controller.js"

const authRouter = express.Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
authRouter.post("/logout", logOutController)
authRouter.get("/all-users", allUserController)

export { authRouter }