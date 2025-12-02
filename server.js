import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectedDB } from "./config/db.js"
import { authRouter } from "./routes/auth.route.js"

const app = express()
app.use(express.json())
dotenv.config()
const port = process.env.PORT || 3000

app.use(cors())

app.use("/auth", authRouter)

app.listen(port, ()=>{
    connectedDB()
    console.log(`server started on http://localhost:${port}`)
})